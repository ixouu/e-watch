import React from "react";

const OrderSummary = ({ cart, orderNumber, userInformations }) => {
	return (
		<article className='order-summary'>
			<h2>Récapitulatif de votre commande : </h2>
			<h3 className='order-orderNumber'>Numero de commande : <span className="order-orderNumber_num">{orderNumber}</span></h3>
			<h3> Liste des articles:</h3>
			<ul>
				{cart.map((item, index) => {
					return (
						<li key={index}>
							{item.title} (x{item.qty})
						</li>
					);
				})}
			</ul>
			<h3>Vos coordonnées:</h3>
			<div className='order-summary_userInfos'>
				<span>Nom : {userInformations.lastName}</span>
				<span>Prenom : {userInformations.firstName}</span>
				<span>Email: {userInformations.email}</span>
				<span>
					Adresse : {userInformations.address} {userInformations.city}{" "}
					{userInformations.postalCode}{" "}
				</span>
				<span>
					{userInformations.addressComplementary &&
						userInformations.addressComplementary}
				</span>
			</div>

			<div className='order-summary_links'>
                <p>Une erreur dans votre commande? Contactez-nous <a href="mailto:sav@ewatch.com">sav@ewatch.com</a></p>
            </div>
		</article>
	);
};

export default OrderSummary;
