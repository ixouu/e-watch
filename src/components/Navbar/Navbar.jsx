import Logo from '../Logo/Logo';
import NavLinkComponent from './NavLinkComponent';
import ShoppingNumber from './ShoppingNumber';
import MobileNav from './MobileNav';

const NavBar = () => {
    return (
        <nav>
            <Logo/>
            <MobileNav/>
            <ul className='desktop-Nav'>
                <NavLinkComponent destination="/" title="Accueil"/>
                <NavLinkComponent destination="/categories" title="Catégories"/>
                <NavLinkComponent destination="/contact" title="Contact"/>
                <NavLinkComponent destination="/cart" title="Panier"/>
            </ul>
            <ShoppingNumber/>
        </nav>
    );
}

export default NavBar;
