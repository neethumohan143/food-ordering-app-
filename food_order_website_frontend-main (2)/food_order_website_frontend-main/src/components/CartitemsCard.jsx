import axios from 'axios';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {  useSnackbar } from 'notistack';

function CartitemsCard(props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { cart } = props;
  const { cart_items } = cart;

  const handleDeleteItem = async (itemId) => {
    if (cart.cart_items.length === 1) {
      try {
        await deleteCart(cart._id);
        enqueueSnackbar("Cart deleted", {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" }
        });
        console.log(`Cart deleted===>${cart._id}`);
      } catch (err) {
        console.error('Error deleting cart:', err);
      }
    } else {
      const updatedCartItems = cart.cart_items.filter(item => item._id !== itemId);
      try {
        await updateCart(cart._id, { cart_items: updatedCartItems });
        enqueueSnackbar("Item removed from cart", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" }
        });
        console.log(`Cart item deleted===>${itemId}`);
      } catch (err) {
        console.error('Error updating cart:', err);
      }
    }
  };
  

  const handleQuantityChange = async (itemId, action) => {
    const updatedCartItems = cart.cart_items.map(item => {
      if (item._id === itemId) {
        const newQuantity = action === 'increment' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, newQuantity) }; 
      }
      return item;
    });

    try {
      await updateCart(cart._id, { cart_items: updatedCartItems });
      console.log(`Cart item updated===>${itemId}, New Quantity: ${updatedCartItems.find(item => item._id === itemId).quantity}`);
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  const deleteCart = async (cartId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/${cartId}`);
      if (response.status === 200) {
        navigate(`/home/cart`);
      }
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  const updateCart = async (cartId, updatedCartData) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/cart/${cartId}`, updatedCartData);
      if (response.status === 200) {
        navigate(`/home/cart`);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <article className='max-h-[38rem] overflow-y-auto'>
      {cart_items.map((item) => {
        const { menu_id, quantity } = item;
        const { name, price, image } = menu_id;

        return (
          <div key={item._id} className='w-[55rem] h-fit bg-transparent border border-black rounded-lg mx-4 px-3 py-1 flex flex-row pb-2 mb-2'>
            <img src={image} alt={name} className='w-[10rem] h-[6rem] my-1 mx-6 rounded-lg' />
            <div>
              <h2>{name}</h2>
              <span >₹ {price}</span>
              <div className='pb-2'>
                <div className='item-count flex items-center space-x-4 border border-black w-[7rem] px-4 rounded-full'>
                  <button 
                    className='px-1' 
                    onClick={() => handleQuantityChange(item._id, 'decrement')} 
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item._id, 'increment')}
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <span>Total: ₹ {price} * {quantity} = ₹ {price * quantity}</span>
              </div>
            </div>
            <button
              onClick={() => handleDeleteItem(item._id)}
              className='ml-auto p-2 hover:text-red-600'>
              <FaTrashAlt size={20} />
            </button>
          </div>
        );
      })}
    </article>
  );
}

export default CartitemsCard;
