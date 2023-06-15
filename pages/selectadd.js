import Head from 'next/head'
import MyNavbar from "../components/TopBar/TobBar2"
import langswitch from '../components/Utils/langswitch'
export default function Selectadd() {
    const MyLang = langswitch.langswitchs("selectadd");
    var rows =[];    
    if(process.browser)
    {        
        var cursel = window.localStorage.getItem("seladdress")==null?"":window.localStorage.getItem("seladdress");
        const changestate = (e)=>{                        
            var id = e.target.getAttribute("data-id");
            cursel = id;
            window.localStorage.setItem("seladdress",cursel);
        }
        const deladd = (e)=>{
            var id = e.target.getAttribute("data-id");
            var adds = langswitch.getJson("address");
            delete adds[id];
            window.localStorage.setItem("address",JSON.stringify(adds));
            if(cursel == id)
            window.localStorage.setItem('seladdress',"");
        }
        const cleardata = (e)=>{
            langswitch.ClearAllData()
            window.location = langswitch.RouteP("")
        }
        var adds = window.localStorage.getItem("address")==null?"": window.localStorage.getItem("address");
        adds = adds == ""?"{}":adds;
        adds = JSON.parse(adds);
        if(Object.keys(adds).length == 0)
        {rows.push(<div className="col-12 p-4"><div className="col-12 p-4 text-center"><h2>{MyLang["no addresses"]}</h2></div></div>);}
       
        else
        {            
            if(cursel == "")
            rows.push(<div className="row p-4 m-3"><h2>{MyLang["no address selected"]}</h2></div>);
            
            for(var g in adds)
            {                
                
                var selectedornot= cursel == g?<h5 className=" m-2 text-center text">{MyLang["selected address"]}</h5>:<a data-id={g} href={langswitch.RouteP("selectadd")} onClick={changestate} className=" m-2 btn btn-danger col-md-3 col-sm-3">{MyLang["select"]}</a>
                var editadd = <div>{selectedornot}
                {/* <a className="text m-2 btn btn-danger col-md-2 col-sm-2" href={`${langswitch.RouteP("editadd")}?id=`+g} >
                <img  height="21px" src={"./Images/edit.svg"}/>
                </a> */}
                <a data-id={g} onClick={deladd} className="m-2 btn btn-danger col-md-2 col-sm-2"  href={langswitch.RouteP("selectadd")}>
                <img  height="21px" src={"./Images/delete.svg"}/>
                </a>
                </div>
                var myvar = 
                <div className={`row p-4 m-3 ${(cursel == g?"selecteddd":"")}`}>
                <div className="col-12 text">{adds[g]["fname"]}&nbsp;{adds[g]["lname"]}</div>
                <div className="col-12 text">{adds[g]["street"]}&nbsp;{adds[g]["housenumber"]}</div>
                <div className="col-12 text">{adds[g]["city"]}&nbsp;{adds[g]["zipc"]}</div>
                <div className="col-12 text">{adds[g]["phonen"]}</div>
                <div className="col-12 text" >{adds[g]["firma"]}</div> 
                {editadd}                
                 </div>;              
                
                myvar = <div className="col-12">{myvar}</div>

                if(cursel == g)
                rows.unshift(myvar);
                else
                rows.push(myvar);
            }             
        }
        rows.unshift(
        <div className="col-12">
            <a className="btn btn-primary m-3" href={langswitch.RouteP("addaddress")}>{MyLang["add an address"]}</a>
            <a className="btn btn-primary m-3" href={langswitch.RouteP("cart")}>{MyLang["back to cart"]}</a>
            <button className="btn btn-primary m-3" onClick={()=>{cleardata()}}>{MyLang["clear history"]}</button>
            </div>)
       
    }
return(
<>
<Head>
        <title>{MyLang["title"]}</title>
        <link href="./mystyles/selectadd.css" rel="stylesheet" />
</Head>
<MyNavbar/>
<div className="container mt-4 p-2" id="cont">
    <div className="row">
        {rows}
        </div>
</div>
</>);
}