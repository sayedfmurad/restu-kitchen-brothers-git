import React, { useState, useRef, useEffect } from 'react';
import langswitch from '../components/Utils/langswitch'
import MyNavbar from "../components/TopBar/TobBar2"
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
       <script defer data-sdk-integration-source="button-factory" src='https://www.paypal.com/sdk/js?client-id=Adry9vq8GYiagTwNC6I32XDRIYtDpHEIUCmoe14Kd7ujPsIUv2i6EPUTsVqV47rOuJJhh5Xdj4-nCnlN&currency=EUR'/>
       <script defer src='./scripts/paypalpay.js'/>
  </>
);
}  
    