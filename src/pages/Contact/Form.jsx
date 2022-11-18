import React, { useState, useRef, useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { contactFormContext } from "../../context/contactFormContext";

const Form = ({legend, inputs, textArea, checkValidity, isError, submit, initialValues }) => {
	const formRef = useRef();
	// give the focus on the first input
	useEffect(() => {
		formRef.current[1].focus();
	}, []);

	const [form, setForm] = useState(initialValues);

	const handleChange = (e) => {
		const { name, value } = e.target;
		// Assign new value to the appropriate form field
		const updatedForm = {
			...form,
			[name]: value,
		};

		// Update state
		setForm(updatedForm);
	};

	return (
		<form
			id="contact-form"
			ref={formRef}
			onSubmit={() => submit(form)}
		>
			<contactFormContext.Provider
				value={{
					form,
					handleChange,
				}}
			>
			</contactFormContext.Provider>
			<fieldset>
				<legend>{legend}</legend>
				{inputs.map((elem) => {
					return (
						<div
							key={elem.id}
							id={elem.id}
							className='formInput'
						>
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
					);
				})}
				{textArea &&
					textArea.map((elem) => {
						return (
							<div
								key={elem.id}
								id={elem.id}
								className='formInput'
							>
								<label htmlFor={elem.id}>{elem.label}</label>
								<textarea
									className={elem.className}
									type={elem.type}
									value={elem.value}
									name={elem.name}
									onChange={handleChange}
									onBlur={(e) => checkValidity(e)}
								/>
								{elem.error ? (
									<p>{elem.errorMessage}</p>
								) : (
									<p></p>
								)}
							</div>
						);
					})}
			</fieldset>
			<ButtonComponent
				type='submit'
				title={"ENVOYER"}
				height={"60px"}
				color={"#239de5"}
				disabled={isError}
			/>
		</form>
	);
};

export default Form;
