import React, {useState} from 'react';

const Form = ({ id, inputs, legend, buttonValue, textArea }) => {

    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value);
    }


    return (
        <form id={id}>
            <fieldset>
                <legend>{legend}</legend>
                {inputs.map(elem=> {
                    return (
                        <div key={elem.id} id={elem.id} className='formInput'>
                            <label htmlFor={elem.id}>{elem.label}</label>
                            <input 
                            type={elem.type}
                            name={elem.type}
                            autocomplete={elem.autocomplete}
                            onChange={(e) => handleChange(e)}
                            />
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
                            onChange={(e) => handleChange(e)}
                            />
                        </div>
                    )})
                }
            </fieldset>
            <button>{buttonValue}</button>
        </form>
    );
}

export default Form;
