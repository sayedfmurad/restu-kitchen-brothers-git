import sys
from main.pythonfiles import IsDev
from main.pythonfiles import staticvalues


if sys.argv[1] == "dev":
    IsDev.main(sys.argv)
elif sys.argv[1] == "list":
    for mm in staticvalues.restus["objs"]:
        print(mm["name"])

