import { useState } from "react";
import langswitch from "../Utils/langswitch"
export default function Name({menu}) {

return(
<>
<div class="modal-header">  
        <h3 className='m-0'>Zusatzstoffe</h3>                                         
         <button type="button" class="btn-close " id={`btn-close-MyOrderModal`} data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body" id="MainIdd">
<div className="container">
<div className='row'>
<div className='col-12'>
{menu["staticValue"]["zusatzStoffe"]}
</div>
</div>
</div>
</div>
</>
)    
}