import { useState ,useEffect} from "react";
import langswitch from "../Utils/langswitch"

function CheckingIftoSend () {
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
        {
            if(orders[dd]["type"]=="bar")                
            objtosend.push(orders[dd]["MainId"])
            else if(orders[dd]["paid"]=="true"||orders[dd]["paid"]==true)
            objtosend.push(orders[dd]["MainId"])

        }
      }         
    }
    window.localStorage.setItem("mainorder",JSON.stringify(orders))

    if(Object.keys( objtosend).length==0 )
    return orders
    
    return Fetching(orders,objtosend)

}
function Fetching (orders,objtosend) {
    
    

    // grecaptcha.ready(function() {
    //   grecaptcha.execute('reCAPTCHA_site_key', {action: 'submit'}).then(function(token) {
    //       // console.log(token)
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
                  localStorage.setItem("mainorder",JSON.stringify({}))
                  window.location.href=langswitch.RouteP("orders");
                  }
                  else if(response.status==200)
                  {
                    response.json().then(result => {
                      for(var dl in result)
                      {
                        orders[dl]["time"]=result[dl]["time"]
                        orders[dl]["paid"]=result[dl]["paid"]
                      }                        
                      localStorage.setItem("mainorder",JSON.stringify(orders) )
                      
                    })
                    .catch(error => {
                      console.error('Error:', error);
                      localStorage.setItem("mainorder",JSON.stringify({}))
                      
                    })
                  }
                  
                })
                return orders    
      
}

function HandleTheTimes () {
    
    
    if(document.getElementById("SpinnerIdMyOrder"))
    if(document.getElementById("SpinnerIdMyOrder").classList.contains("d-none"))
    {
        document.getElementById("SpinnerIdMyOrder").classList.remove("d-none")
        var or = CheckingIftoSend() 
        for(var lll in or)
        {
            if(or[lll]["time"]!="")
            {
            var dgs=document.getElementById("MyorderIdTime"+or[lll]["MainId"])
            var dgv=document.getElementById("MyorderIdTimeHeader"+or[lll]["MainId"])
            var dg=document.getElementById("MyorderIdTimeSpan"+or[lll]["MainId"])
            if(dg)
            {
                    dgv.style.backgroundColor= "#00e53075";

                    dgs.classList.remove("text-primary")
                    dgs.classList.add("text-success")
                    dg.innerText=or[lll]["time"]
                }
            }
        }
        document.getElementById("SpinnerIdMyOrder").classList.add("d-none")
    }
    }
    
export function Orders ({orders,menu}) {  
    const MyLang = langswitch.langswitchs("orders");



        var mrows = []    
        for(var lll in orders)
        if("paid" in orders[lll])       
        if(orders[lll]["paid"])       
        {        
        var or=orders[lll]   
        var crows = [];
        var sum = 0

        crows.push(
            <li id={`MyorderIdTimeHeader${or["MainId"]}`} className="list-group-item d-flex justify-content-between lh-light">
            <div className=''><h6 className=''>{"abhol" in or ? "Abholung" : "Lieferung"}</h6></div>
            </li> 
        )

        crows.push(
            <li className="list-group-item d-flex justify-content-between lh-light">
            <div className="row mb-4">
                        <div className='col-12'><h6 className=''>Bestätigte Zeit:</h6></div>
                        <div  id={`MyorderIdTime${or["MainId"]}`} className={`col-12 ${or["time"]==""?"text-primary":"text-success"}`} style={{"fontSize":"1rem"}}><strong id={`MyorderIdTimeSpan${or["MainId"]}`}>{or["time"]==""?"Ihre bestellung wurde entgegengenommen, wir melden uns in kürze":or["time"]}</strong></div>
                        </div>
            </li>
        )
        for(var ke in or["orders"]  )
        { 
                        sum = parseFloat(sum) + parseFloat(langswitch.stof(or["orders"][ke]["price"])) 
                        var countI = <div className="mt-1 mb-1 col-4">{MyLang["count"]+": "+or["orders"][ke]["count"]}</div>;
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
                            <div className=''><h6 className=''>{MyLang['delivery cost']}</h6></div>
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
                <div className=''><h6 className=''>{MyLang["total including var"]}</h6></div>
                <span className=' '>{sum}&nbsp;&euro;                </span>                        
                </li> 
            )

           
            mrows.push(
                <ul className='list-group mb-3'>
                {crows}
                </ul>
            )
        }
        
        if(mrows.length == 0)
        mrows.push(
            <ul className='list-group backgroundcart mb-3'>
            <li className="list-group-item d-flex justify-content-between lh-light">
                <h6>Es gibt keine Bestellungen</h6>
            </li>
            </ul>
        )

        if(document.getElementById("SpinnerIdMyOrder"))
        document.getElementById("SpinnerIdMyOrder").classList.add("d-none")
        setInterval(() => {
            HandleTheTimes()
        }, 5000);
    return <>{mrows}</>
}

export default({menu})=>{
    const [Container,SetContainer] = useState(<></>      
    )


    useEffect(()=>{
        SetContainer(<Orders menu={menu} orders={CheckingIftoSend()}/>)
        
      },[])

    return <>
    <div class="modal-header ">  
       <h3 className='m-0'>Meine Bestellungen</h3>                                        
        <button type="button" class="btn-close " id={`btn-close-MyOrderModal`} data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
      <div class="modal-body" style={{"backgroundColor":"#fff"}}> 
        <div class="text-center d-flex justify-content-center mb-4" id="SpinnerIdMyOrder">
        <div class="spinner-border text-primary" style={{"width":"5rem","height":"5rem"}} role="status">
            <span class="visually-hidden">Loading...</span>
        </div>   
        </div>     
        {Container}
    </div>
    </>
}