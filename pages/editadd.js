import Head from 'next/head'
import MyNavbar from "../components/navbar/MyNavbar"
import hash from "../components/Utils/object_hash"
import React, { useState } from 'react';
import langswitch from '../components/Utils/langswitch'
export default function Addaddress() {
    const MyLang = langswitch.langswitchs("editadd");
    if(process.browser){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')

        if(id == null || id == undefined || id == "")
        window.location.href = langswitch.RouteP("");        

        var addr = window.localStorage.getItem("address");
            addr = addr == null ? "" : addr;
            addr = addr == "" ? "{}" : addr;
            addr = JSON.parse(addr);
            if(addr[id] == undefined)
            window.location.href = langswitch.RouteP(""); 

        $('#fname').val(addr[id]['fname']);
        $('#lname').val(addr[id]['lname']);
        $('#firma').val(addr[id]['firma']);
        $('#street').val(addr[id]['street']);
        $('#housenumber').val(addr[id]['housenumber']);
        $('#city').val(addr[id]['city']);
        $('#zipc').val(addr[id]['zipc']);
        $('#phonen').val(addr[id]['phonen']);
    }
    const onhandl = (e)=>{
        e("")
    }
    const subb = (e)=>{
        if(process.browser)
        {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const id = urlParams.get('id');

            var addr = window.localStorage.getItem("address");
            addr = addr == null ? "{}" : addr;
            addr = JSON.parse(addr);
            var obj = addr[id];
            obj["fname"] = e.target.fname.value;
            obj["lname"] = e.target.lname.value;
            obj["street"] = e.target.street.value;
            obj["housenumber"] = e.target.housenumber.value;
            obj["city"] = e.target.city.value;
            obj["phonen"] = e.target.phonen.value;
            obj["firma"] = e.target.firma.value;
            obj["zipc"] = e.target.zipc.value;
            addr[hash(obj)] = obj;
            delete addr[id];
            window.localStorage.setItem("address",JSON.stringify(addr));
            // e.preventDefault();
        }        
    }
    return(
        <>
        <Head>
        <title>{MyLang["title"]}</title>
        <link href="./mystyles/addaddress.css" rel="stylesheet" />
        </Head>
        <MyNavbar/>
        <div className="container mt-4">
            <form onSubmit={subb} action={langswitch.RouteP("selectadd")}  >
            <div className="row p-3">
            <div class="form-group col-md-4 col-sm-12">
                <label for="fname">{MyLang["First Name"]}</label>
                <input type="text" class="form-control"  id="fname"  aria-describedby="fnameHelp" placeholder="Enter First Name" required/>
            </div>
            <div class="form-group col-md-4 col-sm-12">
                <label for="lname">{MyLang["Last Name"]}</label>
                <input type="text" class="form-control"  id="lname" aria-describedby="lnameHelp" placeholder="Enter Last Name" required/>
            </div>
            <div class="form-group col-md-4 col-sm-12">
                <label for="firma">{MyLang["Firma"]}</label>
                <input type="text" class="form-control"  id="firma" aria-describedby="firmHelp" placeholder="Enter Firma Name (Optional)"/>                
            </div>
            <div class="form-group col-md-6 col-sm-12">
                <label for="street">{MyLang["Street"]}</label>
                <input type="text" class="form-control"  id="street" aria-describedby="streetHelp" placeholder="Enter Street Name" required/>
            </div>
            <div class="form-group col-md-4 col-sm-6">
                <label for="housenumber">{MyLang["House Number"]}</label>
                <input type="text" class="form-control"  id="housenumber" aria-describedby="housenHelp" placeholder="Enter House Number" required/>
            </div>
            <div class="form-group col-md-6 col-sm-12">
                <label for="city">{MyLang["City"]}</label>
                <input type="text" class="form-control"  id="city" aria-describedby="cityHelp" placeholder="Enter City Name" required/>
            </div>
            <div class="form-group col-md-4 col-sm-6">
                <label for="zipc">{MyLang["Zip Code"]}</label>
                <input type="text" class="form-control"  id="zipc" aria-describedby="zipcHelp" placeholder="Enter Zip Code" required/>
            </div>
            <div class="form-group col-md-6 col-sm-12">
                <label for="phonen">{MyLang["Phone Number"]}</label>
                <input type="text" class="form-control"  id="phonen" aria-describedby="pnHelp" placeholder="Enter Phone Number" />
            </div>            
            <div className="col-12"><button type="submit" class="btn btn-primary col-md-2 col-sm-4 mt-2 mb-2 mr-2 ml-2">{MyLang["Edit"]}</button></div>            
            </div>                        
            </form>
        </div>
        </>
    )
}