import RPi.GPIO as GPIO
import time

LED_PIN_YELLOW = 26
LED_PIN_GREEN = 32
LED_PIN_RED = 31
class BulbControl():
    def __init__(self):
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(LED_PIN_YELLOW,GPIO.OUT)
        GPIO.setup(LED_PIN_GREEN,GPIO.OUT)
        GPIO.setup(LED_PIN_RED,GPIO.OUT)
    def setYellowBulbClose(self):
        GPIO.output(LED_PIN_YELLOW,0)

    def setYellowBulbOpen(self):
        GPIO.output(LED_PIN_YELLOW,1)

    def setRedBulbOpen(self):
        GPIO.output(LED_PIN_RED,1)

    def setRedBulbClose(self):
        GPIO.output(LED_PIN_RED,0)

    def setGreenBulbOpen(self):
        GPIO.output(LED_PIN_GREEN,1)

    def setGreenBulbClose(self):
        GPIO.output(LED_PIN_GREEN,0)

    def __exit__(self,exc_type,exc_value,traceback):
        GPIO.cleanup()


bulb = BulbControl()
bulb.setGreenBulbOpen()
bulb.setYellowBulbOpen()
