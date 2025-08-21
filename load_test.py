#!/usr/bin/env python3
"""
Kubernetes Load Testing Script
Generates heavy HTTP load to trigger pod autoscaling
"""

import requests
import threading
import time
import signal
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
import random

class LoadTester:
    def __init__(self, target_url, max_workers=100, request_timeout=10):
        self.target_url = target_url.rstrip('/')
        self.max_workers = max_workers
        self.request_timeout = request_timeout
        self.running = True
        self.total_requests = 0
        self.successful_requests = 0
        self.failed_requests = 0
        self.session = requests.Session()
        
        # Configure session for better performance
        adapter = requests.adapters.HTTPAdapter(
            pool_connections=50,
            pool_maxsize=50,
            max_retries=0
        )
        self.session.mount('http://', adapter)
        self.session.mount('https://', adapter)
        
        # Setup signal handler for graceful shutdown
        signal.signal(signal.SIGINT, self.signal_handler)
        signal.signal(signal.SIGTERM, self.signal_handler)

    def signal_handler(self, signum, frame):
        print(f"\n[{datetime.now().strftime('%H:%M:%S')}] Received signal {signum}, shutting down...")
        self.running = False

    def make_request(self, worker_id):
        """Make a single HTTP request with various patterns to simulate real load"""
        try:
            # Vary the request patterns to create realistic load
            endpoints = ['/', '/health', '/api/data', '/status', '/metrics']
            endpoint = random.choice(endpoints)
            url = f"{self.target_url}{endpoint}"
            
            # Add some variety in request types
            if random.random() < 0.8:  # 80% GET requests
                response = self.session.get(
                    url, 
                    timeout=self.request_timeout,
                    headers={'User-Agent': f'LoadTester-Worker-{worker_id}'}
                )
            else:  # 20% POST requests with small payload
                data = {'worker': worker_id, 'timestamp': time.time(), 'data': 'x' * 100}
                response = self.session.post(
                    url, 
                    json=data,
                    timeout=self.request_timeout,
                    headers={'User-Agent': f'LoadTester-Worker-{worker_id}'}
                )
            
            self.successful_requests += 1
            return True, response.status_code, len(response.content)
            
        except requests.exceptions.RequestException as e:
            self.failed_requests += 1
            return False, str(e), 0
        except Exception as e:
            self.failed_requests += 1
            return False, f"Unexpected error: {str(e)}", 0

    def worker(self, worker_id):
        """Worker thread that continuously makes requests"""
        requests_made = 0
        
        while self.running:
            success, status, size = self.make_request(worker_id)
            requests_made += 1
            self.total_requests += 1
            
            # Small delay to prevent overwhelming the system too quickly
            # but still create significant load
            time.sleep(0.01)  # 10ms delay = ~100 requests/second per worker
            
            # Log progress every 50 requests per worker
            if requests_made % 50 == 0:
                status_msg = f"Worker {worker_id:02d}: {requests_made:4d} requests"
                if success:
                    status_msg += f" | Last: HTTP {status} ({size} bytes)"
                else:
                    status_msg += f" | Last: FAILED - {status}"
                print(f"[{datetime.now().strftime('%H:%M:%S')}] {status_msg}")

    def run_load_test(self, duration_seconds=300):
        """Run the load test for specified duration"""
        print(f"🚀 Starting load test against: {self.target_url}")
        print(f"📊 Configuration:")
        print(f"   - Workers: {self.max_workers}")
        print(f"   - Duration: {duration_seconds} seconds")
        print(f"   - Timeout: {self.request_timeout} seconds")
        print(f"   - Expected RPS: ~{self.max_workers * 100}")
        print("=" * 60)
        
        start_time = time.time()
        
        # Start worker threads
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Submit workers
            futures = [executor.submit(self.worker, i) for i in range(self.max_workers)]
            
            # Monitor progress
            try:
                while self.running and (time.time() - start_time) < duration_seconds:
                    time.sleep(10)  # Print stats every 10 seconds
                    elapsed = time.time() - start_time
                    rps = self.total_requests / elapsed if elapsed > 0 else 0
                    
                    print(f"\n📈 STATS at {elapsed:.0f}s:")
                    print(f"   Total Requests: {self.total_requests:,}")
                    print(f"   Successful: {self.successful_requests:,}")
                    print(f"   Failed: {self.failed_requests:,}")
                    print(f"   Current RPS: {rps:.1f}")
                    print(f"   Success Rate: {(self.successful_requests/self.total_requests*100):.1f}%" if self.total_requests > 0 else "   Success Rate: 0%")
                    print("-" * 40)
                    
            except KeyboardInterrupt:
                print(f"\n[{datetime.now().strftime('%H:%M:%S')}] Interrupted by user")
            finally:
                self.running = False
                
        # Final statistics
        total_time = time.time() - start_time
        avg_rps = self.total_requests / total_time if total_time > 0 else 0
        
        print(f"\n🏁 FINAL RESULTS:")
        print("=" * 60)
        print(f"Duration: {total_time:.1f} seconds")
        print(f"Total Requests: {self.total_requests:,}")
        print(f"Successful: {self.successful_requests:,}")
        print(f"Failed: {self.failed_requests:,}")
        print(f"Average RPS: {avg_rps:.1f}")
        print(f"Success Rate: {(self.successful_requests/self.total_requests*100):.1f}%" if self.total_requests > 0 else "Success Rate: 0%")
        
        if self.failed_requests > 0:
            print(f"\n⚠️  Note: {self.failed_requests} requests failed - this might indicate the system is under stress")
            print("   This is expected behavior when testing autoscaling!")

def main():
    # Configuration
    TARGET_URL = "http://34.46.21.234/"
    MAX_WORKERS = 150  # Aggressive load - adjust based on your needs
    DURATION = 300     # 5 minutes
    TIMEOUT = 10       # Request timeout
    
    print("🔥 Kubernetes Pod Autoscaling Load Tester")
    print("=" * 60)
    
    # Create and run load tester
    tester = LoadTester(
        target_url=TARGET_URL,
        max_workers=MAX_WORKERS,
        request_timeout=TIMEOUT
    )
    
    try:
        tester.run_load_test(duration_seconds=DURATION)
    except Exception as e:
        print(f"❌ Error during load test: {e}")
        sys.exit(1)
    
    print("\n✅ Load test completed!")
    print("💡 Check your Kubernetes cluster for pod scaling:")
    print("   kubectl get pods -w")
    print("   kubectl get hpa")

if __name__ == "__main__":
    main()