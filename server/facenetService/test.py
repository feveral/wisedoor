import os
import time
from utility.facenetAlign import CutPicture

cutPicture = CutPicture()
start = time.time()
cutPicture.align(os.getcwd() + '/image/raw/2bfd589961a1846b96cbe5ed46206a32/6f63284624f11dce566ef726205727a2.png' , os.getcwd() + '/cutTest', '2bfd589961a1846b96cbe5ed46206a32')
print(start-time.time())
