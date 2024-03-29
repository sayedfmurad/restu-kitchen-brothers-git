
const staticVar = require("../../package.json");
class langswitch{
IsOutt = staticVar.IsOut ? ".html":"";

ChangeGetParameters=(value)=>{

    var url = new URL(window.location.href);    

    // Create a new URL with the updated search params
    var newUrl = window.location.origin + window.location.pathname + '#'+value ;

    // Modify the browser URL without reloading the page
    history.pushState({ path: newUrl }, '', newUrl);
}
 scrollToElement(elementId,marginTop=0) {
    const element = document.getElementById(elementId);
  
    if (element) {
        // Get the target element's position relative to the document
        const elementRect = element.getBoundingClientRect();
  
        // Scroll to the element instantly without animation
        window.scrollTo({
            left: elementRect.left + window.scrollX,
            top: elementRect.top + window.scrollY-marginTop,
            behavior: 'instant' // 'auto' or 'instant' will work here
        });
    }
  }

GetJsonM=(m)=>{
    return new Promise((resolve, reject) => {
        var or = window.localStorage.getItem(m)
          or= or==null||or==""?"{}":or
          resolve(JSON.parse(or))
    });
}
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
    var addre=f.getJson("address");
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
    if(typeof f == "number")
    return f
    f = f==null?"0,00":f;
    return parseFloat(f.replace(",","."));
}
ftos = (s)=>{    
    s = s.toFixed(2)
    return s.replace(".",",");
}
firstUpper =(s)=>
{
    try {        
        return s.charAt(0).toUpperCase() + s.slice(1);
    } catch (error) {
        return s
    }
}
ClearAllData = ()=>
{
    window.localStorage.clear()
}
checkOpenCloseStoreV2=(menu)=>{
    if(process.browser)
    {
        var TimeN = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
        const day = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][TimeN.getDay()]      
        for(var sections in menu["staticValue"]["opendaysV2"])
        {
        if(menu["staticValue"]["opendaysV2"][sections]["days"].includes(day))
        for( var time in menu["staticValue"]["opendaysV2"][sections]["times"])
        {
            let daydd = menu["staticValue"]["opendaysV2"][sections]["times"][time]
            var openTime = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),daydd["opentime"]["hour"],daydd["opentime"]["min"],0);    
            var closeTime = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),daydd["closetime"]["hour"],daydd["closetime"]["min"],0);    
            if(closeTime > TimeN && openTime < TimeN)      
            return true;    
        }
      }    
 return false;    
}
}
checkOpenCloseStore=(menu)=>{
    if(process.browser)
    {
        if("opendaysV2" in menu["staticValue"])
        return this.checkOpenCloseStoreV2(menu)

      var TimeN = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
      const day = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][TimeN.getDay()]      
      
      for(var daydd in menu["staticValue"]["opendays"])
      if(day == daydd)
      {        
        if(Array.isArray(menu["staticValue"]["opendays"][daydd]))
        {
            for(var k in menu["staticValue"]["opendays"][daydd])
            {
                var openTime = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),menu["staticValue"]["opendays"][daydd][k]["opentime"]["hour"],menu["staticValue"]["opendays"][daydd][k]["opentime"]["min"],0);    
                var closeTime = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),menu["staticValue"]["opendays"][daydd][k]["closetime"]["hour"],menu["staticValue"]["opendays"][daydd][k]["closetime"]["min"],0);    
                if(closeTime > TimeN && openTime < TimeN)      
                    return true;        
            }
        }else{
            var openTime = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),menu["staticValue"]["opendays"][daydd]["opentime"]["hour"],menu["staticValue"]["opendays"][daydd]["opentime"]["min"],0);    
            var closeTime = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),menu["staticValue"]["opendays"][daydd]["closetime"]["hour"],menu["staticValue"]["opendays"][daydd]["closetime"]["min"],0);    
          if(closeTime > TimeN && openTime < TimeN)      
            return true;    
        }    
      }
 return false;    
}
}




