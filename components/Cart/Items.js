import { useState,useEffect } from "react";
import langswitch from "../Utils/langswitch"
import Cart from "../Index/cart"
import CustomizeOrder from "../Index/customizeorder"
export default function Items({setContainerCustimizeModal,setContainerCartModal,mSetContainer,menu,textabohlen}){
    const EditItem= e=>{
        var tt = e.target.getAttribute("data-ordid");            
        var section = e.target.getAttribute("data-section");    
        // langswitch.ChangeGetParameters("CustomizeOrder:::"+section+":::"+tt)
        document.getElementById("btn-close-CartModal").click()
        setContainerCustimizeModal(<></>)
      setTimeout(() => {
        setContainerCustimizeModal(          
          <CustomizeOrder  menu={menu} id={tt} bnb={section}/>
        )
        
         var myModal = new bootstrap.Modal(document.getElementById("CustomizeModal"), {
          keyboard: true
        })    
        myModal.show()  
      history.pushState({}, '');

      }, 50);
        // mSetContainer(<CustomizeOrder menu={menu} id={tt} SetContainer={mSetContainer} bnb={section}/>)
    }
    const RemoveItem= e=>{
        var tt = e.target.getAttribute("data-ordid");            
        var or = langswitch.getJson("order")
        
        delete or[tt];
        window.localStorage.setItem("order",JSON.stringify(or));
        if(Object.keys(or).length ==0)
        {
            langswitch.ChangeGetParameters("Sections")                           
            document.getElementById("btn-close-CartModal").click()

            return 
        }else{
            setContainerCartModal(<></>)
            setTimeout(() => {
                langswitch.ChangeGetParameters("cart")                                           
                setContainerCartModal(<Cart setContainerCustimizeModal={setContainerCustimizeModal} setContainerCartModal={setContainerCartModal}/>)    
            }, 50);    
        }                
    } 
    const MyLang = langswitch.langswitchs("cart");   
        var sum = 0
        var or = langswitch.getJson("order")
        var addre=langswitch.getJson("address");
        var seladdre=langswitch.getValue("seladdress");
       
        var crows = [];
        for(var ke in or)
        { 
                        sum = parseFloat(sum) + parseFloat(langswitch.stof(or[ke]["price"])) 
                        var countI = <div className="mt-1 mb-1 col-4">{MyLang["count"]+": "+or[ke]["count"]}</div>;
                        var typee = or[ke]["type"] == "stand"?"":"("+or[ke]["type"]+") "
                        var descriptionO = menu["product"][or[ke]["id"]]["desO"] !=undefined?menu["product"][or[ke]["id"]]["desO"]:"";                        
                        var extras = []
                        for(var j in or[ke]["extra"])
                        extras.push(<>+ {langswitch.firstUpper(or[ke]["extra"][j][or[ke]["type"]]["name"])}<br/></>)
    
                        var option = []
                        for(var oobo in or[ke]["option"])                        
                        option.push(<>{langswitch.firstUpper(oobo)+" : "+langswitch.firstUpper(or[ke]["option"][oobo] )}<br/></>)
                        crows.push(
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className=''>{menu["product"][or[ke]["id"]]["name"]}&nbsp;({menu["product"][or[ke]["id"]]["section"]})&nbsp;{typee}</h6>
                                <small className=''>
                                {descriptionO==""?"":<>{descriptionO}<br/></>}
                                {countI}                         
                                {extras.length==0?"":<>{extras}</>}
                                {option}
                                {or[ke]["msg"]==""?"":<>{or[ke]["msg"]}<br/></>}
                                </small>
                                <button  data-ordid={ke} onClick={RemoveItem} type="button" class="mt-3 btn btn-outline-danger">Entfernen</button>
                                &nbsp;
                                <button  data-ordid={ke} data-section={menu["product"][or[ke]["id"]]["section"]} onClick={EditItem}  class="mt-3 btn btn-outline-secondary">{MyLang["edit"]}</button>
                            </div>
                                <span className=' '>
                                {or[ke]["price"]}&nbsp;&euro;
                                </span>
                        </li>
                        )                          
        }  
    
        if(Object.keys(or).length > 0)
        {
            if(menu["rabat"]!="")
            {
                var rabb = sum*(parseInt(menu["rabat"]))/100
                // rabb = rabb.toFixed(2)
                sum = sum - rabb
                rabb = langswitch.ftos(rabb)            
                crows.push(
                    <li className="list-group-item d-flex justify-content-between lh-light">
                         <div className='text-success'>
                            <h6>Rabatt %{menu['rabat']}</h6>
                         </div>                         
                         <span className="text-success">- {rabb}&nbsp;&euro;</span>                    
                    </li>
                    )
            }  
            if(!textabohlen)
            if(Object.keys(addre).length !=0 && addre[seladdre]!=undefined)
            {
                sum+= addre[seladdre]['kosten'];
                crows.push(
                    <li className="list-group-item d-flex justify-content-between lh-light">
                        <div className=''><h6 className=''>{MyLang['delivery cost']}</h6></div>
                        <span className=' '>{addre[seladdre]['kosten']}&nbsp;&euro;                </span>                        
                        </li>
                        )
            }   
            sum = langswitch.ftos(sum)                     
            crows.push(
                <li className="list-group-item d-flex justify-content-between lh-light">
                <div className=''><h6 className=''>{MyLang["total including var"]}</h6></div>
                <span className=' '>{sum}&nbsp;&euro;                </span>                        
                </li> 
            )
        }
        window.localStorage.setItem("sumprice",sum);
     

   
    return     <ul className='list-group mb-3'>
        {crows}
    </ul>
}