const staticVar = require("../../package.json");
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
CheckMinPriceOrder = (sum,menu)=>
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
checkOpenCloseStore=(menu)=>{
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




/////Return öffnet um 12:21 or öffnet Mittwock um 12:32
NextOpenTimeMsg=(menu)=>{
if(process.browser)
    {

        var TimeN = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
        const listday=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
        const listdayD=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]
        const day = listday[TimeN.getDay()]      
      const checkIfTimeisBeforeOpenTime=()=>{
        for(var daydd in menu["staticValue"]["opendays"])
        if(day == daydd)
        {
          var openTime = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),menu["staticValue"]["opendays"][daydd]["opentime"]["hour"],menu["staticValue"]["opendays"][daydd]["opentime"]["min"],0);    
          if(openTime > TimeN) 
          {
                console.log(openTime)
              return "öffnet um "+this.getStringFormTimefromTimeStamp(openTime)
          }     
        }
        return ""
      }
      const getNextDayOpen=()=>{
        var DayFound = false
        var addeddays = 0
        for(var d=0;d<listday.length;d++)
        {            
            if(DayFound)        
            {
                addeddays = addeddays+1
                if(listday[d] in menu["staticValue"]["opendays"]) 
                {
                    var h = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),menu["staticValue"]["opendays"][listday[d]]["opentime"]["hour"],menu["staticValue"]["opendays"][listday[d]]["opentime"]["min"],0)
                    h.setDate(h.getDate() + addeddays);
                    return h
                }           
            }      


            if(day==listday[d])
            DayFound=true            
            if(listday.length==(d+1))
            d=0
        }
        return ""
      }
       var out = checkIfTimeisBeforeOpenTime()

       if(out==="")
       {
        var datee = getNextDayOpen()
        console.log(datee)
        if(datee !== "")
        {            
            var hjkl = listdayD[datee.getDay()]
            out = "öffnet am "+hjkl.substring(0,2)+" um "+this.getStringFormTimefromTimeStamp(datee)            
        }
       }


       return out
      }
      return ""
}
getStringOpenCloseTimeStore=(type)=>
{
    return menu["staticValue"][type]["hour"]+":"+
    (menu["staticValue"][type]["min"]<=9?"0"+menu["staticValue"][type]["min"]:menu["staticValue"][type]["min"])
}
getStringFormTimefromTimeStamp=(t)=>
{
    return (t.getHours()<=9?"0"+t.getHours():t.getHours())+":"+
    (t.getMinutes()<=9?"0"+t.getMinutes():t.getMinutes())
}
getDateBerlin=()=>{
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' }))   
}
}

const f= new langswitch()
export default f