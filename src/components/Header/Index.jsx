import React from 'react';
import ButtonComponent from '../ButtonComponent';

const Header = () => {
    return (
        <header>
            <div className='header-filter'>
                <h1>La vie est comme une montre dont chaque seconde est précieuse</h1>
                <div className='header-btns'>
                    <ButtonComponent title="Toutes les montres" color="#F1F1F1" link="categories" class1="btn header-btn" height="60px"/>
                    <ButtonComponent title="Catégories" link="categories" color="#F1F1F1" class1="btn header-btn"/>
                </div>
                
            </div>
        </header>
    );
}

export default Header;
