import { useState } from "react";
import categories from "../../utils/categories";

import Tag from "../../components/Tag/Tag";
import ProductContent from "../../components/ProductContent/ProductContent";

const AllProducts = () => {
	const [isFilter, setIsFilter] = useState(false);
	const [currentCategory, setCurrentCategory] = useState("all");

	const filterCategory = (e) => {
		setCurrentCategory(e.toLowerCase());
		setIsFilter(true);
	};
	return (
		<main className='main-allProducts'>
			<div className='main-allProducts_text'>
				<h1>E-watch spécialiste de la montre.</h1>
				<p>
					Montre femme, montre homme, montre enfant, montre
					automatique bien sûr, mais également montre digitale ou
					montre pas cher, notre passion des montres est vaste. Vous
					ne trouverez pas chez nous de montre de luxe inaccessibles
					mais plutôt des montres de qualité proposées à des prix
					justes et abordables. Nous portons une attention toute
					particulière à la <strong>fiabilité des montres</strong>{" "}
					proposées et sélectionnons avec soin les marques que nous
					vous présentons. Enfin, nous sommes une entreprise Française
					basée à Besançon, capitale de l’horlogerie, et nous sommes à
					votre service par email, via notre formulaire de contact ou
					encore par téléphone pour vous accompagner dans votre achat
					de montre et vous conseiller dans votre choix.
				</p>
			</div>
			<div className='main-allProducts_categoriesContainer'>
				<h2>Filtrer par catégories :</h2>
				<div className='main-allProducts_categories'>
					{categories.map((category, index) => {
						return (
							<Tag
								key={index}
								title={category}
								id={category}
								handleClick={filterCategory}
							/>
						);
					})}
					{isFilter && (
						<button
							className='tag tag-Close'
							onClick={() => {
								setIsFilter(false);
								setCurrentCategory("all");
							}}
						>
							<i className='fa-solid fa-xmark'></i>
						</button>
					)}
				</div>
			</div>
			<ProductContent
				parentComponent={"allProducts"}
				category={currentCategory}
			/>
		</main>
	);
};

export default AllProducts;
