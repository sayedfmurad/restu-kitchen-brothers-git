import React, { useEffect, useState } from 'react';
import langswitch from '../Utils/langswitch'
import hash from "../Utils/object_hash"
import packagee from "../../package.json"
import AddAddress from "../Cart/addaddress"
import {IsPaymentSuccess} from "./MyOrders"
import {UnstyledTabsIntroductionTimes,UnstyledTabsIntroduction} from '../Cart/Tabs';
import PaymentMethods2 from '../Cart/PaymentMethods2';
export function PaymentMethods ({spaterodernow,textabohlen,menu,MsgError}) {
    const MyLang = langswitch.langswitchs("cart")
    const startpay= ()=>{
            
            
        // if(typeof document.getElementById("bar-outlined") !== "undefined")
        let paymenttypeSelect = menu["order"]["paymentmethod"];
        if(!(paymenttypeSelect in menu["staticValue"]["paymentmethod"]))
        {alert("bitte wählen Sie eine Zahlungsmethode");return false;}
                
        
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
        parms["type"] = paymenttypeSelect;
        if(parms["type"]=="paypal")
        {
            const hostname = window.location.hostname;
            const isOutPackage= packagee["IsOut"]?".html":""
          
            parms["successurl"] = "https://"+hostname+"/?p=success"
            if(! packagee["IsOut"])
            parms["successurl"] = "http://"+hostname+":3000/?p=success"
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
        fetch(packagee["server"]["payment"], {
          method: 'POST', // or 'PUT'
          headers: mheaders,
          body: parms
        }).then(response => {
            if(response.status != 200)
            throw new Error("Error");
            return response.json();
          }).then(data => {                                                      
            window.localStorage.setItem("mainorder",JSON.stringify(MainOrder));
            if(paymenttypeSelect=="paypal")
            {
                if("paypalurl" in data)
                window.location.href=data["paypalurl"] 
            }else                
                setTimeout(() => {
                    IsPaymentSuccess(menu)
                }, 500);
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


            try {
                var addobj = langswitch.getJson("address")
                if(addobj.hasOwnProperty(seladd))
                startpay()
                else{
                    throw new Error("No Address Found");
                }
            } catch (error) {
                if(error.toLocaleString()=="Error: No Address Found")
                {
                    var elementt = document.getElementById("address-input")
                    elementt.scrollIntoView({ behavior: "smooth", block: "start" });
                    elementt.focus()   
                    alert(MyLang["Please Select an Address"])
                }
                else{
                    console.log(error);
                }
                
            }
        }
        try {
            if(menu.order.type=="Abholen")  
            PassedSomeRules()  
            else if(langswitch.CheckMinPriceOrder(langswitch.getNum("sumprice")  ,menu))
            PassedSomeRules()
        } catch (error) {
            console.log(error);
        }
           
                    
    } 
    return <PaymentMethods2 CheckOutBtn={CheckOutBtn} menu={menu} />  

}
export function CheckOptionsofDelivery ({MsgError,menu,settextabohlen,textabohlen,IsStoreOpenClose_Var}) {
    var [spaterodernow,setspaterodernow] = useState(IsStoreOpenClose_Var?"d-none":"");
    const onChangeToAbohlen=()=>{
        // document.getElementById("success-outlined-abholen").checked=true;
        setdeliverytimes(<>{getTimesForDelivery(15)}</>) 
        settextabohlen(true)
        setspaterodernow("")
    }
    const onChangeToLiefern=()=>{
        if(IsStoreOpenClose_Var)
        setspaterodernow("d-none")

        setdeliverytimes(<>{getTimesForDelivery(45)}</>) 
        settextabohlen(false)
        

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
    function isInOpenHours(date, openTimesV2) {
        // Parse the date to get day, hour, and minute
        const openDays = ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const day = openDays[date.getDay()]
        const hour = date.getHours();
        const minute = date.getMinutes();
        for(let s in openTimesV2)
        {
            if(openTimesV2[s]["days"].includes(day))
            for(let g in openTimesV2[s]["times"])
            {
                const { opentime, closetime } = openTimesV2[s]["times"][g];
                const openHour = opentime.hour;
                const openMinute = opentime.min;
                const closeHour = closetime.hour;
                const closeMinute = closetime.min;
                const OpenDate = new Date(date.getFullYear(),
                                       date.getMonth(),
                                       date.getDate(),
                                       openHour,openMinute)
                const CloseDate = new Date(date.getFullYear(),
                                       date.getMonth(),
                                       date.getDate(),
                                       closeHour,closeMinute)
                if(date >= OpenDate && date <= CloseDate)
                {
                    return true
                }
            }
        }
    
        return false; // Date is not within any open time range
    }
    function getFormattedDate(currentDate) {
    
        // Extract day, month, and year
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
        var year = currentDate.getFullYear();
    
        // Pad single-digit day and month with leading zero if needed
        day = (day < 10 ? '0' : '') + day;
        month = (month < 10 ? '0' : '') + month;
    
        // Construct the formatted date string
        var formattedDate = day + '.' + month + '.' + year;
    
        return formattedDate;
    }
    const getTimesForDeliveryV2 = (plustime,opendaysV2) => {
        var times = [];
        let CountCheckPlusTime = 0
        plustime = parseFloat(plustime/15)
        times.push(
            <option value="" selected disabled>Gewünchte Zeit Wählen</option>
            );
            
            var DateNow = langswitch.getDateBerlin();
            var dateeStart = langswitch.getDateBerlin();
            let DayCheckPlusTime = dateeStart.getDate()

        const openDays = ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        for(let sm in opendaysV2)
        if(opendaysV2[sm]["days"].includes(openDays[dateeStart.getDay()]))
        {
                dateeStart = ConvertToMinuten_0_15_30_45(dateeStart);
                dateeStart.setMinutes(dateeStart.getMinutes());
                var dateeEnd = new Date(dateeStart.getTime() + (20 * 60 * 60 * 1000));
                dateeEnd = ConvertToMinuten_0_15_30_45(dateeEnd);  
                while(dateeStart < dateeEnd)
                {
                    if(DayCheckPlusTime<dateeStart.getDate())
                    {CountCheckPlusTime = 0;DayCheckPlusTime = dateeStart.getDate();}
                    let checkk = isInOpenHours(dateeStart, menu["staticValue"]["opendaysV2"])
                    if(checkk)
                    {
                        if(CountCheckPlusTime < plustime)
                        CountCheckPlusTime++
                        else
                        {   

                            times.push(
                            <option value={dateeStart.getTime()}>
                            {dateeStart.getHours()+":"+(dateeStart.getMinutes()<10?"0"+dateeStart.getMinutes():dateeStart.getMinutes())}
                            {DateNow.getDay() == dateeStart.getDay()?"":" ("+getFormattedDate(dateeStart)+")"}
                            </option>
                            )
                        }
                    }

                    
                    dateeStart.setMinutes(dateeStart.getMinutes()+15)
                } 
        }        
        return times;
    }
    
    
    const getTimesForDelivery=(plustime)=>
    {   
        if("opendaysV2" in menu["staticValue"])
        return getTimesForDeliveryV2(plustime, menu["staticValue"]["opendaysV2"])
        var times = []

        times.push(
            <option value="" selected disabled>Gewünchte Zeit Wählen</option>
        )
       var datee = langswitch.getDateBerlin();
        
       datee= ConvertToMinuten_0_15_30_45(datee)

        datee.setMinutes(datee.getMinutes()+plustime)
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
                openTime.setHours(menu["staticValue"]["opendays"][day]["opentime"]["hour"])
                openTime.setMinutes(menu["staticValue"]["opendays"][day]["opentime"]["min"])
                closeTime.setHours(menu["staticValue"]["opendays"][day]["closetime"]["hour"])
                closeTime.setMinutes(menu["staticValue"]["opendays"][day]["closetime"]["min"])
             }            
        }           
        if(openTime>datee)
        {            
            datee = openTime;                    
            datee.setMinutes(datee.getMinutes()+plustime)            
        }
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
    var [deliverytimes,setdeliverytimes] = useState(getTimesForDelivery(45));            
     
    
    return <>
    <div className={`${"notshowabholdetails" in menu["staticValue"]?"d-none":""} list-group`}>                
    <div className='list-group-item backgroundcart'>  
    <div className='d-flex jusify-content-start col-12'>
        <h6>Möchten Sie:</h6>
    </div>
    <div className='d-flex jusify-content-start col-12'>
    <UnstyledTabsIntroduction setspaterodernow={setspaterodernow} obj={menu} onChangeToLiefern={onChangeToLiefern} onChangeToAbohlen={onChangeToAbohlen}/>             
    </div>
        <div className={textabohlen?"d-none":""}>
        <div className='d-flex jusify-content-start col-12'>
                <h6>Lieferzeit wählen:</h6>                        
        </div>
        <div className='d-flex jusify-content-start col-12'>
                {IsStoreOpenClose_Var&&
                <> <UnstyledTabsIntroductionTimes obj={menu} setspaterodernow={setspaterodernow} onChangeToDeliveryTime={onChangeToDeliveryTime}/>
                </>}
        </div>
        </div>       
        <div className='d-flex jusify-content-start col-12'>
                <div className={`mt-2 ${spaterodernow}`} style={{width:"245px"}}>
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
export default function Container({menu}){
    const [MsgError,setMsgError] = useState("")
    var [textabohlen,settextabohlen] = useState(false);
    const [AddAddressComponent,SetAddAddressComponent]=useState(<AddAddress textabohlen={textabohlen} menu={menu} setMsgError={setMsgError}/>)
    useEffect(()=>{
        SetAddAddressComponent(<AddAddress setContainerCustimizeModal={menu.setContainerCustimizeModal} setContainerCartModal={menu.setContainerCartModal} textabohlen={textabohlen} menu={menu} setMsgError={setMsgError}/>)
    },[textabohlen])
    
    return  <>   
            <div class="modal-header"> 
             <h3 className='m-0'>Warenkorb</h3>         
        <button type="button" class="btn-close " id={`btn-close-CartModal`} data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body" > 
    <div id="MainIdd">
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
    </div>
   
    
</>
}






