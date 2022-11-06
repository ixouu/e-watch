import React from 'react';
import ReactDOM from 'react-dom';

const AddToCartModal = ({open, onClose, successHandlter, productName}) => {
  console.log(successHandlter)
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
      </div>
      </div>
    </>,document.getElementById('modal-root')
  )
}

export default AddToCartModal