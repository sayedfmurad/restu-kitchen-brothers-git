import Head from 'next/head'
import React, { useState } from 'react';
import MyNavbar from "../components/navbar/MyNavbar"
import menu from "../public/database/menu.json"
import langswitch from '../components/Utils/langswitch'
import Checkaddressselected from '../components/Cart/checkaddressselected'
export default function Cart() {
    const MyLang = langswitch.langswitchs("cart");
    var rows = [];        
    var crows = [];
    if(process.browser)
    {        
        var addre=langswitch.getJson("address");
        var seladdre=langswitch.getValue("seladdress");
        const CheckOutBtn = e=>
        {
            if(langswitch.CheckMinPriceOrder(sum)){
                var seladd = langswitch.getValue("seladdress")
                if(seladd != "")
                {
                var addobj = langswitch.getJson("address")
                if(addobj.hasOwnProperty(seladd))                    
                window.location.href = langswitch.RouteP("checkout");            
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

                        var option = ""
                        for(var oobo in or[ke]["option"])                        
                        option += "("+langswitch.firstUpper(oobo)+":"+langswitch.firstUpper(menu["options"][or[ke]["option"][oobo]] )+") "
                        option = option!=""?<><br/>{option}<br/></>:""
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
            rows.push(<div className="d-flex justify-content-end mb-4">
            <button onClick={CheckOutBtn} className="btn btn-success">Bezahlen</button></div>)

            rows.unshift(<div className='row cosrow mb-2 p-1'>
                <Checkaddressselected/>
            </div>)

        }
        
        window.localStorage.setItem("sumprice",sum);
    }
    
    return (
    <>
    <Head>
    <title>{MyLang["title"]}</title>
    <link href="./mystyles/cart.css" rel="stylesheet" />
    </Head>
    <MyNavbar/>
    <div className="container mt-3 ">
        <ul className='list-group mb-3'>
        {crows}
        </ul>
        {rows}
    </div>
    </>
    );
}