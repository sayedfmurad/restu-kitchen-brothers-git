import Head from 'next/head';
import MyNavBar from "../TopBar/TobBar2"
import { useState,useEffect } from 'react';
import CustimzieOrder from "./customizeorder"
import langswitch from "../Utils/langswitch"
import ButtonCartContainer from "./ButtonCartContainer"
import CheckAlerts from './CheckAlerts';
import Aboutus from '@/components/Index/aboutus';
import ZusatzStoffe from "./zusatzstoffe"
import Datenschutz from "./privacypolicy"
import Success from "./success"
import MyOrders from "./MyOrders"
import {IsPaymentSuccess} from "./MyOrders"
let myModal;
var NavBarTriggerIsClicked=false
let AddedFlagModal=false



function InitilaizeSection (setIsSearch) {


  window.onpopstate = function(event) {
    try {      
      document.getElementById('btn-close-AndroidInstallationModalLabel').click()
      document.getElementById('btn-close-IOSInstallationModal').click()
    } catch (error) {
      console.log(error)
    }
    if(document.getElementById('btn-close-CustomizeModal'))
    document.getElementById('btn-close-CustomizeModal').click()
    if(document.getElementById('btn-close-CartModal'))
    document.getElementById('btn-close-CartModal').click()
    if(document.getElementById('btn-close-MyOrderModal'))
    {
      document.getElementById('btn-close-MyOrderModal').click()
      if(document.getElementById("ShowSuccessMyOrder"))
        document.getElementById("ShowSuccessMyOrder").classList.remove("d-none") 
    }
    if(document.getElementById('btn-close-DatenschutzModal'))
    document.getElementById('btn-close-DatenschutzModal').click()
    if(document.getElementById('btn-close-SuccessModal'))
    document.getElementById('btn-close-SuccessModal').click()
    if(document.getElementById('btn-close-AboutUsModal'))
    document.getElementById('btn-close-AboutUsModal').click()
    if(document.getElementById('btn-close-ZusatzModal'))
    document.getElementById('btn-close-ZusatzModal').click()
   
    if(setIsSearch)
    setIsSearch(false)
  };
  
  

  

}
const GetObjItem=(menu,key)=>{
  var descriptionO = menu["product"][key]["desO"] !=undefined?<div className="col-12 ">{menu["product"][key]["desO"]}</div>:"";
      return <div onClick={menu.ItemClicked} data-key={key}  className='rounded p-2 mb-2' style={{"min-height":"5rem",border:"0.7px solid rgb(77 77 77 / 40%)","cursor":"pointer",backgroundColor:"rgb(245 245 245)"}}>
        <a                                                
      className="col-lg-8 col-md-12 col-sm-12 col-xs-12 rounded">   
            <div className='d-flex justify-content-between' style={{"color":"rgb(80 80 80)"}}>
            <h5>{menu["product"][key]["name"]}&nbsp;
            
            <sup style={{"fontSize":"0.6rem"}}>{menu['product'][key]['zusatz']}
            &nbsp;<span style={{"fontSize":"8px"}} className='rounded-2 p-1  bg-secondary text-white'>Nr.{key}</span>
            </sup>
            </h5>
            <h5>{menu["product"][key]["price"][Object.keys(menu["product"][key]["price"])[0]]}&nbsp;&euro;
            </h5>
            </div>                                   
          {descriptionO}
        </a></div>
}

