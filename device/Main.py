from CheckFaceService import CheckFaceService
from Lock import Lock
from ButtonController import ButtonController 
from TaskManager import taskManager
from PasswordController import  PasswordController
#from PCButtonController import PCButtonController 
from HistoryController import HistoryController
from BulbController import bulbController
import config

historyController = HistoryController(config.USER_EMAIL, config.USER_PASSWORD, config.EQUIPMENT_NAME)
lock = Lock()
buttonController = ButtonController()

PasswordController = PasswordController()
checkFaceService = CheckFaceService()
checkFaceService.check_success_task = lock.open_door
checkFaceService.record_task = historyController.AddRecord

taskManager.add_task(checkFaceService.model.update,2)
taskManager.add_task(buttonController.password_controller.update,3)
taskManager.add_task(checkFaceService.camera.CatchImage,0.1)

buttonController.star_task = checkFaceService.start_check 
buttonController.password_correct_task = lock.open_door
buttonController.add_record_task = historyController.AddRecord
buttonController.camera = checkFaceService.camera
buttonController.enable()


