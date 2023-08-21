import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import MyNavbar from "../components/TopBar/TobBar"
import langswitch from '../components/Utils/langswitch'
import hash from "../components/Utils/object_hash"
import packagee from "../package.json"
import AddAddress from "../components/Cart/addaddress"
import Sections from '@/components/Index/sections';
export function PaymentMethods ({spaterodernow,textabohlen,menu,MsgError}) {
    const MyLang = langswitch.langswitchs("cart")
    const startpay= ()=>{
            
            
        const urll = "https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws";
        let t = false;
        // if(typeof document.getElementById("bar-outlined") !== "undefined")
        if(typeof document.getElementById("bar-outlined") !== 'undefined' && document.getElementById("bar-outlined") !== null && document.getElementById("bar-outlined").checked)
        t="bar";
        else if (
            (typeof document.getElementById("paypal-outlined") !== 'undefined' && document.getElementById("paypal-outlined") !== null && document.getElementById("paypal-outlined").checked) ||
            (typeof document.getElementById("DCcard-outlined") !== 'undefined' && document.getElementById("DCcard-outlined") !== null && document.getElementById("DCcard-outlined").checked) ||
            (typeof document.getElementById("spea-outlined") !== 'undefined' && document.getElementById("spea-outlined") !== null && document.getElementById("spea-outlined").checked) ||
            (typeof document.getElementById("giropay-outlined") !== 'undefined' && document.getElementById("giropay-outlined") !== null && document.getElementById("giropay-outlined").checked) ||
            (typeof document.getElementById("sofort-outlined") !== 'undefined' && document.getElementById("sofort-outlined") !== null && document.getElementById("sofort-outlined").checked)
          )
        t="paypal";
        else 
        {
            alert("bitte wählen Sie eine Zahlungsmethode");
            return false;
        }            

        
        
        
        var parms = {}
        var orders = langswitch.getJson("order")
        var SumNum = langswitch.getNum("sumprice")
        SumNum = langswitch.stof(SumNum)


        ////CheckingWithoutDrinks
        if("WithoutDrinksMinPrice" in menu["staticValue"])
        {
            var DrinksSum = 0
            for(var l in orders)
            {
                if(menu["product"][orders[l]["id"]]["section"]=="Getränke" || menu["product"][orders[l]["id"]]["section"]== "Alkoholische Getränke")
                DrinksSum+=(langswitch.stof(menu["product"][orders[l]["id"]]["price"][orders[l]["type"]]) * parseInt(orders[l]["count"]))
            }
            if(langswitch.stof((SumNum-DrinksSum).toFixed(2)) <= parseInt(menu["staticValue"]["WithoutDrinksMinPrice"]))
            {
                alert("Mindestbestellung ist 10 euro ohne Getränke und Eis")
            return false;
            }
        }
        


        var address = langswitch.getJson("address")
        var seladd = langswitch.getValue("seladdress")
        var time =  new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }));           
        parms["type"] = t;
        if(t=="paypal")
        {
            const hostname = window.location.hostname;
            const isOutPackage= packagee["IsOut"]?".html":""
            parms["successurl"] = "https://"+hostname+"/success"+isOutPackage
            parms["failureurl"] = "https://"+hostname
        }
        if(textabohlen)
        parms["abhol"]=""
        parms["menu"] = menu["staticValue"]["menuurl"]
        parms["key"] = menu["staticValue"]["key"]
        parms["address"] = address[seladd];
        parms["orders"] = orders;
        if(!packagee["IsOut"])
        {
            parms["servertest"]=""
            parms["TestTelegram"]=""
            parms["istest"]=""
        }
        
        var TimeSettedDelivery = spaterodernow == "d-none"?"":document.getElementById("selectedtimedelivery").value
        if (TimeSettedDelivery !="")
          parms["TimeSettedDelivery"]=TimeSettedDelivery
        else if(spaterodernow != "d-none") 
        {
            alert("bitte Ihre Lieferzeit wählen")
            return
        }


        document.getElementById("MainIdd").classList.add("d-none")
        document.getElementById("SpinnerId").classList.remove("d-none")



        var MainOrderId = time.getTime() + JSON.stringify(parms);
        MainOrderId = hash(MainOrderId);            
        parms["MainId"]=MainOrderId;
        parms["time"]="";
        parms["createtime"]=time.getTime();
        var MainOrder = langswitch.getJson("mainorder");
        MainOrder[MainOrderId]=parms      
        parms = JSON.stringify(parms);
        window.localStorage.setItem("lastOrderId",MainOrderId);            
        let mheaders = new Headers();
        mheaders.append('Origin','*');
        fetch(urll, {
          method: 'POST', // or 'PUT'
          headers: mheaders,
          body: parms
        }).then(response => {
            if(response.status != 200)
            throw new Error("Error");
            return response.json();
          }).then(data => {                                
            window.localStorage.setItem("mainorder",JSON.stringify(MainOrder));
            if(t=="bar")
            window.location.href=langswitch.RouteP("success");
            else if(t=="paypal")
            {
                if("paypalurl" in data)
                window.location.href=data["paypalurl"] 
                else
                window.location.href=langswitch.RouteP(menu["staticValue"]["key"]+"-paypal");                    
            }                
        })
        .catch((error) => {            
          window.location.href=langswitch.RouteP("failure");
          langswitch.ClearAllData();       
          console.error('Error:', error);
        })
    }
    const CheckOutBtn = e=>
    {
        var seladd = langswitch.getValue("seladdress")
        const PassedSomeRules = ()=>{
            if (MsgError!="") {
                console.log(MsgError)
                alert(MsgError)
                return 
            }   
            if(seladd != "")
            {
            var addobj = langswitch.getJson("address")
            if(addobj.hasOwnProperty(seladd))  
            startpay()
            else
            {
                var elementt = document.getElementById("address-input")
                elementt.scrollIntoView({ behavior: "smooth", block: "start" });
                elementt.focus()   
                alert(MyLang["Please Select an Address"])
            }
            }
            else
            {

                var elementt = document.getElementById("address-input")
                elementt.scrollIntoView({ behavior: "smooth", block: "start" });
                elementt.focus()   
                alert(MyLang["Please Select an Address"])
            }
        }
        if(document.getElementById("success-outlined-abholen").checked)  
        PassedSomeRules()      
        else if(langswitch.CheckMinPriceOrder(langswitch.getNum("sumprice")  ,menu))
        PassedSomeRules()            
    }
    const CheckPaymentsTypes=(menu)=>{

        if("paymentmethod" in menu["staticValue"])
        {
            for(var d in menu["staticValue"]["paymentmethod"])
            {
                var rows=[]
                rows.push(    
                    <>
                    <input type="radio" class="btn-check" name="options-outlined" id={d+"-outlined"}  />
                    <label class="btn btn-outline-warning " for={d+"-outlined"}>{menu["staticValue"]["paymentmethod"][d]["name"]}</label>
                    &nbsp;
                    </>               
                )
            }    
            return <div className="d-flex justify-content-start mb-4">     
                    {rows}
                   </div>     
        }
        return <div className="d-flex justify-content-start mb-4">                
        <input type="radio" class="btn-check" name="options-outlined" id="bar-outlined"  />
        <label class="btn btn-outline-warning " for="bar-outlined">Bar</label>
        &nbsp;
        <input type="radio" class="btn-check" name="options-outlined" id="paypal-outlined" />
        <label class="btn btn-outline-warning" for="paypal-outlined">Paypal</label>
        &nbsp;
        <input type="radio" class="btn-check " name="options-outlined" id="DCcard-outlined" />
        <label style={{"fontSize":"0.6rem;"}}  class="btn btn-outline-warning " for="DCcard-outlined">Debit Card</label>
        &nbsp;
        <input type="radio" class="btn-check d-none" name="options-outlined" id="spea-outlined" />
        <label class="btn btn-outline-warning d-none" for="spea-outlined"></label>
    </div> 
    }    
    return <> <div className='list-group'>                
    <div className='list-group-item backgroundcart'>                
    <div className="d-flex justify-content-start mb-4">                
    Bezahlen mit:
    </div> 
    {CheckPaymentsTypes(menu)}                              
    </div>
    </div>
    <br/> 
    <button onClick={CheckOutBtn} className="btn btn-success col-12">      
      <span class="sr-only">
          Bezahlen
      </span>
      </button>                 
   </>    

}
export function CheckOptionsofDelivery ({MsgError,menu,settextabohlen,textabohlen,IsStoreOpenClose_Var}) {
    var [spaterodernow,setspaterodernow] = useState(IsStoreOpenClose_Var?"d-none":"");
    const onChangeToAbohlen=()=>{
        document.getElementById("success-outlined-abholen").checked=true;
        setdeliverytimes(<>{getTimesForDelivery(0)}</>) 
        settextabohlen(true)
        setspaterodernow("")
    }
    const onChangeToLiefern=()=>{
        if(IsStoreOpenClose_Var)
        setspaterodernow("d-none")

        setdeliverytimes(<>{getTimesForDelivery(1)}</>) 
        settextabohlen(false)
        
        //TODO setItemsContainer(<Items mSetContainer={mSetContainer} textabohlen={textabohlen} menu={menu} />)

    }
    
    const onChangeToDeliveryTime=()=>{
        setspaterodernow("")
    }
    const ConvertToMinuten_0_15_30_45=(datee)=>{
       /////////Convert Min to 0 or 15 or 30 or 45
       if(datee.getMinutes() > 0 && datee.getMinutes() < 15)
        datee.setMinutes(15)
        else if (datee.getMinutes() > 15 && datee.getMinutes() < 30)
        datee.setMinutes(30)
        else if (datee.getMinutes() > 30 && datee.getMinutes() < 45)
        datee.setMinutes(45)
        else if (datee.getMinutes() > 45)
        {
            datee.setMinutes(0)
            datee.setHours(datee.getHours()+1)   
        }
        return datee
    }
    const ConvertToMinuten_0_15_30_45_ForCloseTime=(datee)=>{
       /////////Convert Min to 0 or 15 or 30 or 45
       if(datee.getMinutes() > 0 && datee.getMinutes() < 15)
        datee.setMinutes(15)
        else if (datee.getMinutes() > 15 && datee.getMinutes() < 30)
        datee.setMinutes(30)
        else if (datee.getMinutes() > 30 && datee.getMinutes() < 45)
        datee.setMinutes(45)
        else if (datee.getMinutes() > 45)
         {
             datee.setMinutes(45)
         }

        //  if(datee.getHours() < 23)
        //  {
        //      datee.setHours(datee.getHours()+1)                    
        //      datee.setMinutes(0)
        //  }
        return datee
    }

    const getTimesForDelivery=(plustime)=>
    {
        var times = []

        times.push(
            <option value="" selected disabled>Gewünchte Zeit Wählen</option>
        )
       var datee = langswitch.getDateBerlin();
        
       datee= ConvertToMinuten_0_15_30_45(datee)

        datee.setHours(datee.getHours()+plustime)
        
        ///////Prepair CloseTime
        var closeTime = new Date()  
        var openTime = new Date()    
        
        const day = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][datee.getDay()]                      
        for(var daydd in menu["staticValue"]["opendays"])
        if(day == daydd)
        {
            if(Array.isArray(menu["staticValue"]["opendays"][day]))
             {
                for(var l in menu["staticValue"]["opendays"][day])    
                {
                    openTime.setHours(menu["staticValue"]["opendays"][day][l]["opentime"]["hour"]+1)
                    openTime.setMinutes(menu["staticValue"]["opendays"][day][l]["opentime"]["min"])
                    closeTime.setHours(menu["staticValue"]["opendays"][day][l]["closetime"]["hour"])
                    closeTime.setMinutes(menu["staticValue"]["opendays"][day][l]["closetime"]["min"])
                     
                    if(openTime>datee)
                    datee = openTime;                    
                closeTime= ConvertToMinuten_0_15_30_45_ForCloseTime(closeTime)
        
                if (closeTime.getFullYear() === datee.getFullYear() && 
                    closeTime.getMonth() === datee.getMonth() && 
                    closeTime.getDate() === datee.getDate())
                while(closeTime > datee)
                {
                    times.push(
                        <option value={datee.getTime()}>
                        {datee.getHours()+":"+(datee.getMinutes()<10?"0"+datee.getMinutes():datee.getMinutes())}
                        </option>
                        )
                    datee.setMinutes(datee.getMinutes()+3)
                    datee= ConvertToMinuten_0_15_30_45(datee)
                }     
                /////remove last time because it will be close time of the resturant
                times.pop()
                }   
             }
             else{
                openTime.setHours(menu["staticValue"]["opendays"][day]["opentime"]["hour"]+1)
                openTime.setMinutes(menu["staticValue"]["opendays"][day]["opentime"]["min"])
                closeTime.setHours(menu["staticValue"]["opendays"][day]["closetime"]["hour"])
                closeTime.setMinutes(menu["staticValue"]["opendays"][day]["closetime"]["min"])
             }            
        }   

        if(openTime>datee)
        datee = openTime;                    
    closeTime= ConvertToMinuten_0_15_30_45_ForCloseTime(closeTime)

    if (closeTime.getFullYear() === datee.getFullYear() && 
        closeTime.getMonth() === datee.getMonth() && 
        closeTime.getDate() === datee.getDate())
    while(closeTime > datee)
    {
        times.push(
            <option value={datee.getTime()}>
            {datee.getHours()+":"+(datee.getMinutes()<10?"0"+datee.getMinutes():datee.getMinutes())}
            </option>
            )
        datee.setMinutes(datee.getMinutes()+3)
        datee= ConvertToMinuten_0_15_30_45(datee)
    }     
    /////remove last time because it will be close time of the resturant
    times.pop()
       return times
    }
    var [deliverytimes,setdeliverytimes] = useState(getTimesForDelivery(1));            
     
    
    return <>
    <div className={`${"notshowabholdetails" in menu["staticValue"]?"d-none":""} list-group`}>                
    <div className='list-group-item backgroundcart'>  
    <div className="row mb-4 mt-2">
    <div className='col-12'>
            <h6>Möchten Sie:</h6>                        
            </div>                        
    <div className="col-12">                
                <input type="radio" class="btn-check" onClick={onChangeToLiefern} name="options-outlined-abholen" id="success-outlined-liefern"  checked/>
                <label class="btn btn-outline-warning" for="success-outlined-liefern">Liefern</label>
                &nbsp;
                <input type="radio" class="btn-check" name="options-outlined-abholen" id="success-outlined-abholen"  />
                <label class="btn btn-outline-warning" onClick={onChangeToAbohlen} for="success-outlined-abholen">Abholen</label>                        
    </div>
    </div>
    <div className="row mb-4 mt-2">
            <div className={textabohlen?"d-none":""}>
            <div className='col-12'>
            <h6>Lieferzeit wählen:</h6>                        
            </div>
            <div className="col-12">                
            {IsStoreOpenClose_Var?<>
                <input type="radio" class="btn-check" onClick={()=>{setspaterodernow("d-none")}} name="options-outlined-zeit" id="success-outlined-jetzt" autocomplete="off" checked/>
                <label class="btn btn-outline-warning" for="success-outlined-jetzt">Jetzt</label>
                &nbsp;</>:<></>}
                <input type="radio" class="btn-check" name="options-outlined-zeit" id="success-outlined-spater" autocomplete="off" checked={IsStoreOpenClose_Var?(spaterodernow==""?true:false):true}/>
                <label class="btn btn-outline-warning" onClick={()=>{onChangeToDeliveryTime()}} id="success-outlined-spater-label" for="success-outlined-spater">Später</label>                        
            </div>
            </div>
            <div className={`col-12 mt-2 ${spaterodernow}`}>
            <select class="form-select" id='selectedtimedelivery'>
                    {deliverytimes}
                    </select>         
                    
            </div>
    </div>
    </div>
    </div>
    <br/>
    <PaymentMethods spaterodernow={spaterodernow} textabohlen={textabohlen} MsgError={MsgError} menu={menu} />
    </>
}
export function Container({setContainerCartModal,setContainerCustimizeModal,mSetContainer,or,menu}){
    const [MsgError,setMsgError] = useState("")
    var [textabohlen,settextabohlen] = useState(false);
    const [AddAddressComponent,SetAddAddressComponent]=useState(<AddAddress textabohlen={textabohlen} menu={menu} mSetContainer={mSetContainer} setMsgError={setMsgError}/>)
    useEffect(()=>{
        SetAddAddressComponent(<AddAddress setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal} textabohlen={textabohlen} menu={menu} mSetContainer={mSetContainer} setMsgError={setMsgError}/>)
    },[textabohlen])
    
    return  <>   
            <div class="modal-header"> 
             <h3 className='m-0'>Warenkorb</h3>         
        <button type="button" class="btn-close " id={`btn-close-CartModal`} data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body" id="MainIdd"> 
    {AddAddressComponent}    
    <CheckOptionsofDelivery MsgError={MsgError} IsStoreOpenClose_Var={langswitch.checkOpenCloseStore(menu)} textabohlen={textabohlen} menu={menu} settextabohlen={settextabohlen}/>  
    </div>
    <div className={`loadingg  container mt-3 d-none`} id="SpinnerId">
    <div class="text-center d-flex justify-content-center">
    <div class="spinner-border text-primary" style={{"width":"5rem","height":"5rem"}} role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    </div>   
    </div>
    
</>
}




export function MenuIsReady ({mSetContainer,menu,setContainerCartModal,setContainerCustimizeModal}) {
    const [mContainer,SetContainer] = useState(<></>)
    useEffect(()=>{
        langswitch.GetJsonM("order").then((orders)=>{
            try {
                SetContainer(<Container setContainerCartModal={setContainerCartModal} setContainerCustimizeModal={setContainerCustimizeModal} or={orders} menu={menu} mSetContainer={mSetContainer}/>)
            } catch (error) {
            console.log(error)    
            window.location.href=langswitch.RouteP("")
            }})
    },[])
    return (
    <>
    {mContainer}   
    </>
    );
}

export default function Cart({mSetContainer,setContainerCartModal,setContainerCustimizeModal}) {  
    const [Container,SetContainer] = useState(<></>)
    useEffect(()=>{
        langswitch.GetJsonM("menu").then((menu)=>{
            try {
                SetContainer(<MenuIsReady setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal} menu={menu} mSetContainer={mSetContainer}/>)
            } catch (error) {
            console.log(error)    
            window.location.href=langswitch.RouteP("")
            }})
    },[])
    return (
    <>    
    {Container}   
    </>
    );
}