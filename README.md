🛠️ Sistema de Ventas - Proyecto Integrador (Semana 05)
Este proyecto es una plataforma de E-commerce desarrollada en React + Vite, enfocada en la gestión y visualización de productos tecnológicos (Gaming, Hardware y Periféricos).

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

## Semana 08 - Navegacion por Rutas (React Router)

En esta fase se migro la navegacion basada en estado a rutas reales con `react-router-dom`.

### Rutas principales

- `/` -> Home
- `/products` -> Listado de productos (CRUD)
- `/category/:categoryName` -> Productos por categoria
- `/cart` -> Carrito de compras
- `/checkout` -> Formulario de checkout
- `/order-confirmation` -> Confirmacion final del pedido

### Flujo de compra completo

1. El usuario agrega productos al carrito.
2. Entra a `/cart` y ajusta cantidades o elimina productos.
3. Presiona **Proceder al checkout** y navega a `/checkout`.
4. Completa datos de compra, selecciona envio y metodo de pago.
5. Confirma el pedido y navega a `/order-confirmation`.
6. El carrito se vacia automaticamente y la orden queda guardada en `localStorage`.

### Persistencia

- `carrito_tienda`: conserva el carrito al recargar.
- `ordenes_tienda`: almacena pedidos confirmados.

## Semana 09 - Mi cuenta y pedidos guardados

En esta fase se agrego una seccion de cuenta para consultar compras anteriores sin afectar el flujo de carrito y checkout.

### Rutas de cuenta

- `/account` -> Perfil mock y listado de pedidos
- `/account/orders/:orderId` -> Detalle de una compra

### Funcionalidades

- Acceso a Mi cuenta desde el navbar.
- Perfil mock con datos basicos del usuario.
- Recuperacion de ordenes desde `localStorage`.
- Detalle de pedido con `react-router-dom`.
- Consulta de compras anteriores sin romper carrito ni checkout.