import langswitch from '../Utils/langswitch'
import hash from "../Utils/object_hash"
import React, { useState, useEffect, useRef } from 'react';
import Cart from './cart';


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
              <div className="col-12 mt-3 mb-1">
                <select className="form-select-lg form-select" onChange={(e)=>{settype(e.target.value)}}>
                  {types}
                </select>              
              </div>         
        </>
      )
    } catch (error) {
      return <></>
    }
}  

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export function ShowExtrasOptions({NameExtraOutput,ok,extra,setextra,updatePrice, extrarow, setMainModal }) {
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleOptionChange = (event) => {
        var go = extra
        go[event.target.value]=ok[event.target.value]
        console.log(go);
        setextra(go)

        updatePrice();  
        // console.log(event.target.value);
    //   setSelectedOption(event.target.value);
      setSelectedOption("");
    };
  
    return (
      <select
        className="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="">{NameExtraOutput}</option>
        {extrarow}
      </select>
    );
  }

export function ShowExtrasOptionsV2({extrarow,setMainModal}){
    const [show, setShow] = useState(true);
    const handleClose = () => {setShow(false);
        setTimeout(() => {setMainModal(<></>)}, 500);
    }
    useEffect(() => {
        // Add event listener for browser's back button or mobile device's back button
        window.onpopstate = handleClose;
      }, []);
    return (
      <>
        <Modal fullscreen="md-down" show={show} onHide={handleClose} animation={false} >
          <Modal.Header closeButton>
            <Modal.Title>Extra hinzufügen</Modal.Title>
          </Modal.Header>
          <Modal.Body  style={{height:"1000px",backgroundColor:"rgb(242, 242, 242)"}}>
            {extrarow}
          </Modal.Body>
          <Modal.Footer>
            <Button className='col-12 rounded-5' variant="secondary" onClick={handleClose}>
              Schließen
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    ); 
}
export function ExtraComponentV2 ({MyLang, setextra,extra,menu,id,type,orderid,or,updatePrice}) {
    var extrarow=[]
    var extrarow5=[]
    let LenOfExtra = 0
    var ok = menu["extra"];
    var ion=0;
 var addextra=(e)=>{
        if(e.target.checked)
        {
            var go = extra
            go[e.target.getAttribute("key-data")]=ok[e.target.getAttribute("key-data")];
            setextra(go)
        }              
        else
        {
            var go = extra
            delete extra[e.target.getAttribute("key-data")]
            setextra(go)
        }

        updatePrice();         
    }

    for(var jjj in menu["extra"])
    for(var ttt in menu["extra"][jjj]["section"])    
    if(menu["product"][id]["section"].toUpperCase()==menu["extra"][jjj]["section"][ttt].toUpperCase())        
    {
        LenOfExtra++
        var addextrasub = true;
        if("extraexcept" in menu["product"][id])
        if(jjj in menu["product"][id]["extraexcept"])
        addextrasub=false
        
        if(addextrasub && (type in menu["extra"][jjj]))
        { 
        let mobiji = <>                
            <div className={`row`} >            
            <div className={`col-12`} >            
            <input style={{cursor:"pointer"}} type="checkbox" class="form-check-input" key-data={jjj}  id={jjj} autocomplete="off" onChange={addextra} defaultChecked={(jjj in extra?true:false)}/>
            &nbsp;&nbsp;
            <label style={{cursor:"pointer"}} class="form-check-label pt-2 " key-data={jjj} for={jjj}>
                {(menu["extra"][jjj][type]["name"].toUpperCase().includes("mit".toUpperCase())  ? "" :("showWithText" in menu["extra"][jjj][type]?"":"Mit ")) +menu["extra"][jjj][type]["name"].charAt(0).toUpperCase() + menu["extra"][jjj][type]["name"].slice(1)}&nbsp;&nbsp;(+{menu["extra"][jjj][type]["price"]})&nbsp;&euro;
                </label>
            </div>            
            </div>            
         </>
        if(!(jjj in extra))
        extrarow.push(<option key-data={jjj} id={jjj} value={jjj}>{(menu["extra"][jjj][type]["name"].toUpperCase().includes("mit".toUpperCase())  ? "" :"Mit ") +menu["extra"][jjj][type]["name"].charAt(0).toUpperCase() + menu["extra"][jjj][type]["name"].slice(1)}&nbsp;&nbsp;(+{menu["extra"][jjj][type]["price"]})&nbsp;&euro;</option>)
        
        if(ion<=4)
        extrarow5.push(mobiji)
        ion++;
        }
    }
    const NameExtraOutput = "ExtraNameAddName" in menu["product"][id]?menu["product"][id]["ExtraNameAddName"]:"Deine Extras"
    if(LenOfExtra <= 5)
    return extrarow5
    return <>
        {extrarow.length>0&&<ShowExtrasOptions NameExtraOutput={NameExtraOutput} ok={ok} extra={extra} setextra={setextra} updatePrice={updatePrice} extrarow={extrarow} setMainModal={menu.setMainModal}/>}
        {Object.keys(extra).map((key, index) => {
            return <>            
            <div className={`row mb-2`} >            
            <div className={`col-12`} >            
            <input style={{cursor:"pointer"}} type="checkbox" class="form-check-input" key-data={key} id={key+"setted"} onChange={addextra} checked={true}/>
            &nbsp;&nbsp;
            <label style={{cursor:"pointer"}} class="form-check-label pt-2 " key-data={key} for={key+"setted"}>
                {(menu["extra"][key][type]["name"].toUpperCase().includes("mit".toUpperCase())  ? "" :"Mit ") +menu["extra"][key][type]["name"].charAt(0).toUpperCase() + menu["extra"][key][type]["name"].slice(1)}&nbsp;&nbsp;(+{menu["extra"][key][type]["price"]})&nbsp;&euro;</label>
            </div>            
            </div>            
            </>
        })}
        {/* {extrarow.length>0&&<button onClick={()=>{
            menu.setMainModal(<ShowExtrasOptions extrarow={extrarow} setMainModal={menu.setMainModal}/>)
        }} className=" mt-2 btn btn-lg btn-outline-secondary" >Extra hinzufügen</button>} */}
    </>
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
    <div className='col-12 p-0 mb-2' style={{fontSize:"15px"}}><strong>{}Deine Extras:</strong></div>
    {extrarow} 
    </>
}
export function OptionsComponent ({type,menu,id,orderid,or,updatePrice}) {
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
                let ToShow = ""
                if("typeinclude" in menu["product"][id]["options"][objo])
                if(!menu["product"][id]["options"][objo]["typeinclude"].includes(type))
                ToShow = "d-none"
                return <div className={ToShow}><strong 
                className={`col-12 p-0`}
                >{e["name"]}</strong>
                    <select className="form-select form-select-lg mb-1" defaultValue={defaultoption} onChange={getoption} id={e["name"]}  name={`options-options${e["name"]}`} >
                    {tempsubobj}
                    </select></div>
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
        return <> 
        <svg width="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            <g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#ffffff"/> </g>
            </svg>
        &nbsp;&nbsp;<strong>{ppp}</strong>&nbsp;&euro;</>
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
        
        menu.setContainerCartModal(<></>)            
        setTimeout(() => {
            menu.setContainerCartModal(<Cart menu={menu}/>)
        }, 150);
        setTimeout(() => {
            menu.setContainerCartModal(<Cart menu={menu}/>)
        }, 300);
        document.getElementById('btn-close-CustomizeModal').click()   
                     
    }
    
    return <>
       <div class="modal-header text-whitee">  
       <h3 className='m-0'>{menu["product"][id]["name"]}</h3>                                
        
        <button type="button" class="btn-close " id={`btn-close-CustomizeModal`} data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
      <div class="modal-body" style={{"backgroundColor":"rgb(242 242 242)"}}>      
      {menu["product"][id]["desO"]!=""?<h6>{menu["product"][id]["desO"]}</h6>:""}


