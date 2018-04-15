
import numpy as np
import cv2
import os
import sys
import argparse
from utility import *


def main(args):
    saveDirName = '../image/raw/';
    cap = cv2.VideoCapture(1)
    while(True):

        # Capture frame-by-frame
        ret, frame = cap.read()

        # Our operations on the frame come here
        # gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Display the resulting frame
        cv2.imshow('frame',frame)

        if cv2.waitKey(1) & 0xFF == ord('c'):
            createFolder(saveDirName + args.name)
            saveImage(saveDirName + args.name + '/' + getRandomFileName('png'),frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # When everything done, release the capture
    cap.release()
    cv2.destroyAllWindows()

def parse_arguments(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument('name', type=str)
    return parser.parse_args(argv)

if __name__ == '__main__':
    main(parse_arguments(sys.argv[1:]))
