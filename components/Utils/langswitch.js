const staticVar = require("../../package.json");
import menu from "../../public/database/menu.json"
class langswitch{
IsOutt = staticVar.IsOut ? ".html":"";
RouteP = (pp,sub)=>{
    if(sub == undefined)
    sub = "";

    if(!pp.includes("?"))
    pp += "?";
    
    pp = pp.split("?");
    var ooo = sub+"./"+(pp[0] == "" ? (staticVar.IsOut?"index":pp[0]) : pp[0])+this.IsOutt;
    ooo += "?"+pp[1];
return  ooo;
}
CheckMinPriceOrder = (sum)=>
{
    const MyLang = f.langswitchs("cart");
    if(process.browser)
    {var addre=f.getJson("address");
    var seladdre=f.getValue("seladdress");
    if(addre[seladdre]!=undefined)
            {for(var g in menu["staticValue"]["minpriceorder"])
            if(addre[seladdre]["distance"] > menu["staticValue"]["minpriceorder"][g]["distance"]["min"] &&
               addre[seladdre]["distance"] < menu["staticValue"]["minpriceorder"][g]["distance"]["max"])
            if(f.stof(sum) < menu["staticValue"]["minpriceorder"][g]["price"])
            {
                alert(MyLang["min is price"]+menu["staticValue"]["minpriceorder"][g]["price"]+ " Euro");                                
                return false;
            }            
            }
            return true;
        }
}
langswitchs = (path) => {
            return require("../LangFiles/"+path+"/"+staticVar.lang+".json");
}
getJson = (m)=>{
    var or = window.localStorage.getItem(m)
        or= or==null||or==""?"{}":or
        return JSON.parse(or)
}
getValue = (m)=>{
    var or = window.localStorage.getItem(m)
        or= or==null||or==""?"":or
        return or
}
getNum = (m)=>{
    var or = window.localStorage.getItem(m)
        or= or==null||or==""?0:or
        return or
}
stof = (f)=>{
    f = f==null?"0,00":f;
    return parseFloat(f.replace(",","."));
}
ftos = (s)=>{    
    s = s.toFixed(2)
    return s.replace(".",",");
}
firstUpper =(s)=>
{
    return s.charAt(0).toUpperCase() + s.slice(1);
}
ClearAllData = ()=>
{
    window.localStorage.clear()
}
checkOpenCloseStore=()=>{
    if(process.browser)
    {
      var TimeN = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
      const day = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][TimeN.getDay()]      
      for(var daydd in menu["staticValue"]["opendays"])
      if(day == daydd)
      {
        var openTime = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),menu["staticValue"]["opendays"][daydd]["opentime"]["hour"],menu["staticValue"]["opendays"][daydd]["opentime"]["min"],0);    
        var closeTime = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),menu["staticValue"]["opendays"][daydd]["closetime"]["hour"],menu["staticValue"]["opendays"][daydd]["closetime"]["min"],0);    
      if(closeTime > TimeN && openTime < TimeN)      
        return true;    

      }
 return false;    
}
}
getStringOpenCloseTimeStore=(type)=>
{
    return menu["staticValue"][type]["hour"]+":"+
    (menu["staticValue"][type]["min"]<=9?"0"+menu["staticValue"][type]["min"]:menu["staticValue"][type]["min"])
}
getDateBerlin=()=>{
    return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }))   
}
}

const f= new langswitch()
export default f