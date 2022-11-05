import { useParams } from 'react-router-dom';
import { categoriesService } from '../../utils/categories'
import ProductContent from '../../components/ProductContent/ProductContent'


const Category = () => {

    // search the cat in the URI
    const currentCategory = useParams().category;

    // translate the title
    const currentTitle = categoriesService.displayTitle(currentCategory);

    // display the appropriate text depends of the category
    const currentText = categoriesService.displayText(currentCategory);

    return (
        <main className='main-category'>
            <h1>Montres {currentTitle}</h1>
            <p>{currentText}</p>
            <ProductContent parentComponent={'category'} category={currentCategory}/>
        </main>
    );
}

export default Category;
