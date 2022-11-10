import { useState } from "react";
import regExpList from "../../utils/regExp";
import Form  from '../../components/Form/Form';

const CartForm = () => {
      
    // inputs content
    const [inputs, setInputs] = useState([
        {
            label: "Nom",
            type: "text",
            id: "inputLastName",
            autocomplete: 'name',
            name: 'lastName',
            error : false,
            errorMessage: 'Le nom renseigné est incorrect ( exemple valide : Dupont).',
            className: ""
        },
        {
            label: 'Prénom',
            type: 'text',
            id: "inputFirstName",
            name: 'firstName',
            error : false,
            errorMessage : 'Le prénom renseigné est incorrect ( exemple valide : Paul).',
            className: ""
        },
        {
            label: 'Votre Adresse mail',
            type: 'email',
            id : 'inputEmail',
            autocomplete: 'email',
            name: 'email',
            error : false,
            errorMessage : 'L\'adresse mail renseignée est incorrect ( exemple valide : paul@gmail.com).',
            className: ""
        },
        {
            label: 'Adresse',
            type: 'text',
            id : 'inputAddress',
            name: 'address',
            error : false,
            errorMessage : 'Veuillez saisir une adresse valide.',
            className: ""
        },
        {
            label: 'Code Postal',
            type: 'text',
            id : 'inputPostalCode',
            name: 'postalCode',
            error : false,
            errorMessage : 'Veuillez saisir un code postal valide.',
            className: ""
        },
        {
            label: 'Ville',
            type: 'text',
            id : 'inputCity',
            name: 'city',
            error : false,
            errorMessage : 'Veuillez sasir une ville valide.',
            className: ""
        }
    ])

    const initialValues = {
        lastName: '',
        firstName : '',
        email : '',
        address: '',
        postalCode : '',
        city : ''
    }


    // error Statement
    const [isError, setIsError] = useState(false);

    // Select the right input and add the corresponding error
    function addError (inputName){
        setIsError(true);
            const newInputs = inputs.map( obj => {
                if (obj.name === inputName){
                    return { ...obj, error: true, className:"inputInvalid"}
                }
                return obj
            })
            setInputs(newInputs) 
    }

    // Select the right input and remove the error
    function rmError(inputName){
        setIsError(false);
        const newInputs = inputs.map( obj => {
            if (obj.name === inputName){
                return { ...obj, error: false , className:"inputValid"}
            }
            return obj
        })
        setInputs(newInputs)
    }

    // check inputs validity 
    const checkValidity = (e) => {
        const value = e.target.value
        switch (e.target.name) {
            case "lastName":
                !regExpList.lastName.test(value) ? addError('lastName') : rmError('lastName');
                break;
            case "firstName":
                !regExpList.firstName.test(value) ? addError('firstName') : rmError('firstName');
                break;
            case "email":
                !regExpList.email.test(value) ? addError('email') : rmError('email');
                break;
            case "address":
                !regExpList.address.test(value) ? addError('adress') : rmError('adress');
                break;
            case "postalCode":
                !regExpList.postalCode.test(value) ? addError('postalCode') : rmError('postalCode');
                break;
            case "city":
                !regExpList.city.test(value) ? addError('city') : rmError('city');
            break
            default:
                break;
        }
    }

    // submited form message
    const [message, setMessage ] = useState('');

    // submited action
    const submit = () => {
        if (isError){
            alert("DIDNT WORK")
            return
        }
        setMessage("Votre message a bien été enregistré")
    }


    return (
        <main id='cart'>
                <Form 
                submit={submit}
                initialValues={initialValues}
                id={"cart-form"} 
                legend={"Informations personnelles"}
                buttonValue={"Envoyer"}
                inputs={inputs}
                checkValidity={checkValidity}
                isError={isError}
                />
        </main>
    );
}

export default CartForm;
