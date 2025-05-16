import React from 'react'
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
    <header className="shadow-lg h-20 px-10 bg-gray-900 border border-black">
      <div className="container flex flex-row justify-between items-center h-full mx-auto">
      <img src="https://res.cloudinary.com/drinn62yk/image/upload/v1728691154/tqxzwkst8yelcpgpg8el.png" alt="Brand Logo" className="w-24 " />
        <nav>
          <ul className="flex flex-row gap-6">
            <li>
              <Link to={"/home/hotels"}>
                <FaHome size={24} color='white' />  
              </Link>
            </li>
            <li>
              <Link to={"/home/cart"}>
                <FaShoppingCart size={24} color='white' />  
              </Link>
            </li>
            <li>
              <Link to={"/home/profile"}>
                <FaUser size={24} color='white' /> 
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <Outlet />
    <Footer/>
  </>

  )
}
