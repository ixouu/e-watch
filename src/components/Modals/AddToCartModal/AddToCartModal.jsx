import React, {useRef, useEffect} from "react";
import ReactDOM from "react-dom";
import { useStateContext } from "../../../context/stateContext";
import { urlFor } from "../../../lib/client";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

const AddToCartModal = ({ open, onClose, successHandlter, productName }) => {
	const {
		totalPrice,
		totalQuantities,
		cartItems,
		toggleCartItemQuanitity,
		onRemove,
	} = useStateContext();

  const successDiv = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      successDiv.current.classList.add('fadeoff');
    }, 5000)
    return () => clearTimeout(timer)
  }, []);

	const displayPreviewCart = () => {
		if (cartItems.length >= 1) {
			return cartItems.map((item) => {
				return (
					<div
						className='cartPreview-item'
						key={item.id}
					>
						<div className='cartPreview-item-img_Container'>
							<img
								className='cartPreview-item_img'
								src={urlFor(item.image[0])}
                alt='product icon'
							/>
						</div>
						<h4>{item.title}</h4>
						<div className='cartPreview-item_Qty'>
							<div className='quantity-desc'>
								<button
									className='minus'
									onClick={() =>
										toggleCartItemQuanitity(item.id, "dec")
									}
								>
									-
								</button>
								<span className='num'>{item.qty}</span>
								<button
									className='plus'
									onClick={() =>
										toggleCartItemQuanitity(item.id, "inc")
									}
								>
									+
								</button>
							</div>
						</div>
						<div className='cartPreview-item_Price'>
							<span>{item.price * item.qty},00€</span>
						</div>
						<button
							className='cartPreview-item_Delete'
							onClick={() => onRemove(item.id)}
						>
							<i className='fa-solid fa-circle-xmark'></i>
						</button>
					</div>
				);
			});
		} else return <p>Votre panier est vide</p>;
	};

	return ReactDOM.createPortal(
		<>
			<div
				className='overlay'
				onClick={onClose}
			></div>
			<div className='hero-modal'>
				{successHandlter ? (
					<div className='addToCart-container addToCart-success' ref={successDiv}>
						<span>
							<i className='fa-solid fa-circle-check'></i> La
							montre {productName} a été rajouté au panier.
						</span>
					</div>
				) : (
					<div className='addToCart-container addToCart-failed'>
						<span>
							<i className='fa-solid fa-circle-xmark'></i>Votre
							article n'a pas été rajouté au panier, veuillez
							réessayer.
						</span>
					</div>
				)}
				<div className='cartPreview'>
					<h3>Votre panier : </h3>
					{displayPreviewCart()}
        </div>
        <div className="cartNumbers">
					<p>TOTAL ({totalQuantities()} {totalQuantities() >= 1 ? <span>articles</span> : <span>article</span>}) : {totalPrice()},00 €</p>
        </div>
        <div className="cartButtons">
        <ButtonComponent
						title={"Continuer mes achats"}
						height={"50px"}
					/>
        <ButtonComponent
						title={"Passer la commande"}
						color={"#239de5"}
						height={"50px"}
						link={"/cart"}
					/>
        </div>
			</div>
		</>,
		document.getElementById("modal-root")
	);
};

export default AddToCartModal;
