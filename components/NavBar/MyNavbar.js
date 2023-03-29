import Head from 'next/head'
import { useRouter } from 'next/router'
import langswitch from "../Utils/langswitch"
import { useState } from 'react'

export function Container(){
    const MyLang = langswitch.langswitchs("navbar");
    var router = useRouter();
    router = router.pathname;
    var [logo,setlogo]=useState(" ")
    if(process.browser)
    {
        const menu = langswitch.getJson("menu")
        setTimeout(() => {
            var hostname = window.location.hostname;
            hostname = hostname.split(".")
            hostname[0]= hostname[0] == "www" ? "":hostname[0]
            hostname = hostname[0]+(hostname.length >2 ?hostname[1]:"")
            
            if(Object.keys(menu).length === 0){
                if(hostname == "kitchen-brothers" || hostname == "westendgrillundpizza" || hostname == "pizzavalentina") 
                {      
                    window.location.href = langswitch.RouteP(hostname)
                }else
                {
                    window.location.href =langswitch.RouteP("home")
                }
            }
            else{                         
                setlogo(<>
                        <a className="navbar-brand" >                        
                        <h5><a href='./' className='text-white'>{menu["staticValue"]["logo"]}</a></h5>
                            {/* <img
                                class="d-inline-block align-text-top"
                                height="24"
                                width="54"
                                alt="Website Logo"
                                src={sub+"./Images/logo.png"}/> */}
                        </a>                
                </>)
            }
        
        }, 100);
    }



    return<>
    <nav id="mynavb" className="mb-2 navbar navbar-expand-lg navbar-dark bg-dark">
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
                    <a className={`nav-link ${router=="/cart"?"active":"gg"}`} aria-current="page" href={langswitch.RouteP("cart")}>{MyLang["cart"]}</a>
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
<script src={"./scripts/bootstrap.bundle.js"} ></script>
</>
}


export default ({sub}) => {
  
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