/////Return öffnet um 12:21 or öffnet Mittwock um 12:32
NextOpenTimeMsg=(menu)=>{
if(process.browser)
    {
        if("opendaysV2" in menu["staticValue"])
        return this.NextOpenTimeMsgV2(menu)

        var TimeN = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
        const listday=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
        const listdayD=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]
        const day = listday[TimeN.getDay()]      
      const checkIfTimeisBeforeOpenTime=()=>{
        for(var daydd in menu["staticValue"]["opendays"])
        if(day == daydd)
        {
        if(Array.isArray(menu["staticValue"]["opendays"][daydd]))
          {
            for(var g in menu["staticValue"]["opendays"][daydd])
            {
                var openTime = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),menu["staticValue"]["opendays"][daydd]["opentime"]["hour"],menu["staticValue"]["opendays"][daydd]["opentime"]["min"],0);    
                if(openTime > TimeN) 
                {
                    return "öffnet um "+this.getStringFormTimefromTimeStamp(openTime)+" Uhr"
                }
            }     
          }
          else{
            var openTime = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),menu["staticValue"]["opendays"][daydd]["opentime"]["hour"],menu["staticValue"]["opendays"][daydd]["opentime"]["min"],0);    
            if(openTime > TimeN) 
            {
                return "öffnet um "+this.getStringFormTimefromTimeStamp(openTime)+" Uhr"
            }     
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
        // console.log(datee)
        if(datee !== "")
        {            
            var hjkl = listdayD[datee.getDay()]
            out = "öffnet am "+hjkl.substring(0,2)+" um "+this.getStringFormTimefromTimeStamp(datee)+" Uhr"            
        }
       }


       return out
      }
      return ""
}
NextOpenTimeMsgV2=(menu)=>{   
    var TimeN = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
    const listday=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
    const listdayD=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]
    const day = listday[TimeN.getDay()]      
          const checkIfTimeisBeforeOpenTime=()=>{
            for(var sections in menu["staticValue"]["opendaysV2"])
            {
            if(menu["staticValue"]["opendaysV2"][sections]["days"].includes(day))
                for( var time in menu["staticValue"]["opendaysV2"][sections]["times"])
                {
                    let daydd = menu["staticValue"]["opendaysV2"][sections]["times"][time]
                    var openTime = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),daydd["opentime"]["hour"],daydd["opentime"]["min"],0);                        
                    if(openTime > TimeN) 
                    {
                        return "öffnet um "+this.getStringFormTimefromTimeStamp(openTime)+" Uhr"

                    }
                }
            }
           
            return ""
          }
          const getNextDayOpen=()=>{
            let listOpenDays = []
            for(let xmii in menu["staticValue"]["opendaysV2"])
            {
                listOpenDays = listOpenDays.concat(menu["staticValue"]["opendaysV2"][xmii]["days"])
            }
            while(!(listOpenDays.includes(listday[TimeN.getDay()])))
            TimeN.setDate(TimeN.getDate() + 1);
            
            for(let xmii in menu["staticValue"]["opendaysV2"])
            if(menu["staticValue"]["opendaysV2"][xmii]["days"].includes(listday[TimeN.getDay()]))
            {
                let daydd = menu["staticValue"]["opendaysV2"][xmii]["times"][0]
                var openTime = new Date(TimeN.getFullYear(),TimeN.getMonth(),TimeN.getDate(),daydd["opentime"]["hour"],daydd["opentime"]["min"],0);    
                return openTime
            }
            TimeN.setHours()
            return TimeN
          }
           var out = checkIfTimeisBeforeOpenTime()
    
           if(out==="")
           {
            var datee = getNextDayOpen()

            // console.log(datee)
            if(datee !== "")
            {            
                var hjkl = listdayD[datee.getDay()]
                out = "öffnet am "+hjkl.substring(0,2)+" um "+this.getStringFormTimefromTimeStamp(datee)+" Uhr"            
            }
           }
    
    
           return out
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
ReturnGetPar=()=>{
    var currentUrl = window.location.href;

// Parse the query parameters
return new URLSearchParams(new URL(currentUrl).search);

// Get the value associated with the key "name"
// var nameValue = urlParams.get("name");

}
}
export function RandomTimestamp () {
    let mId = new Date();
    return mId.getTime()+""
}
const f= new langswitch()
export default f