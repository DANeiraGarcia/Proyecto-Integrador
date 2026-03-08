import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import './App.css';

function App() {
  // El "selector de modo" de nuestra App
  const [page, setPage] = useState('home');

  // Función para decidir qué componente renderizar en el centro
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home />;
      case 'products':
        return <ProductList />;
      case 'cart':
        return <Cart />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      {/* Pasamos setPage al Header para que el Navbar pueda cambiar el estado */}
      <Header setPage={setPage} />
      
      <main className="main-content">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

export default App;