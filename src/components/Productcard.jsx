import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Productcard = ({ name, price, image, id, imagetwo }) => {
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
     ₦{price}
     </div>
     <div className="herobtn">
     <span className="material-symbols-outlined">
shopping_bag
</span>   Add to cart  
    </div>
        </div>
  )
}

export default Productcard