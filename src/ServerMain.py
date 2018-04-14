from FacenetAlign import *
from Train import *
cutPicture = CutPicture("./image/originImage", "./image/cut")
train = Train("./image/cut","./../models/tom.pkl")