import React from 'react'

const OrderError = ({errorMessage}) => {
  return (
    <div className='order-fail'>
		<h2>
			Une erreur est survenue, veuillez repasser votre
			commande s'il vous plaît.
		</h2>
		<span className='order-fail_msg'>{errorMessage}</span>
	</div>
  )
}

export default OrderError