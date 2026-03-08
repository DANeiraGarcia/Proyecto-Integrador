import { useEffect,useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
// Supongamos que tu data inicial está en un archivo separado
import { initialProducts } from '../data/products'; 

const ProductList = () => {
  // 1. ESTADOS
  const [products, setProducts] = useState(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // 2. FUNCIONES CRUD
  const handleSaveProduct = (product) => {
    if (product.id) {
      // Editar
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      // Crear (usamos Date.now() como ID temporal)
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

  useEffect(() => {
  const savedProducts = localStorage.getItem('productos_tienda');
  if (savedProducts) {
    setProducts(JSON.parse(savedProducts));
  }
}, []);
// useEffect para GUARDAR los productos cada vez que cambien (Commit 8df1916)
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
          style={{ background: '#003366', color: 'white', padding: '10px 20px', borderRadius: '5px' }}
        >
          + Agregar Producto
        </button>
      </div>

      {/* Si el formulario está abierto, se muestra arriba */}
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