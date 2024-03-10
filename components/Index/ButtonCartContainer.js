import { useState, useEffect } from "react"
import langswitch from "../Utils/langswitch"
import Cart from "./cart"
import styles from '../../styles/AnimatedHeading.module.css'
export function IconShoppingCart(props) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 00-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 100 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 00-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 00-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6z" />
    </svg>
  );
}
function ButtonCartContainer3(menu,doAnimation=true){
  langswitch.GetJsonM("order").then((or)=>{
    let sum = langswitch.getValue("sumprice")
    if("FooterUtilsCartButtonPriceDoAnimation" in menu && doAnimation && Object.keys(or).length!=Object.keys(menu["orders"]).length)
    menu.FooterUtilsCartButtonPriceDoAnimation()
  // for(var ke in or)
  menu.setorder(or)
    // { 
    //   sum = parseFloat(sum) + parseFloat(langswitch.stof(or[ke]["price"]))                   
    //   if(menu["rabat"]!="")
    //           {
    //               var rabb = sum*(parseInt(menu["rabat"]))/100
    //               sum = sum - rabb
    //           } 
    // }  
    menu.setsum(sum)
  }) 
  
}
export function ButtonCartContainer2 ({sum, setContainerCartModal,setContainerCustimizeModal,menu,or}) {  
    const [animate, setAnimate] = useState(false);
    menu["FooterUtilsCartButtonPriceDoAnimation"]=() => {
      setTimeout(() => {
        setAnimate(true);
      }, 100); // Adjust the timing to match your animation duration
      setTimeout(() => {
        setAnimate(false);
      }, 400); // Adjust the timing to match your animation duration
    }; 
    return <div style={{"height":""}}  className={`fixed-bottom fixed-end d-flex justify-content-center row`} >    
     <div style={{"backgroundColor":"#fff",boxShadow:"0px -2px 4px rgba(0, 0, 0, 0.3)"}}  className={`col-12 d-flex justify-content-center p-3 ${Object.keys(or).length==0?"d-none":""}`} id="fixedendidcart">
      <button  type="button" 
      id="IdButtonCartFooter"  
    onClick={()=>{
        setContainerCartModal(<></>)
      setTimeout(() => {
        menu.setContainerCartModal(<Cart menu={menu}/>)        
        var myModal = new bootstrap.Modal(document.getElementById("CartModal"), {
          keyboard: true
        })    
        myModal.show()  
      history.pushState({}, '');
      }, 50);
        
    }}
    className={`btn-lg  col-12 btn btn-success rounded-5    `}
    >
    <span class={`notification-badge `}
      style={
        {
          position:"relative",
          top:'-9px',
          left:"15px",      
          "backgroundColor":"#9b3e3e",
          "color":"white",
          fontSize:"20px",
          padding:"0px 3px",
          borderRadius:"10%"
        }    
      }
    >{Object.keys(or).length}</span>
    <IconShoppingCart />
      <span 
      style={
        {
          position:"relative",
          top:'2px',
          left:"3px"
        }   }
      className={animate ? styles.animate : ''}>
      <strong>
      &nbsp;
      {sum}&euro;
      </strong>
      </span>
    </button>
    </div>
    </div>
  }
  
export default function ButtonCartContainer ({menu,setContainerCartModal,setContainerCustimizeModal}) {  

    const [orders, setorder] = useState("")
    const [sum, setsum] = useState("")
    useEffect(()=>{
      menu["orders"]=orders
    },[orders])
    useEffect(()=>{
      menu["sum"]=sum
    },[sum])
    useEffect(()=>{
        langswitch.GetJsonM("order").then((m)=>{
            menu["setorder"]=setorder
            menu["setsum"]=setsum     
            menu["updateFooterButtonCart"]=ButtonCartContainer3     
            ButtonCartContainer3(menu,false)
        }) 
    },[])    
    return <>
    <div id="scrollupbtn" className="d-none" style={{position:"fixed",bottom:Object.keys(orders).length==0?"5vh":"120px",zIndex:"1000",right:"5vw"}}>
        <span style={{display:"block",height:"60px",width:"60px","box-shadow":"0px 3px 20px rgba(0, 0, 0, 0.3)","backgroundColor":"#fff","borderRadius":"50%"}} 
        onClick={()=>{document.getElementById("scrollupbtn").classList.add("d-none");document.getElementById("nav-link-section0").click();      }}
        >
        <svg style={{fontSize:"2rem",marginLeft:"15px",marginTop:"13px"}} viewBox="0 0 16 16" width="1em" height="1em" role="presentation" focusable="false" aria-hidden="true"><path d="M13.18 10.97L8 5.615l-5.18 5.399-.962-.875 5.346-5.565a1.164 1.164 0 011.671 0l5.25 5.495-.945.901z"></path></svg>
        </span>
    </div>
    {orders !== "" && (
      langswitch.stof(sum)>0 && <ButtonCartContainer2 sum={sum}  setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal} menu={menu} or={orders} />
    )}
    </>  
  }