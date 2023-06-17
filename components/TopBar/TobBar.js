import Head from 'next/head'
import { useRouter } from 'next/router'
import langswitch from "../Utils/langswitch"
import { useEffect, useState } from 'react'
import packagee from "../../package.json"
import Cart from "../../pages/cart"
export  function Con({obj,menu}){
    const MyLang = langswitch.langswitchs("navbar");    
    var router = ""    
    const ShowZusatz=(menu)=>{
        if(typeof menu !== "undefined")
        if("staticValue" in menu)    
        if("zusatzStoffe" in menu["staticValue"])    
        if(menu["staticValue"]["zusatzStoffe"] != "")    
        return  <li className="nav-item">
                    <a className={`nav-link ${router=="/zusatzstoffe"?"active":"gg"}`} aria-current="page" href={ langswitch.RouteP("zusatzstoffe")}>{MyLang["zusatzstoffe"]}</a>
                </li>

        return <></>
    }
    return<>
    <nav id="mynavb" className="mb-2 navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div className="container-fluid">
        {obj}
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="homenavItem nav-item">
                    <a className={`nav-link ${router=="/"?"active":""}`} aria-current="page" href={langswitch.RouteP("")}>{MyLang["home"]}</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${router=="/selectadd"?"active":"gg"}`} aria-current="page" href={langswitch.RouteP("selectadd")}>{MyLang["addresses"]}</a>
                </li>                
                <li className="nav-item">
                    <a className={`nav-link ${router=="/order"?"active":"gg"}`} aria-current="page" href={langswitch.RouteP("updatesmainorders")}>{MyLang["myorders"]}</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${router=="/aboutus"?"active":"gg"}`} aria-current="page" href={langswitch.RouteP("aboutus")}>{MyLang["about us"]}</a>
                </li>
                {ShowZusatz(menu)}
            </ul>
        </div>
    </div>
</nav>
</>
}


export default function adsf({logo,options,mSetContainer,IsCartSection}){
    const [Container, SetContainer] = useState(<></>)
    useEffect(()=>{
        const Orders = langswitch.getJson("order")  
        const OrdersLength = Object.keys(Orders).length
        var obj=[] 
        const CheckOrders=()=>{
            if (typeof IsCartSection === "undefined")
            if(OrdersLength >0 )
                {                    
                    obj.push(
                        <button type="button" class="btn btn-secondary text-light"
                        onClick={()=>{mSetContainer(<Cart mSetContainer={mSetContainer}/>)}}>  
                        Warenkorb
                         &nbsp;<span class="badge rounded-pill bg-danger" >{OrdersLength}</span>
                        </button>                        
                        )    
                        return true     
                } 
                return false
        }  
        if (typeof options !== "undefined")
        {
                for(var g in options)
                {
                   obj.push(options[g])
                   obj.push(<>&nbsp;&nbsp;</>)
                }
                CheckOrders()   
        }            
        else if (typeof logo !== "undefined" && !CheckOrders() )
        {
            obj.push(logo)      
        }
        
        
        



    SetContainer(
        <Con obj={
        <a className="navbar-brand" >  
        {obj}
        </a>  
        }/>
    )
    },[])
    return <>{Container}</>
}
