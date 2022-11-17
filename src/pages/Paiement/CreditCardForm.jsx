import React from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Options from "./Options";

const CreditCardForm = ({
	cvcInput,
	expirationInputs,
	inputs,
	handleChange,
	isError,
	checkValidity,
	submit,
	errorMessage,
	btnClassName,
	totalPrice,
}) => {
	return (
		<form
			className='creditCard_form'
			onSubmit={(e) => submit(e)}
		>
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
							onChange={(e) => handleChange(e)}
							maxLength={elem.maxLength}
							autoCapitalize={elem.autocapitalize}
							pattern={elem.pattern}
							onBlur={(e) => checkValidity(e)}
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
									<select
										id={elem.id}
										className={elem.className}
										type={elem.type}
										name={elem.name}
										autoComplete={elem.autocomplete}
										required
										placeholder={elem.placeholder}
										onChange={(e) => handleChange(e)}
										maxLength={elem.maxLength}
										onBlur={(e) => checkValidity(e)}
									>
										<Options options={elem.options} />
									</select>
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
								autoComplete={cvcInput.autocomplete}
								placeholder={cvcInput.placeholder}
								onChange={(e) => handleChange(e)}
								maxLength={`${cvcInput.maxLength}`}
								required
								pattern={`${cvcInput.pattern}`}
								inputMode={`${cvcInput.inputmode}`}
								onBlur={(e) => checkValidity(e)}
							/>
						}
						{cvcInput.error ? <p>{cvcInput.errorMessage}</p> : null}
					</div>
				</div>
			</div>
			<div className='creditCard-form_btns'>
				<ButtonComponent
					title={"PAYER VOTRE COMMANDE (" + totalPrice() + ",00 €)"}
					height={"80px"}
					width={"350px"}
					color={"#239de5"}
					type={"submit"}
					disabled={isError}
					class1={btnClassName}
				/>
				{errorMessage && <p>{errorMessage}</p>}
				<ButtonComponent
					title={"ANNULER"}
					height={"60px"}
					color={"#d2d0d0"}
					fontColor={"rgb(18, 18, 18)"}
					link={"../cart"}
					width={"130px"}
				/>
			</div>
		</form>
	);
};

export default CreditCardForm;
