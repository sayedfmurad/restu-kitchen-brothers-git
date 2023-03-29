import { useEffect } from "react"

export default()=>{
    useEffect(()=>{
        var url = window.location.pathname.split('/')[1]
        url = url.split(".")[0]
        url = "./database/"+url
        url = url+".menu.json"
        fetch(url)
        .then(response => response.json())
        .then(data => {
            window.localStorage.setItem("menu",JSON.stringify(data))            
            window.location.href = "./"
        })
        .catch(error => {
            window.location.href = "./"
            alert("Resturant Not Found")
            console.error('Error fetching JSON file:', error);
        });
    },[])
    return<>
    Loading
    </>
}