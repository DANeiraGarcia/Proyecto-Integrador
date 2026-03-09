import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import CategoryProducts from './pages/CategoryProducts'; // <-- IMPORTAR
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  // Nuevo estado para saber qué categoría mostrar
  const [activeCategory, setActiveCategory] = useState(null);

  // Función para navegar a una categoría específica
  const navigateToCategory = (cat) => {
    setActiveCategory(cat);
    setPage('category');
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home onCategoryClick={navigateToCategory} />;
      case 'category':
        return (
          <CategoryProducts 
            category={activeCategory} 
            onBack={() => setPage('home')} 
          />
        );
      case 'products':
        return <ProductList />;
      case 'cart':
        return <Cart />;
      default:
        return <Home onCategoryClick={navigateToCategory} />;
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