import React, { Component, useEffect } from 'react';
import Script from 'react-load-script'
import langswitch from "../Utils/langswitch"
import hash from "../Utils/object_hash"
import Items from "./Items"
import Autocomplete from "react-google-autocomplete";
import MModal from "../Index/mModal"
import packagee from "../../package.json"

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
  
  return true
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
       notification.innerText="Bitte tragen Sie Eine Hausenummer ein, und dann wählen Sie die gewünschte Adresse"
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
                             case "locality":
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
                  const notification = document.getElementById('notification');
                  notification.innerText="Die eingetragene Adresse hat mehr als "+lastAvailabeDistance +"km abstand, Tragen Sie bitte eine andere Adresse"
                  notification.style.display = 'block';
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

export function SearchforAddressModal ({menu}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [ShowResult, setShowResult] = useState(<></>);
  useEffect(()=>{
    setTimeout(() => {
      document.getElementById("inputmodalSearchforAddressModal").style.display="block"
      setShowResult(<></>)
    }, 300);
  },[])
  
  function containsDigit(inputString) {
    // Loop through each character in the string
    for (let i = 0; i < inputString.length; i++) {
      // Check if the character is a digit (0 to 9)
      if (inputString[i] >= '0' && inputString[i] <= '9') {
        return true; // Return true if a digit is found
      }
    }
    
    // If no digit is found, return false
    return false;
  }
  const GotPlaceV2=(obj)=> {       
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
              obj['distance'] = calculateDistance(menu['staticValue']['latlng']['lat'],menu['staticValue']['latlng']['lng'],obj['lat'],obj['lng']);                        
                for(var ddd in menu["staticValue"]["minpriceorder"])
                {
                    if(obj['distance']>=menu["staticValue"]["minpriceorder"][ddd]["distance"]["min"]&&
                    obj['distance']<menu["staticValue"]["minpriceorder"][ddd]["distance"]["max"])
                    {
                        obj['kosten'] = menu["staticValue"]["minpriceorder"][ddd]["lieferkosten"]
                        obj['minpriceorder'] = menu["staticValue"]["minpriceorder"][ddd]["price"]                        
                        break;
                    }
                }                                                      
                obj["fname"] = document.getElementById("fname").value
                obj["lname"] = document.getElementById("lname").value 
                obj["phonen"] =document.getElementById("phonen").value  
                obj["firma"] =document.getElementById("firma").value            
                var addr = langswitch.getJson("address"); 
                var hashs = hash(obj);
                addr[hashs] = obj;
                window.localStorage.setItem("seladdress", hashs);
                window.localStorage.setItem("address", JSON.stringify(addr));             
                document.getElementById('btn-close-SearchforAddressModal').click()
                setTimeout(() => {      
                  document.getElementById('btn-close-CartModal').click()
                }, 200);
                setTimeout(() => {      
                  document.getElementById('IdButtonCartFooter').click()
                }, 400);
                setTimeout(() => {      
                  document.getElementById("MainIdd").scrollIntoView({ behavior: "instant", block: "end" });
                }, 600);
 }
  const OnClickItem = (e)=>{ 
    try {
      let idd = e.target.getAttribute("data-id")
      let textt = document.getElementById(idd).textContent  
      let texttt = textt.split(",")[0]
      const  setCursorAfterWord=()=> {
        const input = document.getElementById('inputmodalSearchforAddressModal');
        const value = input.value;
        const word = value.split(",")[0]
        
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
          
        }
      }   
      const AddresssNotReadyWithStreeNumber = ()=>{
        setSearchTerm(textt)
        setTimeout(() => {
          setCursorAfterWord()          
        }, 300);
        ShowMsgError("Bitte tragen Sie Eine Hausenummer ein, und dann wählen Sie die gewünschte Adresse")

      }
      const  GetPlaceForUser=async (placeid)=>{
        try {
         let url = packagee["server"]["url"]+"?";
         let mheaders = new Headers();
         mheaders.append('Origin', '*');
          // Make a GET request to your API endpoint
          const response = await fetch(`${url}&placeid=${placeid}`,{ headers: mheaders});
          
          // Check if the request was successful (status code 200)
          if (response.ok) {
            // Parse the JSON response
            const data = await response.json();
            if (data["street_number"] == "")
            {
              AddresssNotReadyWithStreeNumber()              
              return 
            }
            else{
              GotPlaceV2(data)
            }
            
          } else {
            ShowMsgError("Etwas ist schiefgelaufen")
            console.error('Error:', response.statusText);
          }
        } catch (error) {
          ShowMsgError("Etwas ist schiefgelaufen")
          console.error('Error:', error.message);
        }
      }
    let text = texttt.split(" ")
    text = text[text.length-1]
    if(containsDigit(text))
    {
      GetPlaceForUser(idd)
      ShowSpinner()
      document.getElementById("inputmodalSearchforAddressModal").style.display="none"
    }
    else
    {AddresssNotReadyWithStreeNumber()}
    } catch (error) {
      ShowMsgError("Error")
      console.log(error)
    }
  }
  const HandleShowResult = (data)=>{
    let rows =[]
    for(var g in data["predictions"])
    rows.push(<li onClick={OnClickItem} data-id={data["predictions"][g]["place_id"]} style={{"cursor":"pointer"}} class="list-group-item">
      <div data-id={data["predictions"][g]["place_id"]} className='row'>
        <div data-id={data["predictions"][g]["place_id"]} className=' col-2 col-md-1 d-flex justify-content-end'>
        <svg data-id={data["predictions"][g]["place_id"]} width="30" height="30" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 395.71 395.71" xmlSpace="preserve">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> <g>
        <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path> 
        </g>
        </g>
      </svg>
        </div>
        <div id={data["predictions"][g]["place_id"]} data-id={data["predictions"][g]["place_id"]} className='col-9 col-md-10'>
        {data["predictions"][g]["description"]}
        </div>
      </div>      
      </li>)
    
    if(rows.length == 0)
    rows.push(<li class="list-group-item">
      keine Ergebnisse 
    </li>)
    setShowResult(<ul class=" mt-3 list-group">
    {rows}
  </ul>)
  }
  let url = packagee["server"]["url"]+"?"
  url += "lat="+menu["staticValue"]["latlng"]["lat"]
  url += "&lng="+menu["staticValue"]["latlng"]["lng"]
  url += "&r="+(parseInt(menu["staticValue"]["minpriceorder"][menu["staticValue"]["minpriceorder"].length -1]["distance"]["max"])*1000)    
  let mheaders = new Headers();
  mheaders.append('Origin', '*');

