
import langswitch from '../Utils/langswitch'
export default function checkselected() {
    const MyLang = langswitch.langswitchs("checkselected");
    var show = null;
    if(process.browser)
    {
        show =         <div className="row">
        <div className="col-12 p-3"></div>
    <h4 className="text">{MyLang["Please add or..."]}</h4>        
    <div className="col-12 p-3">
        <a className="btn btn-primary" href={langswitch.RouteP("selectadd")}>{MyLang["Go to Addresses"]}</a>
    </div>
    </div> 
       
        var addresses = langswitch.getJson("address")
        var seladd = langswitch.getValue("seladdress")
        var btnclick = ()=>{
            if(langswitch.CheckMinPriceOrder(langswitch.getNum("sumprice"))) 
            window.location = langswitch.RouteP("selectadd");
        };
       if( seladd!= undefined)
       if(seladd != "")
       if(seladd in addresses)
       {
         var firma = addresses[seladd]["firma"] == "none" ?"": <div className="col-12 text ">{addresses[seladd]["firma"]}</div>;        
           show =  
           <div className="row m-2 p-2">
            <div className='col-6'>
                <div className="col-12 text">{addresses[seladd]["fname"]}&nbsp;{addresses[seladd]["lname"]}</div>
                <div className="col-12 text">{addresses[seladd]["street"]}&nbsp;{addresses[seladd]["housenumber"]}</div>
                <div className="col-12 text">{addresses[seladd]["city"]}&nbsp;{addresses[seladd]["zipc"]}</div>
                <div className="col-12 text">{addresses[seladd]["phonen"]}</div>
                {firma} 
            </div>
                <div className="col-6 text"><button className="m-2 btn btn-primary" onClick={btnclick}>{MyLang["Select another Address"]}</button></div>
           </div>
       }
        
    }
return (
    <>
       {show}
    </>
)
}