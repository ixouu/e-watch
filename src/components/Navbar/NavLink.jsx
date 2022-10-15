import { NavLink } from "react-router-dom";

const NavLinkComponent = ({ destination, title, close}) => {
    return (
        <li>
        <NavLink
        to ={destination}
        end
        className={({ isActive , isPending}) =>
            isActive
            ? 'active'
            : isPending
            ? 'pending'
            : ''
        }
        onClick={()=> close()}
        >{title}</NavLink>
    </li>
    );
}

export default NavLinkComponent;
