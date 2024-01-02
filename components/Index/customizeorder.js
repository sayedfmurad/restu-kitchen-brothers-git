import Head from 'next/head'
import langswitch from '../Utils/langswitch'
import MyNavbar from "../TopBar/TobBar"
import hash from "../Utils/object_hash"
import React, { useState, useEffect } from 'react';
import Sectionmenu from './sectionmenu';
import Cart from '@/components/Index/cart';
import ButtonCartContainer from "./ButtonCartContainer"


export function TypesComponent ({type, settype, menu, id}) {

  
    try {
      const obj = menu["product"][id]
      var types = []     
      for (var tt in obj["price"]) {
        if (tt !== "stand") {
          types.push(
            <option value={tt} selected={type === tt ? "selected" : ""}>
              {tt}&nbsp;&nbsp;{obj["price"][tt]}&nbsp;&euro;
            </option>              
          )            
        }
      }
      if (types.length === 0) {
        return <></>
      }
  
      return (
        <>              
              <div className="col-12 mt-3">
                <select className="form-select" onChange={(e)=>{settype(e.target.value)}}>
                  {types}
                </select>              
              </div>         
        </>
      )
    } catch (error) {
      return <></>
    }
}  
export function ExtraComponent ({MyLang, setextra,extra,menu,id,type,orderid,or,updatePrice}) {
    var extrarow=[]
    var editordercheck = orderid in or? true:false
    var [mdisplay, setmdisplay]=useState(editordercheck?"":"d-none");    

    var ok = menu["extra"];
    var ion=0;
 var addextra=(e)=>{
        if(e.target.checked)
        {
            var go = extra
            go[e.target.id]=ok[e.target.id];
            setextra(go)
        }              
        else
        {
            var go = extra
            delete extra[e.target.id]
            setextra(go)
        }

        updatePrice();         
    }
   
    
    var checkisextra = false;
    for(var jjj in menu["extra"])
    for(var ttt in menu["extra"][jjj]["section"])    
    if(menu["product"][id]["section"].toUpperCase()==menu["extra"][jjj]["section"][ttt].toUpperCase())        
    {
        var addextrasub = true;
        if("extraexcept" in menu["product"][id])
        if(jjj in menu["product"][id]["extraexcept"])
        addextrasub=false
        
        if(addextrasub && (type in menu["extra"][jjj]))
        { 
        checkisextra=true;  
        extrarow.push(
            <>                
            <div className={`col-12 form-check ${(ion>2?mdisplay:"")}`} >            
            <input style={{cursor:"pointer"}} type="checkbox" class="form-check-input"  id={jjj} autocomplete="off" onChange={addextra} defaultChecked={(jjj in extra?true:false)}/>
            <label style={{cursor:"pointer"}} class="form-check-label pt-2 " for={jjj}>
                &nbsp;&nbsp;{(menu["extra"][jjj][type]["name"].toUpperCase().includes("mit".toUpperCase())  ? "" :"Mit ") +menu["extra"][jjj][type]["name"].charAt(0).toUpperCase() + menu["extra"][jjj][type]["name"].slice(1)}&nbsp;&nbsp;(+{menu["extra"][jjj][type]["price"]})&nbsp;&euro;</label>
            </div>            
         </>
        )
        ion++;
        }
    }

    if(checkisextra)
    if(!editordercheck)
    if(ion>2)
    extrarow.push(
        <>           
       <div className='col-12 p-0 mt-2 mb-4'>           
           <a className='' id="btn-more" style={{cursor:"pointer"}} onClick={()=>{setmdisplay(""); document.getElementById("btn-more").className="d-none"}}>
           Mehr anzeigen &nbsp;
           <svg fill="black" viewBox="0 0 16 16" width="1em" height="1em" role="presentation" focusable="false" aria-hidden="true"><path d="M2.82 5.044L8 10.399 13.197 5l.963.875-5.364 5.565a1.164 1.164 0 01-1.636 0L1.875 5.945l.945-.901z"></path></svg>
            </a>
       </div> 
       </>
    ) 

    if(extrarow.length==0)
    return <></>
    return <>
    <div className='col-12 p-0 mb-2' style={{fontSize:"15px"}}><strong>Deine Extras:</strong></div>
    {extrarow} 
    </>
}
export function OptionsComponent ({menu,id,orderid,or,updatePrice}) {
    var options = [];
 const OptionsElement=(e)=>{    
        var tempsubobj= []       
        var editordercheck = orderid in or? true:false
        var defaultoption = editordercheck?or[orderid]["option"][e["name"]]: Object.keys(e["options"])[0]

        for(var op in e["options"])                
        {
                tempsubobj.push(                     
                            <option  value={op}>{op}&nbsp;{e["showprice"]?" "+e["options"][op]["price"]+" €":""}</option>
                    )
                }
                const getoption =(ee)=>{                    
                    var key = ee.target.name
                    key = key.replace("options-options","")
                    updatePrice()
                }
                return <><strong className='col-12 p-0'>{e["name"]}</strong>
                    <select className="form-select form-select-lg mb-1" defaultValue={defaultoption} onChange={getoption} id={e["name"]}  name={`options-options${e["name"]}`} >
                    {tempsubobj}
                    </select></>
    }
    const jsonObject = menu["product"][id]["options"]
    if(jsonObject != undefined)
    {
        const sortedKeys = Object.keys(jsonObject).sort();

        const sortedJsonObject = {};
        sortedKeys.forEach((key) => {
        sortedJsonObject[key] = jsonObject[key];
        });
        for(var objo in sortedJsonObject)
    {
        var tempobj=[]
          
            tempobj.push(OptionsElement(menu["product"][id]["options"][objo]))
            options.push(tempobj)                
    } 
    }  
    if (options.length==0) {
        return <></>
    }
    return <>
    {options}
    <div className='col-12 mt-4'></div>                
    </>
}
export function MsgComponent ({MyLang,orderid,orders}) {
    var msg = ""
    if(orderid in orders)
    if("msg" in orders[orderid])
    msg = orders[orderid]["msg"]
    return <>
    <div className='col-12 p-0 mt-4'>
    <strong className='p-0' style={{fontSize:"15px"}}>Besondere Wünsche:</strong>
    </div>
    <div className='col-12 p-0'>
    <textarea className='mt-1 rounded' id="textareamsg" style={{"width":"100%"}}  maxLength={50} >          
    {msg}
    </textarea>    
    </div>
    </>
}
export function PriceComponent ({price,MyLang}) {
    if (price != "") {        
    return <div className='col-12'>
    <h5>{MyLang["total"]}:&nbsp;&nbsp;{price}&nbsp;&euro;</h5>
    </div>
    }
    return <></>
}


