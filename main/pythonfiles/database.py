import json
def loadsf():
    with open('./main/pythonfiles/data.json', encoding='utf-8') as fh:
        return json.load(fh)
d = loadsf()
for g in d["product"]:
    if "options" in d["product"][g]:
        if type(d["product"][g]['options']) == list:
            b = list(d["product"][g]['options'])
            d["product"][g]['options'] = {}
            for m in b:                
                d["product"][g]['options'][m["name"]]=m
print(json.dumps(d, ensure_ascii=False))
    