import Head from 'next/head'
import MyNavbar from "../components/navbar/MyNavbar"
import langswitch from '../components/Utils/langswitch'
export default function Selectadd() {
    const MyLang = langswitch.langswitchs("aboutus");
    return(<>
    <Head>
        <title>{MyLang["title"]}</title>    
        <link href="./mystyles/aboutus.css" rel="stylesheet" />
    </Head>
    <MyNavbar/>
    <div className="container">
        <div className="row">
            <div className="col-12"><h2 className="text">{MyLang["about us"]}:</h2></div>
            <div className="col-md-2 col-sm-2 col-xs-6 text"><h5>{MyLang["telefon"]}</h5></div>
            <div className="col-md-10 col-sm-10 col-xs-6"><a className="text" href="tel:021544729320">02154-4729320</a></div>
            <div className="col-md-2 col-sm-2 col-xs-6"><h5 className="text">{MyLang["address"]}</h5></div>
            <div className="col-md-4 col-sm-8 col-xs-6">
            <div className="container">
                <div className="row"><h6 className="text">Pizza Valentina</h6></div>
                <div className="row"><h6 className="text">Dietrich-Bonhoeffer-Str. 20</h6></div>
                <div className="row"><h6 className="text">47877 Willich</h6></div>
            </div>

                
            </div>
            <div className='col-12 p-2 m-3'>
            <a className='btn btn-primary text-white' href="./html/policyprivacyweb.html">Datenschutz</a>
            </div>
            <div className="col-12">
            <div class="mapouter"><div class="gmap_canvas"><iframe className="responsive"  id="gmap_canvas" src="https://maps.google.com/maps?q=Dietrich-Bonhoeffer-Straße%2020&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>
            </div>
        </div>
    </div>
    </>)
}