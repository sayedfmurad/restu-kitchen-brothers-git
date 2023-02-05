import React, { useState, useRef, useEffect } from 'react';
import langswitch from '../components/Utils/langswitch'
import MyNavbar from "../components/navbar/MyNavbar"
import Head from 'next/head'
import menu from "../public/database/menu"
export default function paypall() {
const MyLang = langswitch.langswitchs("paypal");
if(process.browser)
{
  var sum = langswitch.getNum("sumprice");
  mainid = langswitch.getValue("lastOrderId");
  sum = langswitch.stof(sum);
  if(sum==0)
  window.location.href=langswitch.RouteP("");

  gsum=sum;
  successpage = langswitch.RouteP("success");  
}
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
 

    <script src={`https://www.paypal.com/sdk/js?client-id=${menu["staticValue"]["pc"]}&currency=EUR`} data-sdk-integration-source="button-factory"></script>
  <script src='./scripts/paypalpay.js' />
  </>
);
}  
    