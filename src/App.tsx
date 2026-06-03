import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ColorKey } from './data/colors';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Esprit from './components/Esprit';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Specs from './components/Specs';
import Equipment from './components/Equipment';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Categories from './pages/admin/Categories';
import ProtectedRoute from './components/ProtectedRoute';

function Home() {
  const [activeColor, setActiveColor] = useState<ColorKey>('blanc');
  return (
    <>
      <Nav />
      <Hero activeColor={activeColor} onColorChange={setActiveColor} />
      <Esprit activeColor={activeColor} />
      <Features />
      <Gallery activeColor={activeColor} onColorChange={setActiveColor} />
      <Specs />
      <Equipment />
      <Pricing />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pieces" element={<Shop />} />
      <Route path="/pieces/:id" element={<ProductDetail />} />
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route
        path="/admin/produits"
        element={<ProtectedRoute><Products /></ProtectedRoute>}
      />
      <Route
        path="/admin/categories"
        element={<ProtectedRoute><Categories /></ProtectedRoute>}
      />
    </Routes>
  );
}
