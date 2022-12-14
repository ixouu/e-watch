import React, { useState } from "react";
import { useStateContext } from "../../context/stateContext";

import CartForm from "./CartForm";
import ProductCard from "./ProductCard";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const Cart = () => {
	document.title = "E-watch | Panier";
	const { cartItems, totalPrice } = useStateContext();
	// fetch data from backend

	// display all Cart products based on localstorage informations
	const displayCartProducts = () => {
		if (cartItems.length >= 1) {
			return cartItems.map((product) => {
				return (
					<ProductCard
						key={product.id}
						id={product.id}
						title={product.title}
						price={product.price}
						qty={product.qty}
						image={product.image[0]}
					/>
				);
			});
		} else return <p className="noProductsInCart">Aucuns produits présent dans votre panier.</p>;
	};

	// display the form
	const [formIsOpen, setFormIsOpen] = useState(false);
	const openForm = () => {
		setFormIsOpen((prevState) => !prevState);
	};

	return (
		<>
			<main className='cart'>
				<h1>Votre panier</h1>
				<div className='cart-products'>
					<div className='cart-products_left'>
						{displayCartProducts()}
					</div>
					<div className='cart-products_right'>
						<div className='cart-totalContainer'>
							<div className='cart-total'>
								<div className='cart-subtotal'>
									<span>Sous-total</span>
									<span>{totalPrice()},00 €</span>
								</div>
								<div className='cart-deleveryFees'>
									<span>Livraison</span>
									<span>Gratuit</span>
								</div>
								<div className='cart-total_priceContainer'>
									<span>TOTAL TTC</span>
									<span className='cart-total_price'>
										{totalPrice()},00 €
									</span>
								</div>
							</div>
							<div
								className='btnContainer'
								onClick={openForm}
							>
								{cartItems.length === 0 ? (
									<ButtonComponent
										title={"COMMANDER"}
										color={"#239de5"}
										height={"80px"}
										width={"200px"}
										disabled={true}
									/>
								) : (
									<ButtonComponent
										title={"COMMANDER"}
										color={"#239de5"}
										height={"80px"}
										width={"200px"}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className='continueOrderBtn-Container'>
					<ButtonComponent
						title={"CONTINUER MES ACHATS"}
						height={"80px"}
						width={"230px"}
						link={"/"}
					/>
				</div>
				<div className='cart-from_container'>
					{formIsOpen && <CartForm />}
				</div>
			</main>
		</>
	);
};

export default Cart;
