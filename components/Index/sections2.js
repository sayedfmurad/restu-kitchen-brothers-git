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
import MyOrders from './MyOrders';
let myModal;
var NavBarTriggerIsClicked=false
let AddedFlagModal=false



var navbar,solveshowNav,navbardistance=10000,scrolltoupbutton

function InitilaizeSection (setIsSearch) {


  window.onpopstate = function(event) {
    console.log(event);
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
  setTimeout(() => {        
    navbar = document.querySelector('.navbarr');
    scrolltoupbutton= document.getElementById("scrolltoupbutton")
    if(navbar)
    {
      solveshowNav = document.querySelector('#solveshowNav');
      navbardistance = navbar.getBoundingClientRect().top
    }
  }, 1500);
  window.addEventListener('scroll', function() {  
    if (window.pageYOffset > navbardistance) {
      {
        navbar.classList.add('fixed-top');
        solveshowNav.classList.remove('d-none');
        // if(scrolltoupbutton)
        // scrolltoupbutton.classList.remove('d-none');
      }
    } else {
      if(navbar){
        navbar.classList.remove('fixed-top');      
      solveshowNav.classList.add('d-none');
      // if(scrolltoupbutton)
      // scrolltoupbutton.classList.add('d-none');
      }      
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
  const [ContainerMyOrderModal,setContainerMyOrderModal]=useState(<></>)
  const [rows,setrows]=useState(<></>)
  const [Searchrows,setSearchrows]=useState(<></>)
  const [IsSearch,setIsSearch]=useState(false)
  menu["setContainerCartModal"]=setContainerCartModal
  menu["setContainerCustimizeModal"]=setContainerCustimizeModal
  

  

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
            return <div onClick={ItemClicked} data-key={key}  className='rounded p-2 mb-2' style={{"min-height":"5rem",border:"0.7px solid rgb(77 77 77 / 40%)","cursor":"pointer",backgroundColor:"rgb(245 245 245)"}}>
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
    InitilaizeSection(setIsSearch)
    
    var NavRows = [] 
    const BtnSectionClicked=(e)=>{      
      // e.preventdefault()
      langswitch.scrollToElement(e.target.getAttribute("data-l"))
      NavBarTriggerIsClicked=true
      var l = document.getElementById("navbarscroll")
      var g = document.getElementsByClassName('active')
      setTimeout(() => {
        NavBarTriggerIsClicked=false
      if(typeof g[0] !== "undefined" && typeof l !== "undefined")
        l.scrollTo({
          left: g[0].offsetLeft-5,
          behavior: 'auto'
        })
      }, 100);
      // window.location.href = "./#section"+Object.keys(menu["sections"]["mdesc"]).indexOf(e.getAttribute("data-l"))


    }
    for(var l in menu["sections"]["mdesc"])
      {              
          NavRows.push(<>
            <li className="nav-item">
              <a className="nav-link" 
              
              data-l={`section${Object.keys(menu["sections"]["mdesc"]).indexOf(l)}`} 
              href={`#section${Object.keys(menu["sections"]["mdesc"]).indexOf(l)}`}
              onClick={BtnSectionClicked}>
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
              <div  id={`section${Object.keys(menu["sections"]["mdesc"]).indexOf(l)}`} className="pt-5  text-white" >
                <div className='a-item  a-item-2' style={{"height":`${heightsection}`,"backgroundImage":`url(Images/${imgg}.jpeg)`}}>
                  <div  class="a-sub">{l}</div>
                  </div>
                  <div className='mb-2' style={{"fontSize":"0.8rem","color":"rgb(110 107 107)"}}>{menu["sections"]["mdesc"][l]["des"]}</div>
  
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
          langswitch.IsPaymentSuccess()
        }
      }, 1000);  
    setContainerMyOrderModal(<MyOrders menu={menu}/>) 
     PrepairRows() 
     const element = document.getElementById('loadingg');
     if(element !== null)
     element.classList.add('d-none');
    },[])
    
    const SearchIsClicked=()=>{
      setIsSearch(true)
      setTimeout(() => {
        if(document.getElementById("SearchNavBar"))
        {
          document.getElementById("SearchNavBar").focus()
          langswitch.scrollToElement("SearchNavBar")
        }

      }, 200);
      
    }
    const onKeyUpSearch=(e)=>{
      
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
    const CloseSearchIsClicked=()=>{
      document.getElementById("SearchNavBar").value=""
      setIsSearch(false)
    }    
                                                  
  return (
    <>
    <MyNavBar menu={menu} setContainerMyOrderModal={setContainerMyOrderModal}/>
    <div id="solveshowNav" className='d-none' style={{"height":"56px"}}></div>
    <div className='container-fluid navbarr' >
    <div style={{"height":"50px"}} className={`${IsSearch?"":"d-none"} row`}>
      <div  className='col-10' style={{backgroundColor:"white"}}>
        <input onKeyUp={onKeyUpSearch} id="SearchNavBar" style={{paddingLeft:"18px",marginTop:"5px",width:"100%",height:"79%",fontWeight:"bold"}} type='text' className='rounded-5'></input>
      </div>
      <div className='col-2 d-flex justify-content-center' style={{"backgroundColor":"white"}}>
      <button style={{marginTop:"13px"}} onClick={()=>{CloseSearchIsClicked()}} type="button" class="btn-close " ></button>
      </div>
    </div>
    <div style={{boxShadow:"0px 2px 6px rgba(0, 0, 0, 0.3)"}} className={`${IsSearch?"d-none":""} row`}>
    <nav class=" scroll nav  navbar-nav col-10" id="navbarscroll" style={{"background":"white","fontWeight":"bold","fontSize":"16px"}}  >        
        <div class="p-2">
        {NavRows}
        </div>         
    </nav>
    <div className='col-2' onClick={()=>{SearchIsClicked()}} style={{"backgroundColor":"white","cursor":"pointer"}}>
      <div style={{marginTop:"12px"}} className='  d-flex justify-content-center'>
    <svg  width="30" height="23" fill="currentColor"  viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg>  
    </div> 
    </div>

    </div>
    </div>
    <div  className={`${IsSearch?"":"d-none"} container mt-5`} style={{minHeight:"150vh"}}>
    {Searchrows}
    <div style={{marginTop:"100px"}}/>
    </div>
    <div className={`${IsSearch?"d-none":""} container`}>
    <div className='row'>
    {rows}
    </div>
    <hr  style={{"marginTop":"10rem"}}/>
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

    


    <MModal idd="CartModal" contaienrr={ContainerCartModal} />
    <MModal idd="CustomizeModal" contaienrr={ContainerCustimizeModal} />
    <MModal idd="MyOrderModal" contaienrr={ContainerMyOrderModal} />
    <MModal idd="AboutUsModal" contaienrr={<Aboutus menu={menu} />} />
    <MModal idd="ZusatzModal" contaienrr={<ZusatzStoffe menu={menu} />} />
    <MModal idd="DatenschutzModal" contaienrr={<Datenschutz />} />
    <MModal idd="SuccessModal" contaienrr={<Success />} />
    
      <div className='mb-5 mt-5 container-fluid'/>
    


    <MButtonCartContainer menu={menu} setContainerCartModal={setContainerCartModal} setContainerCustimizeModal={setContainerCustimizeModal}/>
      </>
      
  );
}

export default({menu})=>{
const Componenett = "closed" in menu["staticValue"]?<></>:<IndexPage menu={menu}/>
return <>
<CheckAlerts menu={menu}/>
{Componenett}
</>
}

export function MButtonCartContainer ({menu,setContainerCartModal,setContainerCustimizeModal}) {
  const [ButtonFixedCart,setButtonFixedCart]=useState(<ButtonCartContainer setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal} menu={menu}/>)
  useEffect(()=>{  
    function ModalisClosed () {    
      setButtonFixedCart(<></>)
          setTimeout(() => {  
              setButtonFixedCart(<ButtonCartContainer setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal} menu={menu}/>)
          }, 100);
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