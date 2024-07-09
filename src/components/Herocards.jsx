import Link from 'next/link'
import React from 'react'

const Herocards = ({toptext, bottomtext }) => {
  return (
    <div className='heroblock'>
        <div className="sideone"></div>
        <div className="sidetwo">
            <div className="cardcontent">
            <div className="htoptxt">
    {toptext}
</div>

<div className="hbtmtxt">
    {bottomtext}
</div>

<Link href={'/products'} className="herobtn">
    View more  <span className="material-symbols-outlined">
chevron_right
</span>
    </Link>
            </div>


        </div>
        
        </div>
  )
}

export default Herocards