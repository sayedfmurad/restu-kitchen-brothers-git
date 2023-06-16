import Head from 'next/head'
import langswitch from '../Utils/langswitch'
import MyNavbar from "../TopBar/TobBar"
import hash from "../Utils/object_hash"
import React, { useState, useEffect } from 'react';
import Sectionmenu from './sectionmenu';

export function CountComponent ({count, setCount, MyLang}) {    
    return <div className='list-group'>
    <div className='list-group-item d-flex justify-content-between'>
    {MyLang["count"]}
    <div>
        <a onClick={()=>{var g=count==1?1:count-1;setCount(g+"");}} className='btn btn-primary'>-</a>
        &nbsp;&nbsp;&nbsp;{count}&nbsp;&nbsp;&nbsp;
        <a onClick={()=>{var g=parseInt(count) +1;setCount(g+"");}} className='btn btn-primary'>+</a>
        </div>
    </div>
    </div>
}
export function NameComponent ({menu, id}) {
    try {
        return <div className='col-12'>
        <h3>{menu["product"][id]["name"]}</h3>                                
        <h6>{menu["product"][id]["desO"]}</h6>                                
    </div>    
    } catch (error) {
        return<></>
    }
    
}


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
        <div className={`list-group ${types.length < 1 ? "" : ""}`}>
          <div className='list-group-item'>
            <div className='row'>
              <div className='col-12'>{obj["name"]}:</div>
              <br/>
              <br/>
              <div className="col-12">
                <select className="form-select" onChange={(e)=>{settype(e.target.value)}}>
                  {types}
                </select>
              </div>         
            </div>         
          </div>         
        </div>
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
            <div className={`col-md-4  col-sm-6 ${(ion>2?mdisplay:"")}`}>
            <div className='d-flex justify-content-center'>
            <input type="checkbox" class="btn-check"  id={jjj} autocomplete="off" onChange={addextra} defaultChecked={(jjj in extra?true:false)}/>
            <label class="btn btn-outline-primary " for={jjj}>{"Mit "+menu["extra"][jjj][type]["name"].charAt(0).toUpperCase() + menu["extra"][jjj][type]["name"].slice(1)}&nbsp;&nbsp;{menu["extra"][jjj][type]["price"]}&euro;</label>
            </div>
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
       <div className='col-12'>           
       <div className='d-flex justify-content-center'>           
           <button className='btn btn-primary ' id="btn-more" onClick={()=>{setmdisplay(""); document.getElementById("btn-more").className="d-none"}}>&darr;&nbsp;{MyLang["more"]}</button>
       </div> 
       </div> 
       </>
    ) 

    if(extrarow.length==0)
    return <></>
    return <><div className={`list-group `}>
    <div className='list-group-item'>
    <div className='row g-3'>
            {extrarow}
    </div>
    </div>
    </div> 
    <br/>
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
                return <div class="input-group mb-3">
                <label class="input-group-text"  for="inputGroupSelect01">{e["name"]}</label>
                    <select defaultValue={defaultoption} onChange={getoption} id={e["name"]}  name={`options-options${e["name"]}`} class="form-select">
                    {tempsubobj}
                    </select>
                </div>
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
          
            tempobj.push(<br/>)
            tempobj.push(<div className='row'>{OptionsElement(menu["product"][id]["options"][objo])}</div>)
            options.push(<div className='col-sm-12 col-md-6 col-lg-4'>{tempobj}</div>)                
    } 
    }  
    if (options.length==0) {
        return <></>
    }
    return <>
    <div className='list-group'>
    <div className='list-group-item'>
    {options}            
    </div>
    </div>
    <br/>
    </>
}
export function MsgComponent ({MyLang,orderid,orders}) {
    var msg = ""
    if(orderid in orders)
    if("msg" in orders[orderid])
    msg = orders[orderid]["msg"]
    return <div className={`list-group `}>
    <div className='list-group-item'>
    <textarea id="textareamsg" style={{"width":"20rem"}} placeholder={MyLang["leavemsg"]} maxLength={50} >          
    {msg}
    </textarea>
    </div>
    </div>
}
export function PriceComponent ({price,MyLang}) {
    if (price != "") {        
    return <div className='col-12'>
    <h5>{MyLang["total"]}:&nbsp;&nbsp;{price}&nbsp;&euro;</h5>
    </div>
    }
    return <></>
}

export function OrdersisReady ({id,menu,orders,MyLang}) {   
    var [id, setid]=useState(id);  
    var orderid = ""
    return <OrderIDisReady setid={setid} menu={menu} orders={orders} id={id} orderid={orderid}/>

}
export function OrderIDisReady ({menu,orders,MyLang,setid,id}) {
          var [orderid, setorderid]=useState("");
    useEffect(()=>{
            var bnb = new URL(decodeURI(location.href));
            var morderid = bnb.searchParams.get("orderid");

            if (typeof morderid !== "undefined")      
            if (morderid && morderid in orders)      
            {                                 
                document.getElementById("navbarBack").href=langswitch.RouteP("cart")
                setid(orders[morderid]["id"])
                setorderid(morderid)
                return
            }
                setorderid("-")
            

    },[])
      
  
    return <>{orderid !== "" && <IDisReady menu={menu} orders={orders} id={id} orderid={orderid}/>}</>

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
        return <>{MyLang["edit"]}&nbsp;&nbsp;&nbsp;<strong>{ppp}</strong>{" €"}</>
        else 
        return <>{MyLang["add"]}&nbsp;&nbsp;&nbsp;<strong>{ppp}</strong>{" €"}</>

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
        document.getElementById("navbarBack").click()
    }
     


    return <><div className="container mt-4 text-white">
<NameComponent menu={menu} id={id} />

<br/>
<TypesComponent type={type} settype={settype} menu={menu} id={id} />
<br/>
<CountComponent count={count} setCount={setCount} MyLang={MyLang}/>
<br/>
<OptionsComponent updatePrice={updatePrice} menu={menu} id={id} orderid={orderid} or={orders}/>
<ExtraComponent MyLang={MyLang} setextra={setextra} extra={extra} updatePrice={updatePrice} type={type} menu={menu} id={id} orderid={orderid} or={orders}/>
<MsgComponent MyLang={MyLang} orderid={orderid} orders={orders}/>
<br/>
<br/>
<br/>
<br/>
<br/>

</div> 
<button onClick={addOrder} class="fixed-bottom btn btn-success">{addButtonText}</button>
</>
}

export function JsonIsReady({id,menu,MyLang}){
   
    const [orders, setorder] = useState("")
    useEffect(()=>{
        langswitch.GetJsonM("order").then((m)=>{
            setorder(m)
        }) 
    },[])
    return <>{orders !== "" && <OrdersisReady id={id} menu={menu} MyLang={MyLang}  orders={orders} />}</>
    
}

export default function c({menu,id,SetContainer,bnb}) {
    const MyLang = langswitch.langswitchs("customizeorder");
    return (
        <>
            <Head>                
                <link href="./mystyles/customizeorder.css" rel="stylesheet" />
            </Head>
            <MyNavbar menu={menu} mSetContainer={SetContainer}  options={
                        [
                            <a onClick={()=>{
                                SetContainer(
                                        <Sectionmenu SetContainer={SetContainer} menu={menu} bnb={bnb} />
                                    )
                            }} className="btn btn-secondary" id='navbarBack' >Zurück</a>                                                 
                        ]                        
                        }  
            />
            <JsonIsReady id={id} menu={menu} MyLang={MyLang} />
        </>
    );
}
