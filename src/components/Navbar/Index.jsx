import Logo from '../Logo';
import NavLinkComponent from './NavLink';
import ShoppingNumber from './ShoppingNumber';
import MobileNav from './MobileNav';

const NavBar = () => {
    return (
        <nav>
            <Logo/>
            <MobileNav/>
            <ul className='desktop-Nav'>
                <NavLinkComponent destination="/" title="Acceuil"/>
                <NavLinkComponent destination="/categories" title="Catégories"/>
                <NavLinkComponent destination="/contact" title="Contact"/>
                <NavLinkComponent destination="/cart" title="Panier"/>
            </ul>
            <ShoppingNumber/>
        </nav>
    );
}

export default NavBar;
