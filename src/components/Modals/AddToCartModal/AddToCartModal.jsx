import React from 'react';
import ReactDOM from 'react-dom';

const AddToCartModal = ({open, onClose}) => {
  return ReactDOM.createPortal(
    <div>AddToCartModal</div>,
    document.getElementById('modal-root')
  )
}

export default AddToCartModal