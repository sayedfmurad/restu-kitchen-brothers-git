import Head from 'next/head'
import React, { useState } from 'react';
import MyNavbar from "../components/navbar/MyNavbar"
import langswitch from '../components/Utils/langswitch'
import hash from "../components/Utils/object_hash"
import packagee from "../package.json"

export function Container(){
    const MyLang = langswitch.langswitchs("cart");
    var menu = {}
    var [pressed,setpressed] = useState(false);
    var [spinnerbar,setspinnerbar] = useState("d-none");
    var [spaterodernow,setspaterodernow] = useState("d-none");
    var rows = [];        
    var crows = [];
  
    if(process.browser)
    {   
        const startpay= ()=>{
            const urll = "https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws";
            let t = false;
            if(document.getElementById("bar-outlined").checked)
            t="bar";
            else if(document.getElementById("paypal-outlined").checked || document.getElementById("DCcard-outlined").checked|| document.getElementById("spea-outlined").checked|| document.getElementById("giropay-outlined").checked|| document.getElementById("sofort-outlined").checked)
            t="paypal";
            else 
            {
              alert("bitte wählen Sie eine Zahlungsmethode, Bar oder Paypal");
              return false;
            }
            
            setpressed(true);
            setspinnerbar("")
      
            var parms = {}
            var orders = langswitch.getJson("order")
            var address = langswitch.getJson("address")
            var seladd = langswitch.getValue("seladdress")
            var time =  new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }));           
            parms["type"] = t;
            parms["menu"] = menu["staticValue"]["menuurl"]
            parms["address"] = address[seladd];
            parms["orders"] = orders;
            if(!packagee["IsOut"])
            {
                parms["servertest"]=""
                parms["TestTelegram"]=""
                parms["istest"]=""
            }
            var TimeSettedDelivery=document.getElementById("selectedtimedelivery").value
            TimeSettedDelivery = spaterodernow == "d-none"?"":TimeSettedDelivery
            if (TimeSettedDelivery !="")
              parms["TimeSettedDelivery"]=TimeSettedDelivery
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
            })
            .then(data => { 
              if(data.body)
              {
                if(data.status != 200)
                throw new Error("Error");
                
                window.localStorage.setItem("mainorder",JSON.stringify(MainOrder));
                if(t=="bar")
                window.location.href=langswitch.RouteP("success");
                else if(t=="paypal")
                {
                    window.location.href=langswitch.RouteP(menu["staticValue"]["key"]+"-paypal");                    
                }                
              }
              else
              throw new Error("error");
            })
            .catch((error) => {            
              window.location.href=langswitch.RouteP("failure");
              langswitch.ClearAllData();       
              console.error('Error:', error);
            })
        }
        const menu = langswitch.getJson("menu")
        var addre=langswitch.getJson("address");
        var seladdre=langswitch.getValue("seladdress");
        const CheckOutBtn = e=>
        {
            if(langswitch.CheckMinPriceOrder(sum,menu)){
                var seladd = langswitch.getValue("seladdress")
                if(seladd != "")
                {
                var addobj = langswitch.getJson("address")
                if(addobj.hasOwnProperty(seladd))  
                    startpay()
                else
                alert(MyLang["Please Select an Address"])
                }
                else
                alert(MyLang["Please Select an Address"])
            }
        }
        const RemoveAllItmes = e=>{
            window.localStorage.setItem("order","{}");
            window.localStorage.setItem("sumprice","0,00");
            window.location.href=langswitch.RouteP("cart");
        };
        const RemoveItem= e=>{
            var tt = e.target.getAttribute("data-ordid");            
            var or = langswitch.getJson("order")
            
            delete or[tt];
            window.localStorage.setItem("order",JSON.stringify(or));
            window.location.href=langswitch.RouteP("cart");
        }        
        var or=langswitch.getJson("order");             
        var sum = 0
        for(var ke in or)
        { 
                        sum = parseFloat(sum) + parseFloat(langswitch.stof(or[ke]["price"])) 
                        var countI = <div className="mt-1 mb-1 col-4">{MyLang["count"]+": "+or[ke]["count"]}</div>;
                        var typee = or[ke]["type"] == "stand"?"":"("+or[ke]["type"]+") "
                        var descriptionO = menu["product"][or[ke]["id"]]["desO"] !=undefined?menu["product"][or[ke]["id"]]["desO"]:"";                        
                        var extras = ""
                        for(var j in or[ke]["extra"])
                        extras +=  langswitch.firstUpper(or[ke]["extra"][j][or[ke]["type"]]["name"])+" "

                        var option = []
                        for(var oobo in or[ke]["option"])                        
                        option.push(<>{langswitch.firstUpper(oobo)+" : "+langswitch.firstUpper(or[ke]["option"][oobo] )}<br/></>)
                        crows.push(
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className=''>{menu["product"][or[ke]["id"]]["name"]}&nbsp;({menu["product"][or[ke]["id"]]["section"]})&nbsp;{typee}</h6>
                                <small className='text-muted'>
                                {descriptionO==""?"":<>{descriptionO}<br/></>}
                                {countI}                         
                                {extras==""?"":<>{extras}<br/></>}
                                {option}
                                {or[ke]["msg"]==""?"":<>{or[ke]["msg"]}<br/></>}
                                </small>
                                <button data-ordid={ke} onClick={RemoveItem} type="button" class="mt-3 btn btn-outline-danger">Entfernen</button>
                                &nbsp;
                                <a  href={langswitch.RouteP("customizeorder?id="+or[ke]["id"]+"&"+"type="+or[ke]["type"]+"&"+"orderid="+ke)} class="mt-3 btn btn-outline-secondary">{MyLang["edit"]}</a>
                            </div>
                                <span className=' text-muted'>
                                {or[ke]["price"]}&nbsp;&euro;
                                </span>
                        </li>
                        )                          
        }                
        if(Object.keys(or).length == 0)
        rows.push(  <div className="row cosrow mb-2 p-3"><div className="col-12 text-center text">{MyLang["cart is empty"]}</div></div>)
        else
        {
            if(menu["rabat"]!="")
            {
                var rabb = sum*0.05
                sum = sum - rabb
                rabb = langswitch.ftos(rabb)            
                crows.push(
                    <li className="list-group-item d-flex justify-content-between lh-light">
                         <div className='text-success'>
                            <h6>Rabatt</h6>
                            <small>{menu['rabat']}%</small>
                         </div>                         
                         <span className="text-success">- {rabb}&nbsp;&euro;</span>                    
                    </li>
                    )
            }            

            if(Object.keys(addre).length !=0 && addre[seladdre]!=undefined)
            {
                sum+= addre[seladdre]['kosten'];
                crows.push(
                    <li className="list-group-item d-flex justify-content-between lh-light">
                        <div className=''><h6 className=''>{MyLang['delivery cost']}</h6></div>
                        <span className=' text-muted'>{addre[seladdre]['kosten']}&nbsp;&euro;                </span>                        
                        </li>
                        )
            }   
            sum = langswitch.ftos(sum)                     
            crows.push(
                <li className="list-group-item d-flex justify-content-between lh-light">
                <div className=''><h6 className=''>{MyLang["total including var"]}</h6></div>
                <span className=' text-muted'>{sum}&nbsp;&euro;                </span>                        
                </li> 
            )
            
            var addresses = langswitch.getJson("address")
            var seladd = langswitch.getValue("seladdress")
            if(seladd in addresses)
            {
                rows.push(<>
                    <div className='list-group'>                
                    <div className='list-group-item'>                
                    <div className="row mb-4">
                        <div className='col-12'>
                        <h6>Lieferaddresse :</h6>
                        </div>
                        <div className='col-12'>
                        <p style={{"fontSize":"0.7rem"}}>{addresses[seladd]["fname"]}&nbsp;{addresses[seladd]["lname"]}<br/>
                        {addresses[seladd]["street"]}&nbsp;{addresses[seladd]["housenumber"]}<br/>
                        {addresses[seladd]["city"]}&nbsp;{addresses[seladd]["zipc"]}<br/>
                        {addresses[seladd]["phonen"]}
                        </p>
                        </div>
                        <div className='col-12 align-items-center d-flex'>
                            <button className='btn btn-outline-primary'
                            onClick={()=>{
                                window.location.href =  langswitch.RouteP("addaddress")
                            }}
                            >ändern</button>
                        </div>
                    </div>
                    </div>
                    </div>
                    <br/>
                    </>
                    )
            }
            else{
                rows.push(<>
                    <div className='list-group'>                
                    <div className='list-group-item'>    
                    <h6>Lieferaddresse :</h6>                    
                    <p><button className='btn btn-primary'
                            onClick={()=>{
                                window.location.href =  langswitch.RouteP("addaddress")
                            }}
                            >eine Adresse auswänderen</button></p>
                    </div>  
                    </div>
                    <br/>
                    </>
                    )  
            }
            const onChangeToDelivery=()=>{
                document.getElementById("success-outlined-spater").checked=true;
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
            const getTimesForDelivery=()=>
            {
                var times = []
                times.push(
                    <option value="" selected disabled>Gewünchte Zeit Wählen</option>
                )
               var datee = langswitch.getDateBerlin();
                
               datee= ConvertToMinuten_0_15_30_45(datee)

                datee.setHours(datee.getHours()+2)
                
                ///////Prepair CloseTime
                var closeTime = new Date()                
                const day = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][datee.getDay()]                      
                for(var daydd in menu["staticValue"]["opendays"])
                if(day == daydd)
                {
                    closeTime.setHours(menu["staticValue"]["opendays"][day]["closetime"]["hour"])
                    closeTime.setMinutes(menu["staticValue"]["opendays"][day]["closetime"]["min"])
                }   
                
                closeTime= ConvertToMinuten_0_15_30_45(closeTime)
                
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
            rows.push(
                <>
                <div className='list-group'>                
                <div className='list-group-item'>                
                <div className="row mb-4 g-3">
                        <div className='col-12'>
                        <h6>Lieferzeit wählen:</h6>                        
                        </div>
                        <div className="col-12">                
                            <input type="radio" class="btn-check" onClick={()=>{setspaterodernow("d-none")}} name="options-outlined-zeit" id="success-outlined-jetzt" autocomplete="off" checked/>
                            <label class="btn btn-outline-success" for="success-outlined-jetzt">Jetzt</label>
                            &nbsp;
                            <input type="radio" class="btn-check" name="options-outlined-zeit" id="success-outlined-spater" autocomplete="off" />
                            <label class="btn btn-outline-success" onClick={onChangeToDelivery} for="success-outlined-spater">Später</label>                        
                        </div>
                        <div className={`col-12 ${spaterodernow}`}>
                        <select class="form-select" id='selectedtimedelivery'>
                                {getTimesForDelivery()}
                                </select>         
                                
                        </div>
                </div>
                </div>
                </div>
                <br/>
                </>
            )

            rows.push(<>
            <div className='list-group'>                
            <div className='list-group-item'>                
            <div className="d-flex justify-content-start mb-4">                
            Bezahlen mit:
            </div>
            <div className="d-flex justify-content-start mb-4">                
                <input type="radio" class="btn-check" name="options-outlined" id="bar-outlined"  />
                <label class="btn btn-outline-warning text-black" for="bar-outlined">Bar</label>
                &nbsp;
                <input type="radio" class="btn-check" name="options-outlined" id="paypal-outlined" />
                <label class="btn btn-outline-warning" for="paypal-outlined"><img height="15px" src="./Images/paypalsvg.svg"/></label>
                &nbsp;
                <input type="radio" class="btn-check" name="options-outlined" id="DCcard-outlined" />
                <label style={{"fontSize":"0.6rem;"}}  class="btn btn-outline-warning text-black" for="DCcard-outlined">Debit Card</label>
                &nbsp;
                </div>            
                <div className="d-flex justify-content-start mb-4">                
                <input type="radio" class="btn-check" name="options-outlined" id="spea-outlined" />
                <label class="btn btn-outline-warning" for="spea-outlined"><img height="15px" src="./Images/spea.svg"/></label>
                &nbsp;
                <input type="radio" class="btn-check" name="options-outlined" id="giropay-outlined" />
                <label class="btn btn-outline-warning" for="giropay-outlined"><img height="25px" src="./Images/giropay.svg"/></label>
                &nbsp;
                <input type="radio" class="btn-check" name="options-outlined" id="sofort-outlined" />
                <label class="btn btn-outline-warning" for="sofort-outlined"><img height="25px" src="./Images/sofortsvg.svg"/></label>
            </div>            
            </div>
            </div>
            <br/>
            </>
            )
            rows.push(
                <div className="d-flex justify-content-end mb-4">                
                  <button onClick={CheckOutBtn} className="btn btn-success" disabled={pressed}>
                    <span class={`spinner-border spinner-border-sm ${spinnerbar}`} role="status" aria-hidden="true"></span>
                    <span class="sr-only">
                        Bezahlen
                    </span>
                    </button>                 
                 </div>
            )


        }
        
        window.localStorage.setItem("sumprice",sum);
    }
    

    return    <div className="container mt-3 ">
    <ul className='list-group mb-3'>
    {crows}
    </ul>
    {rows}    
</div>
}

export default function Cart() {
    const MyLang = langswitch.langswitchs("cart");
    
    return (
    <>
    <Head>
    <title>{MyLang["title"]}</title>
    <link href="./mystyles/cart.css" rel="stylesheet" />
    </Head>
    <MyNavbar/>
    <Container/>
    </>
    );
}