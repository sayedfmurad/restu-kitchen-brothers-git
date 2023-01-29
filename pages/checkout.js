import Head from 'next/head'
import React, { useState } from 'react';
import MyNavbar from "../components/navbar/MyNavbar"
import langswitch from '../components/Utils/langswitch'
import hash from "../components/Utils/object_hash"
import menu from "../public/database/menu.json"
export default function checkout() {
  const MyLang = langswitch.langswitchs("checkout");
  var [msgo,setmsgo] = useState("");
  var [disp,setdisp] = useState("");
  var [disp2,setdisp2] = useState("d-none");
  var [pressed,setpressed] = useState(false);
  var [spinnerbar,setspinnerbar] = useState("d-none");
  var [spinnerpaypal,setspinnerpaypal] = useState("d-none");
  const urll = "https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws";
  const startpay= (t)=>{
    if(process.browser)
    {
      setpressed(true);
      if(t=="bar")
      setspinnerbar("")
      else
      setspinnerpaypal("")

      var parms = {}
      var orders = langswitch.getJson("order")
      var address = langswitch.getJson("address")
      var seladd = langswitch.getValue("seladdress")
      var time =  new Date().getTime();           
      parms["type"] = t;
      parms["menu"] = menu["staticValue"]["menuurl"]
      parms["address"] = address[seladd];
      parms["orders"] = orders;
      var MainOrderId = time + JSON.stringify(parms);
      MainOrderId = hash(MainOrderId);            
      parms["MainId"]=MainOrderId;
      parms["time"]="";
      const TimeNow=new Date();
      parms["createtime"]=TimeNow.getTime();
      var MainOrder = langswitch.getJson("mainorder");
      MainOrder[MainOrderId]=parms      
      parms = JSON.stringify(parms);
      window.localStorage.setItem("lastOrderId",MainOrderId);
      let mheaders = new Headers();
      mheaders.append('Origin','*');
      fetch(urll, {
        method: 'POST', // or 'PUT'
        headers: mheaders,
        body: parms
      })
      .then(data => { 
        if(data.body)
        {
          if(data.status != 200)
          throw new Error("Error");
          
          window.localStorage.setItem("mainorder",JSON.stringify(MainOrder));
          if(t=="bar")
          window.location.href=langswitch.RouteP("success");
          else if(t=="paypal")
          window.location.href=langswitch.RouteP("paypal");
        }
        else
        throw new Error("error");
      })
      .catch((error) => {
        setdisp("d-none");
        setdisp2("");        
        setmsgo(MyLang["Some thing went..."]); 
        langswitch.ClearAllData();       
        console.error('Error:', error);
      })
  }
  }
    return (
        <>
        <Head>
        <title>{langswitch["title"]}</title>
        <link href="./mystyles/cart.css" rel="stylesheet" />
        </Head>
        <MyNavbar/>
        <div className="container mt-3 text-white">
        <div className={`row mb-2 justify-content-center ${disp2}`}>
          <div className='col-12 text-white'>
            <h4>{msgo}</h4>
          </div>
          <div className='col-12'>
            <a className='btn btn-primary' href={langswitch.RouteP("")}>{MyLang["back"]}</a>
          </div>
        </div>
        <div className={`row mb-2 justify-content-center ${disp}`}>
        <h4 className="col-9 offset-3" style={{color:"white"}}>{MyLang["Pay With"]}:</h4>

        <button onClick={()=>{startpay("bar")}} class="col-4 p-4 btn btn-primary" type="button" disabled={pressed}>
          <span class={`spinner-border spinner-border-sm ${spinnerbar}`} role="status" aria-hidden="true"></span>
          <span class="sr-only">&nbsp;&nbsp;{MyLang["Bar"]}</span>
        </button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={()=>{startpay("paypal")}} class="col-4 p-4 btn btn-primary" type="button" disabled={pressed}>
          <span class={`spinner-border spinner-border-sm ${spinnerpaypal}`} role="status" aria-hidden="true"></span>
          <span class="sr-only">&nbsp;&nbsp;{MyLang["Paypal"]}</span>
        </button>
        </div>
        </div>
        </>
        );
}