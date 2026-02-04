'use client';

import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from './../../assets/assets';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { StoreContext } from './../context/StoreContext';

const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {getTotalCartAmount, token, setToken, cartItems} = useContext(StoreContext);

  const router = useRouter();

  const getCartItemCount = () => {
    return Object.values(cartItems || {}).reduce((sum, count) => sum + (count > 0 ? count : 0), 0);
  }

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setMobileMenuOpen(false);
  }

  return (
    <div className='navbar'>
       <Link href='/' onClick={() => handleMenuClick('home')}> 
         <img 
           src={"/logo.png"} 
           alt="Dairy Delight" 
           className='logo' 
         />
       </Link>
        <ul className={`navbar-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <Link href='/' onClick={()=> handleMenuClick('home')} className={menu === 'home'?'active':''}>Dairy Delight</Link>
            <a href='#explore-menu' onClick={()=> handleMenuClick('menu')} className={menu === 'menu'?'active':''}>Products</a>
            <a href='#app-download' onClick={()=> handleMenuClick('mobile-app')} className={menu === 'mobile-app'?'active':''}>About Us</a>
            <a href='#footer' onClick={()=> handleMenuClick('contact-us')} className={menu === 'contact-us'?'active':''}>Contact Us</a>
        </ul>
        <div className="navbar-right">
            <div className="navbar-search-icon">
                <Link href='/cart'>
                  <img 
                    src={assets.basket_icon?.src || assets.basket_icon} 
                    alt="Cart" 
                  />
                  {getCartItemCount() > 0 && (
                    <span className="cart-count-badge">
                      {getCartItemCount()}
                    </span>
                  )}
                </Link>
            </div>
            {!token || token === "" ? (
              <button onClick={()=> setShowLogin(true)}>sign in</button>
            ) : (
              <div className='navbar-profile'>
                <button 
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken("");
                    router.push("/");
                    setMobileMenuOpen(false);
                  }}
                  className="logout-btn"
                >
                  Logout
                </button>
              </div>
            )}
            <div className="hamburger-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className={mobileMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
              <span className={mobileMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
              <span className={mobileMenuOpen ? 'hamburger-line open' : 'hamburger-line'}></span>
            </div>
        </div>
    </div>
  )
}

export default Navbar