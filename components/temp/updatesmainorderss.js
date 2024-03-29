import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import MyNavbar from "../TopBar/TobBar2"
import langswitch from '../Utils/langswitch'


export default function  A(){
    const MyLang = langswitch.langswitchs("updatesmainorders");
    var [msg,setmsg]=useState(MyLang["loading"]);
    useEffect(()=>{
      var orders = langswitch.getJson("mainorder");
      var objtosend = []
      for(var dd in orders)
      {
        var dmd = new Date(orders[dd]['createtime'])
        var ndmd =  new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" }))        
        if(dmd.getDay()!=ndmd.getDay())
        delete orders[dd]
        else        
        if(orders[dd]["time"]=="")
        if(!("paid" in orders[dd]))
        objtosend.push(orders[dd]["MainId"])
        else if(orders[dd]["paid"] == "false" || orders[dd]["paid"] == false)
        objtosend.push(orders[dd]["MainId"])
      }
      window.localStorage.setItem("mainorder",JSON.stringify(orders))


      // grecaptcha.ready(function() {
      //   grecaptcha.execute('reCAPTCHA_site_key', {action: 'submit'}).then(function(token) {
      //       // console.log(token)
      //   });
      // });
      const SendReqeusts=(token)=>{
        
                  const urll="https://7tk2kesgdvajrowlgn6cpgzepi0ryuvj.lambda-url.eu-central-1.on.aws"
                  let mheaders = new Headers();
                  mheaders.append('Origin','*');
                  fetch(urll, {
                    method: 'POST', // or 'PUT'
                    headers: mheaders,
                    body: JSON.stringify({"ids":objtosend})
                  }).then(response => {
                    if(response.status==400)
                    {setmsg("error");
                    localStorage.setItem("mainorder",JSON.stringify({}))
                    window.location.href=langswitch.RouteP("orders");
                    }
                    else if(response.status==200)
                    {
                      response.json().then(result => {
                        for(var dl in result)
                        {
                          orders[dl]["time"]=result[dl]["time"]
                          orders[dl]["paid"]=result[dl]["paid"]
                        }                        
                        localStorage.setItem("mainorder",JSON.stringify(orders) )
                        window.location.href=langswitch.RouteP("orders")
                      })
                      .catch(error => {
                        console.error('Error:', error);
                        localStorage.setItem("mainorder",JSON.stringify({}))
                        setmsg("error");
                      })
                    }
                    
                  })
      }
      SendReqeusts("")
        
    },[])
    return (
    <>
    <Head>
    <title>{MyLang["title"]}</title>
    </Head>
    <MyNavbar/>
    <div className="container mt-3 text-white">
        <div className='row'>
            <h3>{msg}</h3>
        </div>
    </div>
    <script defer src="https://www.google.com/recaptcha/api.js?render=6LfsAkElAAAAALDdQpV1__OSRGQg6il16IeelWuW"></script>
    </>
    );
}