// Add more headers like the lines above

  const ShowMsgError=(msg)=>{
    document.getElementById("inputmodalSearchforAddressModal").style.display="block"
    setShowResult(
      <div class="alert alert-danger mt-3" role="alert" id="notificationSearchforAddressModal" >
        {msg}
  
  </div>
    )
     
  }
  const ShowSpinner=()=>{
    setShowResult(
  <div className='d-flex justify-content-center mt-5'>
  <div class="spinner-grow" role="status" id="spinnerModalsearchaddress">
  <span class="visually-hidden">Loading...</span>
  </div>
  </div>  
    )
    
  }
  const handleInputChange = async (event) => {
    ShowSpinner()
    const value = event.target.value;    
    setSearchTerm(value);         
    if(value == "")
    return false
    try {
      // Make a GET request to your API endpoint
      const response = await fetch(`${url}&input=${value}`,{ headers: mheaders});
      
      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Parse the JSON response
        const data = await response.json();
        HandleShowResult(data);
      } else {
        ShowMsgError("Etwas ist schiefgelaufen")
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      ShowMsgError("Etwas ist schiefgelaufen")
      console.error('Error:', error.message);
    }

  };
  return <><div class="modal-header">  
   <h3 className='m-0'>Such für eine Addresse</h3>  
   <button type="button" class="btn-close " id={`btn-close-SearchforAddressModal`} data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body" style={{height:"600px"}}>     
  <input id="inputmodalSearchforAddressModal"  className='mt-2 input-group form-control form-select'
  placeholder='Such für eine Addresse'
  value={searchTerm}
  onChange={handleInputChange} 
  />    
  {ShowResult}          
         
  </div>
</>
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
  <input className='input-group form-control form-select'
  placeholder='Such für eine Addresse'
  // onFocus={CheckIfSomeFieldsAreEmpty}
  onClick={()=>{
  

    if(CheckIfSomeFieldsAreEmpty())
  {let myModal = new bootstrap.Modal(document.getElementById("SearchforAddressModal"), {
        keyboard: true
      })    
      myModal.show()  
    history.pushState({}, '');
    setTimeout(() => {
      if(document.getElementById("inputmodalSearchforAddressModal"))
      document.getElementById("inputmodalSearchforAddressModal").focus()
    }, 700);
    }
  }}
  />
  {/* <Autocomplete
  placeholder='Such für eine Addresse'
  id="address-input"
  class="input-group form-control form-select"
  // onFocus={CheckIfSomeFieldsAreEmpty}
  options={{
    types: ["geocode", "establishment"],
    componentRestrictions: { country: "de"},
    location: new google.maps.LatLng(51.2024612, 6.4540167),
    radius:4000
    
  }}
  apiKey="AIzaSyDmGxjz66ljEkb7bGc6zoD9iXYrZS0m_t4"
  onPlaceSelected={(place) => {
    GotPlace(place,textabohlen,mSetContainer,setMsgError,setMainContainer,menu);
  }}
/> */}
<div class="alert alert-danger mt-3" role="alert" id="notification" style={{display:"none"}}>
                 Bitte tragen Sie Eine Hausenummer ein, und dann wählen Sie die gewünschte Adresse
                 </div>
  </div>            
  </div>  
  <MModal idd="SearchforAddressModal" contaienrr={<SearchforAddressModal menu={menu}/>} />
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
              <p style={{"color":"#000"}}>
              {langswitch.firstUpper(addresses[seladd]["fname"])}&nbsp;{langswitch.firstUpper(addresses[seladd]["lname"])}<br/>
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
                      window.localStorage.setItem("address","{}")
                      setMainContainer(<UserHasNoData menu={menu} mSetContainer={mSetContainer} setMainContainer={setMainContainer} setMsgError={setMsgError}/>)  
                  }}
                  >ändern</button>
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