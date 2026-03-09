import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import ProductDetailsModal from '../components/ProductDetailsModal';
// Importamos la lógica centralizada de almacenamiento
import { getStoredProducts, saveProducts } from '../utils/productsStorage';

const ProductList = () => {
  // 1. ESTADOS
  // Usamos la función del utils para cargar la data (incluye normalización de rating)
  const [products, setProducts] = useState(() => getStoredProducts());
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  
  // NUEVO: Estado para el producto que se verá en el detalle (Modal)
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 2. FUNCIONES CRUD
  const handleSaveProduct = (product) => {
    if (product.id) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      // Al crear, garantizamos un rating por defecto (0) si no viene uno
      const newProduct = { ...product, id: Date.now(), rating: product.rating || 0 };
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

  // PERSISTENCIA: Usamos la función centralizada saveProducts
  useEffect(() => {
    saveProducts(products);
  }, [products]);

  // 3. RENDERIZADO
  return (
    <div className="container" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2>Listado de Productos</h2>
        <button 
          onClick={() => setIsFormOpen(true)}
          style={{ background: '#003366', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', border: 'none' }}
        >
          + Agregar Producto
        </button>
      </div>

      {/* MODAL DE DETALLE: Solo se muestra si selectedProduct no es null */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* FORMULARIO DE EDICIÓN/CREACIÓN */}
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
            // PASAMOS LA FUNCIÓN AL HIJO PARA ABRIR EL MODAL
            onShowDetails={() => setSelectedProduct(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;