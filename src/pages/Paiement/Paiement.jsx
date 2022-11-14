import React from 'react'
import CreditCardBack from './CreditCardBack'
import CreditCardFront from './CreditCardFront'

const Paiement = () => {
  return (
    <main className='paiement'>
        <div className='paiement-leftContainer'>
        <CreditCardFront/>
        <CreditCardBack/>
        </div>
        <div className='paiement-rightContainer'></div>
    </main>
  )
}

export default Paiement