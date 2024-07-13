'use client'
import { useRouter } from 'next/navigation';
import Header from '@/components/Header'
import Pagebadge from '@/components/Pagebadge'
import Productcard from '@/components/Productcard'
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'next/navigation';
import { ref, onValue } from 'firebase/database';
import { database } from '@/components/firebaseConfig';
import { Swiper, SwiperSlide } from 'swiper/react';
import { VeeContext } from "@/components/Chatcontext";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CurrencyFormatter from '../../../components/CurrencyFormatter';
import { toast } from 'sonner';
import Footer from '@/components/Footer';

const page = () => {
  const router = useRouter();
  const { id } = useParams();

  const [products, setproducts] = useState(null);

  
  const { data, loading, fetchProducts} = useContext(VeeContext);

 
  useEffect(() => {
    if (!data.length) {
        fetchProducts();
    }
}, []);

useEffect(() => {
    if (!loading) {
        const product = data.find(product => product.id == id);
        if (!product) {
            router.push('/products');
            toast.error('An Error Occurred', {
                description: 'Product does not Exist or is out of stock',
            });
        } else{
          console.log(product)
          setproducts(product)
        }
    }
}, [loading, products, id, router]);




  const addToCart = () => {
    console.log('clickedddddd')
    // Check if cartItems cookie already exists
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if item already exists in cart
    const existingItem = cartItems.find(item => item.id === data.id);

    if (existingItem) {
      // If item exists, update quantity
      existingItem.qty += 1;
      toast.message('Info Quantity Increased', {
        description: 'Item Added To Cart',
      })
    } else {
      // If item does not exist, add new item to cartItems array
      cartItems.push({
        id: data.id,
        name: data.product_name,
        price:  data.product_price,
        image:  data.image_one,
        qty: 1, // Initial quantity is 1
      });
      toast.message(`${data.product_name}`, {
        description: 'Item Added To Cart',
      })
    }

    // Store updated cartItems array in cookie
    localStorage.setItem('cartItems', JSON.stringify(cartItems));// Expires in 7 days or adjust as needed
  };

  
  return (
    <>
        <Header/>
        <Pagebadge title={'home/product/Product-Detail'}/>

        <br />
        <div className="containers">

        {/* <div className="shimmer-wrapper">
        <div className="shimmer"></div>
    </div> */}
    <div className={`productdetailcontainer ${loading ? 'isloading' : ''}`}>
    <div className="swap-on-hover productimg ">
<img src={`https://api.timbu.cloud/images/${products?.image_one}`} alt=""  className='swap-on-hover__front-image shim' />
<img src={`https://api.timbu.cloud/images/${products?.image_one}`} alt=""  className='swap-on-hover__back-image ' />
<div className="shim hgh"></div>
    </div>
    <div className="producttxt">
<div className="prodtitle hgh">{products?.product_name}</div>
<div className="prodrating hgh"></div>
<div className="prodprice hgh">
  {/* <span>₦515,900</span> */}

   {
    data && (<CurrencyFormatter amount={products?.product_price|| 0} />)
   }

   
    </div>
<div className="proddesc hgh">
{products?.product_description}
</div>

{
    data && (
      <div className="herobtn"  onClick={addToCart}>

     <span className="material-symbols-outlined">
shopping_bag
</span>   Add to cart  
    </div>
    )
   }


    <div className='extradetails hgh'>
        <small>sku: <span>{products?.sku}</span></small>
        <small>Category: <span>{products?.product_category}</span></small>
        <small>Tag:  <span>{products?.tag}</span></small>
    </div>

    <div className="horizontaltabs">
        <div className="tab">
        Description
        </div>
        <div className="tab">
        Description
        </div>
        <div className="tab">
        Description
        </div>
        
    </div>
    <div className="tabdesc">
    {/* Elevate your home decor with this luxurious table lamp, a statement piece that blends style and function seamlessly. Perfect for those who appreciate fine design and impeccable quality. */}
    </div>
    </div>
</div>

<br />
<br />
<br />
<br />
<h3 className='pagetitle'>Similar Products</h3>

{data &&(
 
 
 <Swiper

spaceBetween={15}
breakpoints={{
    // when window width is >= 640px
    240: {
      slidesPerView: 1,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 3,
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 4,
    },
  }}
centeredSlides={false}
grabCursor={true}
loop={false}
>

{data.map((product, index) => (
  <SwiperSlide key={index} className="pillxx">
        <Productcard
          key={product.id}
          id={product.id}
          name={product.product_name}
          price={product.product_price}
          image={product.image_one}
          imagetwo={product.image_two}
        />
  </SwiperSlide>
))}
</Swiper>
)}





        

        </div>

        <br />
      <br />
<Footer/>
        </>
  )
}

export default page