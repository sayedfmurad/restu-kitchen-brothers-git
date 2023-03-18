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
      <meta name="DC.title" content={`${menu["staticValue"]["kontakt"]["name"]} - Essen Online bestellen in ${menu["staticValue"]["kontakt"]["city"]}`} />
      <meta name="robots" content="index,follow"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    </Head>   
    {/* <div className="specially mbackground"></div>  */}
    <MyNavbar/>                
    <Sections/>
   </>
    )
}
