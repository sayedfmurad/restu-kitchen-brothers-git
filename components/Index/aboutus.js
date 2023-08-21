import Head from 'next/head';
import { useState } from 'react';
import MyNavbar from "../TopBar/TobBar2"
import langswitch from '../Utils/langswitch'

export default ({menu})=> {

    const MyLang = langswitch.langswitchs("aboutus");  
    
    return(
        <>
        <div class="modal-header text-whitee">  
        <h3 className='m-0'>Über uns</h3>                                
         
         <button type="button" class="btn-close " id={`btn-close-MyOrderModal`} data-bs-dismiss="modal" aria-label="Close"></button>
     </div>
        <div className="container text-black">
        <div className="row">            
            <div className="col-md-2 col-sm-2 col-xs-6 "><h5>{MyLang["telefon"]}</h5></div>
            <div className="col-md-10 col-sm-10 col-xs-6"><a className="" href={`tel:${menu["staticValue"]["kontakt"]["tel"]}`}>{menu["staticValue"]["kontakt"]["tel"]}</a></div>
            <div className="col-md-2 col-sm-2 col-xs-6"><h5 className="">{MyLang["address"]}</h5></div>
            <div className="col-md-4 col-sm-8 col-xs-6">
            <div className="container">
                <div className="row"><h6 className="">{menu["staticValue"]["kontakt"]["name"]}</h6></div>
                <div className="row"><h6 className="">{menu["staticValue"]["kontakt"]["street"]}</h6></div>
                <div className="row"><h6 className="">{menu["staticValue"]["kontakt"]["zipc"]+" "+menu["staticValue"]["kontakt"]["city"]}</h6></div>
            </div>                
            </div>
            {/* <div className='col-12 p-2 m-3'>
            <a className='btn btn-primary text-white' href="./html/policyprivacyweb.html">Datenschutz</a>
            </div>             */}
        </div>
    </div>
    </>
    )
    
}