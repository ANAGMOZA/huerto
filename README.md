# 🌿 HuertoHogar — Tienda Online de Productos del Campo

Proyecto de evaluación para **Taller de Desarrollo Web** — Ingeniería en Informática, INACAP 2026.

Plataforma e-commerce que conecta familias chilenas con agricultores locales. Construida con HTML5, CSS3 y JavaScript Vanilla puro, sin frameworks.

---

## 🚀 Cómo ejecutar el proyecto

1. Clona o descarga el repositorio
2. Abre la carpeta en **VS Code**
3. Haz clic derecho en `index.html` → **Open with Live Server**
4. O abre directamente `index.html` en tu navegador



---

## 📁 Estructura de carpetas

```
HuertoHogar/
├── index.html                 
├── README.md
├── .gitignore
└── src/
    ├── css/
    │   └── styles.css          
    ├── js/
    │   └── main.js            
    ├── assets/                 
    │   ├── logo.jpg
    │   ├── campo.jpg
    │   ├── equipo.jpg
    │   ├── equipo_tecnologico.jpg
    │   ├── agricultores.jpg
    │   ├── blog1.jpg / blog2.jpg
    │   └── [imágenes productos]
    └── components/            
        ├── login.html
        ├── registro.html
        ├── nosotros.html
        ├── productos.html
        ├── detalle.html
        ├── blog.html
        ├── blog-detalle1.html
        ├── blog-detalle2.html
        ├── contacto.html
        ├── carrito.html
        ├── admin_home.html
        ├── admin_usuarios.html
        └── admin_productos.html
```

---

## 🔐 Acceso al Panel Administrador

El panel admin está protegido. Solo usuarios con rol **Administrador** pueden acceder.

| Campo | Valor |
|-------|-------|
| Correo | `admin@inacap.cl` |
| Contraseña | Cualquier valor entre 4 y 10 caracteres |

Si un usuario sin rol Administrador intenta acceder a las rutas `/admin_*.html`, el sistema lo redirige automáticamente.

---

## 🛍️ Catálogo de Productos

| Código | Producto | Precio | Stock | Categoría |
|--------|----------|--------|-------|-----------|
| FR001 | Manzanas Fuji | $1.200/kg | 150 kg | Frutas |
| FR002 | Naranjas Valencia | $1.000/kg | 200 kg | Frutas |
| FR003 | Plátanos Cavendish | $800/kg | 250 kg | Frutas |
| VR001 | Zanahorias Orgánicas | $900/kg | 100 kg | Verduras |
| VR002 | Espinacas Frescas | $700/bolsa | 80 uds | Verduras |
| VR003 | Pimientos Tricolores | $1.500/kg | 120 kg | Verduras |
| PO001 | Miel Orgánica | $5.000/frasco | 50 uds | Orgánicos |
| PO003 | Quinua Orgánica | $3.800/bolsa | 60 uds | Orgánicos |
| PL001 | Leche Entera | $1.290/litro | 180 L | Lácteos |

---

## ✅ Funcionalidades implementadas

- **Tienda pública**: Home, Nosotros, Productos, Detalle, Blog (x3), Contacto, Carrito
- **Autenticación**: Login con validación por rol, sesión en sessionStorage, logout
- **Registro**: RUN con dígito verificador, región/comuna dinámicas (16 regiones), validación de dominios
- **Carrito**: localStorage, agregar/modificar/eliminar items, resumen con total
- **Filtros**: por categoría en Home y Productos
- **Mapa interactivo**: Leaflet.js con las 7 ciudades de operación
- **Panel Admin**: mantenedor de usuarios y productos con CRUD
- **Responsive**: menú hamburger, breakpoint 768px

---

## 🗺️ Ciudades de operación

Santiago · Puerto Montt · Villarrica · Nacimiento · Viña del Mar · Valparaíso · Concepción

---

## 🛠️ Tecnologías usadas

- HTML5 semántico
- CSS3 (variables, Flexbox, Grid, Media Queries)
- JavaScript ES6+ (Vanilla, sin frameworks)
- Leaflet.js (mapa interactivo)
- Google Fonts (Playfair Display + Montserrat)
- localStorage / sessionStorage

---

## 👥 Equipo

- Angel Morales 
- Freidy Jean Julien

Proyecto desarrollado como parte de la Evaluación Parcial 1 — Taller de Desarrollo Web, INACAP 2026.

