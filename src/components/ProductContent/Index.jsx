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
    },[])

    const displayProduct = () => {
        if (parentComponent === 'home'){
            return data.slice(0,4).map(product=>{
                return (<ProductCard 
                key={product._id} 
                image={product.image} 
                title={product.title} 
                price={product.price} 
                brand={product.brand}  
                slug={product.slug.current} 
                availableStock={product.availableStock}
                />)
        });
        }else if (parentComponent === "category"){
            const filteredData = data.filter(product => product.category[0] === category.toLowerCase());
            return filteredData.map(product=>{
                return (<ProductCard 
                key={product._id} 
                image={product.image} 
                title={product.title} 
                price={product.price} 
                brand={product.brand}  
                slug={product.slug.current} 
                availableStock={product.availableStock}
                />)
            });
        }
    }

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
