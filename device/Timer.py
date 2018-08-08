import time

class Timer():
    def __init__(self):
        self._time_start = 0

    def start_timing(self):
        self._time_start = time.time()
        
    def get_time_count(self):
        return time.time() - self._time_start
        