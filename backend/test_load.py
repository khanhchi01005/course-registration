import requests
import time
import threading
from datetime import datetime
import statistics
from concurrent.futures import ThreadPoolExecutor, as_completed
import random
import queue

class StudentSimulator:
    def __init__(self, base_url, student_code="SV001", password="matkhau1"):
        self.base_url = base_url
        self.student_code = student_code
        self.password = password
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })

    def login(self):
        try:
            resp = self.session.post(
                f"{self.base_url}/api/credentials/login",
                json={"student_code": self.student_code, "password": self.password},
                timeout=15
            )
            return resp.status_code == 200
        except Exception as e:
            return False

    def get_subjects(self):
        try:
            resp = self.session.get(
                f"{self.base_url}/api/subject/list",
                params={"student_code": self.student_code},
                timeout=15
            )
            if resp.status_code == 200:
                data = resp.json()
                return [c["course_code"] for c in data.get("courses", [])]
            return []
        except:
            return []

    def enroll(self, courses):
        try:
            resp = self.session.post(
                f"{self.base_url}/api/subject/enroll",
                json={"student_code": self.student_code, "course_code": courses},
                timeout=15
            )
            return resp.status_code == 200
        except:
            return False

    def simulate(self):
        start_time = time.time()
        
        # Login
        if not self.login():
            return False, (time.time() - start_time) * 1000, "login_failed"
        
        # Delay ngẫu nhiên ngắn (mô phỏng thao tác người dùng)
        time.sleep(random.uniform(0.05, 0.2))
        
        # Get subjects
        courses = self.get_subjects()
        if not courses:
            return False, (time.time() - start_time) * 1000, "get_subjects_failed"
        
        time.sleep(random.uniform(0.05, 0.15))
        
        # Enroll
        success = self.enroll(courses[:3])
        elapsed = (time.time() - start_time) * 1000
        
        status = "success" if success else "enroll_failed"
        return success, elapsed, status


