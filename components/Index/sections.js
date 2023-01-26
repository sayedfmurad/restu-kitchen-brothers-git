import menu from "../../public/database/menu.json"
import langswitch from "../Utils/langswitch"
export default ()=>
{
    var rows = [];
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
    rows.push(
      <div className='col-lg-3 col-md-4 col-sm-6 col-xs-6' id={sections[key]}>
        <a class="a-item a-item-2" style={{"backgroundImage":`url(Images/${sections[key].toUpperCase().replace(" ","_")}.jpeg)`}}  href={langswitch.RouteP("sectionmenu?section="+sections[key])}>
           <div class="a-sub">{sections[key]}</div>
        </a>        
      </div>
      );
  }

  return   <div className='container mt-5 mb-5'>
            {/* <div className="row ">
              <img className="col-12 mb-3"  src="./Images/rabatt.jpeg" />
            </div> */}
            <div className='row g-2' >
            {rows}  
            </div>
            </div>
            
}