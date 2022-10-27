import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client , urlFor } from "../lib/client";

import ButtonComponent from "../components/ButtonComponent";


const Product = () => {

    const [productData, setProductData] = useState({
        title: '',
        id : '',
        availableStock: '',
        brand : '',
        category : [],
        details :'',
        image: [],
        popularity: 0,
        price: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    // find Id params 
    const slug = useParams().id;
    const query = `*[_type == "product" && slug.current == "${slug}"]`;

    useEffect(() => {
        const fetchData = async() =>{
            setIsLoading(true);
            try{
                const result = await client.fetch(query);
                setProductData({
                    id : result[0].id,
                    title : result[0].title,
                    availableStock: result[0].availableStock,
                    brand : result[0].brand,
                    details : result[0].details,
                    image : result[0].image,
                    popularity : result[0].popularity,
                    price : result[0].price
                });
                setIsLoading(false);
            }
            catch(err){
                setError(err)
            }
        }
        fetchData();
    },[query , setProductData])

    //display stock
    const displayStock = (availableStock) => {
    if (availableStock > 10){
      return <p className='largeStock'><i className="fa-solid fa-check"></i>En stock</p>
    }
    if (availableStock < 10 && availableStock > 1){
      return <p className='shortStock'><i className="fa-solid fa-check"></i>Stock faible</p>
    }
    if (availableStock === 0){
      return <p className='noStock'><i className="fa-solid fa-xmark"></i> Ruputure de stock</p>
    }
  }



    return (
        <main>
            {error && <p>{error}</p> }
            {isLoading
            ?<p>Chargement...</p>
            :(
                <>
                <div className="product-container">
                    <div className="product-container_left">
                    <img 
                        src={urlFor(productData.image[0])}
                        alt={`Montre ${productData.title}`}
                        className='product-card_img'
                        height={300}
                        ></img>
                    </div>
                    <div className="product-container_right" id={productData.id}>
                        <div className="product-informations">
                            <h1 className="product-title">{productData.title}</h1>
                            <h2 className="product-brand">{productData.brand}</h2>
                            <span className="product-price">{productData.price},00 €</span>
                            <span>TTC</span>    
                            <div className="product-paimentFacilities"></div>
                            <p className="product-desc">{productData.details}</p>
                        </div>
                        <div className="product-addToCart">
                            <form>
                                <label htmlFor="product-qty">Quantité</label>
                                <input type="number" id="product-qty" min="1" max={productData.availableStock}defaultValue="1"/>
                                <ButtonComponent title={"AJOUTER AU PANIER"} color={"#239de5"} width="200px" height="50px" borderRadius={"5px"}/>
                                {displayStock(productData.availableStock)}
                            </form>
                        </div>
                    </div>
                    <div className="reassurance">
                        <ul>
                            <li><div className="reassurance-item"><span><i className="fa-solid fa-truck"></i> Expédié sous 24h</span></div></li>
                            <li><div className="reassurance-item"><span><i className="fa-solid fa-thumbs-up"></i>Satisfait ou remboursé</span></div></li>
                            <li><div className="reassurance-item"><span><i className="fa-solid fa-shield"></i>Garantie 2 ans</span></div></li>
                        </ul>
                    </div>
                </div>
                <div className="tabs">
                    <ul className="tabs-list">
                        <li><a href="#description">Description</a></li>
                        <li><a href="#popularity">Avis client</a></li>
                    </ul>
                </div>
                <div className="tab-content">

                </div>
                </>
            )
             }
        </main>
    );
}

export default Product;
