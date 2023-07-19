import langswitch from "../Utils/langswitch"
export default({menu})=>{

    var rows = []
    const AddRow=(classes,text)=>{
        rows.push(
            <div className={`${classes} rounded-0 m-0`} role="alert">
                {text}            
            </div>)
    }
    if("rabat" in menu)
    if(menu["rabat"]!="")
    AddRow("alert alert-warning","NUR HIER MIT "+menu["rabat"]+"% ONLINE-RABATT BESTELLEN")
        
    if("alerts" in menu["staticValue"])
    for(var k in menu["staticValue"]["alerts"])
    AddRow(menu["staticValue"]["alerts"][k]["class"],menu["staticValue"]["alerts"][k]["text"])
    
    if(!("closed" in menu["staticValue"]))
    if(!langswitch.checkOpenCloseStore(menu))    
    AddRow("alert alert-danger","Geschlossen. "+langswitch.NextOpenTimeMsg(menu))

    var c = rows.length>0?
        <>{rows}</>
    :<></>
    return <>
    {c}
    </>
}