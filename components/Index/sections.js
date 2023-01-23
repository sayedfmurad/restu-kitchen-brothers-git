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
      <div className='col-6 col-md-3 col-sm-4 col-xs-6'>
        <a className='col-12 btn btn-danger text-center'
         style={{"height":"100%","fontSize":fontsize}} 
         href={`${langswitch.RouteP("sectionmenu?section="+sections[key])}`}>
        {sections[key]}
      </a>
      </div>
      );
  }

  return   <div className='container mt-5 mb-5'>
            {/* <div className="row ">
              <img className="col-12 mb-3"  src="./Images/rabatt.jpeg" />
            </div> */}

            <div className='row g-2' >
              <div className="col-12 text-white">
                <h5>SpeiseKarte:</h5>
              </div>
            </div>
            <div className='row g-2' >
            {rows}  
            </div>
            </div>
}