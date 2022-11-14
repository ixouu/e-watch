import React, { useState } from "react";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

const CreditCardForm = ({ cvcInput, expirationInputs, inputs, handleChange }) => {
	return (
		<form className='creditCard_form'>
			{inputs.map((elem) => {
				return (
					<div
						key={elem.id}
						className='formInput'
					>
						<label htmlFor={elem.id}>{elem.title}</label>
						<input
							id={elem.id}
							className={elem.className}
							type={elem.type}
							name={elem.name}
							autoComplete={elem.autocomplete}
							required
							placeholder={elem.placeholder}
							onChange={ (e) => handleChange(e)}
							// onBlur={(e) => checkValidity(e)}
						/>
						{elem.error ? <p>{elem.errorMessage}</p> : <p></p>}
					</div>
				);
			})}
			<div className='reditCard_form_bottomLine'>
				<div className='reditCard_form_expiration'>
					<span>Date d'expiration</span>
					<div className='reditCard_form_expirationInputs'>
						{expirationInputs.map((elem) => {
							return (
								<div
									key={elem.id}
									className='formInput'
								>
									<label htmlFor={elem.id}>
										{elem.label}
									</label>
									<input
										id={elem.id}
										className={elem.className}
										type={elem.type}
										name={elem.name}
										autoComplete={elem.autocomplete}
										required
										placeholder={elem.placeholder}
										onChange={ (e) => handleChange(e)}
										// onBlur={(e) => checkValidity(e)}
									/>
									{elem.error ? (
										<p>{elem.errorMessage}</p>
									) : (
										<p></p>
									)}
								</div>
							);
						})}
					</div>
				</div>
				<div className='reditCard-form_cvcContainer'>
					<span>CCV</span>
					<div className='reditCard-form_cvc'>
						{
							<input
								id={cvcInput.id}
								className={cvcInput.className}
								type={cvcInput.type}
								name={cvcInput.name}
								placeholder={cvcInput.placeholder}
								onChange={ (e) => handleChange(e)}
								required
							/>
						}
					</div>
				</div>
			</div>
			<div className="creditCard-form_btns">
				<ButtonComponent title={"ANNULER"} height={"80px"} color={"#d2d0d0"} fontColor={"rgb(18, 18, 18)"}/>
				<ButtonComponent title={"PASSEZ LA COMMANDE"} height={"80px"} color={"#239de5"} type={"submit"}/>
			</div>
			
		</form>
	);
};

export default CreditCardForm;
