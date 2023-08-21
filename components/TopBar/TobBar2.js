import Head from 'next/head'
import { useRouter } from 'next/router'
import langswitch from "../Utils/langswitch"
import { useEffect, useState } from 'react'
import packagee from "../../package.json"
import MyOrders from '../Index/MyOrders'

export default function adsf({nextEle,setContainerMyOrderModal,menu}){
    if(!menu||!setContainerMyOrderModal)
    return<></>
    const MyLang = langswitch.langswitchs("navbar");
    var router = useRouter();
    router = router.pathname;                  

    return <>
        <Head>
        <link   href={"./mystyles/global.css"} rel="stylesheet" />
        </Head>
    <nav id="mynavb" className=" navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <a className="navbar-brand " style={{"padding":"6px 0px 0px 0px"}}>                        
                {
                "logoimg" in menu["staticValue"]?
                <img src={"/Images/"+menu["staticValue"]["key"]+"logo.png"} height="40px"/>
                :
                <h5><a href='./' className='text-white'>{menu["staticValue"]["logo"]}</a></h5> 
                }
                </a>                    
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
                    <a className={`nav-link ${router=="/order"?"active":"gg"}`} aria-current="page" onClick={()=>{
                        setContainerMyOrderModal(<></>)
                        setTimeout(() => {
                            setContainerMyOrderModal(<MyOrders menu={menu}/>) 
                            var myModal = new bootstrap.Modal(document.getElementById("MyOrderModal"), {
                                keyboard: true
                              })    
                              myModal.show()  
                            history.pushState({}, '');
                        }, 500);
                    }}>{MyLang["myorders"]}</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${router=="/aboutus"?"active":"gg"}`} aria-current="page" onClick={(e)=>{
                        e.preventDefault()
                        var myModal = new bootstrap.Modal(document.getElementById("AboutUsModal"), {
                            keyboard: true
                          })    
                          myModal.show()  
                        history.pushState({}, '');
                    }}>{MyLang["about us"]}</a>
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
