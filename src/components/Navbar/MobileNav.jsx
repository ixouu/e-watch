import { useState, useRef } from "react";
import NavLinkComponent from "./NavLink";

const MobileNav = () => {

    const [isOpen, setIsOpen] = useState(false)

    const mobileNavBar = useRef();

    const handleClick = () => {
        isOpen? setIsOpen(false) : setIsOpen(true);
        isOpen? mobileNavBar.current.classList.add('showMenu') :  mobileNavBar.current.classList.remove('showMenu')
    }

    const closeMobileNav = () => {
        setIsOpen(false);
        mobileNavBar.current.classList.remove('showMenu');
    }

    return (
        <div className="mobileNavBar">
         <button 
         className="mobileNavBar-btn" 
         onClick={handleClick}
         ><i className="fa-solid fa-bars"></i></button>
           <ul className="mobileNavBar-links" ref={mobileNavBar}>
                <NavLinkComponent destination="/" title="Acceuil" close={closeMobileNav}/>
                <NavLinkComponent destination="/categories" title="Catégories"/>
                <NavLinkComponent destination="/contact" title="Contact"/>
                <NavLinkComponent destination="/cart" title="Panier"/>
           </ul> 
        </div>
    );
}

export default MobileNav;
