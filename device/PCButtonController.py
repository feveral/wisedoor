#import RPi.GPIO as GPIO
import config 
import time
from PasswordController import PasswordController 

class PCButtonController():
    def __init__(self):
        self._buffer = []
        self._matrix = [[1,2,3],[4,5,6],[7,8,9],['*',0,'#']]  
        self._is_enable = False
        self._star_task = None
        self._password_correct_task = None
        self._password_controller = PasswordController("feveraly@gmail.com", 5566, '家裡的門')
        self._buffer = [9,6,8,8,8] 

    @property
    def password_controller(self):
        return self._password_controller

    def _check_password(self):
        if (len(self._buffer) != len(self._password_controller.password)):
            return False
        for i in range(len(self._password_controller.password)):
            if (int(self._buffer[i]) != int(self._password_controller.password[i])):
                return False
        return True
                    