'use client'
import Header from '@/components/Header'
import Pagebadge from '@/components/Pagebadge'
import Productcard from '@/components/Productcard'
import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    const dbRef = ref(database, '/products');
    onValue(dbRef, (snapshot) => {
      const fetchedData = snapshot.val();
      const dataWithKeys = Object.keys(fetchedData).map(key => ({
        object_key: key,
        ...fetchedData[key]
      }));
      setLoading(false)
      setData(dataWithKeys);

      const counts = dataWithKeys.reduce((acc, product) => {
        const category = product.product_category;
        if (category) {
          acc[category] = (acc[category] || 0) + 1;
        }
        return acc;
      }, {});

      const allCategoryCounts = allCategories.reduce((acc, category) => {
        acc[category] = counts[category] || 0;
        return acc;
      }, {});

      setCategoryCounts(allCategoryCounts);
    });
  }, []);

  
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
{Object.entries(categoryCounts).map(([category, count]) => (
          <div className="catvalues" key={category}>
            {category} <span>({count})</span>
          </div>
        ))}
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