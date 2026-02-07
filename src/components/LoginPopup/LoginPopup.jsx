'use client';

import React, {  useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from './../context/StoreContext';
import axios from 'axios'
import { useRouter } from 'next/navigation'

const LoginPopup = ({setShowLogin}) => {

    const store = useContext(StoreContext);
    if (!store) return null;
    const {url, setToken} = store;
    const router = useRouter();

    const [data, setData] = useState({
        email:"",
        password:""
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name
        const value = event.target.value 
        setData(data=>({...data,[name]:value}))
    }

   const onLogin = async (event) =>{
        event.preventDefault()
        const newUrl = url + "/api/user/login"

        const response = await axios.post(newUrl,data);

        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token)
            setShowLogin(false);

            // Admin redirect: prefer backend-provided flags, fallback to email heuristic
            const isAdmin =
              response.data?.role === 'admin' ||
              response.data?.isAdmin === true ||
              response.data?.user?.role === 'admin' ||
              response.data?.user?.isAdmin === true ||
              String(data.email || '').toLowerCase().includes('admin');

            if (isAdmin) localStorage.setItem('isAdmin', 'true');
            else localStorage.removeItem('isAdmin');

            if (isAdmin) router.push('/admin');
        }else{
            alert(response.data.message);
        }
   }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <div>
                  <h2>Login</h2>
                  <p className="login-popup-subtitle">
                    Sign in to manage your Dairy Delight orders
                  </p>
                </div>
                <button 
                    type="button"
                    onClick={()=>setShowLogin(false)} 
                    className="login-popup-close-btn"
                    aria-label="Close"
                >
                    <img 
                        src={assets.cross_icon?.src || assets.cross_icon} 
                        alt="Close" 
                    />
                </button>
            </div>
            <div className="login-popup-inputs">
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>

            <button type='submit'>Login</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
        </form>
    </div>
  )
}

export default LoginPopup