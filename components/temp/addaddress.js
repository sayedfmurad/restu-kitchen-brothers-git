import Head from 'next/head'
import MyNavbar from "../TopBar/TobBar2"
import hash from "../Utils/object_hash"
import langswitch from '../Utils/langswitch'
import { useState } from 'react';
export function Container(){
    const MyLang = langswitch.langswitchs("addaddress");  
    var [SearchSpinnerDisplay,setSearchSpinnerDisplay]=useState("d-none")
    var menu = {}
    if(process.browser)    
    menu = langswitch.getJson("menu")
    
    const keyIsUp = ()=>{
        setSearchSpinnerDisplay("")
    }
    const IsOnBlur = ()=>{
        setSearchSpinnerDisplay("d-none")
    }
    const subb = (e)=>{
        if(process.browser)
        {            
            var degreesToRadians=(degrees)=>{
                return degrees * Math.PI / 180;
              };
            var calculateDistance=(lat1, lon1, lat2, lon2)=>{
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
            var addr = langswitch.getJson("address"); 
            var cursel = langswitch.getValue("seladdress");
            var obj = JSON.parse("{}");
            obj["fname"] = e.target.fname.value;
            obj["lname"] = e.target.lname.value;
            obj["street"] = mlocation["street"];
            obj["housenumber"] = mlocation["housenumber"];
            obj["city"] = mlocation["city"];
            obj["phonen"] = e.target.phonen.value;
            obj["firma"] = e.target.firma.value;
            obj["zipc"] = mlocation["zipc"];
            if(typeof place === "undefined")
            {
              alert("Bitte ein Addresse auswahlen")
              e.preventDefault();      

              return
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
                alert("Die eingetragene Adresse hat mehr als "+lastAvailabeDistance +"km abstand, Tragen Sie bitte eine andere Adresse");
                else if(obj["housenumber"]=="")
                alert(MyLang["plase enter housenumber"]);
                else if(obj["zipc"]=="")
                alert(MyLang["plase enter zipc"]);
                else if(obj["street"]=="")
                alert(MyLang["plase enter street"]);                
            
                e.preventDefault();      
            }   
            else
            {
                var hashs = hash(obj);
                addr[hashs] = obj;
                window.localStorage.setItem("seladdress",hashs);
                window.localStorage.setItem("address",JSON.stringify(addr));
            }                          
        } 
    }

        
    return<div className="container mt-4">
    <form onSubmit={subb} action={langswitch.RouteP("cart")}>
    <div className="row p-3 g-2">            
    <div class="form-group col-md-6 col-sm-12">
        <label for="fname">{MyLang["First Name"]}</label>
        <input type="text" class="form-control" id="fname" aria-describedby="fnameHelp" placeholder="Vorname" required/>
    </div>
    <div class="form-group col-md-6 col-sm-12">
        <label for="lname">{MyLang["Last Name"]}</label>
        <input type="text" class="form-control" id="lname" aria-describedby="lnameHelp" placeholder="Nachname" required/>
    </div>            
    <br/>
    <div class="form-group col-md-6 col-sm-12">
        <label for="firma">{MyLang["Firma"]}</label>
        <input type="text" class="form-control" id="firma" aria-describedby="firmHelp" placeholder="Firma Name (Optional)"/>                
    </div>
    <div class="form-group col-md-6 col-sm-12 ">
        <label for="phonen">Handynummer</label>
    <div className='input-group'>
        <span class="input-group-text" id="inputGroup-sizing-default">+49</span>            
        <input type="text"class="form-control" aria-describedby="inputGroup-sizing-default" aria-label="Sizing example input" id="phonen"  placeholder=" Handynummer" required/>
    </div>            
    </div>            
    <br/>
    <br/>

    <br/>
    <br/>
    <div className='col-12'>
    <div class="form-group col-md-6 col-sm-12 ">
                <div class="input-group mb-3">
                <input placeholder='Such für eine Addresse' onBlur={IsOnBlur}  onKeyUp={keyIsUp}  type="text" className="form-control " id="autocomplete" aria-describedby="fnameHelp" />           
                <span className={`${SearchSpinnerDisplay} input-group-text`}>
                <div class=" spinner-border text-primary col-3" role="status" />
                </span>
            </div>
            
    </div>            
    </div>
    <br/>
    <br/>
    <div class="form-group col-md-6 col-sm-12 d-none">
        <label for="street">{MyLang["Street"]}</label>
        <input type="text" class="form-control" id="street" aria-describedby="streetHelp" placeholder="Enter Street Name" />
    </div>
    <div class="form-group col-md-4 col-sm-6 d-none">
        <label for="housenumber">{MyLang["House Number"]}</label>
        <input type="text" class="form-control" id="housenumber" aria-describedby="housenHelp" placeholder="Enter House Number" />
    </div>
    <div class="form-group col-md-6 col-sm-12 d-none">
        <label for="city">{MyLang["City"]}</label>
        <input type="text" class="form-control" id="city" aria-describedby="cityHelp" placeholder="Enter City Name" />
    </div>
    <div class="form-group col-md-4 col-sm-6 d-none">
        <label for="zipc">{MyLang["Zip Code"]}</label>
        <input type="text" class="form-control" id="zipc" aria-describedby="zipcHelp" placeholder="Enter Zip Code" />
    </div>            
    <div className="col-12"><button type="submit" class="btn btn-primary col-md-2 col-sm-4 mt-2 mb-2 mr-2 ml-2">{MyLang["Add"]}</button></div>            
    </div>                        
    </form>
    <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDmGxjz66ljEkb7bGc6zoD9iXYrZS0m_t4&callback=initAutocomplete&libraries=places' async defer/>
    <script src='./scripts/addaddressscript.js' />
</div>
}

export default function Addaddress() {
    const MyLang = langswitch.langswitchs("addaddress");    
  
    return(
        <>
        <Head>
        <title>{MyLang["title"]}</title>
        <link href="./mystyles/addaddress.css" rel="stylesheet" />
        </Head>
        <MyNavbar/>
        <Container/>
        </>
    )
}