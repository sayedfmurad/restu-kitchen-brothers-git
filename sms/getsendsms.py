from urllib.request import urlopen
url = "https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws/?GetSmsMsgs=15751984634"
def getData():
    f = urlopen(url)
    myfile = f.read()
    myfile = myfile.decode("utf-8")
    myfile = myfile.split(":") 
    return myfile

def HandleSms(key,Num,Time):
    pass
def SendSMS(g):
    for gg in g:
        if g != "":
            gg = gg.split("~")
            HandleSms(gg[0],gg[1],gg[2])

obj = getData()
SendSMS(obj)