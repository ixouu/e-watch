import { useState, useRef, useEffect } from "react";
import regExpList from "../../utils/regExp";
import AdressFinder from "./AdressFinder";
import { useStateContext } from "../../context/stateContext";
import { useNavigate } from "react-router-dom";

const CartForm = () => {
	const navigate = useNavigate();
	const formRef = useRef(null);
	const adressRef = useRef(null);
	const postalCodeRef = useRef(null);
	const cityRef = useRef(null);

	// give the focus on the first input
	useEffect(() => {
		formRef.current[1].focus();
	}, []);

	// import function to store userinformation from the context
	const { saveUserInformations } = useStateContext();
	// inputs content
	const [inputs, setInputs] = useState([
		{
			label: "Nom",
			type: "text",
			id: "inputLastName",
			autocomplete: "name",
			name: "lastName",
			error: false,
			errorMessage:
				"Le nom renseigné est incorrect (exemple valide : Dupont).",
			className: "lastName",
		},
		{
			label: "Prénom",
			type: "text",
			id: "inputFirstName",
			name: "firstName",
			error: false,
			errorMessage:
				"Le prénom renseigné est incorrect (exemple valide : Paul).",
			className: "firstName",
		},
		{
			label: "Votre Adresse mail",
			type: "email",
			id: "inputEmail",
			autocomplete: "email",
			name: "email",
			error: false,
			errorMessage:
				"L'adresse mail renseignée est incorrect (exemple valide : paul@gmail.com).",
			className: "email",
		},
	]);

	const [adress, setAdress] = useState({
		label: "Adresse",
		type: "text",
		id: "inputAddress",
		name: "inputAddress",
		autocomplete: "off",
		error: false,
		errorMessage: "Veuillez saisir une adresse valide.",
		className: "inputAddress",
	});

	const addressComplementary = {
		label: "",
		type: "text",
		id: "addressComplementary",
		name: "addressComplementary",
		error: false,
		errorMessage: "Veuillez saisir un complement d'adresse valide.",
		placeholder: "Apt, suite, unité, nom de l'entreprise(falcultatif)",
		className: "addressComplementary",
	};

	const [postalCode, setPostalCode] = useState({
		label: "Code postal",
		type: "text",
		id: "postalCode",
		name: "postalCode",
		error: false,
		errorMessage: "Veuillez saisir un code postal valide.",
		className: "postalCode",
	});

	const [city, setCity] = useState({
		label: "Ville",
		type: "text",
		id: "city",
		name: "city",
		error: false,
		errorMessage: "Veuillez saisir une ville valide.",
		className: "city",
	});

	const initialValues = {
		lastName: "",
		firstName: "",
		email: "",
		address: "",
		postalCode: 0,
		addressComplementary: "",
		city: "",
	};

	// error Statement
	const [isError, setIsError] = useState(true);

	// Select the right input and add the corresponding error
	function addError(inputName) {
		isError === false && setIsError(true);
		if (inputName === "postalCode") {
			setPostalCode({
				...postalCode,
				error: true,
				className: "postalCode inputInvalid",
			});
		} else if (inputName === "city") {
			setCity({
				...city,
				error: true,
				className: "city inputInvalid",
			});
		} else if (inputName === "adress") {
			setAdress({
				...adress,
				error: true,
				className: "adress inputInvalid",
			});
		} else {
			let newInputs = inputs.map((input) => {
				if (input.name === inputName) {
					console.log(input.name);
					return {
						...input,
						error: true,
						className: `${inputName} inputInvalid`,
					};
				}
				return input;
			});
			setInputs(newInputs);
		}
	}

	// Select the right input and remove the error
	function rmError(inputName) {
		setIsError(false);
		if (inputName === "postalCode") {
			setPostalCode({
				...postalCode,
				error: false,
				className: `${inputName} inputValid`,
			});
		} else if (inputName === "city") {
			setCity({
				...city,
				error: false,
				className: `${inputName} inputValid`,
			});
		} else if (inputName === "adress") {
			setAdress({
				...adress,
				error: false,
				className: `${inputName} inputValid`,
			});
		} else {
			const newInputs = inputs.map((obj) => {
				if (obj.name === inputName) {
					return {
						...obj,
						error: false,
						className: `${inputName} inputValid`,
					};
				}
				return obj;
			});
			setInputs(newInputs);
		}
	}

	const [form, setForm] = useState(initialValues);
	const [openAdressFinder, setOpenAdressFinder] = useState(false);

	// Function that save changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		// Assign new value to the appropriate form field
		if (name === "postalCode") {
			const updatedForm = {
				...form,
				postalCode: parseInt(value),
			};
			// Update state form
			setForm(updatedForm);
		} else {
			const updatedForm = {
				...form,
				[name]: value,
			};
			// Update state form
			setForm(updatedForm);
			// toggle the adress finder
		}
		if (
			e.target.className === "inputAddress" &&
			e.target.value.length > 0
		) {
			setOpenAdressFinder(true);
		} else {
			return;
		}
	};

	// check inputs validity
	const checkValidity = (name, value) => {
		// timer has been setted to be able to click the adress before the blur
		setTimeout(() => {
			setOpenAdressFinder(false);
		}, 200);
		switch (name) {
			case "lastName":
				!regExpList.lastName.test(value)
					? addError("lastName")
					: rmError("lastName");
				break;
			case "firstName":
				!regExpList.firstName.test(value)
					? addError("firstName")
					: rmError("firstName");
				break;
			case "email":
				!regExpList.email.test(value)
					? addError("email")
					: rmError("email");
				break;
			case "inputAddress":
				value.length < 3 ? addError("adress") : rmError("adress");
				break;
			case "postalCode":
				!regExpList.postalCode.test(value)
					? addError("postalCode")
					: rmError("postalCode");
				break;
			case "city":
				!regExpList.city.test(value)
					? addError("city")
					: rmError("city");
				break;
			default:
				break;
		}
	};

	// submited form message
	const [message, setMessage] = useState("");

	// If there are no errors, display paiement page
	const submit = (e, form) => {
		const formToCheck = Object.entries(form);
		console.log(formToCheck);
		formToCheck.forEach((entry) => {
			checkValidity(entry[0], entry[1]);
		});
		e.preventDefault();
		if (isError) {
			setMessage("Veuillez renseignez les informations demandées.");
			e.target.className = "cartForm-btn shake";
			return;
		} else {
			e.target.className = "cartForm-btn bounceOut";
			setMessage("");
			saveUserInformations(form);
			const timer = () =>
				setTimeout(() => {
					navigate("../paiement");
				}, 750);
			timer();
			clearTimeout(timer);
		}
	};

	// handle the suggested adress and replace the input value
	const replaceAdressValue = (addressInput, postalCode, city) => {
		adressRef.current.value = addressInput;
		postalCodeRef.current.value = postalCode;
		cityRef.current.value = city;
		setOpenAdressFinder(false);
		setForm({
			...form,
			addressInput,
			postalCode,
			city,
		});
		const adressInputs = [adressRef, postalCodeRef, cityRef];
		for (const input of adressInputs) {
			checkValidity(input.current.name, input.current.value);
		}
	};

	return (
		<main id='cart'>
			<form
				id='cart-form'
				ref={formRef}
			>
				<fieldset>
					<legend>Renseignez vos informations personelles</legend>
					{/* Inputs first name, name, email */}
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
									onBlur={(e) =>
										checkValidity(
											e.target.name,
											e.target.value
										)
									}
								/>
								{elem.error ? (
									<p>{elem.errorMessage}</p>
								) : (
									<p></p>
								)}
							</div>
						);
					})}
					{/* adress input */}
					<div
						key={adress.id}
						id={adress.id}
						className='formInput'
					>
						<label htmlFor={adress.id}>{adress.label}</label>
						<input
							ref={adressRef}
							className={adress.className}
							type={adress.type}
							name={adress.name}
							autoComplete={adress.autocomplete}
							onChange={(e) => handleChange(e)}
							onBlur={(e) =>
								checkValidity(e.target.name, e.target.value)
							}
						/>
						{/* adress finder */}
						{openAdressFinder && (
							<AdressFinder
								address={adressRef.current.value}
								replaceAdressValue={replaceAdressValue}
							/>
						)}
						{/* adress complementary */}
						<label htmlFor={addressComplementary.id}>
							{addressComplementary.label}
						</label>
						<input
							className={addressComplementary.className}
							type={addressComplementary.type}
							name={addressComplementary.name}
							placeholder={addressComplementary.placeholder}
							onChange={(e) => handleChange(e)}
							onBlur={(e) =>
								checkValidity(e.target.name, e.target.value)
							}
						/>
						{adress.error ? <p>{adress.errorMessage}</p> : <p></p>}
						<div className='city'>
							{/* postal Code input */}
							<div className='city-postalCode'>
								<label htmlFor={postalCode.id}>
									{postalCode.label}
								</label>
								<input
									className={postalCode.className}
									ref={postalCodeRef}
									type={postalCode.type}
									name={postalCode.name}
									onChange={(e) => handleChange(e)}
									onBlur={(e) =>
										checkValidity(
											e.target.name,
											e.target.value
										)
									}
								/>
								{postalCode.error ? (
									<p>{postalCode.errorMessage}</p>
								) : (
									<p></p>
								)}
							</div>
							<div className='city-city'>
								{/* city input */}
								<label htmlFor={city.id}>{city.label}</label>
								<input
									ref={cityRef}
									className={city.className}
									type={city.type}
									name={city.name}
									onChange={(e) => handleChange(e)}
									onBlur={(e) =>
										checkValidity(
											e.target.name,
											e.target.value
										)
									}
								/>
								{city.error ? (
									<p>{city.errorMessage}</p>
								) : (
									<p></p>
								)}
							</div>
						</div>
					</div>
				</fieldset>
				<button
					type='submit'
					onClick={(e) => submit(e, form)}
					className='cartForm-btn'
				>
					Procéder au paiement
				</button>
				{message ? <p>{message}</p> : <p></p>}
			</form>
		</main>
	);
};

export default CartForm;
