import json,shutil,os
restus = {
    "objs":{"kitchenbrothers":
      {
        "s3":"kitchenbrothers",
        "cloud":"E1KSPCHH6VV7WO"
      },
      "westendgrillundpizza":
      {
        "s3":"restu",
        "cloud":"EW42NP988OU7X"
      },
      "pizzeriavalentina":
      {
        "s3":"pizzeriavalentina",
        "cloud":"EW42NP988OU7X"
      }
    }
    
  }
package = {    
  "name": "restu-kitchen-brothers",
  "version": "0.1.0",
  "private": True,
  "dependencies": {
    "next": "11.1.2",
    "react": "17.0.2",
    "react-dom": "17.0.2",
  },
  "scripts": {
    "dev": "next dev",
    "build": "yarn config-static && next build && next export  ",
    "start": "next start",      
    "cloud":"",
    "config-static": "node -e \"let pkg=require('./package.json'); pkg.IsOut=true; require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));\"",
    "db": "aws s3 sync ./public/database/ s3://angebote-restu/database/ --profile my"    
  },  
  "lang": "de-de",
  "IsOut": False
}


def StartMakeSaveKeyPage(name):
    shutil.copy("./main/pages/savekey.js","./pages/"+str(name)+".js")
def getObjj():
    folder_path = "./public/database"  
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path):
            objj = filename.split(".")[0]
            StartMakeSaveKeyPage(objj)

def dev():
    package["IsOut"]=False
    package["scripts"]["pub"]="yarn build && aws s3 sync ./out/ s3://angebote-restu --profile my"
    with open('package.json', 'w') as outfile:
        json.dump(package, outfile)
    getObjj()    
    
    # shutil.copy("./main/database/"+str(key)+".menu.json","public/database/menu.json")

def main(args):
    if args[1] == "list":
        for mm in restus["objs"]:
            print(mm)
    elif args[1] == "dev":
        dev()
        os.system("yarn dev")
    