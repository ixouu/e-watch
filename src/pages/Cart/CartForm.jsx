import { useState, useRef, useEffect } from "react";
import regExpList from "../../utils/regExp";
import AdressFinder from "./AdressFinder";
import ButtonCompononent from '../../components/ButtonComponent/ButtonComponent'

const CartForm = () => {
	// give the focus on the first input
	const formRef = useRef();
	const adressRef = useRef();
	useEffect(() => {
		formRef.current[1].focus();
	}, []);

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
				"Le nom renseigné est incorrect ( exemple valide : Dupont).",
			className: "",
		},
		{
			label: "Prénom",
			type: "text",
			id: "inputFirstName",
			name: "firstName",
			error: false,
			errorMessage:
				"Le prénom renseigné est incorrect ( exemple valide : Paul).",
			className: "",
		},
		{
			label: "Votre Adresse mail",
			type: "email",
			id: "inputEmail",
			autocomplete: "email",
			name: "email",
			error: false,
			errorMessage:
				"L'adresse mail renseignée est incorrect ( exemple valide : paul@gmail.com).",
			className: "",
		},
	]);

	const adress = {
		label: "Adresse",
		type: "text",
		id: "inputAddress",
		name: "address",
		error: false,
		errorMessage: "Veuillez saisir une adresse valide.",
		className: "inputAddress",
	};

	const initialValues = {
		lastName: "",
		firstName: "",
		email: "",
		address: "",
	};

	// error Statement
	const [isError, setIsError] = useState(false);

	// Select the right input and add the corresponding error
	function addError(inputName) {
		setIsError(true);
		const newInputs = inputs.map((obj) => {
			if (obj.name === inputName) {
				return { ...obj, error: true, className: "inputInvalid" };
			}
			return obj;
		});
		setInputs(newInputs);
	}

	// Select the right input and remove the error
	function rmError(inputName) {
		setIsError(false);
		const newInputs = inputs.map((obj) => {
			if (obj.name === inputName) {
				return { ...obj, error: false, className: "inputValid" };
			}
			return obj;
		});
		setInputs(newInputs);
	}

	// Function that save changes

	const [form, setForm] = useState(initialValues);
	const [openAdressFinder, setOpenAdressFinder] = useState(false);
	const handleChange = (e) => {
		const { name, value } = e.target;
		// Assign new value to the appropriate form field
		const updatedForm = {
			...form,
			[name]: value,
		};
		// Update state form
		setForm(updatedForm);
		// toggle the adress finder
		if (
			e.target.className === "inputAddress" &&
			e.target.value.length !== 0
		) {
			setOpenAdressFinder(true);
		}else {
			setOpenAdressFinder(false);
		}
	};

	// check inputs validity
	const checkValidity = (e) => {
		// timer has been setted to be able to click the adress before the blur
		setTimeout(() => {
			setOpenAdressFinder(false);
		}, 200);
		const value = e.target.value;
		console.log(e.target.name)
		switch (e.target.name) {
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
			case "address":
				value.length < 10 
				? addError("adress")
				: rmError("adress");
				break
			default:
				break;
		}
	};

	// submited form message
	const [message, setMessage] = useState("");

	// submited action
	const submit = () => {
		if (isError) {
			alert("DIDNT WORK");
			return;
		}
		setMessage("Votre message a bien été enregistré");
	};

	// handle the suggested adress and replace the input value 
	const replaceAdressValue = (pickedValue) =>{ 
		adressRef.current.value = pickedValue;
		setOpenAdressFinder(false);
	}

	return (
		<main id='cart'>
			<form
				id='cart-form'
				ref={formRef}
			>
				<fieldset>
					<legend>Renseignez vos informations personelles</legend>
					{/* Add Inputs first name, name, email */}
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
								{elem.error ? (
									<p>{elem.errorMessage}</p>
								) : (
									<p></p>
								)}
							</div>
						);
					})}
					{/* Add adress input */}
					<div
						key={adress.id}
						id={adress.id}
						className='formInput'
					>
						<label htmlFor={adress.id}>{adress.label}</label>
						<input
							ref ={adressRef}
							className={adress.className}
							type={adress.type}
							name={adress.name}
							onChange={(e) => handleChange(e)}
							onBlur={(e) => checkValidity(e)}
						/>
						{openAdressFinder && <AdressFinder adress={adressRef.current.value} replaceAdressValue={replaceAdressValue}/>}
						{adress.error ? <p>{adress.errorMessage}</p> : <p></p>}
					</div>
				</fieldset>
				<ButtonCompononent title={'Valider ma commande'} height={"80px"}/>
			</form>
		</main>
	);
};

export default CartForm;
