import { Routes, Route } from 'react-router-dom'



import { StateContext } from './context/stateContext.js';


import Layout from "./components/Layout/Index.jsx";
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Product from './pages/Product.jsx';
import Validation from './pages/Validation.jsx';
import Categories from './pages/Categories.jsx';
import Contact from './pages/Contact.jsx';
import Error from './pages/Error.jsx';

import NavBar from './components/Navbar/Index.jsx';
import Footer from './components/Footer/Index.jsx';

function App() {

  

  return (
    <>
      <StateContext>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/validation" element={<Validation />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer/>
      </StateContext>
    </>
  );
}

export default App;
