'use client'
import Header from '@/components/Header'
import Pagebadge from '@/components/Pagebadge'
import Productcard from '@/components/Productcard'
import React, { useEffect, useState , useContext} from 'react'
import { VeeContext } from "@/components/Chatcontext";
import { database } from '@/components/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import Footer from '@/components/Footer';

const page = () => {
  const allCategories = [
    'Decoration',
    'Ceiling',
    'Floor',
    'LED',
    'Furniture',
    'Lamps',
    'Decorative',
    'Lights',
    'Modern',
    'Retro',
    'Wood',
  ];

  // const [categoryCounts, setCategoryCounts] = useState({});

  const { data, loading, activeuserid, activechat } = useContext(VeeContext);



  
  return (
    <>
        <Header/>
        <Pagebadge title={'home/product'}/>

        <br />

        <div className="containers">
        <div className="productflex">
        <div className="productcategory">
  <div className="catcontents">
<div className="cattitle">
Categories
</div>
{loading && (
     <div className="loadingovls">
     <div className="simple-spinner">
       <span></span>
     </div>
        </div>
)}

<div className="categories">
  <div className="catvalues">
    Decoration <span>(0)</span>
  </div>
  <div className="catvalues">
    Ceiling <span>(4)</span>
  </div>
  <div className="catvalues">
    Floor <span>(3)</span>
  </div>
  <div className="catvalues">
    LED <span>(1)</span>
  </div>
  <div className="catvalues">
    Furniture <span>(0)</span>
  </div>
  <div className="catvalues">
    Lamps <span>(2)</span>
  </div>
  <div className="catvalues">
    Decorative <span>(0)</span>
  </div>
  <div className="catvalues">
    Lights <span>(2)</span>
  </div>
  <div className="catvalues">
    Modern <span>(2)</span>
  </div>
  <div className="catvalues">
    Retro <span>(0)</span>
  </div>
  <div className="catvalues">
    Wood <span>(0)</span>
  </div>


</div>


  </div>
  </div>
            <div className="productgrid">

            {loading && (
     <div className="loadingovls">
     <div className="simple-spinner">
       <span></span>
     </div>
        </div>
)}
            {loading && (
     <div className="loadingovls">
     <div className="simple-spinner">
       <span></span>
     </div>
        </div>
)}
            {loading && (
     <div className="loadingovls">
     <div className="simple-spinner">
       <span></span>
     </div>
        </div>
)}

            {data.slice().reverse().map(product => (
        <Productcard
          key={product.id}
          id={product.id}
          name={product.product_name}
          price={product.product_price}
          image={product.image_one}
          imagetwo={product.image_two}
        />
      ))}

            </div>

        </div>
        </div>

        <br />
      <br />
<Footer/>
        </>
  )
}

export default page