import json

def stof(v):
    if type(v) == str:
        v = v.replace(",",".")        
        v= float(v)
    if type(v) == int:
        v=  float(v)
    return v
def ftos(v):
    if type(v) == int:
        v = float(v)
    if type(v) == float:
        round(v,2)
        v = str(v)
        v = v.replace('.',',')
        if len(v.split(",")[1]) == 1:
            v+='0'

    return str(v)


json_file_path = './public/database/kitchen-brothers.json'
# Open and read the JSON file
with open(json_file_path, 'r') as file:
    g = set()
    data = json.load(file)    
    for n in data["product"]:
        if data["product"][n]["section"] == "PIZZABRÖTCHEN":
            for m in data["product"][n]["price"]:
                data["product"][n]["price"][m] = stof(data["product"][n]["price"][m])
                data["product"][n]["price"][m] += 0.5
                data["product"][n]["price"][m] = ftos(data["product"][n]["price"][m])

# Write to the JSON file with utf-8 encoding                
with open(json_file_path, 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