class LoadTester:
    def __init__(self, base_url, total_requests=20000):
        self.base_url = base_url
        self.lock = threading.Lock()
        self.running = False
        self.total_requests = total_requests
        self.stats = {
            'total_requests': 0,
            'successful_requests': 0,
            'failed_requests': 0,
            'response_times': [],
            'errors': {
                'login_failed': 0,
                'get_subjects_failed': 0,
                'enroll_failed': 0
            },
            'start_time': None,
            'end_time': None,
            'requests_per_second': []
        }

    def simulate_student(self, request_index):
        sim = StudentSimulator(self.base_url)
        success, elapsed, status = sim.simulate()
        
        with self.lock:
            self.stats['total_requests'] += 1
            self.stats['response_times'].append(elapsed)
            
            if success:
                self.stats['successful_requests'] += 1
            else:
                self.stats['failed_requests'] += 1
                if status in self.stats['errors']:
                    self.stats['errors'][status] += 1

            # In progress mỗi 200 requests
            if self.stats['total_requests'] % 200 == 0:
                self.print_progress()

    def print_progress(self):
        total = self.stats['total_requests']
        success = self.stats['successful_requests']
        fail = self.stats['failed_requests']
        avg_rt = statistics.mean(self.stats['response_times'][-1000:]) if self.stats['response_times'] else 0
        
        elapsed_time = time.time() - self.stats['start_time']
        rps = total / elapsed_time if elapsed_time > 0 else 0
        
        print(f"[{datetime.now().strftime('%H:%M:%S')}] "
              f"Progress: {total}/{self.total_requests} ({total/self.total_requests*100:.1f}%) | "
              f"✅ {success} | ❌ {fail} | "
              f"Avg RT: {avg_rt:.0f}ms | "
              f"RPS: {rps:.1f}")

    def run_burst_load_test(self):
        """
        Mô phỏng traffic burst thực tế:
        - Nhiều người cùng đăng nhập 1 lúc
        - Traffic không đều, có spike và valley
        - Giống như khi mở đăng ký môn học
        """
        self.running = True
        self.stats['start_time'] = time.time()
        
        print(f"\n{'='*80}")
        print(f"🚀 BURST LOAD TEST: Simulating {self.total_requests} requests")
        print(f"Base URL: {self.base_url}")
        print(f"Start time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Pattern: Realistic burst traffic (10-300 concurrent users)")
        print(f"{'='*80}\n")

        try:
            request_index = 0
            max_workers = 300  # Max concurrent threads
            
            with ThreadPoolExecutor(max_workers=max_workers) as executor:
                while request_index < self.total_requests and self.running:
                    # Tạo burst traffic với số lượng ngẫu nhiên
                    burst_size = self._generate_burst_size()
                    actual_burst = min(burst_size, self.total_requests - request_index)
                    
                    phase_start = time.time()
                    print(f"\n💥 BURST: Launching {actual_burst} concurrent requests...")
                    
                    # Submit tất cả requests trong burst cùng lúc
                    futures = []
                    for i in range(actual_burst):
                        future = executor.submit(self.simulate_student, request_index)
                        futures.append(future)
                        request_index += 1
                    
                    # Đợi burst hoàn thành
                    completed = 0
                    for future in as_completed(futures):
                        try:
                            future.result()
                            completed += 1
                        except Exception as e:
                            completed += 1
                    
                    phase_time = time.time() - phase_start
                    phase_rps = actual_burst / phase_time if phase_time > 0 else 0
                    print(f"   ✓ Burst completed in {phase_time:.2f}s (RPS: {phase_rps:.1f})")
                    
                    # Delay ngẫu nhiên giữa các burst (mô phỏng thực tế)
                    if request_index < self.total_requests:
                        delay = self._generate_burst_delay()
                        print(f"   ⏳ Waiting {delay:.2f}s before next burst...")
                        time.sleep(delay)

        except KeyboardInterrupt:
            print("\n\n⚠️  Load test stopped by user (Ctrl+C)")
            self.running = False

        self.stats['end_time'] = time.time()
        self.running = False
        self.print_final_stats()

    def _generate_burst_size(self):
        """
        Tạo burst size ngẫu nhiên mô phỏng traffic thực tế
        - 40% chance: small burst (10-50 users)
        - 30% chance: medium burst (50-150 users)
        - 20% chance: large burst (150-250 users)
        - 10% chance: mega burst (250-300 users) - giống lúc mở đăng ký
        """
        rand = random.random()
        if rand < 0.4:
            return random.randint(10, 50)
        elif rand < 0.7:
            return random.randint(50, 150)
        elif rand < 0.9:
            return random.randint(150, 250)
        else:
            return random.randint(250, 300)

    def _generate_burst_delay(self):
        """
        Tạo delay ngẫu nhiên giữa các burst
        - 50% chance: very short delay (0.1-1s) - traffic cao
        - 30% chance: short delay (1-3s)
        - 15% chance: medium delay (3-5s)
        - 5% chance: long delay (5-10s) - traffic thấp
        """
        rand = random.random()
        if rand < 0.5:
            return random.uniform(0.1, 1.0)
        elif rand < 0.8:
            return random.uniform(1.0, 3.0)
        elif rand < 0.95:
            return random.uniform(3.0, 5.0)
        else:
            return random.uniform(5.0, 10.0)

    def run_wave_load_test(self):
        """
        Mô phỏng traffic theo wave pattern:
        - Tăng dần từ ít đến nhiều
        - Đạt peak
        - Giảm dần
        """
        self.running = True
        self.stats['start_time'] = time.time()
        
        print(f"\n{'='*80}")
        print(f"🌊 WAVE LOAD TEST: Simulating {self.total_requests} requests")
        print(f"Base URL: {self.base_url}")
        print(f"Start time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Pattern: Wave traffic (gradual increase → peak → decrease)")
        print(f"{'='*80}\n")

        # Định nghĩa wave pattern
        wave_pattern = [
            (30, 1000, "Warm-up"),      # 30 concurrent, 1000 requests
            (80, 2000, "Ramp-up"),      # 80 concurrent, 2000 requests
            (150, 4000, "Peak-1"),      # 150 concurrent, 4000 requests
            (250, 6000, "PEAK"),        # 250 concurrent, 6000 requests - SPIKE!
            (200, 3000, "Peak-2"),      # 200 concurrent, 3000 requests
            (100, 2000, "Cool-down"),   # 100 concurrent, 2000 requests
            (50, 2000, "Wind-down"),    # 50 concurrent, 2000 requests
        ]

        try:
            request_index = 0
            
            for phase_num, (concurrency, num_requests, phase_name) in enumerate(wave_pattern, 1):
                if not self.running or request_index >= self.total_requests:
                    break

                actual_requests = min(num_requests, self.total_requests - request_index)
                print(f"\n🌊 WAVE {phase_num}: {phase_name}")
                print(f"   Concurrency: {concurrency} | Requests: {actual_requests}")
                print(f"{'-'*80}")

                phase_start = time.time()
                
                with ThreadPoolExecutor(max_workers=concurrency) as executor:
                    futures = []
                    
                    # Submit requests với mini-bursts
                    batch_size = concurrency
                    for i in range(0, actual_requests, batch_size):
                        if request_index >= self.total_requests:
                            break
                        
                        current_batch = min(batch_size, actual_requests - i, self.total_requests - request_index)
                        
                        # Submit batch cùng lúc
                        for j in range(current_batch):
                            future = executor.submit(self.simulate_student, request_index)
                            futures.append(future)
                            request_index += 1
                        
                        # Mini delay giữa các batch
                        time.sleep(random.uniform(0.05, 0.2))
                    
                    # Đợi tất cả requests hoàn thành
                    for future in as_completed(futures):
                        try:
                            future.result()
                        except Exception as e:
                            pass

                phase_time = time.time() - phase_start
                phase_rps = actual_requests / phase_time if phase_time > 0 else 0
                print(f"   ✓ Wave {phase_num} completed in {phase_time:.2f}s (RPS: {phase_rps:.1f})")

        except KeyboardInterrupt:
            print("\n\n⚠️  Load test stopped by user (Ctrl+C)")
            self.running = False

        self.stats['end_time'] = time.time()
        self.running = False
        self.print_final_stats()

    def _percentile(self, data, perc):
        if not data:
            return 0
        sorted_data = sorted(data)
        index = int(len(sorted_data) * perc / 100)
        return sorted_data[min(index, len(sorted_data) - 1)]

    def print_final_stats(self):
        total_time = self.stats['end_time'] - self.stats['start_time']
        
        print(f"\n{'='*80}")
        print("📈 FINAL LOAD TEST RESULTS")
        print(f"{'='*80}")
        
        print(f"\n⏱️  Time Statistics:")
        print(f"   Total duration: {total_time:.2f}s ({total_time/60:.2f} minutes)")
        print(f"   Start: {datetime.fromtimestamp(self.stats['start_time']).strftime('%H:%M:%S')}")
        print(f"   End: {datetime.fromtimestamp(self.stats['end_time']).strftime('%H:%M:%S')}")
        
        print(f"\n📊 Request Statistics:")
        print(f"   Total requests: {self.stats['total_requests']:,}")
        success_rate = self.stats['successful_requests']/self.stats['total_requests']*100 if self.stats['total_requests'] > 0 else 0
        print(f"   ✅ Successful: {self.stats['successful_requests']:,} ({success_rate:.2f}%)")
        fail_rate = self.stats['failed_requests']/self.stats['total_requests']*100 if self.stats['total_requests'] > 0 else 0
        print(f"   ❌ Failed: {self.stats['failed_requests']:,} ({fail_rate:.2f}%)")
        
        print(f"\n❌ Error Breakdown:")
        if sum(self.stats['errors'].values()) > 0:
            for error_type, count in self.stats['errors'].items():
                if count > 0:
                    error_pct = count/self.stats['total_requests']*100
                    print(f"   {error_type}: {count:,} ({error_pct:.2f}%)")
        else:
            print(f"   No errors! 🎉")
        
        if self.stats['response_times']:
            print(f"\n⚡ Response Time Statistics:")
            print(f"   Average: {statistics.mean(self.stats['response_times']):.0f}ms")
            print(f"   Median: {statistics.median(self.stats['response_times']):.0f}ms")
            print(f"   Min: {min(self.stats['response_times']):.0f}ms")
            print(f"   Max: {max(self.stats['response_times']):.0f}ms")
            print(f"   Std Dev: {statistics.stdev(self.stats['response_times']):.0f}ms")
            print(f"\n   Percentiles:")
            print(f"   P50: {self._percentile(self.stats['response_times'], 50):.0f}ms")
            print(f"   P75: {self._percentile(self.stats['response_times'], 75):.0f}ms")
            print(f"   P90: {self._percentile(self.stats['response_times'], 90):.0f}ms")
            print(f"   P95: {self._percentile(self.stats['response_times'], 95):.0f}ms")
            print(f"   P99: {self._percentile(self.stats['response_times'], 99):.0f}ms")
        
        print(f"\n🔥 Throughput:")
        rps = self.stats['total_requests'] / total_time if total_time > 0 else 0
        print(f"   Average RPS: {rps:.2f}")
        print(f"   Requests per minute: {rps*60:.0f}")
        print(f"   Avg time per request: {total_time/self.stats['total_requests']:.3f}s")
        
        print(f"\n{'='*80}\n")


