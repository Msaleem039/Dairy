'use client';

import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Choose from our premium shredded cheese packages - Half KG, 1KG, or 2KG. Fresh quality guaranteed!</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                const imageSrc = typeof item.menu_image === 'string' 
                    ? item.menu_image 
                    : (item.menu_image?.src || item.menu_image || '/upload_area.png');
                return (
                    <div 
                        onClick={()=>setCategory(prev=> prev === item.menu_name ? 'All' : item.menu_name)} 
                        key={index} 
                        className="explore-menu-list-item"
                    >
                        <img 
                            className={category===item.menu_name?'active':''} 
                            src={imageSrc} 
                            alt={item.menu_name}
                            onError={(e) => {
                                console.error('Image failed to load:', imageSrc);
                                e.target.style.display = 'none';
                            }}
                        />
                        <p className='text'>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu