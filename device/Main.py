#from CheckFaceService import CheckFaceService
#from Lock import Lock


#lock = Lock()


#checkFaceService = CheckFaceService()
#checkFaceService.start_check(lock.open_door)

from Camera import Camera
from blurr import is_blurr

camera = Camera(0)
frame = camera.CatchImage()
print(is_blurr(frame))

