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
                            className={elem.className}
                            type={elem.type}
                            name={elem.name}
                            autoComplete={elem.autocomplete}
                            onChange={handleChange}
                            onBlur={(e) => checkValidity(e)}
                            />
                            {elem.error ? <p>{elem.errorMessage}</p> : <p></p>}
                        </div>
                        
                    )})
                }
                {textArea && textArea.map(elem=> {
                    return (
                        <div key={elem.id} id={elem.id} className='formInput'>
                            <label htmlFor={elem.id}>{elem.label}</label>
                            <textarea 
                            className={elem.className}
                            type={elem.type}
                            value={elem.value}
                            name={elem.name}
                            onChange={handleChange}
                            onBlur={(e) => checkValidity(e)}
                            />
                            {elem.error ? <p>{elem.errorMessage}</p> : <p></p>}
                        </div>
                    )})
                }
            </fieldset>
            <button type='button' onClick={() => submit(form)}>{buttonValue}</button>
        </form>
    );
}

export default Form;
