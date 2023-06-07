
import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import MyNavbar from "../components/NavBar/MyNavbar"
import Sections from "../components/Index/sections"
import langswitch from "../components/Utils/langswitch"
import packagee from "../package"
import restus from "../public/restus"
import Home from "../pages/home"





export default function Index() {  
  const [Container,SetContainer] = useState(<></>)
  const [DCTitle,SetDCTitle] = useState("")
  const [DCDes,SetDCDes] = useState("")
  const MyLang = langswitch.langswitchs("index"); 

  useEffect(()=>{ 
    const CheckIFOurDomain=()=>{    

      var hostname = window.location.hostname;
      hostname =  hostname.replace("www.","")
      hostname = hostname.split(".")[0]
      for (var ghli in restus)
      if(hostname == ghli) 
      return hostname

      return false
    }     
    const IsOurDomain=(hostname)=>{
      const cacheBuster = new Date().getTime();
      const urll = "./database/"+hostname+".json?cacheBuster="+cacheBuster
      fetch(urll)
      .then(response => response.json())
      .then(data => {
          SetDCTitle(data["staticValue"]["logo"]+" in "+data["staticValue"]["kontakt"]["city"]+" - "+"Jetzt Essen online bestellen")
          SetDCDes("Entdecken Sie jetzt die ultimative Bequemlichkeit des Online-Bestellens von Essen! Willkommen auf unserer deutschen Food-Delivery-Plattform")
          window.localStorage.setItem("menu",JSON.stringify(data))                      
          SetContainer(
            <>
            <MyNavbar/>  
            <Sections/>
            </>
          )
      })
      .catch(error => {
          window.location.href = "./"
          console.error('Error fetching JSON file:', error);
      });
    }
    const CheckType = ()=>{
      var hostname = CheckIFOurDomain()      
      if(hostname !== false) 
          {                  
            IsOurDomain(hostname)
            return
          }else{
               // Get the value of the "addr" key
               var seladdr = window.localStorage.getItem("seladdress");
               var addr = window.localStorage.getItem("address");
               window.localStorage.clear()  
               if(seladdr != null) 
              window.localStorage.setItem("seladdress",seladdr);
              if(addr != null) 
              window.localStorage.setItem("address",addr);

              SetContainer(
                  <Home/>
              )
          }
    }  
    const GotJsonData = (data)=>{
      var hostname = CheckIFOurDomain()      
      if(hostname !== false) 
          if(data["staticValue"]["key"]!= hostname){
            CheckType()
            return
          }
  
          window.localStorage.setItem("menu",JSON.stringify(data))
          SetContainer(
            <>
            <MyNavbar/>  
            <Sections/>
            </>
          )
    }



    langswitch.GetJsonM("menu").then((menu)=>{
      try {        
        const cacheBuster = new Date().getTime();
        const urll = "./database/"+menu["staticValue"]["key"]+".json?cacheBuster="+cacheBuster
                  fetch(urll)
      .then(response => response.json())
      .then(data => {   
        SetDCTitle(data["staticValue"]["logo"]+" in "+data["staticValue"]["kontakt"]["city"]+" - "+"Jetzt Essen online bestellen")
        SetDCDes("Entdecken Sie jetzt die ultimative Bequemlichkeit des Online-Bestellens von Essen! Willkommen auf unserer deutschen Food-Delivery-Plattform")  
        GotJsonData(data)
      })
      } catch (error) {
          console.log(error,langswitch.RouteP("home"))
          CheckType()
      }
  })
  },[])
  return (
   <>
    <Head>
      <title>{MyLang["title"]}</title>      
      <meta name="keywords" content="Pizza, pizzeria, pizza lieferservice" />
      <meta name="page-topic" content="Gastronomie" />
      <meta name="robots" content="index, follow" />
      <meta name="title" content={DCTitle} />
      <meta name="description" content={DCDes} />
      <meta name="robots" content="index,follow"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <link href="./mystyles/homepage.css" rel="stylesheet" />
    </Head>   
    {/* <div className="specially mbackground"></div>  */}
    {Container}
   </>
    )
}
