'use client'
import { useRouter } from 'next/navigation';
import Header from '@/components/Header'
import Pagebadge from '@/components/Pagebadge'
import Productcard from '@/components/Productcard'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ref, onValue } from 'firebase/database';
import { database } from '@/components/firebaseConfig';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CurrencyFormatter from '../../../components/CurrencyFormatter';
import { toast } from 'sonner';

const page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [products, setproducts] = useState(null);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {

    const dbRef = ref(database, `/products/${id}`);
    onValue(dbRef, (snapshot) => {
      const fetchedData = snapshot.val();
      console.log(fetchedData)
      if(!fetchedData){
        router.push('/products');
        toast.message('An Error Occured', {
          description: 'Product does not Exist or is out of stock',
        })
      }

      setData(fetchedData);
      setLoading(false)
    });
  }, [id]);


  useEffect(() => {
    const dbRef = ref(database, '/products');
    onValue(dbRef, (snapshot) => {
      const fetchedData = snapshot.val();
      const dataWithKeys = Object.keys(fetchedData).map(key => ({
        object_key: key,
        ...fetchedData[key]
      }));
      setproducts(dataWithKeys);
    });
  }, []); 

  
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
<img src={data?.image_one} alt=""  className='swap-on-hover__front-image shim' />
<img src={data?.image_two} alt=""  className='swap-on-hover__back-image ' />
<div className="shim hgh"></div>
    </div>
    <div className="producttxt">
<div className="prodtitle hgh">{data?.product_name}</div>
<div className="prodrating hgh"></div>
<div className="prodprice hgh">
  {/* <span>₦515,900</span> */}

   {
    data && (<CurrencyFormatter amount={data?.product_price|| 0} />)
   }

   
    </div>
<div className="proddesc hgh">
{data?.product_description}
</div>
<div className="herobtn">
     <span className="material-symbols-outlined">
shopping_bag
</span>   Add to cart  
    </div>

    <div className='extradetails hgh'>
        <small>sku: <span>{data?.sku}</span></small>
        <small>Category: <span>{data?.product_category}</span></small>
        <small>Tag:  <span>{data?.tag}</span></small>
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

{products &&(
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

{products.map((product, index) => (
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

        
        </>
  )
}

export default page