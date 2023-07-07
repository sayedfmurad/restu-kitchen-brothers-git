
import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import Sections from "../components/Index/sections"
import langswitch from "../components/Utils/langswitch"
import packagee from "../package"
import restus from "../public/restus"
import Home from "../pages/home"
export default function Index() {  
  const [Container,SetContainer] = useState(<></>)
  const [SEO,SetSEO] = useState(<></>)
  const [PageTitle,SetPageTitle] = useState("")  
  const [H2SEO,setH2SEO] = useState("Beste Pizza-Lieferdienst")
  const MyLang = langswitch.langswitchs("index"); 
  useEffect(()=>{ 
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
        // e.prompt();
      // alert("ok")
      // Stash the event so it can be triggered later.    
    });


    const CheckIFOurDomain=()=>{          
      var hostname = window.location.hostname;
      hostname =  hostname.replace("www.","")
      hostname = hostname.split(".")[0]
      for (var ghli in restus)
      if(hostname == ghli) 
      return hostname

      return false
    }         
    const LastStep=(data)=>{
      


          SetSEO(<>
          <meta name="keywords" content={`essen bestellen ${data["staticValue"]["kontakt"]["city"]}, pizza lieferservice ${data["staticValue"]["kontakt"]["city"]}, gesundes essen online bestellen ${data["staticValue"]["kontakt"]["city"]}, beste pizza lieferservice ${data["staticValue"]["kontakt"]["city"]}, Bestellen Sie hausgemachtes Dessert online, pizza bestellen ${data["staticValue"]["kontakt"]["city"]}, pizzeria in der nähe ${data["staticValue"]["kontakt"]["city"]}, super pizza service online ${data["staticValue"]["kontakt"]["city"]}, günstig essen online bestellen ${data["staticValue"]["kontakt"]["city"]}, burger bestellen online ${data["staticValue"]["kontakt"]["city"]}`}/>
          <meta name="page-topic" content="Gastronomie" />
          <meta name="robots" content="index, follow" />
          <meta name="title" content={"Jetzt bestellen bei "+data["staticValue"]["logo"]+" in "+data["staticValue"]["kontakt"]["city"]} />
          <meta name="description" content={"Pizza | Pizzeria | "+ data["staticValue"]["logo"]+" "+data["staticValue"]["kontakt"]["street"]+data["staticValue"]["kontakt"]["city"]+data["staticValue"]["kontakt"]["zipc"]+" jetzt online bestellen und liefern lassen!"} />
          <link rel="canonical" href={"https://"+data["staticValue"]["key"]+".foodieway.de"}/>
          </>)      
          SetPageTitle("Essen bestellen "+data["staticValue"]["kontakt"]["city"]+" | Super Pizza Service | "+data["staticValue"]["logo"])
          setH2SEO("Beste Pizza-Lieferdienst "+data["staticValue"]["kontakt"]["city"])
          window.localStorage.setItem("menu",JSON.stringify(data))     
          langswitch.ChangeGetParameters("Sections")                           
            SetContainer(
              <>              
              <Sections menu={data}/>
              </>
            )                             
    }
    const IsOurDomain=(hostname)=>{
      const cacheBuster = new Date().getTime();
      const urll = packagee["server"]["url"]+"?getjson="+hostname+"&cacheBuster="+cacheBuster

      fetch(urll)
      .then(response => response.json())
      .then(data => {
       LastStep(data)
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
          LastStep(data)         
    }



    langswitch.GetJsonM("menu").then((menu)=>{
      try {        
        const cacheBuster = new Date().getTime();
        const urll = packagee["server"]["url"]+"?getjson="+menu["staticValue"]["key"]+"&cacheBuster="+cacheBuster
                  fetch(urll)
      .then(response => response.json())
      .then(data => {   
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
      <title>{PageTitle}</title>      
      {SEO}
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <meta name="msapplication-TileColor" content="#000000" ></meta>
      <link href="./mystyles/homepage.css" rel="stylesheet" />
      <link href="./mystyles/addtohomescreen.css" rel="stylesheet" />

      <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png"/>
      <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png"/>
      <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png"/>
      <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png"/>
      <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png"/>
      <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png"/>
      <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png"/>
      <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png"/>
      <link rel="icon" type="image/png" sizes="192x192"  href="/icons/android-icon-192x192.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
      <link rel="manifest" href="/manifest.json"/>
      <meta name="msapplication-TileColor" content="#ffffff"/>
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
      <meta name="theme-color" content="#ffffff"></meta>

    </Head>   
    {/* <div className="specially mbackground"></div>  */}
    <h1 className="seo-heading">Bestellen Sie hausgemachtes Dessert online</h1>
    <h2 className="seo-heading">{H2SEO}</h2>
    {Container}
   </>
    )
}
