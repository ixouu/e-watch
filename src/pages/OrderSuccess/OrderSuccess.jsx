import React, { useState, useEffect } from "react";
import { useStateContext } from "../../context/stateContext";
import OrderSummary from "./OrderSummary";
import { client } from "../../lib/client";
import SocialMedias from "../../components/SocialMedias/Index";
import OrderError from "./OrderError";
import Error from "../Error/Error";

const OrderSuccess = () => {
	document.title = "E-watch | Votre commande";
	const [successUpdateProduct, setSuccessUpdateProduct] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [emptyCart, setEmptyCart] = useState(false);
	const {
		cartItems,
		userInformations,
		totalPrice,
		saveUserInformations,
		onClearLocalStorage,
	} = useStateContext();
	const orderNumber = Math.round(Date.now() + Math.random());

	// decrement product's quantity from the DB
	const updateProduct = (id, qty) => {
		!successUpdateProduct && setSuccessUpdateProduct(false);
	// 	client
	// 		.patch(id)
	// 		.dec({ availableStock: qty })
	// 		.commit()
	// 		.then(() => {
	// 			setSuccessUpdateProduct(true);
	// 		})
	// 		.catch((err) => {
	// 			setError(true);
	// 			setErrorMessage(err.message);
	// 		});
	};

	// return the array of products for the order
	const productArray = () => {
		let arr = [];
		cartItems.map((item, index) => {
			return arr.push({
				_key: `${index}`,
				productTitle: item.title,
				productQty: item.qty,
				productPrice: item.price,
			});
		});
		return arr;
	};

	const addOrder = () => {
		setIsLoading(true);
		const orderedProducts = productArray();
		const order = {
			_type: "order",
			title: `order${orderNumber}`,
			_id: orderNumber,
			orderId: orderNumber,
			orderedProducts: orderedProducts,
			orderTotalPrice: totalPrice(),
			customerLastName: userInformations.lastName,
			customerFirstName: userInformations.firstName,
			customerEmail: userInformations.email,
			customerStreet: userInformations.address,
			customeraddressComplementary: userInformations.addressComplementary,
			customerPostalCode: userInformations.postalCode,
			customerCity: userInformations.city,
		};
		// verifies if there is at leat 1 item before uploading order to the DB
		if (cartItems.length >= 1) {
			// client
			// 	.create(order)
			// 	.then(() => {
			// 		setIsLoading(false);
			// 		setError(false);
			// 	})
			// 	.catch((err) => {
			// 		setError(true);
			// 		setErrorMessage(err.message);
			// 		setIsLoading(false);
			// 	});
		} else {
			// set error if cartItems is empty
			setError(true);
			setErrorMessage("Votre panier est vide.");
			setIsLoading(false);
		}
	};

	const sendOrder = () => {
		if (cartItems.length !== 0){
			// update DB
		cartItems.forEach((item) => {
			updateProduct(item.id, item.qty);
		});
		// add order to DB
		addOrder();
		// delete usersInformations from the context, delete Local Storage
		onClearLocalStorage();
		saveUserInformations({});
		} else setEmptyCart(true)
		
	};

	useEffect(() => {
		setIsLoading(true);
		sendOrder();
	}, []);

	return (
		<main className='order'>
			{/* Verifies is the cart is not empty  */}
			{ emptyCart? (
				<Error />
			) : (
				<>
					{/* Display loarder  */}
					{isLoading ? (
						<p>Chargement...</p>
					) : (
						<>
							{/* Toggle error or orderSummary */}
							{error ? (
								<OrderError errorMessage={errorMessage} />
							) : (
								<div className='order-success'>
									<h1>Votre commande a été envoyée</h1>
									<OrderSummary
										cart={cartItems}
										orderNumber={orderNumber}
										userInformations={userInformations}
									/>
								</div>
							)}
							<SocialMedias />
						</>
					)}
				</>
			)}
			<OrderSummary
										cart={cartItems}
										orderNumber={orderNumber}
										userInformations={userInformations}
									/>
									<SocialMedias />
		</main>
		
	);
};

export default OrderSuccess;
