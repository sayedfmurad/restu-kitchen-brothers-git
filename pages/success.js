
import Head from 'next/head'

import React, { useState } from 'react';
import MyNavbar from "../components/TopBar/TobBar2"
import MyLang from '../components/Utils/langswitch'
export default function success() {
    const langswitch = MyLang.langswitchs("success");
    if(process.browser)
    {
        window.localStorage.setItem("order","{}");
        window.localStorage.setItem("sumprice","0,00");
    }
return(
    <>
    {/* <MyNavbar/> */}
    <div className="container mt-5">
        <div className="row g-3 m-3 ">
            <div  className="col-md-4">  
            <div className='d-flex justify-content-center'>
            {/* <img alt="" height="150px" src='./Images/accepted.png'/> */}
            </div>
            </div>              
            <div className="col-md-8  text-black">                
                <h2>                    
                    {langswitch["Your Order has..."]}
                    </h2>
                    <br/>
                <a className="btn btn-primary" href={MyLang.RouteP("")}>{langswitch["Home"]}</a>                
            </div>
        </div>
    </div>
    </>
)
}