import RPi.GPIO as GPIO
import config 
import time

class ButtonController():
    def __init__(self):
        self._buffer = []
        self._matrix = [[1,2,3],[4,5,6],[7,8,9],['*',0,'#']]  
        self._is_enable = False
        self._star_task = None
        self._password_correct_task = None
        self._password = [5,6,7,8]

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self,new_password):
        self._password = new_password
