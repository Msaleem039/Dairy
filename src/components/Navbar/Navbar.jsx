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

  const store = useContext(StoreContext);
  if (!store) return null;
  const {getTotalCartAmount, token, setToken, cartItems} = store;

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
            <Link href='/products' onClick={()=> handleMenuClick('menu')} className={menu === 'menu'?'active':''}>Products</Link>
            <Link href='/about' onClick={()=> handleMenuClick('mobile-app')} className={menu === 'mobile-app'?'active':''}>About Us</Link>
            <Link href='/contact' onClick={()=> handleMenuClick('contact-us')} className={menu === 'contact-us'?'active':''}>Contact Us</Link>
        </ul>
        <div className="navbar-right">
            <div className="navbar-search-icon">
                <Link href='/cart'>
                  <img 
                    src={
                      typeof assets.basket_icon === 'string' 
                        ? assets.basket_icon 
                        : (assets.basket_icon?.src || assets.basket_icon || '/basket_icon.png')
                    } 
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