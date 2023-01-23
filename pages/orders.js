import Head from 'next/head'
import React, { useState } from 'react';
import MyNavbar from "../components/navbar/MyNavbar"
import menu from "../public/database/menu.json"
import langswitch from '../components/Utils/langswitch'
export default function Cart() {
    const MyLang = langswitch.langswitchs("orders");
    var rows = [];  
    if(process.browser){
        var orders = langswitch.getJson("mainorder");
        for (var ord in orders)
        {
            if(orders[ord].hasOwnProperty("Msg"))
            {
                orders[ord]["Msg"]["S"]= orders[ord]["Msg"]["S"].split("\n")
                var htmlObj = []
                for(var line in orders[ord]["Msg"]["S"])
                if(orders[ord]["Msg"]["S"][line] != "")
                    htmlObj.push(<>{orders[ord]["Msg"]["S"][line]}<br/></>)
                rows.push(
                    <div className='row cosrow mb-2 p-2'>
                        {htmlObj}
                    </div>
                )
            }
        }
        

        if(rows.length==0)
        {
            rows = [];              
            rows.push(
                <div className='row cosrow mb-2 p-2'>
                    <h3>{MyLang["no orders"]}</h3>
                </div>
            )
        }
    }
    return (
    <>
    <Head>
    <title>{MyLang["title"]}</title>
    <link href="./mystyles/cart.css" rel="stylesheet" />
    </Head>
    <MyNavbar/>
    <div className="container mt-3 text-white">
        {rows}
    </div>
    </>
    );
}