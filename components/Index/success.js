
import Head from 'next/head'

import React, { useState } from 'react';
import MyLang from '../Utils/langswitch'
export default function success() {
    const langswitch = MyLang.langswitchs("success");
return(
    <>
    <div class="modal-header ">  
       <h3 className='m-0'></h3>                                        
        <button type="button" class="btn-close " id={`btn-close-SuccessModal`} data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body"> 

            <div className='d-flex justify-content-center'>
            {/* <img alt="" height="60px" src='./Images/accepted.png'/> */}
            </div>
            <div className='container'>
            <div className='row'>
            <div className="col-md-8 mt-4 text-black">                
                <h6>                    
                Ihre Bestellung wurde übermittelt. Sie erhalten in Kürze eine SMS mit der voraussichtlichen Ankunftszeit Ihrer Bestellung. Alternativ können Sie diese unter „Meine Bestellungen“ selber überprüfen.
                </h6>
                </div>
                </div>
    </div>
    </div>                          
    </>
)
}