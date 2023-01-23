import Head from 'next/head'
import MyNavbar from "../components/navbar/MyNavbar"
import langswitch from '../components/Utils/langswitch'
export default function Selectadd() {
    const MyLang = langswitch.langswitchs("storeclosed");
    return(<>
    <Head>
        <title>{MyLang["title"]}</title>    
        <link href="./mystyles/aboutus.css" rel="stylesheet" />
    </Head>
    <MyNavbar/>
    <div className="container text-white">
        <div className="row">
            <div className='col-12'>
                <h6>{MyLang["store is closed"]}</h6>
            </div>
            <br/>
            <div className='col-12'>
                <a className='btn btn-primary' href={langswitch.RouteP("")}>{MyLang["back"]}</a>
            </div>
        </div>
    </div>
    </>)
}