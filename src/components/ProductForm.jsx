import { useState, useEffect } from 'react';
import styles from '../styles/ProductForm.module.css';

const ProductForm = ({ onSave, onCancel, productToEdit }) => {
  const [formData, setFormData] = useState({
    id: null,
    nombre: '',
    precio: '',
    categoria: '',
    imagen: '',
    stock: 0
  });

  // Si estamos en modo edición, cargamos los datos del producto
  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>{productToEdit ? 'Editar Producto' : 'Nuevo Producto'}</h3>
      <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
      <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
      <input type="text" name="categoria" placeholder="Categoría" value={formData.categoria} onChange={handleChange} required />
      <input type="text" name="imagen" placeholder="URL Imagen" value={formData.imagen} onChange={handleChange} />
      <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
      
      <div className={styles.actions}>
        <button type="submit" className={styles.saveBtn}>Guardar</button>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancelar</button>
      </div>
    </form>
  );
};

export default ProductForm;