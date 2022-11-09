import React from 'react';
import { urlFor } from "../../lib/client";
import { Link } from 'react-router-dom'

const ProductCard = ({ id, title, price, qty, image }) => {
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
            // onClick={() => onRemove(item.id)}
          >
            <i className='fa-solid fa-circle-xmark'></i>
        </button>
      </div>
    </div>
  )
}

export default ProductCard