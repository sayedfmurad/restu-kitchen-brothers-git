import Head from 'next/head'
import React, { useState } from 'react';
import MyNavbar from "../components/navbar/MyNavbar"
import menu from "../public/database/menu.json"
import langswitch from '../components/Utils/langswitch'
export default function Cart() {
    const MyLang = langswitch.langswitchs("updatesmainorders");
    var [msg,setmsg]=useState(MyLang["loading"]);
    if(process.browser){
      var orders = langswitch.getJson("mainorder");
      for(var dd in orders)
      {
        var dmd = new Date(orders[dd]['createtime'])
        var ndmd =  new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }))        
        if(dmd.getDay()!=ndmd.getDay())
        delete orders[dd]
      }
      window.localStorage.setItem("mainorder",JSON.stringify(orders))
        const urll="https://l5dtipmn6wzalxyealcujiiu5q0nverf.lambda-url.eu-central-1.on.aws/"
        let mheaders = new Headers();
        mheaders.append('Origin','*');
        fetch(urll, {
          method: 'POST', // or 'PUT'
          headers: mheaders,
          body: JSON.stringify({"ids":Object.keys(orders)})
        }).then(response => {
          if(response.status==400)
          {setmsg("error");
          localStorage.setItem("mainorder",JSON.stringify({}))
          window.location.href=langswitch.RouteP("orders");
          }
          else if(response.status==200)
          {
            response.json().then(result => {
              // localStorage.setItem("mainorder",JSON.stringify(result) )
              window.location.href=langswitch.RouteP("orders")
            })
            .catch(error => {
              console.error('Error:', error);
              localStorage.setItem("mainorder",JSON.stringify({}))
              setmsg("error");
            })
          }
          
        })

    }
    return (
    <>
    <Head>
    <title>{MyLang["title"]}</title>
    <link href="./mystyles/cart.css" rel="stylesheet" />
    </Head>
    <MyNavbar/>
    <div className="container mt-3 text-white">
        <div className='row'>
            <h3>{msg}</h3>
        </div>
    </div>
    </>
    );
}