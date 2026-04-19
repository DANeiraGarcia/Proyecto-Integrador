🛠️ Sistema de Ventas - Proyecto Integrador (Semana 05)
Este proyecto es una plataforma de E-commerce desarrollada en React + Vite, enfocada en la gestión y visualización de productos tecnológicos .

🚀 Funcionalidades Implementadas (Semana 05)
En esta fase, se transformó la estructura plana del sitio en una experiencia de usuario dinámica y organizada por categorías.

💎 Experiencia de Usuario (UX)
Rating Dinámico: Visualización de valoraciones (ej. 4.8/5) con estrellas en cada producto.

Detalle en Modal: Implementación de ProductDetailsModal para ver la ficha técnica sin perder el contexto de navegación.

Home Categorizado: La página principal agrupa automáticamente los productos por su categoría, mostrando los 4 mejores (ordenados por rating).

Filtros Avanzados: Nueva página CategoryProducts con buscador en tiempo real por nombre de producto.

⚙️ Arquitectura de Software
Normalización de Datos: Se implementó una capa de control de calidad que asegura que todo producto tenga rating, stock y precio válido.

Refactorización (Storage Utils): Extracción de la lógica de persistencia a src/utils/productsStorage.js para centralizar el manejo de localStorage.

Navegación por Estado: Sistema de navegación personalizado en App.jsx para gestionar vistas de Home, Categorías y CRUD.

🛠️ Tecnologías Utilizadas
React 18: Biblioteca principal para la interfaz.

Vite: Herramienta de construcción rápida.

CSS Modules: Estilos encapsulados para evitar colisiones.

LocalStorage API: Persistencia de datos local.

📦 Instalación y Uso
Clonar el repositorio.

Ejecutar npm install para instalar dependencias.

Iniciar el entorno de desarrollo con npm run dev.
