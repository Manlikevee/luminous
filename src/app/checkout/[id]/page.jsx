'use client'
import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
const page = () => {
  // Initialize state variables for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Nigeria', // Default country
    streetAddress: '',
    townCity: '',
    state: '',
    phone: '',
  });

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
          <label htmlFor="companyName">Company Name (optional)</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
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

        <button type="submit" className='herobtn'>Submit</button>
      </form>
      </div>

      <div className="paymentgateway">

<button>
<Image
      src="/paystack.svg"
      width={500}
      height={450}
      alt="Picture of the author"
    />
</button>
      </div>
</div>
   
  
    </div>
        </div>
        page</div>
  )
}

export default page