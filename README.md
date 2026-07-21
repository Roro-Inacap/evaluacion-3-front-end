# Evaluación Unidad 3 - Gestión de Libros

Aplicación web SPA desarrollada con React que permite administrar una colección de libros mediante operaciones CRUD persistentes utilizando LocalStorage y consumo de una API externa.

## Objetivo

Desarrollar una aplicación de una sola página (SPA) utilizando React, implementando:

- Componentización
- Operaciones CRUD
- Persistencia de información
- Consumo de servicios externos mediante API
- Interfaz responsiva utilizando Bootstrap

## Tecnologías utilizadas

- React
- Vite
- JavaScript ES6+
- Bootstrap 5
- Bootstrap Icons
- LocalStorage
- Fetch API

## Funcionalidades

### Gestión CRUD de libros

La aplicación permite:

- Registrar libros
- Visualizar registros en una tabla dinámica
- Editar información existente
- Eliminar registros individuales
- Eliminar todos los registros
- Persistencia automática mediante LocalStorage

Los datos almacenados permanecen disponibles al cerrar y volver a abrir el navegador.

### Funcionalidades adicionales

- Búsqueda de libros por título o autor
- Ordenamiento por título, autor o año
- Paginación de resultados
- Notificaciones flotantes tipo Toast
- Interfaz responsiva mediante Bootstrap

### Validaciones

El formulario incorpora validaciones para asegurar la integridad de los datos:

- Campos obligatorios
- Longitud mínima de título y autor
- Validación del año de publicación
- Prevención de registros duplicados

## Consumo de API externa

La aplicación consume la Open Library Search API para consultar información de libros.

Endpoint utilizado:

```text
https://openlibrary.org/search.json?q={término}
```

### Funcionalidades implementadas

- Consulta mediante Fetch API
- Búsqueda personalizada por término
- Visualización de resultados en tabla
- Visualización de portadas de libros cuando están disponibles
- Manejo de errores
- Indicador de carga
- Importación de libros consultados al CRUD local
- Detección de libros previamente importados

## Componentes React

La aplicación está organizada mediante componentes:

```text
src/
├── components/
│   ├── BookForm.jsx
│   ├── BookTable.jsx
│   ├── BookRow.jsx
│   └── ApiBooks.jsx
├── App.jsx
└── main.jsx
```

### Responsabilidad de componentes

- App.jsx: Estado global, persistencia y comunicación entre componentes
- BookForm.jsx: Formulario para crear y editar libros
- BookTable.jsx: Visualización de registros, búsqueda, ordenamiento y paginación
- BookRow.jsx: Representación individual de cada registro de libro
- ApiBooks.jsx: Consumo de Open Library API e importación de libros externos

## Interfaz

Se utiliza Bootstrap para implementar:

- Navbar
- Formularios estilizados
- Tablas responsivas
- Botones con iconos
- Notificaciones flotantes tipo Toast
- Footer
- Diseño adaptable a distintos dispositivos

## Instalación

Clonar el proyecto e instalar dependencias:

```bash
npm install
```

Ejecución en desarrollo:

```bash
npm run dev
```

Construcción para producción:

```bash
npm run build
```

## Repositorio GitHub

https://github.com/Roro-Inacap/evaluacion-3-front-end.git

## Autores

- Jesús Rojas Ruiz
- Rodrigo Valenzuela

Proyecto desarrollado para la Evaluación Unidad 3 de FrontEnd.
Desarrollo de Aplicación Web SPA con React, LocalStorage y Consumo de API Externa.
