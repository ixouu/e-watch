import Header from "../../components/Header/Header";
import Service from "../../components/Service/Service";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

import ProductContent from "../../components/ProductContent/ProductContent";

const servicesData = [
	{
		title: "Fabrication de qualité",
		icon: "fa-solid fa-gift",
		desc: "E-watch et ses fournisseurs s'engagent au quotdien pour vous proposer des produits de vérifiés et sans défaults.",
	},
	{
		title: "Livraison rapide",
		icon: "fa-sharp fa-solid fa-globe",
		desc: "Nous vous garantissons une livraison rapide chez vous en moins de 2 jours ouvrés. Vous n'êtes pas chez vous ? Récupérez votre montre dans le dépôt relais le plus proche de chez vous.",
	},
	{
		title: "100% satisfait",
		icon: "fa-solid fa-star",
		desc: "Chez E-watch la garantie client est notre principale priorité, contactez notre service client en cas de questions ou de litige.",
	},
];

// return all the services from servicesData
const displayServices = () => {
	return servicesData.map((e, index) => {
		return (
			<Service
				key={index}
				title={e.title}
				icon={e.icon}
				desc={e.desc}
			/>
		);
	});
};

const Home = () => {
	return (
		<>
			<Header />
			<main className='home-main'>
				<div className='main-titleContainer'>
					<h2>Portez votre montre avec élégance</h2>
					<span>
						{" "}
						Les derniers modèles tendances sont disponibles dans
						notre magasin, découvrez-les sans plus tarder.{" "}
					</span>
				</div>
				<div className='main-Services'>{displayServices()}</div>
				<div className='main-products'>
					<h2>Nos montres coups de coeur</h2>
					<span>
						Plébiscitées par nos visiteurs, les montres "Best" sont
						les plus vendues. Laissez vous tenter par leurs charmes
						...
					</span>
					<ProductContent parentComponent={"home"} />
					<ButtonComponent
						title={"Toutes les montres"}
						link={"all-products"}
						width={"200px"}
						height={"70px"}
					/>
				</div>
			</main>
		</>
	);
};

export default Home;
