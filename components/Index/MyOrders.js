import { useState ,useEffect} from "react";
import langswitch from "../Utils/langswitch"
let SendFlag = false
import packagee from "../../package.json"

const SendToServerToConfiremThePaypalOrder = (menu)=>{
    let mObj= langswitch.ReturnGetPar()
    let payid = mObj.get("paymentId")
    let payerid = mObj.get("PayerID")
    if(payid==""||payid==null||payerid==""||payerid==null)
    return false
    


    const urll="https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws"
                let mheaders = new Headers();
                mheaders.append('Origin','*');
                fetch(urll, {
                  method: 'POST', // or 'PUT'
                  headers: mheaders,
                  body: JSON.stringify(
                    !packagee["IsOut"]?
                    {"test":"","payerid":payerid,"payid":payid,"key":menu["staticValue"]["key"]}:
                    {"payerid":payerid,"payid":payid,"key":menu["staticValue"]["key"]}
                    )
                })                  
}
export function IsPaymentSuccess(menu){
    SendToServerToConfiremThePaypalOrder(menu)
    var MainOrders = langswitch.getJson("mainorder")
    var LastOrderId = langswitch.getValue("lastOrderId")
    if(LastOrderId in MainOrders)
    {
        if(!MainOrders[LastOrderId]["paid"])
        if(document.getElementById("ShowSuccessMyOrder"))
        document.getElementById("ShowSuccessMyOrder").classList.remove("d-none")
        MainOrders[LastOrderId]["showBrowserPaid"]=true
        window.localStorage.setItem("mainorder",JSON.stringify(MainOrders))
    }


    if(document.getElementById("btn-close-CartModal"))
    document.getElementById("btn-close-CartModal").click()
    window.localStorage.setItem("order","{}");
    window.localStorage.setItem("sumprice","0,00");
    menu.setsum("0,00")

    
    
    CheckingIftoSend(menu)

    if(LastOrderId in MainOrders)
    {       
        var dmd = new Date(MainOrders[LastOrderId]['createtime'])
        var ndmd =  new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }))
        //check the different between the time of the order and the current time in min
        var diff = (ndmd - dmd) / 60000;
        if(diff<5)
        {
            var myModal = new bootstrap.Modal(document.getElementById("MyOrderModal"), {
                    keyboard: true
                  })    
                  myModal.show()  
                history.pushState({}, '');
        }
    }

}

export function CheckingIftoSend (menu) {
    menu.StartFetchingOrders = true
    StartChecking(menu)
    setInterval(() => {
    if(menu.StartFetchingOrders)
    StartChecking(menu)        
    }, 3000);
}

