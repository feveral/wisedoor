from config import *
import RPi.GPIO as GPIO
import time
from Timer import Timer

class lock():
    def __init__(self):
        self._setup()
        self._timer = Timer()

    def _setup(self):
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(config.LOCK_PORT_PIN, GPIO.OUT)

    def open_door(self):
        GPIO.output(config.LOCK_PORT_PIN, 0)
        self._timer.start_timing()
        while self._timer.get_time_count() <= 5:
            pass
        GPIO.output(config.LOCK_PORT_PIN, 1)