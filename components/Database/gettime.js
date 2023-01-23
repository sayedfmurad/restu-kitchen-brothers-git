
import langswitch from '../Utils/langswitch'

export default function g()
{
    const MyLang = langswitch.langswitchs("gettime");
    if(process.browser){
        var orders = langswitch.getJson("mainorder");
        
        const urll="https://owgx3eqm5ghc7ljmshusneo7640lveax.lambda-url.eu-central-1.on.aws"
        let mheaders = new Headers();
        mheaders.append('Origin','*');
        for(var kg in orders)
        if(orders[kg]['time'] == "")
          {
            fetch(urll, {
                method: 'POST', // or 'PUT'
                headers: mheaders,
                body: JSON.stringify(orders)
              })
              .then(response => response.json())
      .then(result => {
        for(var k in result)
        {
            if(!orders[k]['timenotify'] || typeof(orders[k]['timenotify']) == 'undefined')
            if(result[k]['time'] != "")
            {
                result[k]['timenotify']="true"
                alert(MyLang["your order"]+result[k]['sum']+" €  "+MyLang["will be in"]+result[k]['time']+" Minuten bei Ihnen sein")
            }
            
             
        }
    
        localStorage.setItem("mainorder",JSON.stringify(result) )
    
        
      })
      .catch(error => {
        console.error('Error:', error);
        setmsg("error");
      })
            break;
          } 

    


        
 
}
return(<>
</>)
}