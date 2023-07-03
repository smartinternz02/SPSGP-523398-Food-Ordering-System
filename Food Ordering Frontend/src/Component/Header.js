import React from "react";
import logo from "../assest/logo2.png";
import {Link} from "react-router-dom";
import "tailwindcss/tailwind.css";
import {HiOutlineUserCircle} from 'react-icons/hi';
import {BsFillCartFill} from 'react-icons/bs';
import { useState } from "react";
import AddedProduct from '../page/AddedProduct';

const Header = () =>{
    const [showMenu, setshowMenu] =useState(false);
    const [showCart, setShowCart] = useState(false);
    const handleshowMenu = () => {
        setshowMenu(prev => !prev)
    }
    return (
        <header className="shadow-md w-full h-16 px-2 md:px-4">
          <div className="flex items-center h-full justify-between">
            <Link to={""}>
              <div className="h-10">
                <img src={logo} className="h-full" style={{ width: '100px',  height: '50px', }} />
              </div>
            </Link>
      
            <div className="flex items-center gap-4 md:gap-7">
              <nav className="flex gap-4 md:gap-6 text-base md:text-lg">
                <Link to={""}>Home</Link>
                <Link to={"menu"}>Menu</Link>
                <Link to={"about"}>About</Link>
                <Link to={"contact"}>Contact</Link>
              </nav>
      
              <div className="relative">
                <div className="text-2xl text-slate-600" onClick={() => setShowCart(prevShowCart => !prevShowCart)}>
                  <BsFillCartFill />
                </div>
                {showCart && (
                  <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded shadow-md">
                    <AddedProduct />
                    <div className="mt-4 text-center">
                      <Link to="/addtocart" className="text-slate-600 underline" onClick={() => setShowCart(false)}>
                        Go to Cart
                      </Link>
                    </div>
                  </div>
                )}
                <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">0</div>
              </div>
      
              <div className="text-slate-600">
                <div className="text-3xl cursor-pointer" onClick={handleshowMenu}>
                  <HiOutlineUserCircle />
                </div>
                {showMenu && (
                  <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                    <Link to={"newproduct"} className="whitespace-nowrap cursor-pointer">New product</Link>
                    <Link to={"login"} className="whitespace-nowrap cursor-pointer">Login</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
      
          <style>
            {`
            .relative {
              position: relative;
            }
      
            .absolute {
              position: absolute;
            }
      
            .top-full {
              top: 100%;
            }
      
            .mt-2 {
              margin-top: 0.5rem;
            }
      
            .right-0 {
              right: 0;
            }
      
            .w-64 {
              width: 16rem; /* Adjust the width as needed */
            }
      
            .bg-white {
              background-color: #fff;
            }
      
            .rounded {
              border-radius: 0.25rem;
            }
      
            .shadow-md {
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            `}
          </style>
        </header>
      );            
      
}
export default Header;