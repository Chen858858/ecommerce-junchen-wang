import {Outlet} from "react-router-dom"
import { NavLink } from "react-router-dom"
import { FaStore } from "react-icons/fa" 
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const MainLayout = () => {
  const navLinkClass = ({isActive}) => 
    `navbar-item ${isActive && " has-background-dark"} is-size-5`;

  return (<>
    <nav className="navbar is-link p-3">
      <div className="navbrand is-size-3 has-text-white has-text-weight-bold">
        <FaStore style={{verticalAlign: "-3px"}} /> Ecommerce
      </div>
      <div className="navbar-menu">
        <div className="navbar-end mr-5">
          <NavLink to="/" className={navLinkClass}>Search</NavLink>
          <NavLink to="/add" className={navLinkClass}>Add Item</NavLink>
        </div>
      </div>
    </nav>
    <Outlet />
    <ToastContainer />
  </>)
}

export default MainLayout
