import Head from 'next/head'
import React, { useState } from 'react';
import MyNavbar from "../components/TopBar/TobBar2"
import langswitch from '../components/Utils/langswitch'

export function Container(){
    const MyLang = langswitch.langswitchs("orders");

    const [Outmrows,setOutmrows] = useState(<></>)
    var mrows = [];

    const MenuReady = (menu)=>{

        var orders = langswitch.getJson("mainorder");
        setTimeout(function(){
            window.location.href=langswitch.RouteP("updatesmainorders");
         }, 20000);

        for(var lll in orders)
        if("paid" in orders[lll])       
        if(orders[lll]["paid"])       
        {        
        var or=orders[lll]   
        var crows = [];
        var sum = 0

        crows.push(
            <li className="list-group-item d-flex justify-content-between lh-light">
            <div className=''><h6 className=''>{"abhol" in or ? "Abholung" : "Lieferung"}</h6></div>
            </li> 
        )

        crows.push(
            <li className="list-group-item d-flex justify-content-between lh-light">
            <div className="row mb-4">
                        <div className='col-12'><h6 className=''>Bestätigte Zeit:</h6></div>
                        <div className={`col-12 ${or["time"]==""?"text-warning":"text-success"}`} style={{"fontSize":"0.85rem"}}>{or["time"]==""?"Ihre bestellung wurde entgegengenommen, wir melden uns in kürze":or["time"]}</div>
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
                                <small className='text-muted'>
                                {descriptionO==""?"":<>{descriptionO}<br/></>}
                                {countI}                         
                                {extras==""?"":<>{extras}<br/></>}
                                {option}
                                {or["orders"][ke]["msg"]==""?"":<>{or["orders"][ke]["msg"]}<br/></>}
                                </small>
                            </div>
                                <span className=' text-muted'>
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
                            <span className=' text-muted'>{or["address"]['kosten']}&nbsp;&euro;                </span>                        
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
                <span className=' text-muted'>{sum}&nbsp;&euro;                </span>                        
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
            <ul className='list-group mb-3'>
            <li className="list-group-item d-flex justify-content-between lh-light">
                <h6>Es gibt keine Bestellungen</h6>
            </li>
            </ul>
        )

        setTimeout(()=>{setOutmrows(mrows)}, 100);
        
    }
    if(process.browser){
        const menu = langswitch.getJson("menu")
        setTimeout(MenuReady(menu), 100);
    }    
    return (
        <div className="container mt-3 ">
        {Outmrows} 
    </div>
    )
}

export default function A() {
    const MyLang = langswitch.langswitchs("orders");
  
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