from FacenetAlign import *
from Train import *
cutPicture = CutPicture("./facenetTrain/image/originImage", "./facenetTrain/image/cut")
train = Train("./facenetTrain/image/cut","./facenetTrain/models/tom2.pkl")

import requests
reply = requests.get("http://localhost/api/run/modelFinish")
print(reply.content)