import { useState } from "react";
import MyNavbar from "../components/TopBar/TobBar2"
import langswitch from "../components/Utils/langswitch"
export default function Name() {

    var [zusate,setzusate]=useState(" ")
    if(process.browser)
    {
        const menu = langswitch.getJson("menu")
        setTimeout(() => {setzusate(menu["staticValue"]["zusatzStoffe"])}, 100);        
    }

return(
<>
<MyNavbar/>
<div className="container">
<div style={{"backgroundColor":"#00000070;"}} className='row p-3 justify-content-center text-white'>
{zusate}
</div>
</div>
</>
)    
}