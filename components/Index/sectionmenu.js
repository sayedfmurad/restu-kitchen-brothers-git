import Head from 'next/head'
import React, { useEffect,useState } from 'react';
import langswitch from '../Utils/langswitch'

export default function Sectionmenu({menu,bnb}) {
    const MyLang = langswitch.langswitchs("sectionmenu");
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    var rows = [];    
         rows.push(<div className="row mb-3">
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mx-auto" >
        <a  className="btn btn-primary " href={langswitch.RouteP("")}>{MyLang["back"]}</a>
        &nbsp;&nbsp;
        <a  className="btn btn-primary " href={langswitch.RouteP("cart")}>Warenkorb</a>
        </div></div>);
         
      for(var kkl in menu["sections"]["mdesc"])    
      if(bnb.toUpperCase()==menu["sections"]["mdesc"][kkl]["section"].toUpperCase())
      rows.push(<div className='col-lg-8 col-md-12 col-sm-12 col-xs-12 mx-auto'><h3 className='text-light'>{menu["sections"]["mdesc"][kkl]["des"]}</h3></div>)
      var rows2 = []
      for(var key in menu["product"])
      if(menu["product"][key]["section"]==bnb){              
      var descriptionO = menu["product"][key]["desO"] !=undefined?<div className="col-12 ">{menu["product"][key]["desO"]}</div>:"";
      rows2.push(  
       
          <a style={{"min-height":"3.5rem","backgroundColor":"rgb(255 255 255 / 19%)"}} href={langswitch.RouteP("customizeorder?id="+key)} className="p-2 rounded col-lg-8 col-md-12 col-sm-12 col-xs-12 mx-auto mb-2 text-light p-1">   
                <div className='d-flex justify-content-between'>
                <h5>{menu["product"][key]["name"]}&nbsp;
                <sup style={{"fontSize":"0.6rem"}}>{menu['product'][key]['zusatz']}</sup>
                </h5>
                <h5>{menu["product"][key]["price"][Object.keys(menu["product"][key]["price"])[0]]}&nbsp;&euro;
                </h5>
                </div>                                   
              {descriptionO}
            </a>
      );  
    }
    rows.push(
        <div className='row mb-3 g-1'>
            {rows2}
        </div>
    )
    


    return<div className="container mt-2">        
    {rows}                
    </div>  
    
}