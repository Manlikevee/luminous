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