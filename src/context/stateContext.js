import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {

    const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    const updateBasket = (id, qty, image, title, price) => {
        const productToAdd = {
            id,
            qty,
            image,
            title,
            price
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

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState(storage);


    let foundProduct;
    let index;

    const onRemove = (id) => {
        foundProduct = cartItems.find((item) => item.id === id);
        const newCartItems = cartItems.filter((item) => item.id !== id)
        setCartItems(newCartItems);
        removeFromBasket(id);
    }

    const toggleCartItemQuanitity = (id, action) => {
        foundProduct = cartItems.find((item) => item.id === id);
        if (action === 'inc' && foundProduct) {
            updateBasket(foundProduct.id, foundProduct.qty + 1, foundProduct.image, foundProduct.title, foundProduct.price)
        } else if (action === 'dec' && foundProduct) {
            if (foundProduct.qty > 1) {
                updateBasket(foundProduct.id, foundProduct.qty - 1, foundProduct.image, foundProduct.title, foundProduct.price)
            }
        }
    }

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(item => item.id === product.id);
        if (checkProductInCart) {
            updateBasket(product.id, quantity, product.image, product.title, product.price);
        } else {
            updateBasket(product.id, quantity, product.image, product.title, product.price);
        }
    }

    const totalQuantities = () => {
        const quantities = []
        cartItems.map(product => {
            let result = 0;
            result += product.qty
            return quantities.push(result)
        })
        return quantities.reduce((a, b) => a + b)
    }

    const totalPrice = () => {
        const prices = [];
        cartItems.map(product => {
            let result = 0;
            result += product.qty * product.price
            return prices.push(result)
        })
        return prices.reduce((a, b) => a + b)
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
            onRemove
        }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);