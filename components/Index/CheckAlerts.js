import { useEffect, useState } from "react"
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

    const [mRows,setRows]=useState(rows)
    useEffect(()=>{
        setTimeout(() => {
    rows=[]
    const displayMode = window.matchMedia('(display-mode: standalone)');
    if( installPrompt !== null)
    if(typeof installPrompt !== "undefined")
    if(!displayMode.matches)
    {
        AddRow("alert alert-warning d-flex justify-content-between p-2",<><strong className="p-1">Laden Sie unsere App herunter!</strong>
        <button className="btn btn-secondary btn-sm"
        onClick={()=>{installPrompt.prompt()}}
        >&darr;&nbsp;&nbsp;Herunterladen</button></>)                
        rows = rows.concat(mRows)
        setRows(rows)
    }
    
        }, 100)
    }        
        ,[])
    


    return <>
    {mRows}
    </>
}