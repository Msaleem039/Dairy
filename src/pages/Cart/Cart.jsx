'use client';

import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../components/context/StoreContext'
import { useRouter } from 'next/navigation';
import { getImageUrl } from '../../utils/apiConfig';

const Cart = () => {

  const store = useContext(StoreContext);
  if (!store) return null;
  const {cartItems, food_list, removeFromCart, getTotalCartAmount } = store;

  const router = useRouter();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Itmes</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return <div key={item._id || index}>
              <div className="cart-items-title cart-items-item">
              <img src={getImageUrl(item.image)} alt={item.name || ''} onError={(e) => { e.target.src = '/upload_area.png'; }} />
              <p>{item.name}</p>
              <p>Rs{item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>Rs{item.price*cartItems[item._id]}</p>
              <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
            </div>
            <hr />
            </div>

            
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>Rs{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>Rs{getTotalCartAmount()===0?0:200}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>Rs{getTotalCartAmount()===0?0:getTotalCartAmount()+200}</b>
            </div> 
          </div>
        <button
  type="button"
  onClick={() => {
    if (getTotalCartAmount() > 0) {
      router.push('/order');   // ✅ CORRECT
    } else {
      alert('Your cart is empty. Please add items to proceed.');
    }
  }}
  disabled={getTotalCartAmount() === 0}
  className="opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
>
  PROCEED TO CHECKOUT
</button>

        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Promo Code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart