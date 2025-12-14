"""
Script load test tăng dần từ 10 → 5000 requests/second cho endpoint đăng nhập
"""
import requests
import time
import threading
from collections import defaultdict
from datetime import datetime
import json
import statistics

class LoadTester:
    def __init__(self, base_url, endpoint, test_data):
        self.base_url = base_url
        self.endpoint = endpoint
        self.test_data = test_data
        self.results = defaultdict(list)
        self.lock = threading.Lock()
        self.running = False
        self.stats = {
            'total_requests': 0,
            'successful_requests': 0,
            'failed_requests': 0,
            'response_times': [],
            'errors': defaultdict(int)
        }
    
    def make_request(self):
        """Thực hiện một request đăng nhập"""
        start_time = time.time()
        try:
            response = requests.post(
                f"{self.base_url}{self.endpoint}",
                json=self.test_data,
                timeout=10
            )
            elapsed_time = (time.time() - start_time) * 1000  # Convert to ms
            
            with self.lock:
                self.stats['total_requests'] += 1
                self.stats['response_times'].append(elapsed_time)
                
                if response.status_code == 200:
                    self.stats['successful_requests'] += 1
                else:
                    self.stats['failed_requests'] += 1
                    self.stats['errors'][f"HTTP_{response.status_code}"] += 1
                    
        except requests.exceptions.RequestException as e:
            elapsed_time = (time.time() - start_time) * 1000
            with self.lock:
                self.stats['total_requests'] += 1
                self.stats['failed_requests'] += 1
                self.stats['response_times'].append(elapsed_time)
                error_type = type(e).__name__
                self.stats['errors'][error_type] += 1
    
    def worker(self, requests_per_second, duration_seconds):
        """Worker thread để gửi requests với tốc độ nhất định"""
        interval = 1.0 / requests_per_second
        end_time = time.time() + duration_seconds
        
        while time.time() < end_time and self.running:
            thread = threading.Thread(target=self.make_request)
            thread.start()
            time.sleep(interval)
    
    def run_gradual_load_test(self, start_rps=10, end_rps=5000, step_rps=50, step_duration=10):
        """
        Chạy load test tăng dần
        
        Args:
            start_rps: Số requests/giây ban đầu
            end_rps: Số requests/giây cuối cùng
            step_rps: Bước tăng mỗi lần (requests/giây)
            step_duration: Thời gian duy trì mỗi mức (giây)
        """
        self.running = True
        current_rps = start_rps
        
        print(f"\n{'='*80}")
        print(f"BẮT ĐẦU LOAD TEST - Tăng dần từ {start_rps} → {end_rps} req/s")
        print(f"Bước tăng: {step_rps} req/s, Thời gian mỗi mức: {step_duration}s")
        print(f"{'='*80}\n")
        
        while current_rps <= end_rps and self.running:
            # Reset stats cho mức hiện tại
            step_start_time = time.time()
            step_stats = {
                'rps': current_rps,
                'start_time': step_start_time,
                'requests_before': self.stats['total_requests']
            }
            
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Đang test ở mức: {current_rps} req/s")
            
            # Tạo worker threads
            num_workers = min(10, max(1, current_rps // 10))  # Số worker threads
            threads = []
            
            for _ in range(num_workers):
                worker_rps = current_rps / num_workers
                thread = threading.Thread(
                    target=self.worker,
                    args=(worker_rps, step_duration)
                )
                thread.start()
                threads.append(thread)
            
            # Đợi tất cả workers hoàn thành
            for thread in threads:
                thread.join()
            
            # Tính toán stats cho mức này
            step_end_time = time.time()
            step_requests = self.stats['total_requests'] - step_stats['requests_before']
            actual_rps = step_requests / step_duration if step_duration > 0 else 0
            
            # Lấy response times cho mức này
            recent_times = self.stats['response_times'][-step_requests:] if step_requests > 0 else []
            avg_response_time = statistics.mean(recent_times) if recent_times else 0
            median_response_time = statistics.median(recent_times) if recent_times else 0
            p95_response_time = self._percentile(recent_times, 95) if recent_times else 0
            p99_response_time = self._percentile(recent_times, 99) if recent_times else 0
            
            # In kết quả
            print(f"  ✓ Hoàn thành: {step_requests} requests trong {step_duration}s")
            print(f"  ✓ Tốc độ thực tế: {actual_rps:.2f} req/s")
            print(f"  ✓ Response time - Avg: {avg_response_time:.2f}ms, Median: {median_response_time:.2f}ms")
            print(f"  ✓ Response time - P95: {p95_response_time:.2f}ms, P99: {p99_response_time:.2f}ms")
            print(f"  ✓ Tổng requests: {self.stats['total_requests']}, Thành công: {self.stats['successful_requests']}, Thất bại: {self.stats['failed_requests']}")
            print()
            
            # Tăng tốc độ cho mức tiếp theo
            current_rps += step_rps
            
            # Nghỉ ngắn giữa các mức
            time.sleep(1)
        
        self.running = False
        self.print_final_stats()
    
    def _percentile(self, data, percentile):
        """Tính percentile"""
        if not data:
            return 0
        sorted_data = sorted(data)
        index = int(len(sorted_data) * percentile / 100)
        return sorted_data[min(index, len(sorted_data) - 1)]
    
    def print_final_stats(self):
        """In thống kê cuối cùng"""
        print(f"\n{'='*80}")
        print("THỐNG KÊ CUỐI CÙNG")
        print(f"{'='*80}")
        print(f"Tổng số requests: {self.stats['total_requests']}")
        print(f"Requests thành công: {self.stats['successful_requests']} ({self.stats['successful_requests']/max(1, self.stats['total_requests'])*100:.2f}%)")
        print(f"Requests thất bại: {self.stats['failed_requests']} ({self.stats['failed_requests']/max(1, self.stats['total_requests'])*100:.2f}%)")
        
        if self.stats['response_times']:
            print(f"\nResponse Times:")
            print(f"  Min: {min(self.stats['response_times']):.2f}ms")
            print(f"  Max: {max(self.stats['response_times']):.2f}ms")
            print(f"  Avg: {statistics.mean(self.stats['response_times']):.2f}ms")
            print(f"  Median: {statistics.median(self.stats['response_times']):.2f}ms")
            print(f"  P95: {self._percentile(self.stats['response_times'], 95):.2f}ms")
            print(f"  P99: {self._percentile(self.stats['response_times'], 99):.2f}ms")
        
        if self.stats['errors']:
            print(f"\nLỗi:")
            for error_type, count in self.stats['errors'].items():
                print(f"  {error_type}: {count}")
        
        print(f"{'='*80}\n")


def main():
    # Cấu hình
    BASE_URL = "http://localhost:5000"
    ENDPOINT = "/api/credentials/login"
    
    # Dữ liệu test (thay đổi theo dữ liệu thực tế của bạn)
    TEST_DATA = {
        "student_code": "SV001",
        "password": "$2a$12$svqyQeLwKNqCAw87/i/KN.3ScuAk/q6IZ1jRTvHb4opl6pL/UXgJ6"
    }
    
    # Tham số load test
    START_RPS = 50
    END_RPS = 500
    STEP_RPS = 50  # Tăng 5 req/s mỗi bước
    STEP_DURATION = 5  # Giữ mỗi mức trong 5 giây
    
    print("=" * 80)
    print("LOAD TEST SCRIPT - ĐĂNG NHẬP")
    print("=" * 80)
    print(f"URL: {BASE_URL}{ENDPOINT}")
    print(f"Test data: {json.dumps(TEST_DATA, indent=2)}")
    print(f"\nTham số:")
    print(f"  - Bắt đầu: {START_RPS} req/s")
    print(f"  - Kết thúc: {END_RPS} req/s")
    print(f"  - Bước tăng: {STEP_RPS} req/s")
    print(f"  - Thời gian mỗi mức: {STEP_DURATION}s")
    print("=" * 80)
    
    # Kiểm tra kết nối
    try:
        response = requests.get(f"{BASE_URL}/", timeout=5)
        print(f"\n✓ Kết nối thành công đến server!")
    except requests.exceptions.RequestException as e:
        print(f"\n✗ Không thể kết nối đến server: {e}")
        print("  Vui lòng đảm bảo server đang chạy!")
        return
    
    # Tạo và chạy load tester
    tester = LoadTester(BASE_URL, ENDPOINT, TEST_DATA)
    
    try:
        tester.run_gradual_load_test(
            start_rps=START_RPS,
            end_rps=END_RPS,
            step_rps=STEP_RPS,
            step_duration=STEP_DURATION
        )
    except KeyboardInterrupt:
        print("\n\n⚠ Load test bị dừng bởi người dùng!")
        tester.running = False
        tester.print_final_stats()


if __name__ == "__main__":
    main()