export function OrderIDisReady ({id,menu,orders,MyLang,SetContainer}) {
    var [id, setid]=useState(id);  
    var orderid = ""
          var [orderid, setorderid]=useState("");
    useEffect(()=>{
            if (id in orders)      
            {                                 
                setid(orders[id]["id"])
                // document.getElementById("navbarBack").onclick = () => {
                //     langswitch.ChangeGetParameters("cart")                                           
                //     SetContainer(<Cart mSetContainer={SetContainer} />)
                //   };
                setorderid(id)
                return
            }
                setorderid("-")
            

    },[])
      
  
    return <>{orderid !== "" && <IDisReady  menu={menu} orders={orders} id={id} orderid={orderid}/>}</>

}

export function IDisReady ({menu, id, orderid , orders}) {
    const MyLang = langswitch.langswitchs("customizeorder");    
    var temptype =  Object.keys(menu["product"][id]["price"])[0] 
    var tempcount = "1"
        if(orderid in orders)
        {
            temptype =  orders[orderid]["type"]
            tempcount = orders[orderid]["count"]
        }
    const [type,settype] = useState(temptype)    
    const [count,setCount] = useState(tempcount)  
    var [extra, setextra]=useState(orderid in orders ? orders[orderid]["extra"]: {});
    const updatePriceM=()=>{
        var p = langswitch.stof(menu["product"][id]["price"][type])
        for(var k in extra)
            p += langswitch.stof(extra[k][type]["price"])      
        
        var optUpdatePrice = menu["product"][id]["options"]
        for(var gg in optUpdatePrice)
        if(optUpdatePrice[gg]["showprice"])
        {                
            if(document.getElementById(optUpdatePrice[gg]["name"]) !== null )
            {                
                var selectedopt = document.getElementById(optUpdatePrice[gg]["name"]).value
                p += langswitch.stof(optUpdatePrice[gg]["options"][selectedopt]["price"])      
            }
        }
        p = p *count;
        return langswitch.ftos(p) 
    }
    const [price,setprice]=useState(updatePriceM())    
    const UpdateAddButtonText = (ppp)=>{
        if(orderid in orders)
        return <> <img src="/Images/edit-svgrepo-com.svg" width="20" />&nbsp;&nbsp;<strong>{ppp}</strong>{" €"}</>
        else 
        return <> 
        {/* <img src="/Images/plus-svgrepo-com.svg" width="20" /> */}
        &nbsp;&nbsp;<strong>{ppp}</strong>{" €"}</>

    }
    const pprice = updatePriceM()
    const [addButtonText,setaddButtonText]=useState(UpdateAddButtonText(pprice))    
    var updatePrice=()=>{   
        const pprice = updatePriceM()
        setprice(pprice)
        setaddButtonText(UpdateAddButtonText(pprice))
    } 
    useEffect(()=>{
        updatePrice()
    },[type,count])

    var addOrder=()=>{ 
        var order={}
        order["id"]=id
        order["time"]=new Date().getTime()+""
        order["type"]=type
        order["count"]=count
        order["price"]=price;
        order["msg"]=document.getElementById("textareamsg").value
        order["extra"]=extra
        var mOption={}

        for(var nmn in menu["product"][id]["options"])            
        mOption[menu["product"][id]["options"][nmn]["name"]]=document.getElementById(menu["product"][id]["options"][nmn]["name"]).value

        order["option"]=mOption
        var hashs = hash(order);                            
        orders[(orderid in orders?orderid:hashs)]=order
        window.localStorage.setItem("order",JSON.stringify(orders))
        document.getElementById('btn-close-CustomizeModal').click()   

        if(orderid in orders)
        setTimeout(() => {            
            document.getElementById('IdButtonCartFooter').click()   
        }, 300);
                     
    }
    
    return <>
       <div class="modal-header text-whitee">  
       <h3 className='m-0'>{menu["product"][id]["name"]}</h3>                                
        
        <button type="button" class="btn-close " id={`btn-close-CustomizeModal`} data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
      <div class="modal-body" style={{"backgroundColor":"rgb(242 242 242)"}}>      
      {menu["product"][id]["desO"]!=""?<h6>{menu["product"][id]["desO"]}</h6>:""}


<TypesComponent type={type} settype={settype} menu={menu} id={id} />

<div className='row' style={{"backgroundColor":"rgb(242 242 242)",padding:"30px 15px 30px 15px"}}>
<OptionsComponent updatePrice={updatePrice} menu={menu} id={id} orderid={orderid} or={orders}/>
{!("showextra" in menu["product"][id])&&
    <ExtraComponent MyLang={MyLang} setextra={setextra} extra={extra} updatePrice={updatePrice} type={type} menu={menu} id={id} orderid={orderid} or={orders}/>}

<MsgComponent MyLang={MyLang} orderid={orderid} orders={orders}/>
</div>
<br/>
<br/>

</div> 
<div style={{"backgroundColor":"#533b3b"}} class="modal-footer d-flex justify-content-md-center justify-content-between justify-content-lg-center border-0">
    {/* {MyLang["count"]} */}
    <div  className='text-white fs-3'>
        <a onClick={()=>{var g=count==1?1:count-1;setCount(g+"");}} className='btn-md btn btn-secondary rounded-5'>
        <svg viewBox="0 0 16 16" width="1em" height="1em" role="presentation" focusable="false" aria-hidden="true"><path fill="white" d="M14.125 7.344H1.875v1.312h12.25V7.344z"></path></svg>        
        </a>
        &nbsp;&nbsp;<strong>{count}</strong>&nbsp;&nbsp;
        <a onClick={()=>{var g=parseInt(count) +1;setCount(g+"");}} className='btn-md btn btn-secondary rounded-5'>                    
        <svg viewBox="0 0 16 16" width="1em" height="1em" role="presentation" focusable="false" aria-hidden="true"><path fill="white" d="M14.125 7.344H8.656V1.875H7.344v5.469H1.875v1.312h5.469v5.469h1.312V8.656h5.469V7.344z"></path></svg>
            </a>
        </div>
<button style={{"minWidth":'200px'}} onClick={addOrder} class="border-success rounded-5 btn btn-success btn-lg ">
   {addButtonText}</button>
</div>



</>
}

