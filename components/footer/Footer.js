import Head from 'next/head'
import Image from 'next/image'

import langswitch from '../Utils/langswitch'
export default function footer({pricestatus,numitemstatus,sub}) {
    if(sub==undefined)
    sub="";
    const MyLang = langswitch.langswitchs("footer");

return(
<>
<Head>
<link href={sub+"./mystyles/footer.css"} rel="stylesheet" />
</Head>
<div class="navbar fixed-bottom row mt-5 myfooter">
    <div className="col-1"></div>
    <div className="col-8">
        <div >{numitemstatus} {MyLang["items in cart..."]} ({pricestatus} &euro;)</div>
        <div className="subprice">{MyLang["minimum charge"]} 13,00 &euro;</div>
    </div>
    <div className="col-2">        
        <a  className="btn btn-primary" href={langswitch.RouteP("cart",sub)}>
            {/* {MyLang["cart"]} */}
            <Image alt="" href={langswitch.RouteP("cart",sub)}  height="32px" src={sub+"./Images/cart.png"}/>
            </a>
        </div>
    <div className="col-1"></div>    
</div>
</>

);
}
