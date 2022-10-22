import React, { useState } from 'react';
import { contactFormContext } from '../../context/contactFormContext';

const Form = (props) => {

    const {
        id,
        legend,
        buttonValue,
        inputs,
        textArea,
        checkValidity,
        isError,
        error
    } = props

    const { children, submit = () => {}, initialValues } = props;

    const [form, setForm] = useState(initialValues)

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Assign new value to the appropriate form field
        const updatedForm = {
            ...form,
            [name]: value
        };
        
        // Update state
        setForm(updatedForm);
    }

    return (
        <form id={id}>
        <contactFormContext.Provider value={{
            form,
            handleChange
        }}>
            {children}
        </contactFormContext.Provider>
            <fieldset>
                <legend>{legend}</legend>
                {inputs.map(elem => {
                    return (
                        <div key={elem.id} id={elem.id} className='formInput'>
                            <label htmlFor={elem.id}>{elem.label}</label>
                            <input 
                            type={elem.type}
                            name={elem.name}
                            autoComplete={elem.autocomplete}
                            onChange={handleChange}
                            onInputCapture={(e) => checkValidity(e)}
                            />
                            {isError && elem.error && <p>{error}</p>}
                        </div>
                        
                    )})
                }
                {textArea.map(elem=> {
                    return (
                        <div key={elem.id} id={elem.id} className='formInput'>
                            <label htmlFor={elem.id}>{elem.label}</label>
                            <textarea 
                            type={elem.type}
                            value={elem.value}
                            name={elem.name}
                            onChange={handleChange}
                            onBlur={checkValidity}
                            />
                        </div>
                    )})
                }
            </fieldset>
            <button type='button' onClick={() => submit(form)}>{buttonValue}</button>
        </form>
    );
}

export default Form;
