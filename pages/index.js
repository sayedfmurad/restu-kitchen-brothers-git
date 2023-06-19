
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
          <meta name="title" content={data["staticValue"]["logo"]+" in "+data["staticValue"]["kontakt"]["city"]+" - "+"Jetzt Essen online bestellen"} />
          <meta name="description" content={data["staticValue"]["logo"]+" bringt Ihnen das feinste Essen in "+data["staticValue"]["kontakt"]["city"]+". Erleben Sie kulinarischen Genuss mit unserer köstlichen Speisekarte. Bestellen Sie jetzt und genießen Sie die Aromen!"} />
          <link ref="canonical" href={"https://"+data["staticValue"]["key"]+".foodieway.de"}/>
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
      const urll = "./database/"+hostname+".json?cacheBuster="+cacheBuster
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
        const urll = "./database/"+menu["staticValue"]["key"]+".json?cacheBuster="+cacheBuster
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
      <link href="./mystyles/homepage.css" rel="stylesheet" />
    </Head>   
    {/* <div className="specially mbackground"></div>  */}
    <h1 className="seo-heading">Bestellen Sie hausgemachtes Dessert online</h1>
    <h2 className="seo-heading">{H2SEO}</h2>
    {Container}
   </>
    )
}
