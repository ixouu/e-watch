import React, { useState } from "react";
import CreditCardBack from "./CreditCardBack";
import CreditCardForm from "./CreditCardForm";
import CreditCardFront from "./CreditCardFront";
import { useStateContext } from "../../context/stateContext";
import Error from "../Error/Error";
import regExpList from "../../utils/regExp";
import { formsUtils } from "../../utils/formsUtils";
import { useNavigate } from "react-router-dom";

const Paiement = () => {
	document.title = "E-watch | Paiement";
	const navigate = useNavigate();

	const { verifiesActualDate, formatedNumber, generateYears } = formsUtils;

	// form error
	const [isError, setIsError] = useState(false);

	// import cartList
	const { cartItems, totalPrice} = useStateContext();

	// submited form message
	const [errorMessage, setErrorMessage] = useState("");

	//toggle class for form button
	const [btnClassName, setBtnClassName] = useState("");

	// If there is no errors, display success page
	const submit = (e) => {
		e.preventDefault();
		if(verifiesActualDate(
			paiementInformations.creditCardExpirationMonth,
			paiementInformations.creditCardExpriationYear) === false ){
				setIsError(true);
				setBtnClassName("shake");
				setErrorMessage("La date d'expiration renseignée n'est pas valide.");
				return;
			}
		if (isError) {
			setErrorMessage("Veuillez renseignez les informations demandées.");
			setBtnClassName("shake");
			return;
		} else {
			setErrorMessage("");
			setBtnClassName("bounceOut");
			// do not keep creditCard's informations for now
			const timer = () =>
				setTimeout(() => {
					navigate("../order-success");
				}, 750);
			timer();
			clearTimeout(timer);
		}
	};

	// state to manage provided informations form the from
	const [paiementInformations, setPaiementInformations] = useState({
		creditCardNumber: "123 567 0000",
		creditCardName: "John Doe",
		creditCardExpirationMonth: 1,
		creditCardExpriationYear: new Date().getFullYear(),
		creditCardCvc: "000",
	});
	// state form form input
	const [inputs, setInputs] = useState([
		{
			title: "Nom sur la carte",
			type: "text",
			id: "creditCardName",
			error: false,
			errorMessage: "Le nom renseigné n'est pas un nom valide",
			className: "creditCardName",
			placeholder: "ex : John Doe",
			autocomplete: true,
			autocapitalize: "on",
		},
		{
			title: "Numéro de carte",
			type: "text",
			id: "creditCardNumber",
			error: false,
			errorMessage:
				"Le numéro de carte renseigné n'est pas un numéro valide",
			className: "crediCardNumber",
			placeholder: "ex : 123 567 0000",
			maxLength: 10,
			autocomplete: true,
			pattern: "[0-9]{10}",
		},
	]);
	const expirationInputs = [
		{
			title: "month",
			type: "number",
			id: "creditCardExpirationMonth",
			className: "creditCardExpirationMonth",
			options: [
				"01",
				"02",
				"03",
				"04",
				"05",
				"06",
				"07",
				"08",
				"09",
				"10",
				"11",
				"12",
			],
		},
		{
			title: "year",
			type: "number",
			id: "creditCardExpriationYear",
			className: "creditCardExpriationYear",
			options: generateYears(),
		},
	];

	const [cvcInput, setCvcInput] = useState({
		title: "CVC",
		type: "text",
		id: "creditCardCvc",
		error: false,
		errorMessage: "Le code renseigné n'est pas un nom valide",
		className: "creditCardCvc",
		placeholder: "ex: 123",
		maxLength: 3,
		autocomplete: true,
		pattern: "[0-9]{3}",
		inputmode: "numeric",
	});

	// Manage input changes
	const handleChange = (e) => {
		isError && setIsError(false);
		const { id, value } = e.target;
		// format card Number
		if (id === "creditCardNumber") {
			const updatedForm = {
				...paiementInformations,
				creditCardNumber: formatedNumber(value),
			};
			setPaiementInformations(updatedForm);
		} else {
			// update paiementInformations state
			const updatedForm = {
				...paiementInformations,
				[id]: value,
			};
			setPaiementInformations(updatedForm);
		}
	};

	//Verifies input's informations
	const checkValidity = (e) => {
		const value = e.target.value;
		switch (e.target.id) {
			case "creditCardName":
				!regExpList.creditCardName.test(value)
					? addError("creditCardName")
					: rmError("creditCardName");
				break;
			case "creditCardNumber":
				!regExpList.creditCardNumber.test(value)
					? addError("creditCardNumber")
					: rmError("creditCardNumber");
				break;
			case "creditCardCvc":
				!regExpList.creditCardCvc.test(value)
					? addError("creditCardCvc")
					: rmError("creditCardCvc");
				break;
			default:
				break;
		}
	};

	// Select the right input and add the corresponding error
	function addError(inputName) {
		setIsError(true);
		if (inputName === "creditCardCvc") {
			setCvcInput({
				...cvcInput,
				error: true,
				className: "inputInvalid",
			});
		} else {
			const newInputs = inputs.map((obj) => {
				if (obj.id === inputName) {
					return { ...obj, error: true, className: "inputInvalid" };
				}
				return obj;
			});
			setInputs(newInputs);
		}
	}

	// Select the right input and remove the error
	function rmError(inputName) {
		if (inputName === "creditCardCvc") {
			setCvcInput({
				...cvcInput,
				error: false,
				className: `${inputName}`,
			});
		}
		setIsError(false);
		const newInputs = inputs.map((obj) => {
			if (obj.id === inputName) {
				return { ...obj, error: false, className: `${inputName}` };
			}
			return obj;
		});
		setInputs(newInputs);
	}

	return (
		<main className='paiement'>
			{cartItems.length === 0 ? (
				<Error />
			) : (
				<>
					<div className='paiement-leftContainer'>
						<CreditCardFront
							paiementInformations={paiementInformations}
						/>
						<CreditCardBack
							paiementInformations={paiementInformations}
						/>
					</div>
					<div className='paiement-rightContainer'>
						<CreditCardForm
							cvcInput={cvcInput}
							expirationInputs={expirationInputs}
							inputs={inputs}
							handleChange={handleChange}
							isError={isError}
							checkValidity={checkValidity}
							submit={submit}
							errorMessage={errorMessage}
							btnClassName={btnClassName}
							totalPrice={totalPrice}
						/>
					</div>
				</>
			)}
		</main>
	);
};

export default Paiement;
