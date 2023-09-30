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
    return <div style={{"height":""}}  className={`fixed-bottom fixed-end d-flex justify-content-center row`} >    
    <div   className={`col-12 d-flex justify-content-end d-none`} id="scrolltoupbutton">
    <span style={{"box-shadow":"0px 3px 20px rgba(0, 0, 0, 0.3)","backgroundColor":"#fff","borderRadius":"50%"}} className=" p-2 m-4"
    onClick={()=>{langswitch.scrollToElement("bodydoc")}}
    >
    <svg style={{width:"36px",marginBottom:"6px"}} viewBox="0 0 16 16" width="1em" height="1em" role="presentation" focusable="false" aria-hidden="true"><path d="M13.18 10.97L8 5.615l-5.18 5.399-.962-.875 5.346-5.565a1.164 1.164 0 011.671 0l5.25 5.495-.945.901z"></path></svg>
    </span>
    </div>
     <div style={{"backgroundColor":"#fff",boxShadow:"0px -2px 4px rgba(0, 0, 0, 0.3)"}}  className={`col-12 d-flex justify-content-center p-3 ${Object.keys(or).length==0?"d-none":""}`} id="fixedendidcart">
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
    </button>
    </div>
    </div>
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