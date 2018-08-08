import RPi.GPIO as GPIO
import time

MATRIX = [ [1,2,3,'A'],
           [4,5,6,'B'],
           [7,8,9,'C'],
           ['*',0,'#','D'] ]

ROW = [8,10,12,16]
COL = [18,22,24,26]

def setup():
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(ROW[0], GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(ROW[1], GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(ROW[2], GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(ROW[3], GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(COL[0], GPIO.OUT)
    GPIO.setup(COL[1], GPIO.OUT)
    GPIO.setup(COL[2], GPIO.OUT)
    GPIO.setup(COL[3], GPIO.OUT)
    
def destroy():
    print('cleanup')
    GPIO.cleanup()

def falling_callback(pin):
    
    print('pin',pin,'pressed')

def loop():
    GPIO.output(COL[0],1)
    GPIO.output(COL[1],1)
    GPIO.output(COL[2],1)
    GPIO.output(COL[3],1)
    
    while True:
        for indexC,c in enumerate(COL):
            GPIO.output(c,0)
            for indexR,r in enumerate(ROW):
                if (GPIO.input(r) == 0):
                    print(MATRIX[indexR][indexC])
                    while GPIO.input(r) == 0:
                        pass
            GPIO.output(c,1)

if __name__ == '__main__':
    setup()
    try:
        loop()
    except KeyboardInterrupt:
        destroy()
