import os
from FacenetAlignSingle import CutPicture

for file in os.listdir("./utility/unknownRaw"):
    if file.endswith(".jpg") or file.endswith(".PNG"):
        print(os.path.join("./utility/unknownRaw", file))
        cut = CutPicture(str(os.path.join("./utility/unknownRaw", file)),"./utility","new")
    