def main():
    BASE_URL = "http://api-testdangkyhoc.vnu.edu.vn"
    TOTAL_REQUESTS = 20000
    
    # Kiểm tra kết nối server
    print("🔍 Checking server connection...")
    try:
        response = requests.get(f"{BASE_URL}/", timeout=5)
        print(f"✅ Server reachable (Status: {response.status_code})\n")
    except Exception as e:
        print(f"❌ Cannot reach server: {e}")
        return

    # Khởi tạo load tester
    tester = LoadTester(BASE_URL, total_requests=TOTAL_REQUESTS)

    # Chọn pattern test
    print("Select load test pattern:")
    print("1. BURST Pattern - Random bursts (10-300 concurrent) - MÔ PHỎNG THỰC TẾ NHẤT")
    print("2. WAVE Pattern - Gradual increase/decrease")
    print("3. Both patterns")
    
    choice = input("\nEnter choice (1/2/3) [default=1]: ").strip() or "1"

    if choice == "1":
        print("\n🎯 Running BURST pattern test...")
        tester.run_burst_load_test()
    elif choice == "2":
        print("\n🎯 Running WAVE pattern test...")
        tester.run_wave_load_test()
    elif choice == "3":
        print("\n🎯 Running BURST pattern test first...")
        tester.run_burst_load_test()
        
        print("\n" + "="*80)
        print("Starting WAVE pattern test in 5 seconds...")
        print("="*80)
        time.sleep(5)
        
        tester2 = LoadTester(BASE_URL, total_requests=TOTAL_REQUESTS)
        tester2.run_wave_load_test()
    else:
        print("Invalid choice!")


if __name__ == "__main__":
    main()