export function ModalsComponent ({menu}) {
  const [ContainerCustimizeModal,setContainerCustimizeModal]=useState(<></>)
  const [ContainerCartModal,setContainerCartModal]=useState(<></>)
  menu["setContainerCartModal"]=setContainerCartModal
  menu["setContainerCustimizeModal"]=setContainerCustimizeModal
  menu.ItemClicked = (e)=>{
    let a = e.currentTarget; // This will always give you the anchor element

    // Check if the clicked element is a child of the anchor
    if (e.target !== a) {
      // If it's a child, find the anchor element by traversing up the DOM hierarchy
      while (e.target.parentNode !== a) {
        e.target = e.target.parentNode;
      }
      // Update the event.currentTarget to the anchor element
      e.currentTarget = a;
    }
    // a.getAttribute("data-key")
    menu.setContainerCustimizeModal(<></>)
    setTimeout(() => {
      menu.setContainerCustimizeModal(          
        <CustimzieOrder  menu={menu} id={a.getAttribute("data-key")}/>
      )
      
       myModal = new bootstrap.Modal(document.getElementById("CustomizeModal"), {
        keyboard: true
      })    
      myModal.show()  
    history.pushState({}, '');

    }, 50);
    

  }

  return <>
   <MModal idd="CartModal" contaienrr={ContainerCartModal} />
    <MModal idd="CustomizeModal" contaienrr={ContainerCustimizeModal} />
    <MModal idd="MyOrderModal" contaienrr={<MyOrders menu={menu}/>} />
    <MModal idd="AboutUsModal" contaienrr={<Aboutus menu={menu} />} />
    <MModal idd="ZusatzModal" contaienrr={<ZusatzStoffe menu={menu} />} />
    <MModal idd="DatenschutzModal" contaienrr={<Datenschutz />} />
    <MModal idd="SuccessModal" contaienrr={<Success />} />    
      <div className='mb-5 mt-5 container-fluid'/>    
    <MButtonCartContainer menu={menu} setContainerCartModal={setContainerCartModal} setContainerCustimizeModal={setContainerCustimizeModal}/></>
}
export function SearchComponent ({menu}) {
  const [Searchrows,setSearchrows]=useState(<></>)
  menu.onKeyUpSearch=(e)=>{
      
    langswitch.scrollToElement("solveshowNav")

    e = e.target.value
    var trowss = []
    trowss.push(<>
      {Object.keys(menu["product"]).map((number) => (
        <>{
         (menu["product"][number]["name"].toUpperCase()).includes(e.toUpperCase()) ||
         (menu["product"][number]["section"].toUpperCase()).includes(e.toUpperCase())? 
            <>{GetObjItem(menu,number)}</>
            :<></>
        } </>                               
    ))}</>
    )
    setSearchrows(trowss)
  }
  
  return <>
    <div  className={`${menu.IsSearch?"":"d-none"} container mt-5`} style={{minHeight:"150vh"}}>
    {Searchrows}
    <div style={{marginTop:"100px"}}/>
    </div>
    </>
}
export  function IndexPage({menu}) {
  
  const [rows,setrows]=useState(<></>)
  const [MainModal,setMainModal]=useState(<></>)

    menu["setMainModal"]= setMainModal

    InitilaizeSection(menu.setIsSearch)
    
    var NavRows = [] 
    const BtnSectionClicked=(e)=>{  
      e = e.target.closest(".nav-item");
      // e.preventdefault()
      langswitch.scrollToElement(e.getAttribute("data-l"),100)
      // NavBarTriggerIsClicked=true
      // var l = document.getElementById("navbarscroll")
      // var g = document.getElementsByClassName('active')
      // setTimeout(() => {
      //   NavBarTriggerIsClicked=false
      // if(typeof g[0] !== "undefined" && typeof l !== "undefined")
      //   l.scrollTo({
      //     left: g[0].offsetLeft-5,
      //     behavior: 'auto'
      //   })
      // }, 100);
    }
    for(var l in menu["sections"]["mdesc"])
      {              
        var imgg = l.toUpperCase().replace(" ","_");
        imgg = imgg.replace(" ","_");
        imgg = imgg.replace("Ö","O")
        imgg = imgg.replace("Ä","A")
        imgg = imgg.replace("Ü","U")    
        if("img" in menu["sections"]["mdesc"][l])
        {
          imgg = menu["sections"]["mdesc"][l]["img"].toUpperCase()
        }  
          NavRows.push(<>
            <li className="nav-item" style={{marginRight:"10px"}}
            data-l={`section${Object.keys(menu["sections"]["mdesc"]).indexOf(l)}`} 
            onClick={BtnSectionClicked}
            >
              <div className="d-flex justify-content-center">
                <img style={{padding:"5px",width:"70px",height:"70px",borderRadius:"50%"}} src={`./Images/sections/${imgg}.jpeg`} height="30px" width="30px"/>
              </div>
              <a 
              id={`nav-link-section${Object.keys(menu["sections"]["mdesc"]).indexOf(l)}`} 
              className="nav-link">
              &nbsp;&nbsp;{l}&nbsp;&nbsp;
              </a>
            </li>
            </>
          )
      }    
    const PrepairRows=()=>{
      var firstele=0
      var trows = []
      var heightsection = "160px"
      for(var l in menu["sections"]["mdesc"])
      {        
        var imgg = l.toUpperCase().replace(" ","_");
        imgg = imgg.replace(" ","_");
        imgg = imgg.replace("Ö","O")
        imgg = imgg.replace("Ä","A")
        imgg = imgg.replace("Ü","U")    
        if("img" in menu["sections"]["mdesc"][l])
        {
          imgg = menu["sections"]["mdesc"][l]["img"].toUpperCase()
        }  
        
        if("style" in menu["staticValue"])
        if("sectionheight" in menu["staticValue"]["style"])
        heightsection = menu["staticValue"]["style"]["sectionheight"]
        function getSortedKeys(jsonObject) {
          return Object.keys(jsonObject).sort((a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
          });
        }
        trows.push(
              <div  id={`section${Object.keys(menu["sections"]["mdesc"]).indexOf(l)}`} className="pt-5  text-white IsSection" >
                {/* <div className='a-item  a-item-2' style={{"height":`${heightsection}`,"backgroundImage":`url(Images/${imgg}.jpeg)`}}>
                  <div  class="a-sub">{l}</div>
                  </div> */}
                  <div style={{marginLeft:"5px",marginRight:"5px"}}>
                  <h3 style={{color:"rgb(80, 80, 80)"}}>{l}</h3>
                  {menu["sections"]["mdesc"][l]["des"]!=""&&<div className='mb-2' style={{"fontSize":"0.8rem","color":"rgb(110 107 107)"}}>{menu["sections"]["mdesc"][l]["des"]}</div>}
                  </div>
               {getSortedKeys(menu["product"]).map((number) => (
                  <>{
                    menu["sections"]["mdesc"][l]["section"].toUpperCase() == menu["product"][number]["section"].toUpperCase() ? 
                      <>{GetObjItem(menu,number)}</>
                      :<></>
                  } </>                               
              ))}
              </div>
              )
              if (firstele > 0 && firstele < trows.length) {
                const removedElements = trows.splice(firstele);
                trows = removedElements.concat(trows);
              }
              setrows(trows);

      }   
    }
    useEffect(()=>{    
      setTimeout(() => {
        if(window.location.href.includes("p=success"))
        {
          IsPaymentSuccess(menu)
        }
      }, 1000);  
     PrepairRows() 
     const element = document.getElementById('loadingg');
     if(element !== null)
     element.classList.add('d-none');
    },[])
    
    const SearchIsClicked=()=>{
      menu.setIsSearch(true)
      setTimeout(() => {
        if(document.getElementById("SearchNavBar"))
        {
          document.getElementById("SearchNavBar").focus()
          langswitch.scrollToElement("SearchNavBar")
        }

      }, 200);
      
    }
   
    const CloseSearchIsClicked=()=>{
      document.getElementById("SearchNavBar").value=""
      menu.setIsSearch(false)
    }    
                                                  
  return (
    <>
    <MyNavBar menu={menu} />
    <div id="solveshowNav" className='d-none' style={{"height":"56px"}}></div>
    <div className='container-fluid sticky-top' >
    <div style={{"height":"50px"}} className={`${menu.IsSearch?"":"d-none"} row`}>
      <div  className='col-10' style={{backgroundColor:"white"}}>
        <input onKeyUp={menu.onKeyUpSearch} id="SearchNavBar" style={{paddingLeft:"18px",marginTop:"5px",width:"100%",height:"79%",fontWeight:"bold"}} type='text' className='rounded-5'></input>
      </div>
      <div className='col-2 d-flex justify-content-center' style={{"backgroundColor":"white"}}>
      <button style={{marginTop:"13px"}} onClick={()=>{CloseSearchIsClicked()}} type="button" class="btn-close " ></button>
      </div>
    </div>
    <div style={{boxShadow:"0px 2px 6px rgba(0, 0, 0, 0.3)"}} className={`${menu.IsSearch?"d-none":""} row`}>
    <nav class=" scroll nav  navbar-nav col-10" id="navbarscroll" style={{"background":"white","fontWeight":"bold","fontSize":"16px"}}  >        
        <div class="p-2">
        {NavRows}
        </div>         
    </nav>
    <div className='col-2' onClick={()=>{SearchIsClicked()}} style={{"backgroundColor":"white","cursor":"pointer"}}>
      <div style={{marginTop:"50px"}} className='  d-flex justify-content-center'>
    <svg  width="30" height="23" fill="currentColor"  viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg>  
    </div> 
    </div>

    </div>
    </div>
    <SearchComponent menu={menu}/>
    <div className={`${menu.IsSearch?"d-none":""} container`}>
    <div className='row'>
    {rows}
    </div>
    <hr  style={{"marginTop":"15vh"}}/>
    <footer class="footer  text-center mt-5 mb-5">
        <div class="container">          
          <p>&copy; 2023 {menu["staticValue"]["logo"]}. All rights reserved. | <a onClick={()=>{
            var myModal = new bootstrap.Modal(document.getElementById("DatenschutzModal"), {
              keyboard: true
            })    
            myModal.show()  
            history.pushState({}, '');
          }}>Datenschutz</a></p>
        </div>
      </footer>
      <div style={{marginTop:"100px"}}/>
    </div>
    {MainModal}
    <ModalsComponent menu={menu}/>
      </>
      
  );
}

