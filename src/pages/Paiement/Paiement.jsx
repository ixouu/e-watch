import React, { useState } from 'react'
import CreditCardBack from './CreditCardBack'
import CreditCardForm from './CreditCardForm'
import CreditCardFront from './CreditCardFront'
import { useStateContext  } from '../../context/stateContext';
import Error from '../Error/Error'

const Paiement = () => {
    document.title='E-watch | Paiement';

    // import cartList
    const { cartItems, userInformations} = useStateContext();
    // From the actual date, return an array with the next 10 years
    const generateYears = () => {
        let years = [];
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i<currentYear+8; i++){
            years.push(i)
        } 
        return years;
    }

    // function who verifies if all informations needed are provided
    const  verifiesUserInformations = () => {
        let result = true;
        if(userInformations.lastName === undefined || userInformations.firstName  === undefined || userInformations.email  === undefined || userInformations.address  === undefined || userInformations.postalCode  === undefined || userInformations.city  === undefined ){
            result = !result
        }
        return result
    }
    
    // state to manage provided informations form the from
    const [ paiementInformations, setPaiementInformations]= useState({
        creditCardNumber : "123 567 0000",
        creditCardName: 'John Doe',
        creditCardExpirationMonth: "01",
        creditCardExpriationYear : new Date().getFullYear(),
        creditCardCvc : "000"
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
            placeholder : 'ex : John Doe',
            autocomplete: true,
            autocapitalize: 'on'
        },
        {
            title : 'Numéro de carte',
            type: 'text',
            id: 'creditCardNumber',
            error: false,
            errorMessage : 'Le numéro de carte renseigné n\'est pas un numéro valide',
            className : 'crediCardNumber',
            placeholder : 'ex : 123 567 0000',
            maxLength: 10,
            autocomplete: true,
            pattern:"[0-9]{10}"
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
            autocomplete: true,
            options: ["01","02","03","04","05","06","07","08","09","10","11","12"]
        },
        {
            title : 'year',
            type: 'number',
            id: 'creditCardExpriationYear',
            error: false,
            errorMessage : 'L\'année renseigné n\'est pas valide ',
            className : 'creditCardExpriationYear',
            autocomplete: true,
            options: generateYears()
        },
    ])

    const [cvcInput, setCvcInput] = useState({
        title : 'CVC',
        type: 'text',
        id: 'creditCardCvc',
        error: false,
        errorMessage: 'Le code renseigné n\'est pas un nom valide',
        className:'creditCardCvc',
        placeholder: 'ex: 123',
        maxLength: 3,
        autocomplete: true,
        pattern:"[0-9]{3}",
        inputmode:"numeric"
    })


    // Format card Number
    const formatedNumber = (value) => {
        const arrNumb = [];
        arrNumb.push(value.slice(0,3), value.slice(3,6), value.slice(6,10));
        return arrNumb.join(" ")
    }

    // Manage input changes
    const handleChange = (e) =>{
        const { id, value } = e.target;
        // format card Number 
        if (id ==="creditCardNumber"){
            const updatedForm = {
                ...paiementInformations,
                creditCardNumber : formatedNumber(value),
            };
            setPaiementInformations(updatedForm);
        }else {
        // update paiementInformations state
        const updatedForm = {
			...paiementInformations,
			[id] : value,
		};
		setPaiementInformations(updatedForm);
        }
    }

  return (
    <main className='paiement'>
        {cartItems.length === 0 ? <Error/> : (
            <>
                <div className='paiement-leftContainer'>
            <CreditCardFront paiementInformations={paiementInformations}/>
            <CreditCardBack paiementInformations={paiementInformations}/>
            </div>
            <div className='paiement-rightContainer'>
                <CreditCardForm cvcInput={cvcInput} expirationInputs={expirationInputs} inputs={inputs} handleChange={handleChange}/>
            </div>
        </>
        )}
       
    </main>
  )
}

export default Paiement

// || !verifiesUserInformations() 