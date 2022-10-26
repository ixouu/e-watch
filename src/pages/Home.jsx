import { useEffect, useState} from "react";
import { client } from "../lib/client";

import Header from "../components/Header/Index";
import Service from "../components/Service";
import ProductCard from '../components/ProductCard/Index'
import ButtonComponent from "../components/ButtonComponent";



const servicesData = [
    {
        title: 'Fabrication de qualité',
        icon : 'fa-solid fa-gift',
        desc : 'E-watch et ses fournisseurs s\'engagent au quotdien pour vous proposer des produits de vérifiés et sans défaults.'
    },
    {
        title : 'Livraison rapide',
        icon : 'fa-sharp fa-solid fa-globe',
        desc :'Nous vous garantissons une livraison rapide chez vous en moins de 2 jours ouvrés. Vous n\'êtes pas chez vous ? Récupérez votre montre dans le dépôt relais le plus proche de chez vous.',

    },
    {
        title:'100% satisfait',
        icon: 'fa-solid fa-star', 
        desc: 'Chez E-watch la garantie client est notre principale priorité, contactez notre service client en cas de questions ou de litige.'

    }
]

// return all the services from servicesData 
const displayServices = () => {
    return servicesData.map ((e, index) => {
        return <Service key={index} title={e.title} icon={e.icon} desc={e.desc}/>
    })
}

const query = '*[_type == "product"]';

const Home = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

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

    return (
        <>
        <Header />
        <main className="home-main">
            <div className="main-titleContainer">
                <h2>Portez votre montre avec élégance</h2>
                <span> Les derniers modèles tendances sont disponibles dans notre magasin, découvrez-les sans plus tarder. </span>
            </div>
            <div className="main-Services">
                {displayServices()}
            </div>
            <div className="main-products">
                <h2>Nos montres coups de coeur</h2>
                <span>Plébiscitées par nos visiteurs, les montres "Best" sont les plus vendues. Laissez vous
                tenter par leurs charmes ...</span>
                <div className="main-products_content">
                    { isLoading
                    ?(<p> Chargement en cours...</p>)
                    :
                        data.slice(0,4).map(product=>{
                        return (<ProductCard key={product._id} image={product.image} title={product.title} price={product.price} brand={product.brand}  slug={product.slug.current} availableStock={product.availableStock}/>)
                    })}
                </div>
                    <ButtonComponent 
                    title={"Toutes les montres"} 
                    link={'all-products'} 
                    width={"200px"} 
                    height={"70px"}
                    />
                </div>
        </main>
        </>
    );
}

export default Home;
