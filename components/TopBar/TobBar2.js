import Head from 'next/head'
import { useRouter } from 'next/router'
import langswitch from "../Utils/langswitch"
import { useEffect, useState } from 'react'
import packagee from "../../package.json"

export function Container(){    
    const MyLang = langswitch.langswitchs("navbar");
    var router = useRouter();
    router = router.pathname;
    var [logo,setlogo]=useState(" ")
    useEffect(()=>
    {    
        if(router=="/customizeorder")        
        {
            setlogo(<>
                <a className="navbar-brand btn btn-secondary" id='navbarBack' >                        
                Zurück
                </a>                
            </>)
        }
        else
            langswitch.GetJsonM("menu").then((menu)=>{
                try {
            setlogo(<>
                <a className="navbar-brand" >                        
                <h5><a href='./' className='text-white'>{menu["staticValue"]["logo"]}</a></h5>
                </a>                
            </>)            
        } catch (error) {
        console.log(error)    
        window.location.reload()
        }
            })
     },[])



    return<>
    <nav id="mynavb" className="mb-2 navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div className="container-fluid">
        {logo}        
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
                <li className="nav-item">
                    <a className={`nav-link ${router=="/zusatzstoffe"?"active":"gg"}`} aria-current="page" href={langswitch.RouteP("zusatzstoffe")}>{MyLang["zusatzstoffe"]}</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<script defer src={"./scripts/bootstrap.bundle.js"} ></script>
</>
}


export default function adsf(){
  
    return (
        <>
        <Head>
        <link   href={"./mystyles/global.css"} rel="stylesheet" />
        <link href={"./mystyles/mynavbar.css"} rel="stylesheet" />
        </Head>
        <Container/>
        </>
    )
}