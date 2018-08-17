# from CheckFaceService import CheckFaceService
#from Lock import Lock
#from ButtonController import ButtonController 
from TaskManager import TaskManager
from PasswordController import  PasswordController


#lock = Lock()
#buttonController = ButtonController()

PasswordController = PasswordController("feveraly@gmail.com", 5566, '家裡的門')
#checkFaceService = CheckFaceService()
#checkFaceService.check_success_task = lock.open_door


taskManager = TaskManager()
#taskManager.add_task(checkFaceService.model.update,2)
taskManager.add_task(PasswordController.update,3)
#taskManager.add_task(checkFaceService.camera.CatchImage,0.1)


#buttonController.star_task = checkFaceService.start_check 
#buttonController.password_correct_task = lock.open_door
#buttonController.enable()

'''
def check_success():
    pass


checkFaceService = CheckFaceService()
checkFaceService.check_success_task = check_success
while True:
    input('press to check')
    checkFaceService.start_check()
'''
