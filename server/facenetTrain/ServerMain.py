from FacenetAlignSingle import *
from Train import *
cutPicture = CutPicture('./image/raw/test/tom/517ec57bf6bbdadd3456eafaa256ae.png', "./image/cut/test","align")

train = Train("./facenetTrain/image/cut","./facenetTrain/models/tom2.pkl")

import requests
reply = requests.get("http://localhost/api/run/modelFinish")
print(reply.content)