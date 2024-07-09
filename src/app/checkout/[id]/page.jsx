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
      <h2 className='colorhrading'>Billing deatails</h2>
<br />

<div className="cflx">
<div className="creationform">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="companyName">Email </label>
          <input
            type="email"
            id="companyName"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country / Region *</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            disabled // Assuming Nigeria is fixed and cannot be changed
          />
        </div>
        <div>
          <label htmlFor="streetAddress">Street Address *</label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="townCity">Town / City *</label>
          <input
            type="text"
            id="townCity"
            name="townCity"
            value={formData.townCity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="state">State *</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
{ formData.firstName && formData.lastName && formData.email && formData.phone && formData.state
&& formData.streetAddress && formData.townCity ? (   <PaystackButton className="herobtn" {...componentProps} />) :
(     <button type="submit" className='herobtn'>Pay      <CurrencyFormatter amount={calculateSubtotal()|| 0} /></button>)

}
     
        
   
     
     
      </form>
      </div>

      <div className="paymentgateway">
<h2>Payment Provider</h2>
<button className='herobtn'>
<Image 
      src="/paystack.svg"
      width={10}
      height={10}
      alt="Picture of the author"
    />
    Paystack Payment
</button>
      </div>
</div>
   
  
    </div>
        </div>
        </div>
  )
}

export default page