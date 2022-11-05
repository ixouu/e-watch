import React from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../../lib/client';


function Index({ image, title, price, brand, slug, availableStock, product}) {

  const displayStock = () => {
    if (availableStock > 10){
      return <p className='largeStock'><i className="fa-solid fa-check"></i>En stock</p>
    }
    if (availableStock < 10 && availableStock > 1){
      return <p className='shortStock'><i className="fa-solid fa-check"></i>Stock faible</p>
    }
    if (availableStock === 0){
      return <p className='noStock'><i className="fa-solid fa-xmark"></i> Ruputure de stock</p>
    }
  }

  return (
    <article className='product-card'>
    <Link to={`/product/${slug}`}>
        <img 
        src={urlFor(image[0])}
        alt={`Montre ${title}`}
        className='product-card_img'
        height={300}
        ></img>
        <h3>{brand}</h3>
        <h4>{title}</h4>
        <div  className='product-card_price'>
          <span> {price}</span>
          <span className='product-card_priceDecimal'>,00 </span>
          €
        </div>
        <div className="product-card_stock">
          {displayStock()}
        </div>
    </Link>
    </article>
  )
}

export default Index