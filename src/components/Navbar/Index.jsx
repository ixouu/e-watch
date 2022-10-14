import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <Link to ='/'>Acceuil</Link>
            <Link to ='/contact'>Contact</Link>
            <Link to ='/cart'>Panier</Link>
        </nav>
    );
}

export default NavBar;
