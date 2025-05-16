import React from 'react'
import { Link, useLocation } from "react-router-dom";
import AddressCart from '../components/AddressCard';

export default function Address() {
  const location = useLocation();
  const fromCart = location.state?.fromCart || false;
  console.log(`AAA============>${fromCart}`)
  return (
    <main className='bg-[#B0A1BA] h-screen'>
        
      <AddressCart fromCart={fromCart}/>
  </main>
  )
}
