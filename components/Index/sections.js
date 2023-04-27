import { useEffect, useState } from "react";
import langswitch from "../Utils/langswitch"

export default ()=>
{
  var [rows,setrows] = useState([]);
  var [rows2,setrows2] = useState(<></>);
  if(process.browser){
    const menu = langswitch.getJson("menu")
    if(menu != null)
    if(typeof menu !== "undefined")
    if(Object.keys(menu).length  !== 0)
    {
    if(menu["staticValue"]["key"]=="pizzavalentina")
    {
            [rows2,setrows2] = useState(
            <div className='row g-2' >            
            <div className=" alert alert-warning" role="alert">
            NUR HIER MIT <strong>5%</strong> ONLINE-RABATT BESTELLEN
            </div>  
            </div>)
    }
    if(menu["staticValue"]["key"]=="kitchen-brothers")
    {
            [rows2,setrows2] = useState(
            <div className='row g-2' >            
            <div className=" alert alert-warning" role="alert">
            Kitchen Brothers, Konstantinstraße 87, 41238 Mönchengladbach
            </div>  
            </div>)
    }
    var sections = [];
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
      imgg = menu["sections"]["mdesc"][sections[key]]["img"].toUpperCase()
      rows.push(
        <div className='col-lg-3 col-md-4 col-sm-6 col-xs-6' id={sections[key]}>
          <a class="a-item a-item-2" style={{"backgroundImage":`url(Images/${imgg}.jpeg)`}}  href={langswitch.RouteP("sectionmenu?section="+sections[key])}>
             <div class="a-sub">{sections[key]}</div>
          </a>        
        </div>
        );
    }
    [rows,setrows] = useState(rows)
  }
  }
  

  return   <div className='container mt-5 mb-5'>  
            {/* <div className='row g-2 mb-5'>
            <div class="alert alert-info">
              <div className="row g-2">
                <div className="col-md-6">
                <div className="d-flex justify-content-md-end">
                <a href="https://play.google.com/store/apps/details?id=com.foodieway.foodieway">
                <img alt="" height="100px" src='./Images/getonandroid-t.jpeg'/>
                </a>
                </div>
                </div>
                <div className="col-md-4">
                <strong>Laden Sie unsere App herunter!</strong> Holen Sie sich die neuesten Funktionen und Updates, indem Sie unsere App aus dem App Store oder Google Play herunterladen.
                </div>
              </div>                        
          </div>
            </div> */}
            {rows2}
            <div className='row g-2' >
            {rows}  
            </div>
            </div>
            
}