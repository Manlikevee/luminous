'use client'
import Header from '@/components/Header'
import Pagebadge from '@/components/Pagebadge'
import React, { useState } from 'react'

const Page = () => {
  const initialCartItems = [
    { id: 1, name: 'Product 1', qty: 1, price: 10, image: 'https://i.pinimg.com/564x/dd/0b/d2/dd0bd2471c65f3e8a8fddab2e7f51f93.jpg' },
    { id: 2, name: 'Product 2', qty: 1, price: 20, image: 'https://i.pinimg.com/564x/66/71/6a/66716a341f853ecbb14ffac90d53d63b.jpg' },
    { id: 3, name: 'Night Lamp', qty: 1, price: 30, image: 'https://i.pinimg.com/564x/d2/16/fe/d216feb6c334750ab60975f63d4d6904.jpg' },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleIncrease = (id) => {
    const updatedCartItems = cartItems.map(item => 
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCartItems(updatedCartItems);
  }

  const handleDecrease = (id) => {
    const updatedCartItems = cartItems.map(item => 
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    setCartItems(updatedCartItems);
  }

  const handleDelete = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
  }

  return (
    <>
      <Header/>
      <Pagebadge/>

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

          {cartItems.map(product => (
            <div className="cartbody" key={product.id}>
              <div className="itemsmall" onClick={() => handleDelete(product.id)}>
                x
              </div>
              <div className="itembig">
                <div className="cartdata">
                  <img src={product.image} alt="" />
                  <span>{product.name}</span>
                </div>
              </div>
              <div className="itemmid">{product.price}</div>
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
              <div className="itemmid">₦{ product.qty * product.price }</div>
            </div>
          ))}
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
            ₦{calculateSubtotal()}
          </div>
        </div>
        <br />
        <div className="herobtn">
     <span className="material-symbols-outlined">
shopping_bag
</span>  Proceed to checkout
    </div>
      </div>
    </>
  )
}

export default Page
