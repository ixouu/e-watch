import Form from "./Form";
import { useState } from "react";
import  regExpList  from '../../utils/regExp'

const Contact = () => {
    
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
        }
    ])

    // textArea Content
    const [textArea, setTextArea] = useState([
        {
            label : 'Votre message',
            type: 'textarea',
            id : 'inputMessage',
            name: 'content',
            error : false,
            errorMessage :'Le contenu de votre message doit contenir au minimum 30 caracteres et 500 au maximum.',
            className: ""
        }
    ])

    // Initial values to save
    const initialValues = {
        lastName: '',
        firstName : '',
        email : '',
        content :''
    }

    // error Statement
    const [isError, setIsError] = useState(false);

    // Select the right input and add the corresponding error
    function addError (inputName){
            setIsError(true);
            if(inputName === "content"){
                const newTextArea = textArea.map( obj => {
                    if (obj.name === inputName){
                        return { ...obj, error: true, className:"inputInvalid"}
                    }
                    return obj
                })
                setTextArea(newTextArea) 
            } else {
                const newInputs = inputs.map( obj => {
                    if (obj.name === inputName){
                        return { ...obj, error: true, className:"inputInvalid"}
                    }
                    return obj
                })
                setInputs(newInputs) 
            } 
    }

    // Select the right input and remove the error
    function rmError(inputName){
        setIsError(false);
        if(inputName === "content"){
            const newTextArea = textArea.map( obj => {
                if (obj.name === inputName){
                    return { ...obj, error: false, className:"inputValid"}
                }
                return obj
            })
            setTextArea(newTextArea) 
        }else {
            const newInputs = inputs.map( obj => {
                if (obj.name === inputName){
                    return { ...obj, error: false , className:"inputValid"}
                }
                return obj
            })
            setInputs(newInputs)
        } 
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
            case "content":
                if (value.length < 30 || value.length > 500 ){
                    addError('content')
                }else {
                    rmError('content')
                }
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
        <main id='contact'>
            <div className='contact-container'>
                <div className='contact-container_left'></div>
                <div className='contact-container_right'>
                    <h1>Notre adresse</h1>
                    <span>E-Watch France</span>
                    <span>1 quai Branly</span>
                    <span>75017 Paris</span>
                    <span>01.20.23.12.54</span>
                </div>
                <div className='contact-container_middle'>
                    <h2>Service client</h2>
                    <a href="mailto:contact@ewatch.com">contact@ewatch.com</a>
                    <h2>Serice après-ventes</h2>
                    <a href="mailto:sav@ewatch.com">sav@ewatch.com</a>
                </div>
            </div>
            <div className="contact-container_form">
                <Form 
                submit={submit}
                initialValues={initialValues}
                id={"contact-form"} 
                legend={"Formulaire de contact"}
                buttonValue={"Envoyer"}
                inputs={inputs}
                textArea={textArea}
                checkValidity={checkValidity}
                isError={isError}
                />
                <p>{message}</p>
            </div>
        </main>
    );
}

export default Contact;
