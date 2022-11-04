import React, {useEffect, useState} from 'react';
import { client } from "../../lib/client";
import ProductCard from '../ProductCard/Index'

const query = '*[_type == "product"]';

const Index = ({ parentComponent, category}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

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
    },[]);

    // Call ProductCard component and display it
    const componentGetter = (data) => {
        if (data.length < 1){
            return <p>Désolé aucuns produits à afficher</p>
        } else {
        return data.map(product=>{
            return (<ProductCard 
            key={product._id} 
            image={product.image} 
            title={product.title} 
            price={product.price} 
            brand={product.brand}  
            slug={product.slug.current} 
            availableStock={product.availableStock}/>)});
        }
    }

    // Display the filtered data for every type of parent components
    const displayProduct = () => {
        if (data.length < 1){
            return <p>Désolé aucuns produits à afficher</p>
        } else {
            switch (parentComponent) {
                case 'home':
                    return componentGetter(data.slice(0,4))
                case 'category':
                    const filteredData = data.filter(product => product.category[0] === category.toLowerCase());
                    return componentGetter(filteredData);
                case 'allProducts':
                    if (category === "all"){
                    return componentGetter(data);
                    } else {
                        const filteredData = data.filter(product => product.category[0] === category.toLowerCase());
                        return componentGetter(filteredData);
                    }
                default:
                    return <p>Désolé aucuns produits à afficher</p>
            }
        }}

    return (
        <div className={`main-${parentComponent}_productContent`}>
            { isLoading
            ?(<p> Chargement en cours...</p>)
            : displayProduct()
            }
        </div>
    );
}

export default Index;
