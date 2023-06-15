import { useEffect, useState } from "react";
import langswitch from "../Utils/langswitch"
import Sectionmenu from "./sectionmenu"
import MyNavbar from "../NavBar/MyNavbar"
export function ProductsRows ({menu,SetContainer}) {
  
  const BtnClicked = (e)=>{
    // Empty the container
    SetContainer(null);
    
    // Set the new container after a delay using setInterval
    setTimeout(() => {
      SetContainer(        
      <Sectionmenu SetContainer={SetContainer} menu={menu} bnb={e.target.getAttribute("data-key")} />)
      ;
    }, 50);
  }
  var sections = [],rows=[];
    for(var key in menu["product"])
    {
      if(!sections.includes(menu["product"][key]["section"]))
      sections.push(menu["product"][key]["section"])
    }
    for(var key in sections)
    {
      var fontsize = sections[key]
      fontsize = fontsize.length>=16?"0.8rem":"1rem"
      var imgg = sections[key].toUpperCase().replace(" ","_");
      imgg = imgg.replace(" ","_");
      imgg = imgg.replace("Ö","O")
      imgg = imgg.replace("Ä","A")
      imgg = imgg.replace("Ü","U")      
      if(sections[key] in menu["sections"]["mdesc"])
      if("img" in menu["sections"]["mdesc"][sections[key]])
      {
        imgg = menu["sections"]["mdesc"][sections[key]]["img"].toUpperCase()
      }
      
      rows.push(        
        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-6' id={sections[key]}>
          <a data-key={sections[key]} class="a-item a-item-2" style={{"backgroundImage":`url(Images/${imgg}.jpeg)`}}  onClick={BtnClicked}>
             <div data-key={sections[key]} class="a-sub">{sections[key]}</div>
          </a>        
        </div>
        );
    }
    return<><div className='row g-2' >{rows}</div></>
} 
export function NotificationsRows ({menu}) {
  const IfRestuOpen=(menu)=>{
    var textOpenClose = langswitch.checkOpenCloseStore(menu)?"":"Geschlossen."   
      if(!langswitch.checkOpenCloseStore(menu))
      {
        return <div className="row g-2">
        <div className=" alert alert-danger" role="alert">
        {textOpenClose}&nbsp;{langswitch.NextOpenTimeMsg(menu)}
        </div> 
        </div>
        }
      }

  const rows = []

    rows.push(<>{IfRestuOpen(menu)}</>)

  if(menu["staticValue"]["key"]=="westendgrillundpizza" || menu["staticValue"]["key"]=="pizzavalentina" || menu["staticValue"]["key"]=="kitchen-brothers")
  {
          rows.push(            
          <div className='row g-2' >            
          <div className=" alert alert-warning" role="alert">
          NUR HIER MIT <strong>5%</strong> ONLINE-RABATT BESTELLEN
          </div>  
          </div>)
              if(menu["staticValue"]["key"]=="kitchen-brothers")
              {
                rows.push(        
                      <div className='row g-2' >            
                      <div className=" alert alert-warning" role="alert">
                      Kitchen Brothers, Konstantinstraße 87, 41238 Mönchengladbach
                      </div>  
                      </div>)
              }
  }    
    var isAndroidWebView = navigator.userAgent.toLowerCase().indexOf('wv') > -1;
    var isAndroidBrowser = /android/i.test(navigator.userAgent) && !(/(chrome|crios|fxios)/i.test(navigator.userAgent));

    if (!isAndroidWebView) 
    if(isAndroidBrowser)
    rows.push(
      <div className='row g-2'>
      <div class="alert alert-info">
        <div className="row g-2">
          <div className="col-md-6 col-sm-12 col-xs-12">
          <div className="d-flex justify-content-md-end">
          <a href="https://play.google.com/store/apps/details?id=com.foodieway.foodieway">
          <img alt="" height="50px" src='./Images/getonandroid-t.jpeg'/>
          </a>
          </div>
          </div>
          <div className="col-md-4 col-sm-12 col-xs-12">
          <strong>Laden Sie unsere App herunter!</strong>
          </div>
        </div>                        
    </div>
      </div>
    )
    return <>{rows}</>
}

export default ({menu})=>
{ 
  const [Container,SetContainer] = useState(<></>)
  useEffect(()=>{               
  // <a className="navbar-brand" id="logoid">                        
  // </a> 
  // var element = document.getElementById("logoid")
  // element.innerHTML = '<h5><a href="./" class="text-white">'+menu["staticValue"]["logo"]+'</a></h5> '  


  SetContainer(
    <>
  <MyNavbar  mSetContainer={SetContainer}
   logo={
    <h5><a href='./' className='text-white'>{menu["staticValue"]["logo"]}</a></h5>
 
  }  />
  <div className='container mt-5 mb-5'>  
  <NotificationsRows menu={menu}/>         
  <ProductsRows  menu={menu} SetContainer={SetContainer}/>            
  </div>
  </>
  )
},[])
return  <>{Container}</>           
}