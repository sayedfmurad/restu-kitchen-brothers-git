import { useEffect } from "react"
useEffect
export default()=>{
    useEffect(()=>{
        window.localStorage.setItem("menukey",window.location.pathname.substr(1))
        window.location.href = "./"
    },[])
    return<>
    </>
}