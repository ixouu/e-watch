import React from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import headerImg from '../../assets/images/header.webp'

const Header = () => {
    return (
        <header>
        <img src={headerImg} alt="Image de montre"/>
            <div className='header-filter'>
                <h1 className='header-title'>La vie est comme une montre dont chaque seconde est précieuse</h1>
                <div className='header-btns'>
                    <ButtonComponent title="Toutes les montres" color="rgb(18, 18, 18)" link="all-products" class1="btn header-btn" height="60px"/>
                    <ButtonComponent title="Catégories" link="categories" color="rgb(18, 18, 18)" class1="btn header-btn"/>
                </div>
                
            </div>
        </header>
    );
}

export default Header;