export function JsonIsReady({id,menu,MyLang,SetContainer}){
   
    const [orders, setorder] = useState("")
    useEffect(()=>{
        langswitch.GetJsonM("order").then((m)=>{
            setorder(m)
        }) 
    },[])    
    return <>{orders !== "" && <OrderIDisReady  SetContainer={SetContainer} id={id} menu={menu} MyLang={MyLang}  orders={orders} />}</>
    
}

export default function c({menu,id,SetContainer,bnb}) {
    const MyLang = langswitch.langswitchs("customizeorder");
    // if(!langswitch.checkOpenCloseStore(menu))
    //     {
    //         return  <><div class="modal-header text-whitee">                           
    //          <button type="button" class="btn-close " id={`btn-close-CustomizeModal`} data-bs-dismiss="modal" aria-label="Close"></button>
    //         </div>
    //        <div class="modal-body" style={{"backgroundColor":"rgb(242 242 242)"}}>                 
    //        <div className='d-flex justify-content-center'>
    //         <h5>Das Restaurant ist heute geschlossen.</h5>           
    //         </div> 
    //         <div className='modal-footer d-flex justify-content-center'>
    //         <button style={{"minWidth":'200px'}} onClick={()=>{ document.getElementById('btn-close-CustomizeModal').click()}} class=" rounded-5 btn btn-danger btn-lg ">
    //             Schließen</button>
    //         </div> 
    //         </div>
            
    //  </>
    //     }
            
    return (
        <>           
            <JsonIsReady id={id} SetContainer={SetContainer} menu={menu} MyLang={MyLang} />
        </>
    );
}
