import React, { useState, useRef, useEffect } from 'react';
import langswitch from '../components/Utils/langswitch'
import MyNavbar from "../components/navbar/MyNavbar"
import Head from 'next/head'

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
       <script data-sdk-integration-source="button-factory" src='https://www.paypal.com/sdk/js?client-id=AV-ionHbh2K5ywnkHxgvNKt5ZRtdFm5Iu4AWbMXaer_kquFY2wAulf5oHOY-oUwYfJOxS-0fIgLHY8GK&currency=EUR'/>
       <script src='./scripts/paypalpay.js'/>
       {/* `https://www.paypal.com/sdk/js?client-id=ActZu8JlaaToqIk6t8EAKNoIBHXuVo3ENRww7kmsMyoPZGeEqNJmm1yvYQrJXZUltmbq0SJowjEW3nyM&currency=EUR` */}
  </>
);
}  
    