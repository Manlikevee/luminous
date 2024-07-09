import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Herocards from '@/components/Herocards'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <div className='heroblocks'>
        <Herocards toptext={'Product of  The Week'} bottomtext={'Introducing our Lamp of the Week, a perfect blend of style and functionality. This stunning lamp is designed to enhance the ambiance of any room while providing exceptional lighting.'}/>
        <Herocards toptext={'Our Lamps Stand Out'} bottomtext={'At our store, we pride ourselves on delivering top-notch quality and exceptional craftsmanship in every product.'}/>
        <Herocards toptext={'Affordable Luxury'} bottomtext={"we believe that exceptional design and quality shouldn't come with a hefty price tag. Our mission is to provide you with beautifully crafted lamps that are both stylish and affordable, making it easier for you to illuminate your home without breaking the bank."}/>
        <Herocards toptext={'50% Off'} bottomtext={'We love rewarding our customers with fantastic deals and discounts, making it even easier to bring home the perfect lamp.'}/>
      </div>
    </div>
  )
}

export default page