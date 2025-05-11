import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';
import { ProductProvider } from './context/ProductContext';

export default function App() {
  return (
    <ProductProvider>
      <div className="app">
        <Navbar />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </div>
    </ProductProvider>
  );
}