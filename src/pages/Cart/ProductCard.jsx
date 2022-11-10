import React from 'react';
import { urlFor } from "../../lib/client";
import { useStateContext } from '../../context/stateContext';

const ProductCard = ({ id, title, price, qty, image }) => {

  const { onRemove } = useStateContext();
  return (
    <div className='cartProduct-card'>
      <div className="cartProduct-card_imgContainer">
        <img src={urlFor(image)} alt='preview'className='cartProduct-card_img'></img>
      </div>
      <div className='cartProduct-details'>
        <h3>{title}</h3>
        <p>Quantité : {qty}</p>
        <p>{price},00€</p>
      </div>
      <div className="cartProduct-right">
        <button
            className='cartProduct-delete'
            onClick={() => onRemove(id)}
          >
            <i className='fa-solid fa-circle-xmark'></i>
        </button>
      </div>
    </div>
  )
}

export default ProductCard