import { useEffect } from "react"

export default()=>{
    useEffect(()=>{
        fetch("./database/"+window.location.pathname.split('/')[1]+".menu.json")
        .then(response => response.json())
        .then(data => {
            window.localStorage.setItem("menu",JSON.stringify(data))            
            window.location.href = "./"
        })
        .catch(error => {
            alert('Error fetching JSON file:', error)
            console.error('Error fetching JSON file:', error);
        });
    },[])
    return<>
    Loading
    </>
}