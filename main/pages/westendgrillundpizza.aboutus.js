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
            <div className="col-md-10 col-sm-10 col-xs-6"><a className="text" href="tel:02161270290">02161270290</a></div>
            <div className="col-md-2 col-sm-2 col-xs-6"><h5 className="text">{MyLang["address"]}</h5></div>
            <div className="col-md-4 col-sm-8 col-xs-6">
            <div className="container">
                <div className="row"><h6 className="text">Westend Grill &#38; Pizza</h6></div>
                <div className="row"><h6 className="text">Blumenberger Str. 24</h6></div>
                <div className="row"><h6 className="text">41061 Mönchengladbach</h6></div>
            </div>

                
            </div>
            <div className='col-12 p-2 m-3'>
            <a className='btn btn-primary text-white' href="./html/policyprivacyweb.html">Datenschutz</a>
            </div>
            <div className="col-12">
            <div class="mapouter"><div class="gmap_canvas"><iframe className="responsive"  id="gmap_canvas" src="https://maps.google.com/maps?q=Blumenberger%20Str.%2024&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>
            </div>
        </div>
    </div>
    </>)
}