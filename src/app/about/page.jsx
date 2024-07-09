import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header  />
      <Hero titletext='About Us' subtitletext='Welcome to Luminous – where innovation meets creativity. At Luminous, we are dedicated to illuminating your digital world with cutting-edge solutions and visionary design. Our team of passionate experts brings together a wealth of experience in technology, design, and user experience to craft products that not only meet your needs but exceed your expectations.'/>
<Footer/>
    </div>
  )
}

export default page