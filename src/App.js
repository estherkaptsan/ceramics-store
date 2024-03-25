import logo from './logo.svg';
import main from './style/main.scss'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AppHeader from './cmps/AppHeader';
import About from './cmps/About';
import Contact from './cmps/Contact';
import HomePage from './pages/HomePage';
import ItemExplore from './pages/ItemExplore';
import ItemDetails from './cmps/ItemDetails';
import ItemEdit from './cmps/ItemEdit';
import PaymentPage from './pages/PaymentPage';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage'
import LoginForm from './pages/LogIn';
import Footer from './cmps/Footer';
import Sale from './pages/Sale';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  
  return (
    <Router>
      <div className="App main-container">
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/item/:category?" element={<ItemExplore />} />
          <Route path="/details/:id?" element={<ItemDetails />} />
          <Route path="/item/edit/:id?" element={<ItemEdit />} />
          <Route path="/sale" element={<Sale />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
