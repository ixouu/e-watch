import React, { createContext, useContext, useState } from "react";
import { useData } from "../hooks/useData";

const Context = createContext();

export const StateContext = ({ children }) => {
    let foundProduct;
    let index;
    
    const { isLoading, data, error } = useData();
    const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState(storage);

    const updateBasket = (id, qty, image, title, price, availableStock) => {
        const productToAdd = {
            id,
            qty,
            image,
            title,
            price, 
            availableStock
        }
        let foundProduct = storage.find(item => item.id === id);
        if (!foundProduct) {
            storage.push(productToAdd);
            saveCart(storage);
            setCartItems(storage);
        } else {
            if (foundProduct.qty !== qty) {
                let updatedStorage = storage.map(product => {
                    if (product.id === foundProduct.id) {
                        return { ...product, qty: qty }
                    } else {
                        return product
                    }
                })
                saveCart(updatedStorage);
                setCartItems(updatedStorage);
            }
        }
        totalQuantities();
    }

    const removeFromBasket = (id) => {
        let foundProduct = storage.find(item => item.id === id);
        if (!foundProduct) {
            throw new Error("id not available in the LS")
        } else {
            const filteredCart = storage.filter((product) => product.id !== foundProduct.id);
            saveCart(filteredCart);
        }
    }

    const onRemove = (id) => {
        foundProduct = cartItems.find((item) => item.id === id);
        const newCartItems = cartItems.filter((item) => item.id !== id)
        setCartItems(newCartItems);
        removeFromBasket(id);
    }

    const onClearLocalStorage = () =>{
        localStorage.clear();
        setCartItems([]);
    }

    const toggleCartItemQuanitity = (id, action) => {
        foundProduct = cartItems.find((item) => item.id === id);
        if (action === 'inc' && foundProduct) {
            if (foundProduct.qty === foundProduct.availableStock){
                return updateBasket(foundProduct.id, foundProduct.qty, foundProduct.image, foundProduct.title, foundProduct.price, foundProduct.availableStock)
            }
            updateBasket(foundProduct.id, foundProduct.qty + 1, foundProduct.image, foundProduct.title, foundProduct.price, foundProduct.availableStock)
        } else if (action === 'dec' && foundProduct) {
            if (foundProduct.qty > 1) {
                updateBasket(foundProduct.id, foundProduct.qty - 1, foundProduct.image, foundProduct.title, foundProduct.price, foundProduct.availableStock)
            }
        }
    }

    const onAdd = (product, quantity) => {
            updateBasket(product.id, quantity, product.image, product.title, product.price, product.availableStock);

    }

    const totalQuantities = () => {
        const quantities = []
        if (cartItems && cartItems.length >= 1){
            cartItems.map(product => {
            let result = 0;
            result += product.qty
            return quantities.push(result)
        })
        return quantities.reduce((a, b) => a + b)
        }
        else return 0;
    }

        const totalPrice = () =>{
            let prices = [];
                if (cartItems.length >= 1) {
                    cartItems.map((product) => {
                        const item = data.find((item) => item._id === product.id);
                        return item && prices.push(item.price * product.qty);
                });
                const totalPrice = prices.length > 0 && prices.reduce((a, b) => a + b);
                return totalPrice;
                } else {
                    return 0;
                }
        }

    const [ userInformations, setUserInformations ] = useState({})
    const saveUserInformations = (form) => {
        setUserInformations(form)
    }



    return (
        <Context.Provider value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            onAdd,
            toggleCartItemQuanitity,
            onRemove,
            saveUserInformations,
            userInformations,
            onClearLocalStorage
        }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);