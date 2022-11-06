import React from 'react';
import ReactDOM from 'react-dom';
import { useStateContext } from '../../../context/stateContext';
import { urlFor } from '../../../lib/client';

const AddToCartModal = ({open, onClose, successHandlter, productName}) => {
  
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove, onAdd } = useStateContext();

  const displayPreviewCart = () => {
    if (cartItems.length >= 1 ){
      return cartItems.map(item => {
        return (
          <div className='cartPreview-item'key={item.id}>
          <img className='cartPreview-item_img' src={urlFor(item.image[0])}/>
            <h3>{item.title}</h3>
            <div className='cartPreview-item_Qty'>
              <p className='quantity-desc'>
                  <button className='minus' onClick= {() => toggleCartItemQuanitity(item._id, 'dec')}>-</button>
                  <span className='num' >{item.quantity}</span>
                  <button className='plus' onClick={() => toggleCartItemQuanitity(item._id, 'inc')}>+</button>
              </p>
            </div>
            <div className='cartPreview-item_Price'>
              <span>{item.price*item.quantity},00€</span>
            </div>
              <button className='cartPreview-item_Delete' onClick={() => onRemove(item)}><i className="fa-solid fa-circle-xmark"></i></button>
          </div>
        )
      })
    }
    else return <p>Votre panier est vide</p>
  }

  return ReactDOM.createPortal(
    <>
      <div className='overlay' onClick={onClose}></div>
      <div className='hero-modal'>
      {successHandlter 
      ? (<div className='addToCart-container addToCart-success'>
          <span><i class="fa-solid fa-circle-check"></i> La montre {productName} a été rajouté au panier.</span>
        </div>) 
        : (<div className='addToCart-container addToCart-failed'>
          <span><i class="fa-solid fa-circle-xmark"></i>Votre article n'a pas été rajouté au panier, veuillez réessayer.</span>
          </div>)
      }
      <div className="cartPreview">
        <h3>Votre panier : </h3>
        {displayPreviewCart()}
      </div>
      </div>
    </>,document.getElementById('modal-root')
  )
}

export default AddToCartModal