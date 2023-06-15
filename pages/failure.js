
import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import MyNavbar from "../components/navbar/MyNavbar2"
import MyLang from '../components/Utils/langswitch'
export default function success() {
    const langswitch = MyLang.langswitchs("success");
    if(process.browser){window.localStorage.clear()}
return(
    <>
    <Head>

    </Head>
    <MyNavbar/>
    <div className="container mt-5">
        <div className="row">
            <div className="col-12 text">
                <h2>Etwas ging schief, bitte versuchen Sie es später erneut</h2>
                <a className="btn btn-primary" href={MyLang.RouteP("")}>{langswitch["Home"]}</a>                
            </div>
        </div>
    </div>
    </>
)
}