<TypesComponent type={type} settype={settype} menu={menu} id={id} />

<div className='col-12 mt-4' style={{"backgroundColor":"rgb(242 242 242)"}}>
<OptionsComponent type={type} updatePrice={updatePrice} menu={menu} id={id} orderid={orderid} or={orders}/>
{!("showextra" in menu["product"][id])&&false&&
    <ExtraComponent MyLang={MyLang} setextra={setextra} extra={extra} updatePrice={updatePrice} type={type} menu={menu} id={id} orderid={orderid} or={orders}/>
}
{!("showextra" in menu["product"][id])&&
<ExtraComponentV2 MyLang={MyLang} setextra={setextra} extra={extra} updatePrice={updatePrice} type={type} menu={menu} id={id} orderid={orderid} or={orders}/>}

<MsgComponent MyLang={MyLang} orderid={orderid} orders={orders}/>
</div>
<br/>
<br/>

</div> 
<div style={{"backgroundColor":"#533b3b"}} class="modal-footer d-flex  align-items-center justify-content-between  border-0">
    {/* {MyLang["count"]} */}
    <div  className='text-white fs-3 align-items-center d-flex'>
        <a style={{borderRadius:"30px",fontSize:"22px"}} onClick={()=>{var g=count==1?1:count-1;setCount(g+"");}} className='btn-lg btn btn-secondary '>
        <svg viewBox="0 0 16 16" width="1em" height="1.66em" role="presentation" focusable="false" aria-hidden="true"><path fill="white" d="M14.125 7.344H1.875v1.312h12.25V7.344z"></path></svg>        
        </a>
        &nbsp;&nbsp;<strong className='text-center' style={{minWidth:"40px",fontSize:"30px"}}>{count}</strong>&nbsp;&nbsp;
        <a style={{borderRadius:"30px",fontSize:"22px"}}  onClick={()=>{var g=parseInt(count) +1;setCount(g+"");}} className='btn-lg btn btn-secondary '>                    
        <svg viewBox="0 0 16 16" width="1em" height="1.66em" role="presentation" focusable="false" aria-hidden="true"><path fill="white" d="M14.125 7.344H8.656V1.875H7.344v5.469H1.875v1.312h5.469v5.469h1.312V8.656h5.469V7.344z"></path></svg>
            </a>
        </div>
<button style={{minHeight:"56px","minWidth":'150px',fontSize:"24px"}} onClick={addOrder} class="border-success rounded-5 btn btn-success btn-lg ">
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
