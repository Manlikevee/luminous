'use client'
import Header from '@/components/Header';
import React, { useEffect, useState} from 'react';
import Image from 'next/image'
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { ref, onValue } from 'firebase/database';
import { database } from '@/components/firebaseConfig';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
const page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const dbRef = ref(database, `/cartitems/${id}`);
    onValue(dbRef, (snapshot) => {
      const fetchedData = snapshot.val();
      console.log(fetchedData)
      if(!fetchedData){
        router.push('/');
        toast.message('An Error Occured', {
          description: 'Order does not Exist',
        })
      }

      setData(fetchedData);
      setLoading(false)
    });
  }, [id]);

  return (
    <div>
        <Header/>
        <div className="containers">




  <div className="successfulbar">

  {loading && (
     <div className="loadingovls">
     <div className="simple-spinner">
       <span></span>
     </div>
        </div>
)}

  {!loading && data && (
  <div className="successcontent">
<div className="successflex">
<svg width={51} height={51} viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25.5" cy="25.5" r="25.5" fill="#77C171" />
        <path d="M21.8757 30.5387L16.8369 25.4999L15.1211 27.2037L21.8757 33.9583L36.3757 19.4583L34.6719 17.7545L21.8757 30.5387Z" fill="white" />
      </svg>
      <div className="successcontents">
      <h3>Thank you for your payment!</h3>
    <p className='paymentreceived'>Luminous has recieved your payment</p>

    <div className="paymentdetails">
   <div className="pdiv">
  <div className="div">
  Payment Scucess
  </div>
  <span>{data?.amount}</span>
   </div>
   <div className="pdiv">
  <div className="div">
  Order processing time: 
  </div>
  <span className='delivery'>2 days</span>
   </div>
   <div className="pdiv">
  <div className="div">
  Order Number: 
  </div>
  <span>#{data?.ordernumber}</span>
   </div>
<div className="note">
Luminous will review all orders. If a problem is found during verification, we will notify you via email.
</div>
    </div>
      </div>
</div>
   
  </div>
  )}
</div>


        </div>
        <br />
      <br />
<Footer/>
        </div>
  )
}

export default page