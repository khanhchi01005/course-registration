"""
Async Load test tăng dần 10 → 5000 req/s cho login + enroll + list subjects
"""
import asyncio
import aiohttp
import time
import statistics
from collections import defaultdict
from datetime import datetime

class AsyncLoadTester:
    def __init__(self, base_url, login_endpoint, test_data):
        self.base_url = base_url
        self.login_endpoint = login_endpoint
        self.test_data = test_data
        self.stats = {
            'total_requests': 0,
            'successful_requests': 0,
            'failed_requests': 0,
            'response_times': [],
            'errors': defaultdict(int)
        }
        self.lock = asyncio.Lock()
    
    async def make_request(self, session):
        start = time.time()
        try:
            # Login
            async with session.post(f"{self.base_url}{self.login_endpoint}", json=self.test_data, timeout=10) as resp:
                elapsed = (time.time() - start) * 1000
                async with self.lock:
                    self.stats['total_requests'] += 1
                    self.stats['response_times'].append(elapsed)
                    if resp.status == 200:
                        self.stats['successful_requests'] += 1
                    else:
                        self.stats['failed_requests'] += 1
                        self.stats['errors'][f"HTTP_{resp.status}"] += 1

                if resp.status != 200:
                    return

                # Lấy token
                data = await resp.json()
                token = data.get("token")
                headers = {"Authorization": f"Bearer {token}"} if token else {}

                # Enroll
                enroll_data = {"student_code": self.test_data["student_code"], "course_code": ["CS101","CS102"]}
                try:
                    async with session.post(f"{self.base_url}/api/subject/enroll", json=enroll_data, headers=headers, timeout=10) as er:
                        if er.status != 200:
                            async with self.lock:
                                self.stats['errors'][f"Enroll_HTTP_{er.status}"] += 1
                except Exception as e:
                    async with self.lock:
                        self.stats['errors'][f"Enroll_{type(e).__name__}"] += 1

                # List subjects
                try:
                    async with session.get(f"{self.base_url}/api/subject/list", params={"student_code": self.test_data["student_code"]}, headers=headers, timeout=10) as lr:
                        if lr.status != 200:
                            async with self.lock:
                                self.stats['errors'][f"List_HTTP_{lr.status}"] += 1
                except Exception as e:
                    async with self.lock:
                        self.stats['errors'][f"List_{type(e).__name__}"] += 1

        except Exception as e:
            elapsed = (time.time() - start) * 1000
            async with self.lock:
                self.stats['total_requests'] += 1
                self.stats['failed_requests'] += 1
                self.stats['response_times'].append(elapsed)
                self.stats['errors'][type(e).__name__] += 1

    async def run_step(self, rps, duration):
        interval = 1.0 / rps
        tasks = []
        async with aiohttp.ClientSession() as session:
            start_time = time.time()
            while time.time() - start_time < duration:
                tasks.append(asyncio.create_task(self.make_request(session)))
                await asyncio.sleep(interval)
            await asyncio.gather(*tasks)

    async def run_gradual_load_test(self, start_rps=10, end_rps=5000, step_rps=50, step_duration=10):
        print(f"\n{'='*80}")
        print(f"BẮT ĐẦU ASYNC LOAD TEST - {start_rps} → {end_rps} req/s")
        print(f"Bước tăng: {step_rps} req/s, Thời gian mỗi mức: {step_duration}s")
        print(f"{'='*80}\n")

        current_rps = start_rps
        while current_rps <= end_rps:
            step_start = time.time()
            requests_before = self.stats['total_requests']
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Test mức: {current_rps} req/s")
            await self.run_step(current_rps, step_duration)

            step_requests = self.stats['total_requests'] - requests_before
            actual_rps = step_requests / step_duration if step_duration > 0 else 0
            recent_times = self.stats['response_times'][-step_requests:] if step_requests > 0 else []
            avg_resp = statistics.mean(recent_times) if recent_times else 0
            med_resp = statistics.median(recent_times) if recent_times else 0
            p95 = self._percentile(recent_times,95) if recent_times else 0
            p99 = self._percentile(recent_times,99) if recent_times else 0

            print(f"  ✓ Requests: {step_requests}, Actual RPS: {actual_rps:.2f}")
            print(f"  ✓ Response time - Avg: {avg_resp:.2f}ms, Median: {med_resp:.2f}ms, P95: {p95:.2f}ms, P99: {p99:.2f}ms")
            current_rps += step_rps
            await asyncio.sleep(1)

        self.print_final_stats()

    def _percentile(self, data, percentile):
        if not data:
            return 0
        sorted_data = sorted(data)
        idx = int(len(sorted_data) * percentile / 100)
        return sorted_data[min(idx,len(sorted_data)-1)]

    def print_final_stats(self):
        print(f"\n{'='*80}")
        print("FINAL STATS")
        print(f"Tổng requests: {self.stats['total_requests']}")
        print(f"Thành công: {self.stats['successful_requests']}, Thất bại: {self.stats['failed_requests']}")
        if self.stats['response_times']:
            print(f"Response time - Min: {min(self.stats['response_times']):.2f}ms, Max: {max(self.stats['response_times']):.2f}ms, Avg: {statistics.mean(self.stats['response_times']):.2f}ms")
        if self.stats['errors']:
            print("Errors:")
            for k,v in self.stats['errors'].items():
                print(f"  {k}: {v}")
        print(f"{'='*80}\n")

async def main():
    BASE_URL = "http://api-testdangkyhoc.vnu.edu.vn"
    LOGIN_ENDPOINT = "/api/credentials/login"
    TEST_DATA = {"student_code":"SV001","password":"matkhau1"}

    tester = AsyncLoadTester(BASE_URL, LOGIN_ENDPOINT, TEST_DATA)
    await tester.run_gradual_load_test(start_rps=10, end_rps=5000, step_rps=500, step_duration=5)

if __name__ == "__main__":
    asyncio.run(main())
