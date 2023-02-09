import os
from urllib.request import urlopen
import subprocess
url = "https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws/?GetSmsMsgs=15751984634"
def getData():
    f = urlopen(url)
    myfile = f.read()
    myfile = myfile.decode("utf-8")
    myfile = myfile.split(":")        
    return myfile
def GetMsg(key,Time):
    return "Sehr geehrte kunden und Kundinnen. Ihre Bestellung kommt in "+Time+" Minuten zu Ihnen. Herzlichen Dank für ihre Bestellung bei "+key
def HandleSms(key,Num,Time):
    msg = GetMsg(key,Time)
    msg = "'"+msg+"'"
    shh = 'adb shell service call isms 7 i32 0 s16 "com.android.mms.service" s16 "'+str(Num)+'" s16 "null" s16 "'+str(msg)+'"  s16 "null" s16 "null"'
    try:
        output = subprocess.check_output(shh, shell=True)    
    except:
        print("Not Sent SMS")
def SendSMS(g):
    for gg in g:        
        gg = gg.split("~")         
        HandleSms(gg[0],gg[1],gg[2])

obj = getData()
obj = obj[1:]
if len(obj) >= 1:
    SendSMS(obj)
else:
    print("No Data")