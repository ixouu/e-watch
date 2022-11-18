import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../../lib/client";

import Star from "../../components/Star/Star";
import AddToCartModal from "../../components/Modals/AddToCartModal/AddToCartModal";

import { useCart } from "../../hooks/useCart";
import Loader from "../../components/Loader/Loader";

const Product = () => {
	const [productData, setProductData] = useState({
		title: "",
		id: "",
		availableStock: "",
		brand: "",
		category: [],
		details: "",
		image: [],
		popularity: 0,
		price: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Tabs States
	const [descIsActive, setDescIsActive] = useState(false);
	const [ratingIsActive, setRatingIsActive] = useState(false);

	// Article details expension
	const [detailsAreExpand, setDetailsAreExpand] = useState(false);

	function showTabs(name) {
		if (name === "desc") {
			ratingIsActive && setRatingIsActive(!ratingIsActive);
			setDescIsActive(!descIsActive);
		}
		if (name === "rating") {
			descIsActive && setDescIsActive(!descIsActive);
			setRatingIsActive(!ratingIsActive);
		}
	}

	// find Id params
	const slug = useParams().id;
	const query = `*[_type == "product" && slug.current == "${slug}"]`;

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const result = await client.fetch(query);
				setProductData({
					id: result[0]._id,
					title: result[0].title,
					availableStock: result[0].availableStock,
					brand: result[0].brand,
					details: result[0].details,
					image: result[0].image,
					popularity: result[0].popularity,
					price: result[0].price,
				});
				setIsLoading(false);
			} catch (err) {
				setError(err);
			}
		};
		fetchData();
	}, [query, setProductData]);

	//display stock
	const displayStock = (availableStock) => {
		if (availableStock > 10) {
			return (
				<p className='largeStock'>
					<i className='fa-solid fa-check'></i>En stock
				</p>
			);
		}
		if (availableStock < 10 && availableStock > 1) {
			return (
				<p className='shortStock'>
					<i className='fa-solid fa-check'></i>Stock faible
				</p>
			);
		}
		if (availableStock === 0) {
			return (
				<p className='noStock'>
					<i className='fa-solid fa-xmark'></i> Ruputure de stock
				</p>
			);
		}
	};

	// return rating
	const renderStar = (i) => {
		const roundRating = productData.popularity;
		if (
			(i === 1 && roundRating < 1) ||
			(i === 2 && roundRating < 2) ||
			(i === 3 && roundRating < 3) ||
			(i === 4 && roundRating < 4) ||
			(i === 5 && roundRating < 5)
		) {
			return <Star color={"grey"} />;
		} else {
			return <Star color={"goldenrod"} />;
		}
	};

	// ADD TO CART
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [success, setSuccess] = useState(false);
	const [value, setValue] = useState(1);

	const { onAdd } = useCart();

	const addToCart = (e) => {
		e.preventDefault();
		// Check the input value
		if (value <= 0 || value > productData.availableStock) {
			setSuccess(false);
		} else {
			setSuccess(true);
			// onAdd(productData, value);
			onAdd(productData, value);
		}

		!modalIsOpen ? setModalIsOpen(true) : setModalIsOpen(false);
	};

	return (
		<>
			<main className='main-product'>
				{error && <p>{error}</p>}
				{isLoading ? (
					<Loader />
				) : (
					<>
						<div className='product-container'>
							<div className='product-container_left'>
								<img
									src={urlFor(productData.image[0])}
									alt={`Montre ${productData.title}`}
									className='product-card_img'
									height={400}
								></img>
							</div>
							<div
								className='product-container_right'
								id={productData.id}
							>
								<div className='product-informations'>
									<h1 className='product-title'>
										{productData.title}
									</h1>
									<h2 className='product-brand'>
										{productData.brand}
									</h2>
									<div className='product-price_container'>
										<span className='product-price'>
											{productData.price},
										</span>
										<span className='product-price_decimal'>
											00{" "}
										</span>
										<span className='product-price_sign'>
											€
										</span>
									</div>
									<span className='product-price_decimal'>
										TTC
									</span>
									<div className='product-paimentFacilities'></div>
									{detailsAreExpand ? (
										<p className='product-desc'>
											{productData.details}
										</p>
									) : (
										<>
											<p className='product-desc'>
												{productData.details.slice(
													0,
													200
												)}
											</p>
											<button
												className='expandDetailsBtn'
												onClick={(e) => {
													setDetailsAreExpand(
														!detailsAreExpand
													);
													e.preventDefault();
												}}
											>
												lire la suite..
											</button>
										</>
									)}
								</div>
								<div className='product-addToCart'>
									<form>
										<div className='formQty'>
											<label htmlFor='product-qty'>
												Quantité
											</label>
											<input
												type='number'
												id='product-qty'
												min='1'
												max={productData.availableStock}
												defaultValue='1'
												onChange={(e) =>
													setValue(
														Number(e.target.value)
													)
												}
											/>
										</div>
										<div className='formBtn'>
											<button
												className='btn product-button'
												onClick={(e) => addToCart(e)}
											>
												AJOUTER AU PANIER
											</button>
											{displayStock(
												productData.availableStock
											)}
										</div>
									</form>
								</div>
								<div className='reassurance'>
									<ul>
										<li>
											<div className='reassurance-item'>
												<span>
													<i className='fa-solid fa-truck'></i>{" "}
													Expédié sous 24h
												</span>
											</div>
										</li>
										<li>
											<div className='reassurance-item'>
												<span>
													<i className='fa-solid fa-thumbs-up'></i>
													Satisfait ou remboursé
												</span>
											</div>
										</li>
										<li>
											<div className='reassurance-item'>
												<span>
													<i className='fa-solid fa-shield'></i>
													Garantie 2 ans
												</span>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className='tabs'>
							<ul className='tabs-list'>
								<li onClick={() => showTabs("desc")}>
									<span>Description</span>
								</li>
								<li onClick={() => showTabs("rating")}>
									<span>Avis client</span>
								</li>
							</ul>
							<div className='tabs-details'>
								{ratingIsActive && (
									<div className='rating'>
										{renderStar(1)}
										{renderStar(2)}
										{renderStar(3)}
										{renderStar(4)}
										{renderStar(5)}
										<span>({productData.popularity})</span>
									</div>
								)}
								{descIsActive && (
									<section>{productData.details}</section>
								)}
							</div>
						</div>
					</>
				)}
			</main>
			{modalIsOpen && (
				<AddToCartModal
					open={modalIsOpen}
					onClose={() => setModalIsOpen(false)}
					successHandlter={success}
					productName={productData.title}
				/>
			)}
		</>
	);
};

export default Product;
