import Head from 'next/head'
import React, { useState } from 'react';
import MyNavbar from "../components/navbar/MyNavbar"
// import Footer from "../components/footer/Footer"
import menu from "../public/database/menu.json"
import langswitch from '../components/Utils/langswitch'
export default function Sectionmenu() {
    const MyLang = langswitch.langswitchs("sectionmenu");
    var [pricestatus, setpricestatus] = useState("0,00");    
    var [numitemstatus, setnumitemstatus] = useState(0);    
    var rows = [];    
    rows.push(<div className="row mb-2"><div className="col-12">
        <a  className="btn btn-primary " href={langswitch.RouteP("")}>{MyLang["back"]}</a>
        &nbsp;&nbsp;
        <a  className="btn btn-primary " href={langswitch.RouteP("cart")}>Warenkorb</a>
        </div></div>);
    if(process.browser)
    {       
        var backgroundElement = document.getElementsByClassName("mbackground");     
        var bnb = new URL(decodeURI(location.href));
        bnb = bnb.searchParams.get("section");         
        var  orr = Object.keys(langswitch.getJson("order")).length;
      [numitemstatus, setnumitemstatus] = useState(orr);
      [pricestatus, setpricestatus] = useState(window.localStorage.getItem("sumprice")==null?"0,00":window.localStorage.getItem("sumprice"));
      for(var kkl in menu["sections"]["mdesc"])    
      if(bnb.toUpperCase()==menu["sections"]["mdesc"][kkl]["section"].toUpperCase())
      rows.push(<h3 className='text-light'>{menu["sections"]["mdesc"][kkl]["des"]}</h3>)

      for(var key in menu["product"])
      if(menu["product"][key]["section"]==bnb){  
      var prows=[];
              
      // for(var mn in menu["product"][key]["price"])
          // prows.push(<a href={langswitch.RouteP("customizeorder?id="+key)} className="btn btn-danger col-4  mb-1 mt-1"></a>);            

      var descriptionO = menu["product"][key]["desO"] !=undefined?<div className="col-12">{menu["product"][key]["desO"]}</div>:"";
      rows.push(
          <a style={{"min-height":"3.5rem"}} href={langswitch.RouteP("customizeorder?id="+key)} className="row cosrow mb-2 text-light p-1">              
              <div className="col-12"><h5>{menu["product"][key]["name"]}&nbsp;&nbsp;Nr.{key}&nbsp;&nbsp;{menu["product"][key]["zusatz"]}</h5></div>
              {descriptionO}
      </a>);  
    }
    }
    
    return(
    <>
    <Head>
      <title>{langswitch["title"]}</title>
      <link href="./mystyles/sectionmenu.css" rel="stylesheet" />
    </Head>
    <MyNavbar />
    <div className="container mt-2">        
        {rows}                
    </div>
    {/* <Footer pricestatus={pricestatus} numitemstatus={numitemstatus}/> */}
    </>
    )
}