import Head from 'next/head'
import React, { useState } from 'react';
import MyNavbar from "../components/navbar/MyNavbar"
import Infos from "../components/Index/Infos"
import Sections from "../components/Index/sections"
import langswitch from "../components/Utils/langswitch"
import menu from "../public/database/menu.json"
export default function Index() {  
  const MyLang = langswitch.langswitchs("index");
  

  return (
   <>
    <Head>
      <title>{MyLang["title"]}</title>
      <link href="./mystyles/homepage.css" rel="stylesheet" />
      <script src="./scripts/facebookads.js" ></script>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <noscript><img height="1" width="1" style={{"display":"none"}}
      src="https://www.facebook.com/tr?id=723924005356873&ev=PageView&noscript=1"
      /></noscript>
    </Head>   
    {/* <div className="specially mbackground"></div>  */}
    <MyNavbar/>                
    <Sections/>
   </>
    )
}
