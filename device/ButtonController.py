import RPi.GPIO as GPIO


class ButtonController():
    def __init__(self):
        self._setup()
        self._buffer = []
        self._matrix = [[1,2,3],[4,5,6],[7,8,9],['*',0,'#']]  
        self._is_enable = False
        self._star_task = None
        self._password_correct_task = None
        self._password = [5,6,7,8]

    def _setup(self):
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(ROW[0], GPIO.IN, pull_up_down=GPIO.PUD_UP)
        GPIO.setup(ROW[1], GPIO.IN, pull_up_down=GPIO.PUD_UP)
        GPIO.setup(ROW[2], GPIO.IN, pull_up_down=GPIO.PUD_UP)
        GPIO.setup(ROW[3], GPIO.IN, pull_up_down=GPIO.PUD_UP)
        GPIO.setup(COL[0], GPIO.OUT)
        GPIO.setup(COL[1], GPIO.OUT)
        GPIO.setup(COL[2], GPIO.OUT)

    def _destroy(self):
        GPIO.cleanup()

    def _detect(self):
        GPIO.output(COL[0],1)
        GPIO.output(COL[1],1)
        GPIO.output(COL[2],1)

        while self.is_enable:
            for indexC,c in enumerate(COL):
                GPIO.ouptut(c,0)
                for indexR,r in enumerate(ROW):
                    if (GPIO.input(r) == 0):
                        self._buffer.append(self._matrix[indexR][indexC])      
                        while GPIO.input(r) == 0:
                            pass
    def enable(self):
        self._is_enable = True
        self._detect()

    def disable(self):
        self._is_enable = False
    
    @property
    def star_task(self,task):
        self._star_task = task

    @property
    def password_correct_task(self,task):
        self._password_correct_task = task

    def _check_password(self):
        if (len(self._buffer) != len(self._password) + 1):
            return False
        for i in range(len(self._password)):
            if (self._buffer[i] != self._password[i]):
                return False
        return True
                    
    def process_buffer(self):
        if(self._buffer[-1] == "*"):
            self.disable()
            self._star_task()
        elif(self._buffer[-1] == "#"):
            self._check_password()
            self._password_correct_task()
        self._buffer = []
