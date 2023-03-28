import React, { useState, useRef, useEffect } from 'react';
import langswitch from '../components/Utils/langswitch'
import MyNavbar from "../components/navbar/MyNavbar"
import Head from 'next/head'
import packagee from "../package.json"

export function Container(){
  if(process.browser)
  {
    const menu = langswitch.getJson("menu")
    setTimeout(() => {GotMenu(menu)}, 100);    
    
    
    const GotMenu=(menu)=>{
      const scriptout = packagee["IsOut"] ?`https://www.paypal.com/sdk/js?client-id=${menu["staticValue"]["pc"]}&currency=EUR`
      :`https://www.paypal.com/sdk/js?client-id=ActZu8JlaaToqIk6t8EAKNoIBHXuVo3ENRww7kmsMyoPZGeEqNJmm1yvYQrJXZUltmbq0SJowjEW3nyM&currency=EUR`

      console.log(scriptout)
      const script = document.createElement("script");
      script.src = scriptout;
      script.setAttribute("data-sdk-integration-source", "button-factory")
      document.body.appendChild(script);
      const script1 = document.createElement("script");
      script1.src = "./scripts/paypalpay.js";
      script1.setAttribute("data-sdk-integration-source", "button-factory")
      document.body.appendChild(script1);
      

    }
    
  
  }
  return <>{}</>
}


export default function paypall() {
const MyLang = langswitch.langswitchs("paypal");

return (
  <>
     <Head>
      <title>{MyLang["title"]}</title>      
      <link href="./mystyles/paypal.css" rel="stylesheet" />
    </Head>
    <MyNavbar/>
    <div id="smart-button-container ">
      <div style={{textAlign:'center'}}>
        <div id="paypal-button-container"></div>
      </div>
    </div>
       <Container/>
  </>
);
}  
    