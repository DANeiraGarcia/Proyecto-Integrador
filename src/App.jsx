import { useState, useEffect } from 'react'; // <-- AGREGAR useEffect aquí
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import './App.css';

function App() {
  // --- MODIFICAR ESTADO ---
  // Cambiamos el valor fijo 'products' por una función que revisa el disco
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem('current_page');
    return savedPage ? savedPage : 'products'; 
  });

  
  // Cada vez que cambies de página (clic en el nav), se guarda el nombre
  useEffect(() => {
    localStorage.setItem('current_page', page);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home />;
      case 'products': return <ProductList />;
      case 'cart': return <Cart />;
      default: return <Home />;
    }
  };

  return (
    <div className="app-container">
      <Header setPage={setPage} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;