import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CurrencyFormatter from '@/components/CurrencyFormatter';
import { toast } from 'sonner';
const Productcard = ({ name, price, image, id, imagetwo }) => {

  const addToCart = () => {
    // Check if cartItems cookie already exists
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if item already exists in cart
    const existingItem = cartItems.find(item => item.id === id);

    if (existingItem) {
      // If item exists, update quantity
      existingItem.qty += 1;
      toast.message('Info Quantity Increased', {
        description: 'Item Added To Cart',
      })
    } else {
      // If item does not exist, add new item to cartItems array
      cartItems.push({
        id: id,
        name: name,
        price: price,
        image: image,
        qty: 1, // Initial quantity is 1
      });
      toast.message(`${name}`, {
        description: 'Item Added To Cart',
      })
    }

    // Store updated cartItems array in cookie
    localStorage.setItem('cartItems', JSON.stringify(cartItems));// Expires in 7 days or adjust as needed
  };



  return (
    <div className='productcard' key={id}>
        <Link href={`/productdetail/${id}`} className="imagecard swap-on-hover">
        <img src={image} alt={name} className='swap-on-hover__front-image' />
        <img src={imagetwo} alt={name} className='swap-on-hover__back-image' />
        </Link>
        

        <div className="pname">
      {name}
        </div>
     <div className="pprice">

     
   {
    price && (<CurrencyFormatter amount={price|| 0} />)
   }
     </div>
     <div className="herobtn" onClick={addToCart}>
     <span className="material-symbols-outlined" >
shopping_bag
</span>   Add to cart  
    </div>
        </div>
  )
}

export default Productcard