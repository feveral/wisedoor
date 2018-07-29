import os
from FacenetAlignSingle import CutPicture

for file in os.listdir("./utility/unknown"):
    if file.endswith(".jpg"):
        print(os.path.join("./utility/unknown", file))
        cut = CutPicture(str(os.path.join("./utility/unknown", file)),"./utility/align/unknownAlign")
    