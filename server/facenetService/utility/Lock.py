from Config import Config
import RPi.GPIO as GPIO
import time

class lock():
    def __init__(self):
        self.setup()

    def setup(self):
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(Config.lock_port_pin, GPIO.OUT)

    def close_door(self):
        start = time.time()
        while(time.time() - start <= Config.lock_time_count)
            pass
        GPIO.output(Config.lock_port_pin, 0)
