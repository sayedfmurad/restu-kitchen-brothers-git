import Head from 'next/head'
import decodeToken from '../Utils/decodeToken'
import { useRouter } from 'next/router'
import langswitch from "../Utils/langswitch"
import menu from "../../public/database/menu"
const MyNavbar = ({sub}) => {
    if(sub == undefined)
    sub ="";
    const MyLang = langswitch.langswitchs("navbar");
    var router = useRouter();
    router = router.pathname;
    let user;
    // if(process.browser)
    // user = decodeToken(localStorage.getItem("id_token"));

    // console.log(user);
    return (
        <>
        <Head>
        <link   href={sub+"./mystyles/global.css"} rel="stylesheet" />
        <link href={sub+"./mystyles/mynavbar.css"} rel="stylesheet" />
        </Head>
        <nav id="mynavb" className="mb-2 navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand">
                   <h5>{menu["staticValue"]["logo"]}</h5>
                    {/* <img
                        class="d-inline-block align-text-top"
                        height="24"
                        width="54"
                        alt="Website Logo"
                        src={sub+"./Images/logo.png"}/> */}
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-center"
                    id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="homenavItem nav-item">
                            <a className={`nav-link ${router=="/"?"active":""}`} aria-current="page" href={langswitch.RouteP("",sub)}>{MyLang["home"]}</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${router=="/selectadd"?"active":"gg"}`} aria-current="page" href={langswitch.RouteP("selectadd",sub)}>{MyLang["addresses"]}</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${router=="/cart"?"active":"gg"}`} aria-current="page" href={langswitch.RouteP("cart",sub)}>{MyLang["cart"]}</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${router=="/order"?"active":"gg"}`} aria-current="page" href={langswitch.RouteP("updatesmainorders",sub)}>{MyLang["myorders"]}</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${router=="/aboutus"?"active":"gg"}`} aria-current="page" href={langswitch.RouteP("aboutus",sub)}>{MyLang["about us"]}</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${router=="/zusatzstoffe"?"active":"gg"}`} aria-current="page" href={langswitch.RouteP("zusatzstoffe",sub)}>{MyLang["zusatzstoffe"]}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <script src={sub+"./scripts/bootstrap.bundle.js"} ></script>
        </>
    )
}
export default MyNavbar