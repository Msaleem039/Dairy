'use client';

import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { StoreContext } from './../../components/context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const searchParams = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const store = useContext(StoreContext);
    if (!store) return null;
    const {url} = store;
    const router = useRouter();

    useEffect(()=>{
        const verifyPayment = async () =>{
            const response = await axios.post(url+"/api/order/verify",{success, orderId});
            if(response.data.success){
                router.push('/myorders');
            }
            else{
                router.push('/')
            }
        }
        if(success && orderId){
            verifyPayment();
        }
    },[success, orderId, url, router])
   
  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify