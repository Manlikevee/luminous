'use client'
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Pagebadge from '@/components/Pagebadge';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
const Page = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Initialize cartItems from localStorage on component mount
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleIncrease = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updatedCartItems);
  };

  const handleDecrease = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    updateCart(updatedCartItems);
  };

  const handleDelete = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    updateCart(updatedCartItems);
  };

  const updateCart = (updatedCartItems) => {
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
  };

  function checkout(){
    router.push(`/checkout/${Math.floor(Math.random() * 11234340)}`);
  }
  return (
    <>
      <Header />
      <Pagebadge title={'cart'} />

      <br />
      <div className="containers">
        <div className="cartitems">
          <div className="carthead">
            <div className="itemsmall"></div>
            <div className="itembig">Product</div>
            <div className="itemmid">Price</div>
            <div className="itemmid">Quantity</div>
            <div className="itemmid">Subtotal</div>
          </div>

{ cartItems.length >= 1  ? (
  <>
            {cartItems.map(product => (
            <div className="cartbody" key={product.id}>
              <div className="itemsmall" onClick={() => handleDelete(product.id)}>
                x
              </div>
              <div className="itembig">
                <div className="cartdata">
                  <img src={`https://api.timbu.cloud/images/${product.image}`} alt="" />
                  <span>{product.name}</span>
                </div>
              </div>
              <div className="itemmid"><CurrencyFormatter amount={product.price|| 0} /></div>
              <div className="itemmid">
                <div className="quantity-field">
                  <button
                    className="value-button decrease-button"
                    title="Decrease"
                    onClick={() => handleDecrease(product.id)}
                  >-</button>
                  <div className="number">{product.qty}</div>
                  <button
                    className="value-button increase-button"
                    title="Increase"
                    onClick={() => handleIncrease(product.id)}
                  >+
                  </button>
                </div>
              </div>
              <div className="itemmid">
              
              <CurrencyFormatter amount={product.qty * product.price|| 0} />
              </div>
            </div>
          ))}
  </>
) : ('No Item In Cart') }

        </div>

        <br />
        <br />
        <div className="carthead">
          <h4>Cart Totals</h4>
        </div>

        <div className="cartbody">
          <div className="itemsmall">
            Subtotal
          </div>
          <div className="itemsmall">
           
            <CurrencyFormatter amount={calculateSubtotal()|| 0} />
          </div>
        </div>
        <br />
        { cartItems.length >= 1  && (
        <div className="herobtn" onClick={checkout}>
          <span className="material-symbols-outlined">
            shopping_bag
          </span> Proceed to checkout
        </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Page;
