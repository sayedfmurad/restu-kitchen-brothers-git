
import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import MyNavbar from "../components/NavBar/MyNavbar"
import Sections from "../components/Index/sections"
import langswitch from "../components/Utils/langswitch"


export function IfCloseMsg(){
  var [out,setout] = useState(<></>)
  useEffect(()=>
  {
   
 

    const menu = langswitch.getJson("menu")
    if(menu != null)
    if(typeof menu !== "undefined")
    if(Object.keys(menu).length  !== 0)
    setTimeout(() => {


        var textOpenClose = langswitch.checkOpenCloseStore(menu)?"":"Geschlossen."   
        if(!langswitch.checkOpenCloseStore(menu))
        {
          setout(
            <div className='container mt-3 mb-3'>
    <div className="row">
      <div className='col-12'>
    <div className=" alert alert-danger" role="alert">
    {textOpenClose}&nbsp;{langswitch.NextOpenTimeMsg(menu)}
    </div>
    </div>
    </div> 
    </div>
          )
        }
      },100)
    },[])

  return   out
}



export default function Index() {  
  const MyLang = langswitch.langswitchs("index");  

  return (
   <>
    <Head>
      <title>{MyLang["title"]}</title>      
      {/* <meta name="DC.title" content={`${menu["staticValue"]["kontakt"]["name"]} - Essen Online bestellen in ${menu["staticValue"]["kontakt"]["city"]}`} /> */}
      <meta name="robots" content="index,follow"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <link href="./mystyles/homepage.css" rel="stylesheet" />
    </Head>   
    {/* <div className="specially mbackground"></div>  */}
    <MyNavbar/>               
    <IfCloseMsg/>
    <Sections/>
   </>
    )
}
