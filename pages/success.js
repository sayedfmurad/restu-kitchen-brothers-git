
import Head from 'next/head'
import React, { useState } from 'react';
import MyNavbar from "../components/navbar/MyNavbar"
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
    <Head>

    </Head>
    <MyNavbar/>
    <div className="container mt-5">
        <div className="row">
            <div className="col-12 text">
                <h2>{langswitch["Your Order has..."]}</h2>
                <a className="btn btn-primary" href={MyLang.RouteP("")}>{langswitch["Home"]}</a>                
            </div>
        </div>
    </div>
    </>
)
}