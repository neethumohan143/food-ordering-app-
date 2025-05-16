import React, { useEffect, useState } from 'react';
import MenuCard from '../components/MenuCard';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';

function Menu() {
  const location = useLocation();
  const { hotel } = location.state || {};
  const [menulist, setMenuList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (hotel?._id) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/menu?restaurant_id=${hotel._id}`)
        .then((response) => {
          setMenuList(response.data);
        })
        .catch((error) => {
          console.error('Error fetching menu:', error);
        });
    }
  }, [hotel]);

 
  const filteredMenu = menulist.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className='bg-[#B0A1BA] min-h-full pb-5'>
      <section className='py-2 px-2'>
        <h1 className="text-6xl font-bold text-center text-black py-4 px-2 font-ruge tracking-wide">
          Menu
        </h1>
        <div className="flex justify-center my-4">
          <input
            type="text"
            placeholder="Search menu..."
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-5 gap-4'>
          <SnackbarProvider maxSnack={3}>
            {filteredMenu.map((menu) => (
              <MenuCard key={menu._id} menu={menu} />
            ))}
          </SnackbarProvider>
        </div>
      </section>
    </main>
  );
}

export default Menu;
