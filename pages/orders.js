import Head from 'next/head'
import React, { useState } from 'react';
import MyNavbar from "../components/TopBar/TobBar2"
import langswitch from '../components/Utils/langswitch'

export function Container(){
    const MyLang = langswitch.langswitchs("orders");

    const [Outmrows,setOutmrows] = useState(<></>)
    var mrows = [];

    const MenuReady = (menu)=>{

        

        setTimeout(()=>{setOutmrows(mrows)}, 100);
        
    }
    if(process.browser){
        const menu = langswitch.getJson("menu")
        setTimeout(MenuReady(menu), 100);
    }    
    return (
        <div className="container mt-3 ">
        {Outmrows} 
    </div>
    )
}

export default function A() {
    const MyLang = langswitch.langswitchs("orders");
  
            return (
    <>      
    </>
    );
}