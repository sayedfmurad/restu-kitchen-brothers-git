import React, { Component, useEffect } from 'react';
import Script from 'react-load-script'
import langswitch from "../Utils/langswitch"
import hash from "../Utils/object_hash"
import Items from "./Items"
import Autocomplete from "react-google-autocomplete";



import { useState } from 'react';

const CheckIfSomeFieldsAreEmpty=()=>{
  var obj={}
  obj["fname"] = document.getElementById("fname").value
  obj["lname"] = document.getElementById("lname").value 
  obj["phonen"] =document.getElementById("phonen").value  
  if(obj["fname"]=="")
  {
    var elementt = document.getElementById("fname")
    elementt.scrollIntoView({ behavior: "smooth", block: "start" });
    elementt.focus()                
    alert("Bitte tragen Sie einen Vornamen ein")
    return false
  }
  if(obj["lname"]=="")
  {
    var elementt = document.getElementById("lname")
    elementt.scrollIntoView({ behavior: "smooth", block: "start" });
    elementt.focus()                
    alert("Bitte tragen Sie einen Nachnamen ein")
    return false
  }
  if(obj["phonen"]=="")
  {
    var elementt = document.getElementById("phonen")
    elementt.scrollIntoView({ behavior: "smooth", block: "start" });
    elementt.focus()                
    alert("Bitte tragen Sie einen Handynummer ein")
    return false
  }    
}
const GotPlace=(place,textabohlen,mSetContainer,setMsgError,setMainContainer,menu)=> {
   const  setCursorAfterWord=(word)=> {
     const input = document.getElementById('address-input');
     const value = input.value;
   
     // Find the index of the word in the value string
     const wordIndex = value.indexOf(word);
   
     if (wordIndex !== -1) {
       // Set the focus on the input element
       input.focus();
   
       // Set the cursor position after the word
       const cursorPosition = wordIndex + word.length;
   
       // Insert a whitespace character after the cursor position
       input.setRangeText(' ', cursorPosition, cursorPosition);
   
       // Move the cursor one position after the whitespace
       input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
       const notification = document.getElementById('notification');
       notification.style.display = 'block';
 
       
     }
   }   
    const degreesToRadians=(degrees)=>{
       return degrees * Math.PI / 180;
     };
     const calculateDistance=(lat1, lon1, lat2, lon2)=>{
       var earthRadiusKm = 6371;
 
       var dLat = degreesToRadians(lat2-lat1);
       var dLon = degreesToRadians(lon2-lon1);
     
       lat1 = degreesToRadians(lat1);
       lat2 = degreesToRadians(lat2);
     
       var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
               Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
       var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
       return earthRadiusKm * c;
   };
            //  var place = autocomplete.getPlace()                
             var obj = {}
             if(typeof place === "undefined")
             {
               setMsgError("Bitte ein Addresse auswahlen")
               return false
             }
             if(!place.geometry)
             {
                 document.getElementById('address-input').placeholder='Suche für eine Addresse';
                 return 
             }
             else
             {
                 for(var ii in place.address_components)
                 {
                     for(var tt in place.address_components[ii].types)
                     {
                         switch(place.address_components[ii].types[tt])
                         {
                             case "street_number":
                               obj["housenumber"]=place.address_components[ii].long_name;
                             break;
                             case "route":
                               obj["street"]=place.address_components[ii].long_name;
                             break;
                             case "postal_code":
                               obj["zipc"]=place.address_components[ii].long_name;
                             break;
                             case "administrative_area_level_3":
                               obj["city"]=place.address_components[ii].long_name;
                                 break;
                     }
                     }
                 }
             }
 
 
 
             obj["place_id"] = place.place_id;
             obj['lng'] = place.geometry.location.lng();
             obj['lat'] = place.geometry.location.lat();
             obj['distance'] = calculateDistance(menu['staticValue']['latlng']['lat'],menu['staticValue']['latlng']['lng'],obj['lat'],obj['lng']);                        
 
             var isAllowedDistance = false;
             var lastAvailabeDistance = "km"
             for(var ddd in menu["staticValue"]["minpriceorder"])
             {
                 if(obj['distance']>=menu["staticValue"]["minpriceorder"][ddd]["distance"]["min"]&&
                 obj['distance']<menu["staticValue"]["minpriceorder"][ddd]["distance"]["max"])
                 {
                     obj['kosten'] = menu["staticValue"]["minpriceorder"][ddd]["lieferkosten"]
                     obj['minpriceorder'] = menu["staticValue"]["minpriceorder"][ddd]["price"]
                     isAllowedDistance= true;
 
                     break;
             }
             lastAvailabeDistance = menu["staticValue"]["minpriceorder"][ddd]["distance"]["max"]+" "
             }
             if(obj["street"]==""||obj["housenumber"]==""||obj["zipc"]==""||!isAllowedDistance)    
             {
                 if(!isAllowedDistance)
                 {
                   setMsgError("Die eingetragene Adresse hat mehr als "+lastAvailabeDistance +"km abstand, Tragen Sie bitte eine andere Adresse");
                   return false
                 }
                 else{
                   setMsgError("Bitte wählen Sie eine Adresse aus");
                   return false
                 }
               }
 
               if(!("housenumber" in obj))
               {
                 setCursorAfterWord(obj["street"])
                 setMsgError("Bitte tragen Sie ein Hausnummer ein");              
                 return false
               }
               
               const notification = document.getElementById('notification');
               notification.style.display = 'none';
 
               obj["fname"] = document.getElementById("fname").value
               obj["lname"] = document.getElementById("lname").value 
               obj["phonen"] =document.getElementById("phonen").value  
               obj["firma"] =document.getElementById("firma").value  
 
       
               setMsgError("")
               var addr = langswitch.getJson("address"); 
                 var hashs = hash(obj);
                 addr[hashs] = obj;
                 window.localStorage.setItem("seladdress", hashs);
                 window.localStorage.setItem("address", JSON.stringify(addr));
                 setMainContainer(<UserHasData textabohlen={textabohlen} menu={menu} setMainContainer={setMainContainer} setMsgError={setMsgError} mSetContainer={mSetContainer}/>)
               return true
          
 
}


