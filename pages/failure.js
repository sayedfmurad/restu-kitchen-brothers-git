
import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import MyNavbar from "../components/TopBar/TobBar2"
import MyLang from '../components/Utils/langswitch'
export default function success() {
    useEffect(()=>{
        window.localStorage.clear()
    },[])
return(
    <>
    <div className="container mt-5">
        <div className="row">
            <div className="col-12 text-black">
                <h2>Etwas ging schief, bitte versuchen Sie es später erneut</h2>
                <a className="btn btn-primary" href={MyLang.RouteP("")}>Home</a>                
            </div>
        </div>
    </div>
    </>
)
}