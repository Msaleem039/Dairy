'use client';

import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'

const FoodDisplay = ({category}) => {

    const store = useContext(StoreContext);
    if (!store) return null;
    const {food_list} = store;

    // Ensure food_list is always an array
    const safeFoodList = Array.isArray(food_list) ? food_list : [];

  return (
    <div className='food-display' id='food-display'>
       <h3>Top Cheese near you</h3>
       <div className="food-display-list">
        {safeFoodList.length === 0 ? (
          <p>No items available at the moment.</p>
        ) : (
          safeFoodList.map((item,index)=>{
            if(category==="All" || category===item.category){
              return <FoodItem key={index} id={item._id } name={item.name} description={item.description} price={item.price} image={item.image}/>
            }
            return null;
          })
        )}
       </div>
    </div>
  )
}

export default FoodDisplay
