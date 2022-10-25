import React from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../../lib/client'

function Index({ image, title, price, brand, slug }) {
  return (
    <article className='product-card'>
    <Link to={`/product/${slug}`}>
        <img 
        src={urlFor(image[0])}
        alt={`Montre ${title}`}
        className='product-card_img'
        width={300}
        ></img>
        <h4>{brand}</h4>
        <h3>{title}</h3>
        <span> {price},00 €</span>
    </Link>
    </article>
  )
}

export default Index