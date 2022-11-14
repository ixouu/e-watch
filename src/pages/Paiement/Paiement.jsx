import React, { useState } from 'react'
import CreditCardBack from './CreditCardBack'
import CreditCardForm from './CreditCardForm'
import CreditCardFront from './CreditCardFront'

const Paiement = () => {
    document.title='E-watch | Paiement';
    // state to manage provided informations form the from
    const [ paiementInformations, setPaiementInformations]= useState({
        creditCardNumber : "000 000 0000",
        creditCardName: 'John Doe',
        creditCardExpirationMonth: 0,
        creditCardExpriationYear : 0,
        creditCardCvc : 0
    });
    // state form form input
    const [inputs, setInputs] = useState([
        {
            title : 'Nom sur la carte',
            type: 'text',
            id: 'creditCardName',
            error: false,
            errorMessage: 'Le nom renseigné n\'est pas un nom valide',
            className:'creditCardName',
            placeholder : 'ex : John Doe'
        },
        {
            title : 'Numéro de carte',
            type: 'text',
            id: 'creditCardNumber',
            error: false,
            errorMessage : 'Le numéro de carte renseigné n\'est pas un numéro valide',
            className : 'crediCardNumber',
            placeholder : 'ex : 1234 5678 09123 0000'
        },
    ])
    const [expirationInputs, setExpirationInputs] = useState([
        {
            title : 'month',
            type: 'number',
            id: 'creditCardExpirationMonth',
            error: false,
            errorMessage: 'Le mois renseigné n\'est pas valide ',
            className:'creditCardExpirationMonth',
            placeholder: 'MM'

        },
        {
            title : 'year',
            type: 'number',
            id: 'creditCardExpriationYear',
            error: false,
            errorMessage : 'L\'année renseigné n\'est pas valide ',
            className : 'creditCardExpriationYear',
            placeholder : 'YY'
        },
    ])

    const [cvcInput, setCvcInput] = useState({
        title : 'CVC',
        type: 'text',
        id: 'creditCardCvc',
        error: false,
        errorMessage: 'Le code renseigné n\'est pas un nom valide',
        className:'creditCardCvc',
        placeholder: 'ex: 123'
    })

    // Manage input changes
    const handleChange = (e) =>{
        const { id, value } = e.target;
        // update paiementInformations state
        const updatedForm = {
			...paiementInformations,
			[id] : value,
		};
		setPaiementInformations(updatedForm);
    }

  return (
    <main className='paiement'>
        <div className='paiement-leftContainer'>
        <CreditCardFront paiementInformations={paiementInformations}/>
        <CreditCardBack paiementInformations={paiementInformations}/>
        </div>
        <div className='paiement-rightContainer'>
            <CreditCardForm cvcInput={cvcInput} expirationInputs={expirationInputs} inputs={inputs} handleChange={handleChange}/>
        </div>
    </main>
  )
}

export default Paiement