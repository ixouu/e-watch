import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/stateContext";

const ShoppingNumber = () => {

    const {totalQuantities} = useStateContext();

    return (
        <>
            {totalQuantities() >= 1 
            ?<Link to="/cart"><i className="fa-solid fa-bag-shopping"></i><span className='itemNumber'>{totalQuantities()}</span></Link>
            :<Link to="/cart"><i className="fa-solid fa-bag-shopping"></i></Link>  
            }
        </>
    );
        
       
}

export default ShoppingNumber;
