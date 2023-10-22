import json,shutil,os


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
    with open('package.json', 'r+',encoding='utf-8') as f:
      package = json.load(f)
      package["IsOut"]=False
      f.seek(0)
      json.dump(package, f, ensure_ascii=False, indent=4)
      f.truncate()

    # getObjj()    
    
    # shutil.copy("./main/database/"+str(key)+".menu.json","public/database/menu.json")

import hashlib
restuses={}
def PrepairDB2_Old(folder_path,filename):
    objj = filename.split(".")[0]  
    with open(folder_path+"/"+ filename, 'r+',encoding='utf-8') as f:
      data = json.load(f)  

      # Convert the dictionary to a JSON string
      json_string = json.dumps(data, sort_keys=True)

      # Create a new SHA-256 hash object
      sha256 = hashlib.sha256()

      # Update the hash object with the JSON string
      sha256.update(json_string.encode('utf-8'))

      # Get the hex representation of the hash
      hash_string = sha256.hexdigest()

      data["v"]=hash_string
      # Move the file pointer back to the beginning of the file
      f.seek(0)

      # Write the updated data back to the file
      json.dump(data, f, ensure_ascii=False, indent=4)

      # Truncate any remaining data in the file
      f.truncate()

      restuses[objj]={
          "key":objj,
          "name":data["staticValue"]["kontakt"]["name"],
          "v":hash_string
      }
    with open("./public/restus.json", 'r+',encoding='utf-8') as f:
        # Write the dictionary to the file as JSON data
        json.dump(restuses, f, ensure_ascii=False, indent=4)

def PrepairDB3(data):
    for m in data["product"]:
        if "options" in data["product"][m]:            
            for j in data["product"][m]["options"]:
                if j != data["product"][m]["options"][j]["name"]:
                    raise   ValueError(data["staticValue"]["key"],"   Nr ",m,"  Error Option Matching")
    try:
        data["b"]["c"]
        data["staticValue"]["printer"]["style"]
        data["staticValue"]["printer"]["style"]["font-table"]
        data["staticValue"]["printer"]["style"]["font-table-detail"]
        data["staticValue"]["printer"]["style"]["print-version"]
    except Exception as ee:
        raise ValueError(data["staticValue"]["key"],ee)
def PrepairDB2(folder_path,filename):
    objj = filename.split(".")[0]  
    with open(folder_path+"/"+ filename, 'r+',encoding='utf-8') as f:
      data = json.load(f)  
      PrepairDB3(data)
      
    #   # Move the file pointer back to the beginning of the file
    #   f.seek(0)

    #   # Write the updated data back to the file
    #   json.dump(data, f, ensure_ascii=False, indent=4)

    #   # Truncate any remaining data in the file
    #   f.truncate()

    # with open("./public/restus.json", 'r+',encoding='utf-8') as f:
    #     # Write the dictionary to the file as JSON data
    #     json.dump(restuses, f, ensure_ascii=False, indent=4)
def PrepairDB():
    folder_path = "./public/database"  
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path):            
            PrepairDB2(folder_path, filename)


import subprocess
import re
def KillProcess():
  # Run the command and capture the output
  command = ['lsof', '-i', 'tcp:3000']
  output = subprocess.check_output(command)

  # Decode the output from bytes to string
  output = output.decode('utf-8')

  # Use regular expressions to find the PID
  pid_pattern = re.compile(r'\b(\d+)\b')
  pid_match = pid_pattern.search(output)

  if pid_match:
      pid = pid_match.group(0)
      print(f"PID: {pid}")
      kill_command = ['kill', '-9', pid]
      subprocess.run(kill_command)
      print("Process terminated.")
  else:
      print("No process found with the specified port.")



def main(args):
    if args[1] == "dev":
        dev()
    elif args[1] == "kill":
        KillProcess()
    elif args[1] == "prepairdb":
        PrepairDB()
    