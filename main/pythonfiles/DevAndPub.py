from main.pythonfiles import IsDev
import shutil
def controller(key):
    shutil.copy("./main/pages/"+str(key)+".aboutus.js","pages/aboutus.js")    
    shutil.copy("./main/pages/"+str(key)+".zusatzstoffe.js","pages/zusatzstoffe.js")    
    shutil.copy("./main/public/html/"+str(key)+".policyprivacyweb.html","public/html/policyprivacyweb.html")    
def main(argv):
    key = argv[2]    
    controller(key)
    if argv[1] == "dev":    
         IsDev.main(argv)