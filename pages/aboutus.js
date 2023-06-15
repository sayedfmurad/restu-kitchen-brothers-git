import Head from 'next/head';
import { useState } from 'react';
import MyNavbar from "../components/NavBar/MyNavbar"
import langswitch from '../components/Utils/langswitch'

export function Container(){

    const [kontakt,setkontakt]=useState(<></>)    
    if(process.browser)
    {
        const MyLang = langswitch.langswitchs("aboutus");
        const menu = langswitch.getJson("menu")
        setTimeout(() => {setkontakt(
            <div className="row">
            <div className="col-12"><h2 className="text">{MyLang["about us"]}:</h2></div>
            <div className="col-md-2 col-sm-2 col-xs-6 text"><h5>{MyLang["telefon"]}</h5></div>
            <div className="col-md-10 col-sm-10 col-xs-6"><a className="text" href={`tel:${menu["staticValue"]["kontakt"]["tel"]}`}>{menu["staticValue"]["kontakt"]["tel"]}</a></div>
            <div className="col-md-2 col-sm-2 col-xs-6"><h5 className="text">{MyLang["address"]}</h5></div>
            <div className="col-md-4 col-sm-8 col-xs-6">
            <div className="container">
                <div className="row"><h6 className="text">{menu["staticValue"]["kontakt"]["name"]}</h6></div>
                <div className="row"><h6 className="text">{menu["staticValue"]["kontakt"]["street"]}</h6></div>
                <div className="row"><h6 className="text">{menu["staticValue"]["kontakt"]["zipc"]+" "+menu["staticValue"]["kontakt"]["city"]}</h6></div>
            </div>

                
            </div>
            {/* <div className='col-12 p-2 m-3'>
            <a className='btn btn-primary text-white' href="./html/policyprivacyweb.html">Datenschutz</a>
            </div>             */}
        </div>)    
        }, 100);
    }
    return(
        <div className="container">
        {kontakt}
    </div>
    )
}
export default ()=> {
    const MyLang = langswitch.langswitchs("aboutus");
    return(<>
    <Head>
        <title>{MyLang["title"]}</title>    
        <link href="./mystyles/aboutus.css" rel="stylesheet" />
    </Head> 
    <MyNavbar/>
    <Container/>
    </>)
}