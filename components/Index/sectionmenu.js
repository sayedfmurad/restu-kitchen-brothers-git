import Head from 'next/head'
import React, { useEffect,useState } from 'react';
import langswitch from '../Utils/langswitch'
import MyNavbar from "../TopBar/TobBar"
import Sections from './sections';
import CustomizeOrder from "./customizeorder"
export default function Sectionmenu({SetContainer,menu,bnb}) {
    
    const SelectClicked = (e)=>{

        const elementWithDataKey = e.target.closest('[data-key]');
  
        if (elementWithDataKey) {

            const dataKey = elementWithDataKey.getAttribute('data-key');
            langswitch.ChangeGetParameters("CustomizeOrder:::"+bnb+":::"+dataKey)
            SetContainer(
                <CustomizeOrder menu={menu} SetContainer={SetContainer} bnb={bnb} id={dataKey}/>
            )
        }       
    }

    var rows = [];    
    
      for(var kkl in menu["sections"]["mdesc"])    
      if(bnb.toUpperCase()==menu["sections"]["mdesc"][kkl]["section"].toUpperCase())
      rows.push(<div className='col-lg-8 col-md-12 col-sm-12 col-xs-12 mx-auto'><h3 className='text-light'>{menu["sections"]["mdesc"][kkl]["des"]}</h3></div>)
      var rows2 = []
      for(var key in menu["product"])
      if(menu["product"][key]["section"]==bnb){              
      var descriptionO = menu["product"][key]["desO"] !=undefined?<div className="col-12 ">{menu["product"][key]["desO"]}</div>:"";
      rows2.push(  
       
          <a style={{"min-height":"3.5rem"}}           
          onClick={SelectClicked}
          data-key={key} 
          className="p-2 rounded col-lg-8 col-md-12 col-sm-12 col-xs-12 mx-auto mb-2 text-light p-1">   
                <div className='d-flex justify-content-between'>
                <h5>{key}.&nbsp;{menu["product"][key]["name"]}&nbsp;
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
    


    return <>
    <MyNavbar menu={menu} mSetContainer={SetContainer}  options={                   
    [
    <a onClick={()=>{
        // langswitch.ChangeGetParameters("Sections")                                   
        SetContainer(<Sections menu={menu}/>)
    }} className=" btn btn-secondary" id='navbarBack' >Zurück</a>     
    ]
  }  />
  <div className="container mt-2">        
    {rows}                
    </div>
      
    </>
    
}