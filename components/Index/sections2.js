import Head from 'next/head';
import MyNavBar from "../TopBar/TobBar2"
import { useState,useEffect } from 'react';
import CustimzieOrder from "./customizeorder"
import langswitch from "../Utils/langswitch"
import ButtonCartContainer from "./ButtonCartContainer"
import CheckAlerts from './CheckAlerts';
let myModal;
var NavBarTriggerIsClicked=false
let AddedFlagModal=false



var navbar,navbardistance=10000

function InitilaizeSection () {


  window.onpopstate = function(event) {
    document.getElementById('btn-close-CustomizeModal').click()
    document.getElementById('btn-close-CartModal').click()
  };
  setTimeout(() => {    
    navbar = document.querySelector('.navbarr');
    navbardistance = navbar.getBoundingClientRect().top
  }, 50);
  window.addEventListener('scroll', function() {  
    if (window.pageYOffset > navbardistance) {
      navbar.classList.add('fixed-top');
    } else {
      navbar.classList.remove('fixed-top');
    }
  });
  
    setTimeout(()=>{        
        var dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'))
        dataSpyList.forEach(function (dataSpyEl) {
          bootstrap.ScrollSpy.getInstance(dataSpyEl)
            .refresh()    
          })
        var l = document.getElementById("navbarscroll")
        var g = document.getElementsByClassName('active')
        var firstScrollSpyEl = document.querySelector('[data-bs-spy="scroll"]')
          firstScrollSpyEl.addEventListener('activate.bs.scrollspy', function () {            
            if(!NavBarTriggerIsClicked)            
            l.scrollTo({
              left: g[0].offsetLeft-5,
              behavior: 'smooth'
            })
          })
    }, 500);

}
export  function IndexPage({menu}) {
  
  
  const [ContainerCustimizeModal,setContainerCustimizeModal]=useState(<></>)
  const [ContainerCartModal,setContainerCartModal]=useState(<></>)
  const [ButtonFixedCart,setButtonFixedCart]=useState(<ButtonCartContainer setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal} menu={menu}/>)
  
  

  function ModalisClosed () {
    setButtonFixedCart(<></>)
        setTimeout(() => {            
            setButtonFixedCart(<ButtonCartContainer setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal} menu={menu}/>)
        }, 1);
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
    const ItemClicked = (e)=>{
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
      setContainerCustimizeModal(<></>)
      setTimeout(() => {
        setContainerCustimizeModal(          
          <CustimzieOrder  menu={menu} id={a.getAttribute("data-key")}/>
        )
        
         myModal = new bootstrap.Modal(document.getElementById("CustomizeModal"), {
          keyboard: true
        })    
        myModal.show()  
      history.pushState({}, '');

      }, 50);
      

    }
    const GetObjItem=(menu,key)=>{
        var descriptionO = menu["product"][key]["desO"] !=undefined?<div className="col-12 ">{menu["product"][key]["desO"]}</div>:"";
            return <a style={{"min-height":"3.5rem","cursor":"pointer"}} 
            onClick={ItemClicked}                      
            data-key={key} 
            className="p-2 rounded col-lg-8 col-md-12 col-sm-12 col-xs-12 mx-auto mb-2  p-1">   
                  <div className='d-flex justify-content-between' style={{"color":"#c1bfbf"}}>
                  <h5>{key}.&nbsp;{menu["product"][key]["name"]}&nbsp;
                  <sup style={{"fontSize":"0.6rem"}}>{menu['product'][key]['zusatz']}</sup>
                  </h5>
                  <h5>{menu["product"][key]["price"][Object.keys(menu["product"][key]["price"])[0]]}&nbsp;&euro;
                  </h5>
                  </div>                                   
                {descriptionO}
              </a>
    }
    InitilaizeSection()


    var rows = []
    var NavRows = [] 
    const BtnSectionClicked=(e)=>{      
      NavBarTriggerIsClicked=true
      var l = document.getElementById("navbarscroll")
      var g = document.getElementsByClassName('active')
      if(typeof g[0] !== "undefined" && typeof l !== "undefined")
      setTimeout(() => {
        NavBarTriggerIsClicked=false
        l.scrollTo({
          left: g[0].offsetLeft-5,
          behavior: 'auto'
        })
      }, 1000);
      // window.location.href = "./#section"+Object.keys(menu["sections"]["mdesc"]).indexOf(e.getAttribute("data-l"))


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
      rows.push(
            <div style={{"min-height":"35rem"}} id={`section${Object.keys(menu["sections"]["mdesc"]).indexOf(l)}`} className="pt-5 container-fluid text-white" >
              <div className='a-item  a-item-2' style={{"backgroundImage":`url(Images/${imgg}.jpeg)`}}>
                <div  class="a-sub">{l}</div>
                </div>
                <div className='mb-2' style={{"fontSize":"1rem","color":"#c1bfbf"}}>{menu["sections"]["mdesc"][l]["des"]}</div>

             {Object.keys(menu["product"]).map((number) => (
                <>{
                  menu["sections"]["mdesc"][l]["section"].toUpperCase() == menu["product"][number]["section"].toUpperCase() ? 
                    <>{GetObjItem(menu,number)}</>
                    :<></>
                } </>                               
            ))}
            </div>
            )
        NavRows.push(<>
          <li className="nav-item">
            <a className="nav-link" data-l={l} 
            href={`#section${Object.keys(menu["sections"]["mdesc"]).indexOf(l)}`}
            onClick={BtnSectionClicked}>
            &nbsp;&nbsp;{l}&nbsp;&nbsp;
            </a>
          </li>
          </>
        )
    }    
   
    
  return (
    <>
    <MyNavBar/>
      <nav id="navbarscroll" class="nav navbarr navbar-nav scroll bg-dark navbar-dark ">
        <div class="navbar-header fs-6 p-2">
        {NavRows}
        </div> 
    </nav>
    {rows}

    <hr  style={{"marginTop":"10rem"}}/>

    {ButtonFixedCart}
    <MModal idd="CustomizeModal" contaienrr={ContainerCustimizeModal} />
    <MModal idd="CartModal" contaienrr={ContainerCartModal} />
    <footer class="footer bg-dark text-white text-center mt-5">
        <div class="container">
          <p>&copy; 2023 {menu["staticValue"]["logo"]}. All rights reserved.</p>
        </div>
      </footer></>
  );
}

export default({menu})=>{
const Componenett = "closed" in menu["staticValue"]?<></>:<IndexPage menu={menu}/>
return <>
<CheckAlerts menu={menu}/>
{Componenett}
</>
}

import Autocomplete from "react-google-autocomplete";

export function MModal ({idd,contaienrr}) {
  return <div className="modal" id={idd} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-theme="dark">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">        
        <button type="button" class="btn-close " id={`btn-close-${idd}`} data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      
      {contaienrr}
      </div>    
    </div>
  </div>
</div>
  
}