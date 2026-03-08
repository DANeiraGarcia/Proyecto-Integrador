import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import { initialProducts } from '../data/products'; 

const ProductList = () => {
  // 1. ESTADOS (Revisar que estén los TRES)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('productos_tienda');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  
  // Faltaban estos dos abajo:
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // 2. FUNCIONES CRUD
  const handleSaveProduct = (product) => {
    if (product.id) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      const newProduct = { ...product, id: Date.now() };
      setProducts([...products, newProduct]);
    }
    setIsFormOpen(false);
    setProductToEdit(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este repuesto?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setIsFormOpen(true);
  };

  // PERSISTENCIA
  useEffect(() => {
    localStorage.setItem('productos_tienda', JSON.stringify(products));
  }, [products]);

  // 3. RENDERIZADO
  return (
    <div className="container" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2>Listado de Productos</h2>
        <button 
          onClick={() => setIsFormOpen(true)}
          style={{ background: '#003366', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
        >
          + Agregar Producto
        </button>
      </div>

      {isFormOpen && (
        <ProductForm 
          onSave={handleSaveProduct} 
          onCancel={() => { setIsFormOpen(false); setProductToEdit(null); }}
          productToEdit={productToEdit}
        />
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onEdit={() => handleEditClick(product)}
            onDelete={() => handleDeleteProduct(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;