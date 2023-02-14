from main.pythonfiles import staticvalues
import json,shutil
def main(args):
    key = args[2]
    package = staticvalues.package
    objj = staticvalues.restus["objs"][key]
    package["IsOut"]=False
    package["scripts"]["pub"]="yarn build && aws s3 sync ./out/ s3://"+str(objj["s3"])+" --profile my"
    package["scripts"]["cloud"]=' aws cloudfront create-invalidation --distribution-id '+str(objj["cloud"])+' --paths "/*" --profile my'
    # json_string = json.dumps(package)
    with open('package.json', 'w') as outfile:
        json.dump(package, outfile)

    shutil.copy("./main/database/"+str(key)+".menu.json","public/database/menu.json")
    