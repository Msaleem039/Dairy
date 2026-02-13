'use client';

import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const store = useContext(StoreContext);
  if (!store) return null;
  const { cartItems, addToCart, removeFromCart } = store;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img 
          src={
            typeof image === 'string' 
              ? image 
              : (image?.src || image || '/upload_area.png')
          } 
          className="food-item-image" 
          alt={name}
        />

        {!cartItems[id] ? (    //changes made 
          <img
            className="add"
            src={assets.add_icon_white?.src || assets.add_icon_white}
            onClick={() => addToCart(id)}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red?.src || assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green?.src || assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <div className="star">
            <img src={assets.rating_starts?.src || assets.rating_starts} alt="Rating" /> 
          </div>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">Rs:{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
