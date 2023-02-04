import sys
from main.pythonfiles import DevAndPub
from main.pythonfiles import staticvalues


if sys.argv[1] == "list":
    for mm in staticvalues.restus["objs"]:
        print(mm)
else :
    DevAndPub.main(sys.argv)

