'use client';

import React, { useState, useEffect } from 'react'
import './Header.css'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Order Premium Shredded Cheese from Dairy Delight",
      description: "Fresh, high-quality shredded cheese available in half kg, 1KG, and 2KG packages. Delivered fresh to your doorstep in Mugalpura, Lahore.",
    },
    {
      title: "100% Pure Cheese Goodness",
      description: "Experience the finest quality shredded cheese. Premium ingredients, fresh packaging, and guaranteed satisfaction.",
    },
    {
      title: "Fast Delivery in Lahore",
      description: "Quick and reliable delivery service. Order now and get your favorite cheese delivered to Mugalpura, Lahore.",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='header'>
        <div className="header-contents">
            <div className="header-slide-container">
              {slides.map((slide, index) => (
                <div 
                  key={index} 
                  className={`header-slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
              ))}
            </div>
            <button onClick={scrollToMenu}>View Menu</button>
            <div className="header-slide-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
        </div>
    </div>
  )
}

export default Header