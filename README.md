# Sistema de Ventas - Proyecto Integrador

Este proyecto es una plataforma E-commerce desarrollada con React + Vite, enfocada en la gestion y visualizacion de productos tecnologicos.

## Tecnologias utilizadas

- React
- React Router DOM
- Vite
- CSS Modules
- LocalStorage API

## Instalacion y ejecucion

1. Clonar el repositorio.
2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en desarrollo:

```bash
npm run dev
```

4. Validar calidad y build de produccion:

```bash
npm run lint
npm run build
```

## Cronologia por semanas

## Semana 01 - Base del proyecto

En esta fase se preparo la base del frontend con Vite + React y la estructura inicial del proyecto.

### Objetivos

- Crear el proyecto y organizar carpetas base.
- Definir layout inicial con Header, Navbar, Footer y area principal.

### Resultado

- Aplicacion inicial funcional.
- Estructura base lista para evolucionar por iteraciones.

## Semana 02 - Modelo de producto y visualizacion

En esta fase se comenzo a modelar el catalogo y su presentacion en tarjetas.

### Objetivos

- Definir datos de producto.
- Mostrar productos en cards reutilizables.

### Resultado

- Vista de productos funcional.
- Base para filtros y detalle de productos.

## Semana 03 - CRUD de productos

En esta fase se implemento gestion de productos desde la interfaz.

### Objetivos

- Crear, editar y eliminar productos.
- Consolidar flujo de mantenimiento de catalogo.

### Resultado

- CRUD operativo en la vista de listado.
- Componentes de formulario y acciones por producto.

## Semana 04 - Persistencia local y mejoras de flujo

En esta fase se robustecio la persistencia local de datos y la logica de apoyo.

### Objetivos

- Persistir informacion en localStorage.
- Separar utilidades de almacenamiento.

### Resultado

- Datos de productos persistentes.
- Base preparada para carrito, checkout y ordenes.

## Semana 05 - Catalogo dinamico por categorias

En esta fase se transformo la experiencia plana del catalogo en una experiencia dinamica por categorias.

### Experiencia de usuario (UX)

- Rating dinamico con estrellas por producto.
- Detalle en modal sin perder contexto de navegacion.
- Home categorizado con productos destacados por rating.
- Filtro por nombre en pagina de categoria.

### Arquitectura

- Normalizacion de datos (rating, stock, precio).
- Refactor de persistencia en utilidades.
- Navegacion por estado en App para Home/Categorias/CRUD.

### Resultado

- Catalogo mas navegable y enfocado en descubrimiento.

## Semana 06 - Carrito de compras

En esta fase se completo el flujo de agregar al carrito y administrar cantidades.

### Funcionalidades

- Agregar producto al carrito desde cards y modal.
- Ver contador de unidades en navbar.
- Ajustar cantidades en carrito (+/-).
- Eliminar productos individuales.
- Vaciar carrito completo.

### Persistencia

- `carrito_tienda`: conserva el carrito al recargar.

### Resultado

- Flujo de carrito completo y persistente.

## Semana 07 - Checkout y confirmacion de pedido

En esta fase se cerro el flujo de compra iniciado con carrito.

### Flujo de compra

1. Usuario agrega productos al carrito.
2. Entra a Cart.
3. Presiona Proceder al checkout.
4. Completa formulario de compra.
5. Selecciona envio y metodo de pago.
6. Confirma pedido.
7. Visualiza pantalla de confirmacion.

### Persistencia

- `ordenes_tienda`: guarda pedidos confirmados.
- Al confirmar, el carrito se vacia.

### Resultado

- Compra end-to-end implementada.

## Semana 08 - Navegacion por rutas reales (React Router)

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
3. Presiona Proceder al checkout y navega a `/checkout`.
4. Completa datos de compra, selecciona envio y metodo de pago.
5. Confirma el pedido y navega a `/order-confirmation`.
6. El carrito se vacia automaticamente y la orden queda guardada en localStorage.

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
- Recuperacion de ordenes desde localStorage.
- Detalle de pedido con react-router-dom.
- Consulta de compras anteriores sin romper carrito ni checkout.

## Semana 10-11 - Autenticacion local y rutas protegidas

En esta fase se implemento autenticacion local con contexto para proteger cuenta y compra.

### Funcionalidades

- Registro de usuario local.
- Login local.
- Sesion persistente en localStorage.
- Cierre de sesion (logout).
- Navbar dinamico:
  - sin sesion: Login y Registrarse
  - con sesion: nombre del usuario y boton Salir
- Guard de rutas con ProtectedRoute.

### Rutas protegidas

- `/account`
- `/account/orders/:orderId`
- `/checkout`
- `/order-confirmation`

### Persistencia

- `usuarios_tienda`: usuarios registrados.
- `sesion_tienda`: sesion activa del usuario.

### Resultado

- Flujo de autenticacion local completo.
- Cuenta y compras disponibles solo para usuario autenticado.
- Carrito y checkout mantenidos sin regresiones funcionales.

## Estado final del proyecto

El proyecto cuenta con:

- Catalogo con CRUD y categorias.
- Carrito persistente y checkout funcional.
- Confirmacion de pedido y almacenamiento de ordenes.
- Historial y detalle de compras en Mi cuenta.
- Autenticacion local con rutas protegidas.
- Navegacion completa con React Router.
