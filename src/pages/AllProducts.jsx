import { useEffect, useState } from "react";
import { client } from "../lib/client";
import categories from "../utils/categories";

import Tag from "../components/Tag";
import ProductCard from '../components/ProductCard/Index';

const query = '*[_type == "product"]';

const AllProducts = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() =>{
        const fetchData = async() => {
            setIsLoading(true);
            try{
                const result = await client.fetch(query)
                setData(result)
                setIsLoading(false);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    },[setData])

    const filterCategory = (e) => {
        // const foundId = e.target.id.toLowerCase();
        setCurrentCategory(e.toLowerCase());
        console.log(currentCategory)
        const result = data.filter(product => product.category[0] === currentCategory);
        if (result.length !== 0){
            setIsFilter(true)
            setFilteredData(result)
        }  
    }
    return (
        <main className="main-allProducts">
            <div className="main-allProducts_text">
                <h1>E-watch spécialiste de la montre.</h1>
                <p>
                Montre femme, montre homme, montre enfant, montre automatique bien sûr, mais également montre digitale ou montre pas cher, notre passion des montres est vaste. Vous ne trouverez pas chez nous de montre de luxe inaccessibles mais plutôt des montres de qualité proposées à des prix justes et abordables. Nous portons une attention toute particulière à la fiabilité des montres proposées et sélectionnons avec soin les marques que nous vous présentons. Enfin, nous sommes une entreprise Française basée à Besançon, capitale de l’horlogerie, et nous sommes à votre service par email, via notre formulaire de contact ou encore par téléphone pour vous accompagner dans votre achat de montre et vous conseiller dans votre choix.
                </p>
            </div>
            <div className="main-allProducts_categoriesContainer">
                <h2>Filtrer par catégories :</h2>
                <div className="main-allProducts_categories">
                    {
                        categories.map((category,index)=> {return (
                        <Tag 
                        key={index} 
                        title={category}
                        id={category}
                        handleClick={filterCategory}
                        />
                        )})
                    }
                    {
                        isFilter && <button className="tag tag-Close" onClick={() => {setIsFilter(false); setCurrentCategory('')}}><i className="fa-solid fa-xmark"></i></button>
                    }
                </div>
            </div>
            <div className="main-allProducts_content">
                { isLoading
                ?<p> Chargement en cours...</p>
                : isFilter
                ?(
                    filteredData.map(product => {
                    return (
                        <ProductCard 
                        key={product._id} 
                        image={product.image} 
                        title={product.title} 
                        price={product.price} 
                        brand={product.brand}  
                        slug={product.slug.current} 
                        availableStock={product.availableStock}
                        />
                        )})
                )
                :(data.map(product => {
                    return (
                        <ProductCard 
                        key={product._id} 
                        image={product.image} 
                        title={product.title} 
                        price={product.price} 
                        brand={product.brand}  
                        slug={product.slug.current} 
                        availableStock={product.availableStock}
                        />
                        )})
                )
                }
            </div>
        </main>
    );
}

export default AllProducts;

