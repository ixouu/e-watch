import React, {useState} from "react";
import { useStateContext } from "../../context/stateContext";
import { useData } from "../../hooks/useData";

import CartForm from "./CartForm";
import ProductCard from "./ProductCard";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const Cart = () => {
	document.title = "E-watch | Panier";
	const { cartItems, totalPrice } = useStateContext();
	// fetch data from backend
	const { isLoading, data, error } = useData();
	
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
		} else return <p>Aucuns produits présent dans votre panier.</p>;
	};


	// fetch data from the local storage and price from the backend
	const displayTotalPrice = () => {
		if (isLoading){
			return <p>Chargement en cours</p>
		}else if (error){
			return <p>{error}</p>
		} else {
			let prices = [];
			if (cartItems.length >= 1) {
				cartItems.map((product) => {
					const item = data.find((item) => item._id === product.id);
					item && prices.push(item.price * product.qty);
			});
			const totalPrice = prices.length > 0 && prices.reduce((a, b) => a + b);
			return totalPrice;
			} else {
				return 0;
			}
		}
	};

	// display the form
	const [formIsOpen, setFormIsOpen] = useState(false);
	const openForm =  () =>{
		setFormIsOpen(prevState => !prevState)
	}

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
							<div className="btnContainer" onClick={openForm}>
								<ButtonComponent title={'COMMANDER'} color={'#239de5'} height={'80px'} width={'200px'} />
							</div>
						</div>
					</div>
				</div>
				<div className="continueOrderBtn-Container">
					<ButtonComponent title={'CONTINUER MES ACHATS'} height={'80px'} width={'230px'} link={'/'}/>
				</div>
				<div className="cart-from_container">
					{
						formIsOpen && <CartForm />
					}
				</div>
			</main>
		</>
	);
};

export default Cart;
