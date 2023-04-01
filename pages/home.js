import { useEffect } from "react"
import langswitch from "../components/Utils/langswitch"
export default ()=>{
    useEffect(()=>{
        window.localStorage.clear()
    },[])
    const restus = ["kitchen-brothers","pizzavalentina","westendgrillundpizza","leundlo"]
    var out = []
    for(var h in restus)
    out.push(
        <div className="col-md-4 col-sm-6 g-3">
            <div className="d-flex justify-content-center">
            <a className="btn btn-primary" href={langswitch.RouteP(restus[h])}>{restus[h]}</a>
        </div>
        </div>
    )

    return(
        <>
        <div className="container mt-4" >
        <div className="row mb-5">
            <div className="col-12">
            Resturant auswählen:
        </div>
        </div>
        <div className="row g-3">
            {out}
        </div>
        </div>
        </>
    )
}