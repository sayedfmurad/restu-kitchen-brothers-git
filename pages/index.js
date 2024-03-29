
import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import Sections2 from "../components/Index/sections2"
import langswitch from "../components/Utils/langswitch"
import packagee from "../package"
import restus from "../public/restus"
import Home from "../components/Index/home"

export function LoadingCont () {

  const GetKeyFromDomain=()=>{          
    var hostname = window.location.hostname;
      hostname =  hostname.replace("www.","")
      hostname = hostname.split(".")[0]
      return hostname
    }       

  return <div id="loadingg" className='loadingg mt-5 d-flex justify-content-center'>
  <strong className='text-black'>{GetKeyFromDomain()}</strong>    
  <div class="spinner-border text-black mt-3 " role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
}
const CheckIFOurDomain=()=>{          
  var hostname = window.location.hostname;
    hostname =  hostname.replace("www.","")
    hostname = hostname.split(".")[0]
    for (var ghli in restus)
    if(hostname == ghli) 
    return hostname

    return false
  } 
export default()=>{
  const [SEO,SetSEO] = useState(<></>)  
  const [PageTitle,SetPageTitle] = useState("")  
  const [H2SEO,setH2SEO] = useState("")
  const [Container,SetContainer] = useState(<></>)


  const LastStep=(data)=>{
      

    if(data["staticValue"]["key"]=="sushi-kayo")
    {
      SetSEO(<>
        <meta name="keywords" content={`essen bestellen ${data["staticValue"]["kontakt"]["city"]}, Sushi lieferservice ${data["staticValue"]["kontakt"]["city"]}, gesundes essen online bestellen ${data["staticValue"]["kontakt"]["city"]}, beste Sushi lieferservice ${data["staticValue"]["kontakt"]["city"]}, Bestellen Sie hausgemachtes Dessert online, Sushi bestellen ${data["staticValue"]["kontakt"]["city"]}, Sushi in der nähe ${data["staticValue"]["kontakt"]["city"]}, super Sushi service online ${data["staticValue"]["kontakt"]["city"]}, günstig essen online bestellen ${data["staticValue"]["kontakt"]["city"]}, Suhsi bestellen online ${data["staticValue"]["kontakt"]["city"]}`}/>
        <meta name="page-topic" content="Gastronomie" />
        <meta name="robots" content="index, follow" />
        <meta name="title" content={"Jetzt bestellen bei "+data["staticValue"]["logo"]+" in "+data["staticValue"]["kontakt"]["city"]} />
        <meta name="description" content={"Sushi | "+ data["staticValue"]["logo"]+" "+data["staticValue"]["kontakt"]["street"]+" "+data["staticValue"]["kontakt"]["city"]+" "+data["staticValue"]["kontakt"]["zipc"]+" jetzt online bestellen und liefern lassen!"} />
        <link rel="canonical" href={"https://"+data["staticValue"]["key"]+".foodieway.de"}/>
        </>)      
        SetPageTitle("Essen bestellen "+data["staticValue"]["kontakt"]["city"]+" | Super Sushi Service | "+data["staticValue"]["logo"])
        setH2SEO("Beste Sushi-Lieferdienst "+data["staticValue"]["kontakt"]["city"])
    }
    else if(data["staticValue"]["key"]=="e-zegrateshop")
    {
      SetSEO(<>
        <meta name="keywords" content={`randm bestellen ${data["staticValue"]["kontakt"]["city"]}, vape lieferservice ${data["staticValue"]["kontakt"]["city"]}, randm online bestellen ${data["staticValue"]["kontakt"]["city"]}, beste Sushi lieferservice ${data["staticValue"]["kontakt"]["city"]}, Bestellen Sie hausgemachtes Dessert online, Sushi bestellen ${data["staticValue"]["kontakt"]["city"]}, Sushi in der nähe ${data["staticValue"]["kontakt"]["city"]}, super Sushi service online ${data["staticValue"]["kontakt"]["city"]}, günstig essen online bestellen ${data["staticValue"]["kontakt"]["city"]}, Randm bestellen online`}/>              
        <meta name="robots" content="index, follow" />
        <meta name="title" content={"Jetzt bestellen bei "+data["staticValue"]["logo"]+" in "+data["staticValue"]["kontakt"]["city"]} />
        <meta name="description" content={"Vape Randm | "+ data["staticValue"]["logo"]+" "+data["staticValue"]["kontakt"]["street"]+" "+data["staticValue"]["kontakt"]["city"]+" "+data["staticValue"]["kontakt"]["zipc"]+" jetzt online bestellen und liefern lassen!"} />
        <link rel="canonical" href={"https://"+data["staticValue"]["key"]+".foodieway.de"}/>
        </>)      
        SetPageTitle("Essen bestellen "+data["staticValue"]["kontakt"]["city"]+" | vape rand  | "+data["staticValue"]["logo"])
        setH2SEO("Beste Vape-Lieferdienst ")
    }
    else{
      SetSEO(<>
        <meta name="keywords" content={`essen bestellen ${data["staticValue"]["kontakt"]["city"]}, pizza lieferservice ${data["staticValue"]["kontakt"]["city"]}, gesundes essen online bestellen ${data["staticValue"]["kontakt"]["city"]}, beste pizza lieferservice ${data["staticValue"]["kontakt"]["city"]}, Bestellen Sie hausgemachtes Dessert online, pizza bestellen ${data["staticValue"]["kontakt"]["city"]}, pizzeria in der nähe ${data["staticValue"]["kontakt"]["city"]}, super pizza service online ${data["staticValue"]["kontakt"]["city"]}, günstig essen online bestellen ${data["staticValue"]["kontakt"]["city"]}, burger bestellen online ${data["staticValue"]["kontakt"]["city"]}`}/>
        <meta name="page-topic" content="Gastronomie" />
        <meta name="robots" content="index, follow" />
        <meta name="title" content={"Jetzt bestellen bei "+data["staticValue"]["logo"]+" in "+data["staticValue"]["kontakt"]["city"]} />
        <meta name="description" content={"Pizza | Pizzeria | "+ data["staticValue"]["logo"]+" "+data["staticValue"]["kontakt"]["street"]+" "+data["staticValue"]["kontakt"]["city"]+" "+data["staticValue"]["kontakt"]["zipc"]+" jetzt online bestellen und liefern lassen!"} />
        <link rel="canonical" href={"https://"+data["staticValue"]["key"]+".foodieway.de"}/>
        </>)      
        SetPageTitle("Essen bestellen "+data["staticValue"]["kontakt"]["city"]+" | Super Pizza Service | "+data["staticValue"]["logo"])
        setH2SEO("Beste Pizza-Lieferdienst "+data["staticValue"]["kontakt"]["city"])
    }

    window.localStorage.setItem("menu",JSON.stringify(data))     
      SetContainer(<Sections2 menu={data}/>)                             
}
const GotJsonData = (data)=>{
var hostname = CheckIFOurDomain()      
if(hostname !== false) 
    if(data["staticValue"]["key"]!= hostname){
      window.localStorage.setItem("menu","{}")
      window.location.reload()
      return
    }
    LastStep(data)         
}
  const IsOurDomain=(hostname)=>{
    const cacheBuster = new Date().getTime();
    var  urll = packagee["server"]["url"]+"?getjson="+hostname+"&cacheBuster="+cacheBuster
    if(!packagee["IsOut"])
    urll = "./database/"+hostname+".json"
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
                <Home IsOurDomain={IsOurDomain}/>
            )
        }
  }  
  useEffect(()=>{
    SetContainer(<LoadingCont />) 
    langswitch.GetJsonM("menu").then((menu)=>{
      try {
        const cacheBuster = new Date().getTime();
        var urll = packagee["server"]["url"]+"?getjson="+menu["staticValue"]["key"]+"&cacheBuster="+cacheBuster
        if(!packagee["IsOut"])
         urll = "./database/"+menu["staticValue"]["key"]+".json"

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
  return <>
   <Head>
      <script src="/scripts/checkinstalliation.js"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <meta name="msapplication-TileColor" content="#000000" ></meta>
      <link href="./mystyles/homepage.css?v=20230717" rel="stylesheet" />
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
      <link rel="manifest" href="/manifest.json?s=1"/>
      <meta name="msapplication-TileColor" content="#000"/>
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
      <meta name="theme-color" content="#000"></meta>
      <link href="./mystyles/customizeorder.css" rel="stylesheet" />
      <title>{PageTitle}</title>      
      {SEO}     
    </Head>   
  <h1 className="seo-heading">Pizza | Pizzeria | Bestellen Sie hausgemachtes Dessert online</h1>
  <h2 className="seo-heading">{H2SEO}</h2>
  {Container}
  </>
}
