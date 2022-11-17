import categories from "../../utils/categories";
import Button from '../../components/ButtonComponent/ButtonComponent';

const Categories = () => {
    
    const displayTitle = (title) => {
        switch (title) {
            case 'Child':
                return "Enfant";
            case 'Female':
                return "Femme";
            case 'Male': 
                return 'Homme'
            default:
                break;
        }
    }

    const diplayBtns = (cats) => {
        return cats.map((cat, index) => {
            const linkURL = `../categories/${cat}`
             return <li key={index} ><Button key={cat} title={displayTitle(cat)} width={"300px"} height={"100px"} link={linkURL}/></li>
        })
    }

    return (
        <main className="main-categories">
            <h1>Catégories</h1>
            <p>Toutes les marques de montres sur 1001-montres.fr ont une identité qui leur est propre, une histoire, des valeurs et un savoir-faire horloger précieux. Certaines sont bien connues, d'autres restent à découvrir ! En général, on reconnaît facilement une marque grâce à son logo, son style particulier et son univers qui lui est associé.</p>
            <ul>
                {diplayBtns(categories)}
            </ul>
        </main>
    );
}

export default Categories;