export function GotJsonDataMenu ({textabohlen,menu,setMsgError,setMainContainer,mSetContainer}) {
  const MyLang = langswitch.langswitchs("addaddress");      



      
  return<div className="container mt-4">
  <div className="row p-3 g-2">            
  <div class="form-group col-md-6 col-sm-12">
      <label for="fname">{MyLang["First Name"]}</label>
      <input  type="text" class="form-control form-select" id="fname" aria-describedby="fnameHelp" placeholder="Vorname" required/>
  </div>
  <div class="form-group col-md-6 col-sm-12">
      <label for="lname">{MyLang["Last Name"]}</label>
      <input  type="text" class="form-control form-select" id="lname" aria-describedby="lnameHelp" placeholder="Nachname" required/>
  </div>            
  <br/>
  <div class="form-group col-md-6 col-sm-12">
      <label for="firma">Anmerkung</label>
      <input type="text" class="form-control form-select" id="firma" aria-describedby="firmHelp" placeholder="(freiwillig)"/>                
  </div>
  <div class="form-group col-md-6 col-sm-12 ">
      <label for="phonen">Handynummer</label>
  <div className='input-group'>
      <span class="input-group-text form-select2" id="inputGroup-sizing-default">+49</span>            
      <input type="text"class="form-control form-select" aria-describedby="inputGroup-sizing-default" aria-label="Sizing example input" id="phonen"  placeholder=" Handynummer" required/>
  </div>            
  </div>            
  <div className='col-12'>
  <Autocomplete
  placeholder='Such für eine Addresse'
  id="address-input"
  class="input-group form-control form-select"
  onFocus={CheckIfSomeFieldsAreEmpty}
  options={{
    types: ["geocode", "establishment"],
    componentRestrictions: { country: "de" },
  }}
  apiKey="AIzaSyDmGxjz66ljEkb7bGc6zoD9iXYrZS0m_t4"
  onPlaceSelected={(place) => {
    GotPlace(place,textabohlen,mSetContainer,setMsgError,setMainContainer,menu);
  }}
/>
<div class="alert alert-danger mt-3" role="alert" id="notification" style={{display:"none"}}>
                 Bitte tragen Sie Eine Hausenummer ein, und dann wählen Sie die gewünschte Adresse
                 </div>
  </div>            
  </div>                             
</div>
  
}

export function UserHasNoData ({setContainerCustimizeModal,setContainerCartModal,textabohlen,menu,setMsgError,setMainContainer,mSetContainer}) {
  
  return <>
  <Items setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal} textabohlen={textabohlen} menu={menu} mSetContainer={mSetContainer}/>  
  <div className={`list-group `}>                
  <div className='list-group-item mb-3 backgroundcart'>
  <GotJsonDataMenu textabohlen={textabohlen} mSetContainer={mSetContainer} setMainContainer={setMainContainer}  setMsgError={setMsgError} menu={menu}/>
  </div>
  </div>
  </>
}

export function UserHasData ({setContainerCustimizeModal,setContainerCartModal,textabohlen,menu,mSetContainer,setMainContainer,setMsgError}) {

  var addresses = langswitch.getJson("address")
  var seladd = langswitch.getValue("seladdress")

      return<>
          <Items setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal} textabohlen={textabohlen} menu={menu} mSetContainer={mSetContainer}/>
          <div className={`list-group`}>                
          <div className='list-group-item justify-content-between d-flex'>                      
          <div className="row">
              <div className='col-12'>
              <h6>Ihre Daten :</h6>
              </div>
              <div className='col-12'>
              <p style={{"fontSize":"0.7rem","color":"#000"}}>{addresses[seladd]["fname"]}&nbsp;{addresses[seladd]["lname"]}<br/>
              {addresses[seladd]["street"]}&nbsp;{addresses[seladd]["housenumber"]}<br/>
              {addresses[seladd]["city"]}&nbsp;{addresses[seladd]["zipc"]}<br/>
              {addresses[seladd]["phonen"]}
              </p>
              </div>              
          </div>
          <span>
                  <button className='btn btn-secondary'
                  onClick={()=>{
                      window.localStorage.setItem("seladdress","")
                      setMainContainer(<UserHasNoData menu={menu} mSetContainer={mSetContainer} setMainContainer={setMainContainer} setMsgError={setMsgError}/>)  
                  }}
                  >Adresse ändern</button>
                  </span>
          </div>
          </div>
          <br/>
          </>
          
}

export default ({setContainerCartModal,setContainerCustimizeModal,textabohlen,setMsgError,mSetContainer,menu})=>{  
  const [MainContainer, setMainContainer]=useState(<></>)
  var addresses = langswitch.getJson("address")
  var seladd = langswitch.getValue("seladdress")  
    if(seladd in addresses)
    {
      return (<UserHasData setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal} textabohlen={textabohlen} menu={menu} setMsgError={setMsgError} mSetContainer={mSetContainer} setMainContainer={setMainContainer}/>)
    }
    else
    {
      return(<UserHasNoData setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal} textabohlen={textabohlen} menu={menu} mSetContainer={mSetContainer} setMainContainer={setMainContainer} setMsgError={setMsgError}/>)  
    }
  
  
}