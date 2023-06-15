import { useState,useEffect } from "react";
import langswitch from "../Utils/langswitch"
import Sections from "../Index/sections"
import Cart from "../../pages/cart"
export default function Items({mSetContainer,menu,textabohlen}){
    const RemoveItem= e=>{
        var tt = e.target.getAttribute("data-ordid");            
        var or = langswitch.getJson("order")
        
        delete or[tt];
        console.log(or)
        window.localStorage.setItem("order",JSON.stringify(or));
        if(Object.keys(or).length ==0)
        {
            mSetContainer(<Sections menu={menu}/>)
            return 
        }else{
            mSetContainer(<></>)
            setTimeout(() => {
                
                mSetContainer(<Cart mSetContainer={mSetContainer}/>)    
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
                                <small className='text-muted'>
                                {descriptionO==""?"":<>{descriptionO}<br/></>}
                                {countI}                         
                                {extras.length==0?"":<>{extras}</>}
                                {option}
                                {or[ke]["msg"]==""?"":<>{or[ke]["msg"]}<br/></>}
                                </small>
                                <button  data-ordid={ke} onClick={RemoveItem} type="button" class="mt-3 btn btn-outline-danger">Entfernen</button>
                                &nbsp;
                                <a  href={langswitch.RouteP("customizeorder?id="+or[ke]["id"]+"&"+"type="+or[ke]["type"]+"&"+"orderid="+ke)} class="mt-3 btn btn-outline-secondary">{MyLang["edit"]}</a>
                            </div>
                                <span className=' text-muted'>
                                {or[ke]["price"]}&nbsp;&euro;
                                </span>
                        </li>
                        )                          
        }  
    
        if(Object.keys(or).length > 0)
        {
            if(menu["rabat"]!="")
            {
                var rabb = sum*0.05
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
                        <span className=' text-muted'>{addre[seladdre]['kosten']}&nbsp;&euro;                </span>                        
                        </li>
                        )
            }   
            sum = langswitch.ftos(sum)                     
            crows.push(
                <li className="list-group-item d-flex justify-content-between lh-light">
                <div className=''><h6 className=''>{MyLang["total including var"]}</h6></div>
                <span className=' text-muted'>{sum}&nbsp;&euro;                </span>                        
                </li> 
            )
        }
        window.localStorage.setItem("sumprice",sum);
     

   
    return     <ul className='list-group mb-3'>
        {crows}
    </ul>
}