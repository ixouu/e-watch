import { Routes, Route } from 'react-router-dom'



import { StateContext } from './context/stateContext.js';


import Layout from "./components/Layout/Layout.jsx";
import Home from './pages/Home/Home.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Product from './pages/Product/Product.jsx';
import Validation from './pages/Validation/Validation.jsx';
import Categories from './pages/Categories/Categories.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Paiement from './pages/Paiement/Paiement.jsx';
import Error from './pages/Error/Error.jsx';

import NavBar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import AllProducts from './pages/AllProducts/AllProducts.jsx';
import Category from './pages/Category/Category.jsx';

function App() {

  

  return (
    <>
          <StateContext>
              <NavBar/>
              <Routes>
                <Route path="/" element={<Layout />} />
                <Route index element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/all-products" element={<AllProducts/>}/>
                <Route path="/cart" element={<Cart />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:category" element={<Category/>}/>
                <Route path="/contact" element={<Contact />} />
                <Route path="/validation" element={<Validation />} />
                <Route path="/paiement" element={<Paiement />} />
                <Route path="*" element={<Error />} />
              </Routes>
              <Footer/>
          </StateContext>
    </>
  );
}

export default App;
