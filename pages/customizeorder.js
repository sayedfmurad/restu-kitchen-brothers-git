import Head from 'next/head'
import langswitch from '../components/Utils/langswitch'
import MyNavbar from "../components/navbar/MyNavbar"
import menu from "../public/database/menu.json"
import { useRouter } from 'next/router'
import hash from "../components/Utils/object_hash"
import React, { useState, useEffect } from 'react';
export default function c() {
    const router = useRouter()   
    var [mdisplay, setmdisplay]=useState("d-none");    
    const MyLang = langswitch.langswitchs("customizeorder");
    var [count, setcount]=useState(1);
    var [extra, setextra]=useState({});
    var [price, setprice]=useState("0"); 
    var [type, settype]=useState(""); 
    var [option, setoption]=useState([]); 
    
    const OptionsElement=(e)=>{
        
        var tempsubobj= []               
        var defaultoption = editordercheck?
                or[orderid]["option"][Object.keys(or[orderid]["option"])[objo]]:
                e["options"][Object.keys(e["options"])[0]]
                for(var op in e["options"])                
                {
                var idds = e["options"][op]
                tempsubobj.push(                     
                            <option  value={idds}>{menu["options"][idds]}</option>
                    )
                    if(defaultoption=="")
                    defaultoption = idds 
                }
                const getoption =(ee)=>{
                    var obj = option
                    var key = ee.target.name
                    key = key.replace("options-options","")
                    obj[key]=ee.target.value
                }
                return <div class="input-group mb-3">
                <label class="input-group-text"  for="inputGroupSelect01">{menu["product"][id]["options"][objo]["name"]}</label>
                    <select onChange={getoption}  name={`options-options${e["name"]}`} class="form-select">
                    {tempsubobj}
                    </select>
                </div>
    }
    useEffect(() => {
        updatePrice(); 
    }, [count]);
    var ob = [];
    var types = [];
    var options = [];
    let order = {};     
    if(process.browser)
    {             
        if(!langswitch.checkOpenCloseStore())       
        window.location.href = langswitch.RouteP("storeclosed");
        var bnb = new URL(decodeURI(location.href));
        var id = bnb.searchParams.get("id");
        var orderid = bnb.searchParams.get("orderid");
        var or = langswitch.getJson("order") 
        var ortype = bnb.searchParams.get("type")        
        var editordercheck=false;
        if(orderid != undefined)
        if(orderid != null)
        if(orderid != "")
        if(or[orderid] != undefined)
        {
            editordercheck = true; 
            [count, setcount]=useState(or[orderid]["count"])
            useEffect(() => {
                updatePrice(); 
            }, [count]);
        }
        
        if(editordercheck){
        document.getElementById("textareamsg").value = or[orderid]["msg"];
        [mdisplay, setmdisplay]=useState("");    
        document.getElementById("btn-cancel").href=langswitch.RouteP("cart")
        }
        else
        document.getElementById("btn-cancel").href=langswitch.RouteP(`sectionmenu?section=${encodeURIComponent(menu["product"][id]["section"])}`)
        ob = menu["product"][id]
        var extrarow=[]
        var ok = menu["extra"];
        var ion=0;
        
        const gettype =(ee)=>{
            settype(ee.target.id)
        }
        

                var selectedtype = Object.keys(menu["product"][id]["price"])[0]
                if(ortype !=null) 
                if(ortype !=undefined)             
                if(ortype !="")              
                selectedtype = ortype

                
        for(var tt in menu["product"][id]["price"])
        {
            if(tt!="stand")
            types.push(
                <div style={{"fontSize":"0.5rem"}} className='col-xxl-2 col-md-3 col-sm-4 col-xs-2 p-2'>
                <input onClick={gettype} type="radio" class="btn-check" name="options-outlined" id={tt} autocomplete="off" defaultChecked={selectedtype==tt?"checked":""}/>
                <label class="btn btn-outline-success" for={tt}>{tt}&nbsp;&nbsp;{menu["product"][id]["price"][tt]}&nbsp;&euro;</label>
                &nbsp;</div>
            )            
        }
        [type,settype] = useState(selectedtype);
            useEffect(() => {
                updatePrice(); 
            }, [type]);
            
        var tempobjOptiondefault={}
        if(menu["product"][id]["options"] != undefined)
        if(menu["product"][id]["options"].length>0)
        for(var objo in menu["product"][id]["options"])
        {
            var tempobj=[]
            if(Object.keys(menu["product"][id]["options"][objo]["options"]).length>1)
            {                                
                tempobj.push(<div className='row'>{OptionsElement(menu["product"][id]["options"][objo])}</div>)
                options.push(<div className='col-12'>{tempobj}</div>)                
            }
            tempobjOptiondefault[menu["product"][id]["options"][objo]["name"]]=menu["product"][id]["options"][objo]["options"][0]
        }
    if(options.length>0)    
    [option,setoption] = useState(tempobjOptiondefault);
    useEffect(() => {
        updatePrice(); 
    }, [option]);
        var addOrder=()=>{            
            order["id"]=id
            order["type"]=type
            order["extra"]=extra
            order["count"]=count
            order["price"]=price;
            order["option"]=option
            order["msg"]=document.getElementById("textareamsg").value
            var hashs = hash(order);            
            var or=langswitch.getJson("order")
            or[(editordercheck?orderid:hashs)]=order
            window.localStorage.setItem("order",JSON.stringify(or))
            document.getElementById("btn-cancel").click()
        }
        var addextra=(e)=>{
            if(e.target.checked)
            {
                var go = extra
                go[e.target.id]=ok[e.target.id];
                setextra(go)
            }              
            else
            {
                var go = extra
                delete extra[e.target.id]
                setextra(go)
            }

            updatePrice();         
        }
        if(editordercheck)
        [extra, setextra]=useState(or[orderid]["extra"])
        
        var checkisextra = false;
        for(var jjj in menu["extra"])
        for(var ttt in menu["extra"][jjj]["section"])    
        if(menu["product"][id]["section"].toUpperCase()==menu["extra"][jjj]["section"][ttt].toUpperCase())        
        if((type in menu["extra"][jjj]))
        { 
        checkisextra=true;  
        extrarow.push(
         <div style={{"fontSize":"1rem"}} className={`col-md-4 p-1 ${(ion>2?mdisplay:"")}`}>
            <input defaultChecked={(jjj in extra?true:false)} id={jjj} onChange={addextra} class="form-check-input" type="checkbox" value="option1"></input>
            &nbsp;{"Mit "+menu["extra"][jjj][type]["name"].charAt(0).toUpperCase() + menu["extra"][jjj][type]["name"].slice(1)}&nbsp;&nbsp;{menu["extra"][jjj][type]["price"]}&nbsp;&euro;&nbsp;
         </div>
        )
        ion++;
        }
        if(checkisextra)
        if(!editordercheck)
        if(ion>2)
        extrarow.push(
            <>           
           <div className='col-12'>           
               <button className='btn btn-primary ' id="btn-more" onClick={()=>{setmdisplay(""); document.getElementById("btn-more").className="d-none"}}>{MyLang["more"]}</button>
           </div> 
           </>
        )

        var updatePrice=()=>{
            var p = langswitch.stof(menu["product"][id]["price"][type])
            for(var k in extra)
                p += langswitch.stof(extra[k][type]["price"])      
            
            p = p *count;
            setprice(langswitch.ftos(p))         
        } 
    }  
  
return(<>
        <Head>
        <title>{MyLang["title"]}</title>
        <link href="./mystyles/customizeorder.css" rel="stylesheet" />
        </Head>
        <MyNavbar
        />
        <div className="container mt-4 text-white">
            <div className="row p-3">
            <div className='col-12'>
                <h3>{ob["name"]}</h3>                                
            </div>
            <br/><br/><br/><br/>
            <div className='col-12'>
                <h5>{MyLang["total"]}:&nbsp;&nbsp;{price}&nbsp;&euro;</h5>
            </div>
            <br/>
            <br/>
            <div className='col-12'>
                <div className='row'>
            {types.length<=1?"":types}
            </div>         
            </div>
            <div className='col-12'>
            {options}            
            </div>
            <div className='col-12'>
                <br/>
                <h5 >{MyLang["count"]}</h5>
            </div>            
            <div className='col-12 text-white'>
                <a onClick={()=>{var g=count+1;setcount(g);}} className='btn btn-primary'>+</a>
                &nbsp;&nbsp;&nbsp;{count}&nbsp;&nbsp;&nbsp;
                <a onClick={()=>{var g=count==1?1:count-1;setcount(g);}} className='btn btn-primary'>-</a>
            <br/><br/>
            </div>
            <div className='col-12'>
            <div className='row'>
                    {extrarow}
                </div>
            </div>
            <div className='col-12'>
            <br/><br/>
            <textarea id="textareamsg" style={{"width":"20rem"}} placeholder={MyLang["leavemsg"]} maxLength={50} />          
            </div>
            <div className='col-12'>
            <br/><br/>
            <a className='btn btn-primary' onClick={addOrder}>{editordercheck?MyLang["edit"]:MyLang["add"]}</a>&nbsp;&nbsp;
            <a className='btn btn-danger' id='btn-cancel'>{MyLang["cancel"]}</a>
            </div>
            </div>
        </div>
</>);
}