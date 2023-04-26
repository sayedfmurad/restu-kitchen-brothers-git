import { useEffect } from "react"
import langswitch from "../components/Utils/langswitch"
import restus from "../public/restus"
import Head from 'next/head'

export default function A(){
    useEffect(()=>{
                 // Get the value of the "addr" key
                 var seladdr = window.localStorage.getItem("seladdress");
                 var addr = window.localStorage.getItem("address");
                 window.localStorage.clear()  
                 if(seladdr != null) 
                window.localStorage.setItem("seladdress",seladdr);
                if(addr != null) 
                window.localStorage.setItem("address",addr);
    },[])
    var out = []
    for(var h in restus)
    out.push(
            <div className='col-lg-3 col-md-4 col-sm-6 col-xs-6' >
            <a class="a-item a-item-2" 
                    style={{"backgroundImage":`url(Images/cartoon.jpeg)`}}
                      href={langswitch.RouteP(restus[h]["key"])}>
                <div class="a-sub2">{langswitch.firstUpper(restus[h]["name"])}</div>
            </a>        
            </div>
    )

    return(
        <>
        <Head>
        <link href="./mystyles/homepage.css" rel="stylesheet" />
        </Head>
        <div className="container mt-4" >
        <div className="row mb-5">
            <div className="col-12">
            <h2>
            Resturant auswählen:
            </h2>
        </div>
        </div>
        <div className="row g-2">
            {out}
        </div>
        </div>
        </>
    )
}