function StartChecking (menu) {
    document.getElementById("SpinnerIdMyOrder").classList.remove("d-none")
    var orders = langswitch.getJson("mainorder");
    var objtosend = []
    for(var dd in orders)
    {
      var dmd = new Date(orders[dd]['createtime'])
      var ndmd =  new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }))        
      if(dmd.getDay()!=ndmd.getDay())
      delete orders[dd]
      else
      {
        if(orders[dd]["time"]=="")
            objtosend.push(orders[dd]["MainId"])            
      }         
    }
    window.localStorage.setItem("mainorder",JSON.stringify(orders))
    
    if(Object.keys( objtosend).length==0 )
    LastStep(menu,orders)
    else
    Fetching(menu,orders,objtosend)

}
function Fetching (menu,orders,objtosend) {
    menu.StartFetchingOrders = false
    

    // grecaptcha.ready(function() {
    //   grecaptcha.execute('reCAPTCHA_site_key', {action: 'submit'}).then(function(token) {
    //   });
    // });
                const urll="https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws"
                let mheaders = new Headers();
                mheaders.append('Origin','*');
                fetch(urll, {
                  method: 'POST', // or 'PUT'
                  headers: mheaders,
                  body: JSON.stringify({"ids":objtosend})
                }).then(response => {
                  if(response.status==400)
                  {
                  window.localStorage.setItem("mainorder",JSON.stringify({}))
                  LastStep(menu,orders)
                  }
                  else if(response.status==200)
                  {
                    response.json().then(result => {
                      for(var dl in result)
                      {
                        orders[dl]["time"]=result[dl]["time"]
                        orders[dl]["paid"]=result[dl]["paid"]
                        if("islate" in result[dl])
                        orders[dl]["islate"]=result[dl]["islate"]
                      }                        
                      window.localStorage.setItem("mainorder",JSON.stringify(orders) )
                      LastStep(menu,orders)
                    })
                    .catch(error => {
                      console.error('Error:', error);
                      window.localStorage.setItem("mainorder",JSON.stringify({}))
                        window.location.reload()                      
                    })
                  }
                  
                }).catch(error => {
                    console.error('Error:', error);
                    window.localStorage.setItem("mainorder",JSON.stringify({}))
                      window.location.reload()                      
                  })
      
}   
function LastStep(menu,orders) {      

        var mrows = []    
        for(var lll in orders)   
        if("showBrowserPaid" in orders[lll] || orders[lll]["paid"])     
        {        
        
        var or=orders[lll]   
        var crows = [];
        var sum = 0

        crows.push(
            <li style={{"backgroundColor":(or["time"]!=""?"#00e53075":"")}} id={`MyorderIdTimeHeader${or["MainId"]}`} className="list-group-item d-flex justify-content-between lh-light ">
                <h6 className=''>{"abhol" in or ? "Abholung" : "Lieferung"}</h6>
                <h6 className=''>Heute&nbsp;{langswitch.getStringFormTimefromTimeStamp(new Date(or["createtime"]) ) }</h6>
            </li> 
        )

        crows.push(
            <li className="list-group-item d-flex justify-content-between lh-light">
            <div className="row mb-4">
                        <div className='col-12'><h6 className=''>Bestätigte Zeit:</h6></div>
                        <div  id={`MyorderIdTime${or["MainId"]}`} className={`col-12 ${or["time"]==""?"text-primary":"text-success"}`} style={{"fontSize":"1rem"}}>
                            <strong id={`MyorderIdTimeSpan${or["MainId"]}`}>
                                {or["time"]==""?"Ihre bestellung wurde entgegengenommen, wir melden uns in kürze":
                                (
                                  "islate" in or ? "Bestellung verzögert bis "+or["time"]+". Entschuldigung.":or["time"]
                                )
                                }
                            </strong></div>
                        </div>
            </li>
        )
        for(var ke in or["orders"]  )
        { 
                        sum = parseFloat(sum) + parseFloat(langswitch.stof(or["orders"][ke]["price"])) 
                        var countI = <div className="mt-1 mb-1 col-4">{menu.MyLang["orders"]["count"]+": "+or["orders"][ke]["count"]}</div>;
                        var typee = or["orders"][ke]["type"] == "stand"?"":"("+or["orders"][ke]["type"]+") "
                        var descriptionO = menu["product"][or["orders"][ke]["id"]]["desO"] !=undefined?menu["product"][or["orders"][ke]["id"]]["desO"]:"";                        
                        var extras = ""
                        for(var j in or["orders"][ke]["extra"])
                        extras +=  langswitch.firstUpper(or["orders"][ke]["extra"][j][or["orders"][ke]["type"]]["name"])+" "

                        var option = []
                        for(var oobo in or["orders"][ke]["option"])                        
                        option.push(<>{langswitch.firstUpper(oobo)+" : "+langswitch.firstUpper(or["orders"][ke]["option"][oobo])}<br/></>)
                        crows.push(
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className=''>{menu["product"][or["orders"][ke]["id"]]["name"]}&nbsp;({menu["product"][or["orders"][ke]["id"]]["section"]})&nbsp;{typee}</h6>
                                <small className=''>
                                {descriptionO==""?"":<>{descriptionO}<br/></>}
                                {countI}                         
                                {extras==""?"":<>{extras}<br/></>}
                                {option}
                                {or["orders"][ke]["msg"]==""?"":<>{or["orders"][ke]["msg"]}<br/></>}
                                </small>
                            </div>
                                <span className=' '>
                                {or["orders"][ke]["price"]}&nbsp;&euro;
                                </span>
                        </li>
                        )                          
        } 

                
                if(!("abhol" in or) )
                {
                    sum+= or["address"]['kosten'];
                    crows.push(
                        <>
                        <li className="list-group-item d-flex justify-content-between lh-light">
                            <div className=''><h6 className=''>{menu.MyLang["orders"]['delivery cost']}</h6></div>
                            <span className=' '>{or["address"]['kosten']}&nbsp;&euro;                </span>                        
                            </li>
                              <li className="list-group-item d-flex justify-content-between lh-light">
                             <div className="row mb-4">
                             <div className='col-12'>
                             <h6>Lieferaddresse :</h6>
                             </div>
                             <div className='col-12'>
                             <p style={{"fontSize":"0.7rem"}}>{or["address"]["fname"]}&nbsp;{or["address"]["lname"]}<br/>
                             {or["address"]["street"]}&nbsp;{or["address"]["housenumber"]}<br/>
                             {or["address"]["city"]}&nbsp;{or["address"]["zipc"]}<br/>
                             {or["address"]["phonen"]}
                             </p>
                             </div>
                             </div>
                             </li>
                             </>
                            )
                }
                if(menu["rabat"]!="")
                {
                    var rabb = sum*(parseInt(menu["rabat"]))/100
                    sum = sum - rabb
                    rabb = langswitch.ftos(rabb)            
                    crows.push(
                        <li className="list-group-item d-flex justify-content-between lh-light">
                            <div className='text-success'>
                                <h6>Rabatt %{menu['rabat']}</h6>
                            </div>                         
                            <span className="text-success">- {rabb}&nbsp;&euro;</span>                    
                        </li>
                        )
                }
            sum = langswitch.ftos(sum)                     
            crows.push(
                <li className="list-group-item d-flex justify-content-between lh-light">
                <div className=''><h6 className=''>{menu.MyLang["orders"]["total including var"]}</h6></div>
                <span className=' '>{sum}&nbsp;&euro;                </span>                        
                </li> 
            )

            mrows.push(
                <ul className='list-group mb-3'>
                {crows}
                </ul>
            )
        }
        mrows.reverse()
        
        if(mrows.length == 0)
        mrows.push(
            <ul className='list-group backgroundcart mb-3'>
            <li className="list-group-item d-flex justify-content-between lh-light">
                <h6>Es gibt keine Bestellungen</h6>
            </li>
            </ul>
        )
       
    menu.SetmOrders(mrows)
    menu.StartFetchingOrders = true
    document.getElementById("SpinnerIdMyOrder").classList.add("d-none")
}


export default function Show({menu}){ 
    const [mOrders,SetmOrders]=useState(<></>)
    const MyLang = langswitch.langswitchs("orders");
    menu.MyLang={}
    menu.MyLang["orders"]=MyLang
    menu["SetmOrders"]=SetmOrders
    return <>
    <div class="modal-header " style={{"height":"4rem"}}>  
           <h3 className='m-0' style={{fontSize:"1.2rem"}}>Meine Bestellungen</h3>  
           &nbsp;&nbsp;                                      
            <div id="SpinnerIdMyOrder" class="spinner-border text-primary"  role="status">
                <span class="visually-hidden">Loading...</span>
            </div>               
            <button type="button" class="btn-close " id={`btn-close-MyOrderModal`} data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style={{"backgroundColor":"#fff"}}> 
        
            <div id="ShowSuccessMyOrder" className="alert alert-success rounded-0 d-none">
                Ihre Bestellung wurde übermittelt. Sie erhalten in Kürze eine SMS mit der voraussichtlichen Ankunftszeit Ihrer Bestellung. Alternativ können Sie diese unter „Meine Bestellungen“ selber überprüfen.
            </div>        
            {mOrders}
        </div>
        </>    
}