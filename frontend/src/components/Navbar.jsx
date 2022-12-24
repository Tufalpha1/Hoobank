import {useState} from 'react'
import {close ,logo, menu} from '../assets'
import {navLinks} from '../constants'
import {Link} from "react-router-dom"
import axios from 'axios'
import {toast} from "react-hot-toast"

const Navbar = ({session}) => {

  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  
  const handleLogout = ()=>{
    console.log("logout function runnning");
    axios.get("http://localhost:3000/logout").then((res)=>console.log("res", res)).catch((err)=>console.log(err))
    toast.success("logged out successfully");
    console.log("Code reaching here")
    localStorage.removeItem("session")
    console.log("Code reaching here2")
    window.location.replace("http://localhost:5173/login")
  }

  return (
    <div>
        <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
      {navLinks.map((nav, index) => {
        if(session?.session === false && (nav.id === "dashboard" || nav.id === "logout")) return false;
        if (session?.session === true && (nav.id === "login" || nav.id === "signup") ) return false;
        if (session?.session === true && !session?.user[0].isAdmin && nav.id === "dashboard") return false;
          return <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
          >
            <Link to={nav.id === "logout"? "" : `${nav.id}`} onClick={nav.id === "logout" ? handleLogout : () => {
              setActive(nav.title)
              console.log("other function running");
            }}>{nav.title}</Link>
          </li>
        })}
      </ul>
      
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <Link to={`${nav.id}`}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
     </nav>
    </div>
    
  )
}

export default Navbar
