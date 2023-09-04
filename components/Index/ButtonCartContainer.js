import { useState, useEffect } from "react"
import langswitch from "../Utils/langswitch"
import Cart from "./cart"
export function ButtonCartContainer2 ({setContainerCartModal,setContainerCustimizeModal,menu,or}) {  
    var sum = 0
    for(var ke in or)
    { 
      sum = parseFloat(sum) + parseFloat(langswitch.stof(or[ke]["price"]))                   
      if(menu["rabat"]!="")
              {
                  var rabb = sum*(parseInt(menu["rabat"]))/100
                  sum = sum - rabb
              } 
    }  
    sum = langswitch.ftos(sum)                       
    return <div style={{"backgroundColor":"#fff"}} className={`fixed-bottom fixed-end d-flex justify-content-center p-2 ${Object.keys(or).length==0?"d-none":""}`} id="fixedendidcart">
      <button  type="button"   
    onClick={()=>{
        setContainerCartModal(<></>)
      setTimeout(() => {
        setContainerCartModal(<Cart setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal}/>)        
        var myModal = new bootstrap.Modal(document.getElementById("CartModal"), {
          keyboard: true
        })    
        myModal.show()  
      history.pushState({}, '');
      }, 50);
        
    }}
    className={`btn-lg  col-12 btn btn-success rounded-5   `}>
      <span>
    <span class="notification-badge"
      style={
        {
          position:"relative",
          top:'-9px',
          left:"11px",      
          "backgroundColor":"#9b3e3e",
          "color":"white",
          fontSize:"20px",
          padding:"0px 3px",
          borderRadius:"10%"
        }    
      }
    >{Object.keys(or).length}</span>
    <img src="/Images/cart.png" height="25px"/> 
    
      </span>
      &nbsp;
      {sum}&euro;
    </button></div>
  }
  export default function ButtonCartContainer ({menu,setContainerCartModal,setContainerCustimizeModal}) {  

    const [orders, setorder] = useState("")
    useEffect(()=>{
        langswitch.GetJsonM("order").then((m)=>{
            setorder(m)
        }) 
    },[])    
    return <>{orders !== "" && <ButtonCartContainer2 setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal} menu={menu} or={orders} />}</>  
  }