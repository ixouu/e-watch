import React from 'react';
import { useParams } from 'react-router-dom';
import { categoriesService } from '../utils/categories'
import { useEffect, useState } from 'react';
import { client } from "../lib/client";

import ProductCard from '../components/ProductCard/Index'

const query = '*[_type == "product"]';

const Category = () => {

    // search the cat in the URI
    const currentCategory = useParams().category;

    // translate the title
    const currentTitle = categoriesService.displayTitle(currentCategory);

    // display the appropriate text depends of the category
    const currentText = categoriesService.displayText(currentCategory);

    // data Fetching
    const [catData, setCatData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            setIsLoading(true);
            try{
                const fetchedData = await client.fetch(query);
                const result = fetchedData.filter(product => product.category[0] === currentCategory.toLowerCase());
                if (result.length !== 0){
                    setCatData(result)
                    setIsLoading(false);
                }  
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    },[])


    return (
        <main className='main-category'>
            <h1>Montres {currentTitle}</h1>
            <p>{currentText}</p>
            <div className="main-category_content">
            { isLoading
                ?<p> Chargement en cours...</p>
                : (catData.map(product => {
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

export default Category;
