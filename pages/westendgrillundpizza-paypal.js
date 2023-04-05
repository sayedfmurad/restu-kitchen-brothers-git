import React, { useState, useRef, useEffect } from 'react';
import langswitch from '../components/Utils/langswitch'
import MyNavbar from "../components/navbar/MyNavbar"
import Head from 'next/head'

export default function Paypall() {
const MyLang = langswitch.langswitchs("paypal");

return (
  <>
     <Head>
      <title>{MyLang["title"]}</title>      
    </Head>
    <MyNavbar/>
    <div id="smart-button-container ">
      <div style={{textAlign:'center'}}>
        <div id="paypal-button-container"></div>
      </div>
    </div>
       <script defer  data-sdk-integration-source="button-factory" src='https://www.paypal.com/sdk/js?client-id=AfuSl7LqNnZtAwNFZ-PVW56KYsaBJvrg1USrJj1_7evZzCqGcXXktUWyRi6pKBlpa3PEVDyps8CeJD8i&currency=EUR'/>       
       <script defer src='./scripts/paypalpay.js'/>
  </>
);
}  
    