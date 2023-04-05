import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import MyNavbar from "../components/navbar/MyNavbar"
import langswitch from '../components/Utils/langswitch'

export default function Sectionmenu() {
    const MyLang = langswitch.langswitchs("sectionmenu");
    const [mrows, setRows] = useState([]);
    var rows = [];    
    rows.push(<div className="row mb-2"><div className="col-12">
        <a  className="btn btn-primary " href={langswitch.RouteP("")}>{MyLang["back"]}</a>
        &nbsp;&nbsp;
        <a  className="btn btn-primary " href={langswitch.RouteP("cart")}>Warenkorb</a>
        </div></div>);
useEffect(()=>{
    langswitch.GetJsonM("menu").then((menu) => {        
        var bnb = new URL(decodeURI(location.href));
        bnb = bnb.searchParams.get("section");  

      for(var kkl in menu["sections"]["mdesc"])    
      if(bnb.toUpperCase()==menu["sections"]["mdesc"][kkl]["section"].toUpperCase())
      rows.push(<h3 className='text-light'>{menu["sections"]["mdesc"][kkl]["des"]}</h3>)

      for(var key in menu["product"])
      if(menu["product"][key]["section"]==bnb){                      
      var descriptionO = menu["product"][key]["desO"] !=undefined?<div className="col-12">{menu["product"][key]["desO"]}</div>:"";
      rows.push(
          <a style={{"min-height":"3.5rem"}} href={langswitch.RouteP("customizeorder?id="+key)} className="row cosrow mb-2 text-light p-1">              
              <div className="col-12"><h5>{menu["product"][key]["name"]}&nbsp;&nbsp;Nr.{key}&nbsp;&nbsp;{menu["product"][key]["zusatz"]}</h5></div>
              {descriptionO}
      </a>);  
    }    
    setRows(rows)
    })
    })     
    
    return(
    <>
    <Head>
      <title>{MyLang["title"]}</title>
      <link href="https://angebote-restu.s3-website.eu-central-1.amazonaws.com/mystyles/sectionmenu.css" rel="stylesheet" />
    </Head>
    <MyNavbar />
    <div className="container mt-2">        
    {mrows}                
    </div>  
    </>
    )
}