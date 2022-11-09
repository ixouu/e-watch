import React from "react";
import CartForm from "./CartForm";
import { useStateContext } from "../../context/stateContext";
import { useData } from "../../hooks/useData";
import ProductCard from "./ProductCard";

const Cart = () => {
	document.title = "E-watch | Panier";
	const {
		totalPrice,
		totalQuantities,
		cartItems,
		toggleCartItemQuanitity,
		onRemove,
	} = useStateContext();

	const { isLoading, data, error } = useData();

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

    let prices = [];
    if (cartItems.length >= 1) {
      cartItems.map(product => {
          const item = data.find(item => item._id === product.id);
          item && prices.push(item.price*product.qty);
      })
      const totalPrice = prices.length > 0 && prices.reduce((a,b) => a+b);
      return totalPrice
    } else{
      return 0;
    }
  }

	return (
		<>
			<main className='cart'>
				<h1>Votre panier</h1>
				<div className='cart-products'>{displayCartProducts()}</div>
        <div className="cart-totalContainer">
          <div className="cart-subtotal">
            <span>Sous-total</span>
            <span>{displayTotalPrice()},00€</span>
          </div>
          <div className="cart-deleveryFees">
            <span>Livraison</span>
            <span>Gratuit</span>
          </div>
          <div className="cart-total">
            <span>TOTAL</span>
            <span>{displayTotalPrice()},00€</span>
          </div>
        </div>
				<CartForm />
			</main>
		</>
	);
};

export default Cart;
