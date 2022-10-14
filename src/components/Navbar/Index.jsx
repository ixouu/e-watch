import { NavLink } from 'react-router-dom';
import Logo from '../Logo';
import ShoppingNumber from './ShoppingNumber';

const NavBar = () => {
    return (
        <nav>
            <Logo/>
            <ul>
                <li>
                    <NavLink 
                    end
                    to ='/' 
                    className={({ isActive , isPending}) =>
                        isActive
                        ? 'active'
                        : isPending
                        ? 'pending'
                        : ''
                    }
                     >Acceuil</NavLink>
                </li>
                <li>
                    <NavLink 
                    to ='/categories'
                    className={({ isActive , isPending}) =>
                        isActive
                        ? 'active'
                        : isPending
                        ? 'pending'
                        : ''
                    }
                    >Catégories</NavLink>
                </li>
                <li>
                    <NavLink 
                    to ='/contact'
                    className={({ isActive , isPending}) =>
                        isActive
                        ? 'active'
                        : isPending
                        ? 'pending'
                        : ''
                    }
                    >Contact</NavLink>
                </li>
                <li>
                    <NavLink 
                    to ='/cart'
                    className={({ isActive , isPending}) =>
                        isActive
                        ? 'active'
                        : isPending
                        ? 'pending'
                        : ''
                    }
                    >Panier <ShoppingNumber/></NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
