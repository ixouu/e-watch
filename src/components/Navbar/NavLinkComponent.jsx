import { NavLink } from "react-router-dom";

const NavLinkComponent = ({ destination, title, closeMobileNav}) => {
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
        onClick={() => closeMobileNav !== 'undefined' && closeMobileNav()}
        >{title}</NavLink>
    </li>
    );
}

export default NavLinkComponent;
