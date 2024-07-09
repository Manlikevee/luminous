import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Hero = () => {
  return (
    <div className='herosec'>

        <div className="containers">
<div className="sideone">
    <div className="herotitle">
     Radiant Living
    </div>
    <div className="herobody">
    Transform Your Home with Unique Designer Lamps That Blend Style Functionality, and Exceptional Craftsmanship.
    </div>

    <Link href={'/products'} className="herobtn">
    View more  <span className="material-symbols-outlined">
chevron_right
</span>
    </Link>
</div>
<div className="sidetwo">
<Image
      src="/heroimg.png"
      width={500}
      height={450}
      alt="Picture of the author"
    />
</div>
        </div>
    </div>
  )
}

export default Hero