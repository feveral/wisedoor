from CheckFaceService import CheckFaceService
from Lock import Lock
from ButtonController import ButtonController 

lock = Lock()
buttonController = ButtonController()

checkFaceService = CheckFaceService()
checkFaceService.check_success_task = lock.open_door

buttonController.star_task = checkFaceService.start_check 
buttonController.enable()

'''
def check_success():
    pass


checkFaceService = CheckFaceService()
checkFaceService.check_success_task = check_success
while True:
    input('press to check')
    checkFaceService.start_check()
'''