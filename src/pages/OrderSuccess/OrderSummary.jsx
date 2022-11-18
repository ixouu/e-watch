import React,{useEffect} from "react";
import { useStateContext } from "../../context/stateContext";

const OrderSummary = ({orderInfos}) => {

	const {
	orderNumber,
	orderedProducts,
	customerLastName,
	customerFirstName,
	customerEmail,
	customerStreet,
	customeraddressComplementary,
	customerPostalCode,
	customerCity} = orderInfos

	const {saveUserInformations,onClearLocalStorage,} = useStateContext();

	// delete usersInformations from the context, delete Local Storage
	useEffect(()=>{
		onClearLocalStorage()
		saveUserInformations({});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return (
		<article className='order-summary'>
			<h2>Récapitulatif de votre commande : </h2>
			<h3 className='order-orderNumber'>Numero de commande : <span className="order-orderNumber_num">{orderNumber}</span></h3>
			<h3> Liste des articles:</h3>
			<ul>
				{orderedProducts.map((item, index) => {
					return (
						<li key={index}>
							{item.productTitle} (x{item.productQty})
						</li>
					);
				})}
			</ul>
			<h3>Vos coordonnées:</h3>
			<div className='order-summary_userInfos'>
				<span>Nom : {customerLastName}</span>
				<span>Prenom : {customerFirstName}</span>
				<span>Email: {customerEmail}</span>
				<span>
					Adresse : {customerStreet} {customerCity}{" "}
					{customerPostalCode}{" "}
				</span>
				<span>
					{customeraddressComplementary &&
						customeraddressComplementary}
				</span>
			</div>

			<div className='order-summary_links'>
                <p>Une erreur dans votre commande? Contactez-nous <a href="mailto:sav@ewatch.com">sav@ewatch.com</a></p>
            </div>
		</article>
	);
};

export default OrderSummary;
