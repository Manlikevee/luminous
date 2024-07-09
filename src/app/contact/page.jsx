'use client'
import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { PaystackButton } from 'react-paystack'
import CurrencyFormatter from '@/components/CurrencyFormatter';
import { toast } from 'sonner';
import { database } from '@/components/firebaseConfig';
import { ref, push, set } from 'firebase/database';
const page = () => {
  const router = useRouter();
  // Initialize state variables for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'Nigeria', // Default country
    streetAddress: '',
    townCity: '',
    state: '',
    phone: '',
  });

  const [cartItems, setCartItems] = useState([]);


  
  useEffect(() => {
    // Initialize cartItems from localStorage on component mount
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if(!storedCartItems.length >= 1){
      toast.error(`No Items In Cart`);
      router.replace(`/products`);
    }
    setCartItems(storedCartItems);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
  };
  const publicKey = 'pk_test_5cff1482a437c3feb9114d509f327eda9366d37e';
  const componentProps = {
   
    email: formData.email,
    amount : calculateSubtotal() * 100,
    metadata: {
      'Payment For': 'Luminous Store',
      'Contact Email': 'odahviktor@gmail.com',
    },
    publicKey,
    text: `Pay N${calculateSubtotal()}`,
    onSuccess: ({ reference }) => {
      // alert(`Your purchase was successful! Transaction reference: ${reference}`),
      paymenthandleSubmit(reference)
    
    },
    onClose: () => alert("Wait! You need this, don't go!!!!"),
  }

  const paymenthandleSubmit = async (reference) => {
    const newChildRef = push(ref(database, 'cartitems'));
    const newId = newChildRef.key;
    await set(newChildRef, {
      ordernumber: newId,
      amount: calculateSubtotal(),
      products: cartItems,
      email: formData.email,
      paymentref: reference
    });

    localStorage.removeItem('cartItems')
    toast.success(`Your purchase was successful!, Thank you`);
    router.replace(`/orderSucccessful/${newId}`);
  }

  // Function to load saved form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  // Function to handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save form data to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
    // Replace with actual submission logic
    console.log(formData);
  };


  return (
    <div>
        <Header/>
        <div className="containers">
        <div>
            <br />
            <br />
      <h2 className='colorhrading'>Send us a message</h2>
<br />

<div className="cflx">
<div className="creationform">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"

            required
          />
        </div>
  
        <div>
          <label htmlFor="companyName">Email </label>
          <input
            type="email"
            id="companyName"
            name="email"

            required
          />
        </div>

        <div>
          <label htmlFor="phone">Message *</label>
<textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <button type="submit" className='herobtn'>Submit </button>
     
        
   
     
     
      </form>
      </div>

      <div className="paymentgateway">
<h2>Socials</h2>
<br />
<div className='flx'>
        <svg width={39} height={39} viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35.5501 19.4948C35.5501 10.5746 28.3105 3.33502 19.3903 3.33502C10.4701 3.33502 3.23047 10.5746 3.23047 19.4948C3.23047 27.3162 8.78944 33.8286 16.1583 35.3314V24.3428H12.9263V19.4948H16.1583V15.4549C16.1583 12.336 18.6954 9.79894 21.8142 9.79894H25.8542V14.6469H22.6222C21.7334 14.6469 21.0062 15.3741 21.0062 16.2629V19.4948H25.8542V24.3428H21.0062V35.5738C29.1669 34.7658 35.5501 27.8817 35.5501 19.4948Z" fill="black" />
        </svg>
        <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36.9 10.2354C35.6557 10.801 34.3145 11.1726 32.9247 11.3504C34.3468 10.4939 35.4457 9.13651 35.9628 7.50437C34.6215 8.31236 33.1348 8.87795 31.5673 9.20115C30.2907 7.81141 28.4969 7.00342 26.4608 7.00342C22.6633 7.00342 19.5606 10.1061 19.5606 13.936C19.5606 14.4854 19.6252 15.0187 19.7383 15.5196C13.9855 15.2288 8.8628 12.4654 5.45308 8.28004C4.85517 9.29811 4.51581 10.4939 4.51581 11.7544C4.51581 14.1622 5.7278 16.2953 7.60233 17.5073C6.45499 17.5073 5.38844 17.1841 4.45117 16.6993V16.7478C4.45117 20.109 6.84282 22.9208 10.0101 23.551C8.99343 23.8305 7.92559 23.8692 6.8913 23.6642C7.33021 25.0418 8.1898 26.2472 9.34923 27.1109C10.5087 27.9747 11.9096 28.4534 13.3552 28.4798C10.9049 30.4198 7.86737 31.4684 4.74205 31.4532C4.19262 31.4532 3.64318 31.4209 3.09375 31.3562C6.16411 33.3277 9.81622 34.4751 13.7269 34.4751C26.4608 34.4751 33.458 23.9066 33.458 14.744C33.458 14.4369 33.458 14.146 33.4418 13.839C34.7993 12.8694 35.9628 11.6413 36.9 10.2354Z" fill="black" />
      </svg>
        <svg width={41} height={41} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.77734 20.2128C4.77734 12.7084 4.77734 8.95458 7.10842 6.6235C9.4395 4.29242 13.1917 4.29242 20.6977 4.29242C28.2021 4.29242 31.956 4.29242 34.287 6.6235C36.6181 8.95458 36.6181 12.7068 36.6181 20.2128C36.6181 27.7172 36.6181 31.471 34.287 33.8021C31.956 36.1332 28.2038 36.1332 20.6977 36.1332C13.1934 36.1332 9.4395 36.1332 7.10842 33.8021C4.77734 31.471 4.77734 27.7189 4.77734 20.2128Z" stroke="black" strokeWidth="2.51375" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M29.928 10.9958H29.9112M28.2387 20.2129C28.2387 22.2129 27.4442 24.1311 26.0299 25.5453C24.6157 26.9596 22.6975 27.7541 20.6975 27.7541C18.6974 27.7541 16.7793 26.9596 15.365 25.5453C13.9508 24.1311 13.1563 22.2129 13.1563 20.2129C13.1563 18.2128 13.9508 16.2947 15.365 14.8804C16.7793 13.4661 18.6974 12.6716 20.6975 12.6716C22.6975 12.6716 24.6157 13.4661 26.0299 14.8804C27.4442 16.2947 28.2387 18.2128 28.2387 20.2129Z" stroke="black" strokeWidth="2.51375" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
<br />
<b>Work Hours</b>
<p>Monday to Friday: 9-20
Saturday to Sunday: closed</p>
<p>

</p>
      </div>
</div>
   
  
    </div>
        </div>
        </div>
  )
}

export default page