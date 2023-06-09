import React, { Component, useEffect } from 'react';
import Script from 'react-load-script'
import langswitch from "../Utils/langswitch"
import hash from "../Utils/object_hash"

class LocationMap extends Component {
   setCursorAfterWord(word) {
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
  

    handleScriptLoad() {
        const inputEl = document.getElementById('address-input');

        /*global google*/
        var options = {
            //types: ['address'],
            componentRestrictions: {country: 'de'}
        };
        this.autocomplete = new google.maps.places.Autocomplete(inputEl, options);
        this.autocomplete.addListener('place_changed', this.handlePlaceSelect.bind(this));
    }
    degreesToRadians=(degrees)=>{
      return degrees * Math.PI / 180;
    };
    calculateDistance=(lat1, lon1, lat2, lon2)=>{
      var earthRadiusKm = 6371;

      var dLat = this.degreesToRadians(lat2-lat1);
      var dLon = this.degreesToRadians(lon2-lon1);
    
      lat1 = this.degreesToRadians(lat1);
      lat2 = this.degreesToRadians(lat2);
    
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      return earthRadiusKm * c;
  };
    handlePlaceSelect() { 
      
            var {menu,setobj,setMsgError} = this.props

            var place = this.autocomplete.getPlace()                
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
                              obj["housenumber"]=
                            place.address_components[ii].long_name;
                            break;
                            case "route":
                              obj["street"]=
                            place.address_components[ii].long_name;
                            break;
                            case "postal_code":
                              obj["zipc"]=
                            place.address_components[ii].long_name;
                            break;
                            case "administrative_area_level_3":
                              obj["city"]=
                                place.address_components[ii].long_name;
                                break;
                    }
                    }
                }
            }



            obj["place_id"] = place.place_id;
            obj['lng'] = place.geometry.location.lng();
            obj['lat'] = place.geometry.location.lat();
            obj['distance'] = this.calculateDistance(menu['staticValue']['latlng']['lat'],menu['staticValue']['latlng']['lng'],obj['lat'],obj['lng']);                        

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
              }

              if(!("housenumber" in obj))
              {
                this.setCursorAfterWord(obj["street"])
                return false
              }
              
              const notification = document.getElementById('notification');
              notification.style.display = 'none';
              setobj(obj)
              setMsgError("")
              return true
    }

    render() {
        return (
            <section>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDmGxjz66ljEkb7bGc6zoD9iXYrZS0m_t4&v=3.33&libraries=places&language=de&region=US"
                    onLoad={this.handleScriptLoad.bind(this)}
                />        

                <div className="form-group">
                    <input type="text"                    
                           placeholder='Such für eine Addresse'
                           className="form-control form-select"
                           id="address-input"
                           name="address" />
                </div>
                <div class="alert alert-danger mt-3" role="alert" id="notification" style={{display:"none"}}>
                Bitte tragen Sie Eine Hausenummer ein, und dann wählen Sie die gewünschte Adresse
                </div>
            </section>
        );
    }
}

import { useState } from 'react';


export function GotJsonDataMenu ({menu,setMsgError,setobj}) {
  const MyLang = langswitch.langswitchs("addaddress");  

      
  return<div className="container mt-4">
  <div className="row p-3 g-2">            
  <div class="form-group col-md-6 col-sm-12">
      <label for="fname">{MyLang["First Name"]}</label>
      <input type="text" class="form-control form-select" id="fname" aria-describedby="fnameHelp" placeholder="Vorname" required/>
  </div>
  <div class="form-group col-md-6 col-sm-12">
      <label for="lname">{MyLang["Last Name"]}</label>
      <input type="text" class="form-control form-select" id="lname" aria-describedby="lnameHelp" placeholder="Nachname" required/>
  </div>            
  <br/>
  <div class="form-group col-md-6 col-sm-12">
      <label for="firma">{MyLang["Firma"]}</label>
      <input type="text" class="form-control form-select" id="firma" aria-describedby="firmHelp" placeholder="Firma Name (Optional)"/>                
  </div>
  <div class="form-group col-md-6 col-sm-12 ">
      <label for="phonen">Handynummer</label>
  <div className='input-group'>
      <span class="input-group-text form-select2" id="inputGroup-sizing-default">+49</span>            
      <input type="text"class="form-control form-select" aria-describedby="inputGroup-sizing-default" aria-label="Sizing example input" id="phonen"  placeholder=" Handynummer" required/>
  </div>            
  </div>            
  <div className='col-12'>
  <LocationMap setMsgError={setMsgError} menu={menu} setobj={setobj}/>          
  </div>            
  </div>                             
</div>
  
}


export function UserHasNoData ({setMsgError,setobj}) {

  const [mContainer, setmContainer] = useState(<></>)
  useEffect(()=>{
    langswitch.GetJsonM("menu").then((m)=>{
      setmContainer(<GotJsonDataMenu setobj={setobj} setMsgError={setMsgError} menu={m}/>)
    })
  },[])
  return <>{mContainer}</>
}




export default ({setMsgError,setobj})=>{  
  var addresses = langswitch.getJson("address")
  var seladd = langswitch.getValue("seladdress")
  if(seladd in addresses)
  {
      return<>
          <div className={`list-group`}>                
          <div className='list-group-item'>                
          <div className="row mb-4">
              <div className='col-12'>
              <h6>Ihre Daten :</h6>
              </div>
              <div className='col-12'>
              <p style={{"fontSize":"0.7rem"}}>{addresses[seladd]["fname"]}&nbsp;{addresses[seladd]["lname"]}<br/>
              {addresses[seladd]["street"]}&nbsp;{addresses[seladd]["housenumber"]}<br/>
              {addresses[seladd]["city"]}&nbsp;{addresses[seladd]["zipc"]}<br/>
              {addresses[seladd]["phonen"]}
              </p>
              </div>
              <div className='col-12 align-items-center d-flex'>
                  <button className='btn btn-outline-primary'
                  onClick={()=>{
                      window.localStorage.setItem("seladdress","")
                      window.location.reload()
                  }}
                  >ändern</button>
              </div>
          </div>
          </div>
          </div>
          <br/>
          </>
          
  }
  else{
      return(<><UserHasNoData setMsgError={setMsgError} setobj={setobj}/></>
          )  
  }
}