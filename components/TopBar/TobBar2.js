import Head from 'next/head'
import langswitch from "../Utils/langswitch"
import {CheckingIftoSend} from '../Index/MyOrders'
import CustOptions from './CustOptions'
export function NavBarLogo({menu}){
    if("style" in menu["staticValue"])
    if("navbar" in menu["staticValue"]["style"])
    {
        return <a className="navbar-brand" href='./'>
        <img 
        style={menu["staticValue"]["style"]["navbar"]["iconstyle"]}
        src={menu["staticValue"]["style"]["navbar"]["iconpath"]} alt="SVG Image"/>
        </a> 
    }


    return <a className="navbar-brand" href='./'>
    {
    "logoimg" in menu["staticValue"]?
    <img src={"/Images/"+menu["staticValue"]["key"]+"logo.png"} height="40px"/>
    :
    <h5><a style={{paddingLeft:"0px"}} href='./' className='text-white '>{menu["staticValue"]["logo"]}</a></h5> 
    }
    </a> 
}
export function CustNav({menu,children}){
    if("style" in menu["staticValue"])
    if("navbar" in menu["staticValue"]["style"]){
        return <nav id="mynavb" style={{backgroundColor:menu["staticValue"]["style"]["navbar"]["color"]}}  className=" navbar navbar-expand-lg navbar-dark ">
            {children}
            </nav>
    }
    return <nav id="mynavb" style={{backgroundColor:'rgb(233, 116, 0) '}}  className=" navbar navbar-expand-lg navbar-dark ">
        {children}
        </nav>
}
export default function adsf({menu}){
    const MyLang = langswitch.langswitchs("navbar");            

    return <>
   <CustNav menu={menu} children={

   
    <div className="container-fluid">
    <NavBarLogo menu={menu}/>                 
    <CustOptions options={{
    [MyLang["myorders"]]: () => {
        CheckingIftoSend(menu);
        var myModal = new bootstrap.Modal(document.getElementById("MyOrderModal"), {
            keyboard: true
        });
        myModal.show();
        history.pushState({}, '');
            },
            [MyLang["about us"]]: (e) => {
                        e.preventDefault()
                        var myModal = new bootstrap.Modal(document.getElementById("AboutUsModal"), {
                            keyboard: true
                          })    
                          myModal.show()  
                        history.pushState({}, '');
            },
            [MyLang["zusatzstoffe"]]: (e) => {
                e.preventDefault()
                var myModal = new bootstrap.Modal(document.getElementById("ZusatzModal"), {
                    keyboard: true
                  })    
                  myModal.show()  
                history.pushState({}, '');
            }
        }} />
    </div>    
    }/>

    <script defer src={"./scripts/bootstrap.bundle.js"} ></script>
        </>
    
}