export default({menu})=>{
  const [IsSearch,setIsSearch]=useState(false)
  menu["IsSearch"]=IsSearch
  menu["setIsSearch"]=setIsSearch
  menu["order"]={type:"Liefern",paymentmethod:"none"}
const Componenett = "closed" in menu["staticValue"]?<></>:<IndexPage menu={menu}/>
return <>
<CheckAlerts menu={menu}/>
{Componenett}
</>
}


export function MButtonCartContainer ({menu,setContainerCartModal,setContainerCustimizeModal}) {
  const [ButtonFixedCart,setButtonFixedCart]=useState(<ButtonCartContainer setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal} menu={menu}/>)
  useEffect(()=>{  
    menu["currentNav"]="section0"
    document.getElementById("nav-link-section0").classList.add("active")
    window.addEventListener('scroll', function() {
      
      let el = document.elementFromPoint(100, 120).closest(".IsSection")
      if(el)
      if(menu["currentNav"]!=el.id)
      {
        document.getElementById("nav-link-"+menu["currentNav"]).classList.remove("active")
        menu["currentNav"]=el.id
        document.getElementById("nav-link-"+menu["currentNav"]).classList.add("active")
        var l = document.getElementById("navbarscroll")
        l.scrollTo({
          left: document.getElementById("nav-link-"+menu["currentNav"]).offsetLeft-5,
          behavior: 'smooth'
        })
        if(el.id!="section0")
        {document.getElementById("scrollupbtn").classList.remove("d-none")}
        else{
          document.getElementById("scrollupbtn").classList.add("d-none")
        }
      }
      // console.log(el.id);
    });
    function ModalisClosed () {    
      menu.updateFooterButtonCart(menu)
    }
    setTimeout(() => {
      var myModalElCustomizeModal = document.getElementById('CustomizeModal')
      var myModalElCartModal = document.getElementById('CartModal')
      if(!AddedFlagModal)  
      {
        myModalElCartModal.addEventListener('hidden.bs.modal',ModalisClosed)
        myModalElCustomizeModal.addEventListener('hidden.bs.modal',ModalisClosed)
        AddedFlagModal=true
      }
    }, 500);
  },[])
  
  
  

  
  return <>{ButtonFixedCart}</>
}
export function MModal ({idd,contaienrr}) {
  return <div  className="modal text-black" id={idd} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-theme="">
  <div class="modal-dialog modal-fullscreen-md-down">
    <div class="modal-content">
      {contaienrr}         
    </div>
  </div>
</div>
  
}