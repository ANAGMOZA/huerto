const STORAGE_KEY = 'huertoCarrito';
const STORAGE_USERS_KEY = 'huertoUsuarios';
const STORAGE_PRODUCTS_KEY = 'huertoProductos';
const STORAGE_SESSION_KEY = 'huertoSesion';

function getSesion() {
    return JSON.parse(sessionStorage.getItem(STORAGE_SESSION_KEY)) || null;
}

function setSesion(usuario) {
    sessionStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(usuario));
}

function cerrarSesion() {
    sessionStorage.removeItem(STORAGE_SESSION_KEY);
    window.location.href = getBasePath() + 'src/components/login.html';
}

function protegerAdmin() {
    const sesion = getSesion();
    if (!sesion) {
        window.location.href = '../../src/components/login.html';
        return false;
    }
    if (sesion.rol !== 'Administrador') {
        alert('Acceso denegado. Solo los Administradores pueden acceder a esta sección.');
        window.location.href = '../../index.html';
        return false;
    }
    return true;
}

function actualizarHeaderSesion() {
    const sesion = getSesion();
    const loginLink = document.getElementById('link-login');
    const registroLink = document.getElementById('link-registro');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    const btnLogout = document.getElementById('btn-logout');

    if (sesion) {
        if (loginLink) loginLink.style.display = 'none';
        if (registroLink) registroLink.style.display = 'none';
        if (userInfo) userInfo.style.display = 'flex';
        if (userName) userName.textContent = sesion.nombre;
    } else {
        if (loginLink) loginLink.style.display = '';
        if (registroLink) registroLink.style.display = '';
        if (userInfo) userInfo.style.display = 'none';
    }
    if (btnLogout) btnLogout.addEventListener('click', cerrarSesion);
}

const dbProductos = [
    { id: "FR001", nombre: "Manzanas Fuji", precio: 1200, stock: 150, categoria: "frutas", imagen: "src/assets/manzanas.jpg", descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Conocidas por su textura firme y sabor equilibrado entre dulce y ácido.", origen: "Valle del Maule", unidad: "kg" },
    { id: "FR002", nombre: "Naranjas Valencia", precio: 1000, stock: 200, categoria: "frutas", imagen: "src/assets/naranjas.jpg", descripcion: "Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.", origen: "Región de O'Higgins", unidad: "kg" },
    { id: "FR003", nombre: "Plátanos Cavendish", precio: 800, stock: 250, categoria: "frutas", imagen: "src/assets/platano.jpg", descripcion: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.", origen: "Importado selecto", unidad: "kg" },
    { id: "VR001", nombre: "Zanahorias Orgánicas", precio: 900, stock: 100, categoria: "verduras", imagen: "src/assets/zanahorias.jpg", descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.", origen: "Región de O'Higgins", unidad: "kg" },
    { id: "VR002", nombre: "Espinacas Frescas", precio: 700, stock: 80, categoria: "verduras", imagen: "src/assets/espinaca.jpg", descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.", origen: "Región de Valparaíso", unidad: "bolsa 500g" },
    { id: "VR003", nombre: "Pimientos Tricolores", precio: 1500, stock: 120, categoria: "verduras", imagen: "src/assets/pimientos.jpg", descripcion: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, añaden un toque vibrante y saludable a cualquier receta.", origen: "Región del Maule", unidad: "kg" },
    { id: "PO001", nombre: "Miel Orgánica", precio: 5000, stock: 50, categoria: "organicos", imagen: "src/assets/miel.png", descripcion: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.", origen: "Región de Los Lagos", unidad: "frasco 500g" },
    { id: "PO003", nombre: "Quinua Orgánica", precio: 3800, stock: 60, categoria: "organicos", imagen: "src/assets/quinoa.jpg", descripcion: "Superalimento andino libre de gluten y alto en proteínas. Certificación orgánica avalada. Ideal para ensaladas, guisos y como sustituto de cereales.", origen: "Región de Atacama", unidad: "bolsa 500g" },
    { id: "PL001", nombre: "Leche Entera", precio: 1290, stock: 180, categoria: "lacteos", imagen: "src/assets/leche.jpg", descripcion: "Leche entera natural sin reconstitución, directa de granjas locales. Rica en calcio y nutrientes esenciales, perfecta para complementar una dieta equilibrada.", origen: "Región del Bío-Bío", unidad: "litro" }
];

function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/src/components/')) return '../../';
    return '';
}

const chileGeografia = {
    "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte"],
    "Región de Antofagasta": ["Antofagasta", "Calama", "Tocopilla", "Mejillones"],
    "Región de Atacama": ["Copiapó", "Caldera", "Vallenar", "Chañaral"],
    "Región de Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel"],
    "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "San Antonio", "Los Andes"],
    "Región Metropolitana": ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto", "La Florida", "Ñuñoa", "La Granja"],
    "Región de O'Higgins": ["Rancagua", "Peumo", "San Fernando", "Pichilemu", "Rengo"],
    "Región del Maule": ["Talca", "Curicó", "Linares", "Constitución", "Cauquenes"],
    "Región de Ñuble": ["Chillán", "Los Ángeles", "Bulnes", "Quirihue"],
    "Región del Bío-Bío": ["Concepción", "Talcahuano", "Los Ángeles", "Chiguayante"],
    "Región de La Araucanía": ["Temuco", "Padre Las Casas", "Angol", "Villarrica"],
    "Región de Los Ríos": ["Valdivia", "La Unión", "Panguipulli"],
    "Región de Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Puerto Varas"],
    "Región de Aysén": ["Coyhaique", "Puerto Aysén", "Cochrane"],
    "Región de Magallanes": ["Punta Arenas", "Puerto Natales", "Porvenir"]
};

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    inicializarHamburger();
    actualizarHeaderSesion();

    if (document.body.classList.contains('admin-body')) {
        if (!protegerAdmin()) return;
        const sesion = getSesion();
        const adminUserEl = document.querySelector('.admin-user');
        if (adminUserEl && sesion) adminUserEl.textContent = '👤 ' + sesion.nombre + ' (' + sesion.rol + ')';
    }

    if (document.getElementById('product-container')) renderizarProductos();
    if (document.getElementById('registro-form')) inicializarRegistro();
    if (document.getElementById('login-form')) inicializarLogin();
    if (document.getElementById('cart-items-container')) renderizarCarrito();
    if (document.getElementById('contact-form')) inicializarContacto();
    if (document.getElementById('admin-user-form')) inicializarAdminUsuarios();
    if (document.getElementById('admin-product-form')) inicializarAdminProductos();
    if (document.getElementById('productos-page-container')) renderizarPaginaProductos();
    if (document.getElementById('detalle-container')) renderizarDetalle();
    if (document.getElementById('admin-stats-usuarios')) actualizarStatsAdmin();
});

function inicializarHamburger() {
    const btn = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => nav.classList.toggle('open'));
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const total = carrito.reduce((acc, i) => acc + i.cantidad, 0);
    document.querySelectorAll('#cart-count, #cart-counter').forEach(el => el && (el.textContent = total));
}

function renderizarProductos() {
    const contenedor = document.getElementById('product-container');
    const filtroActivo = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const lista = filtroActivo === 'all' ? dbProductos : dbProductos.filter(p => p.categoria === filtroActivo);
    contenedor.innerHTML = '';
    lista.forEach(p => contenedor.appendChild(crearCardProducto(p, getBasePath())));

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderizarProductos();
        });
    });
}

function crearCardProducto(p, base = '') {
    let stockHTML = '';
    if (p.stock === 0) stockHTML = '<span class="stock-alert">⚠ Agotado</span>';
    else if (p.stock <= 5) stockHTML = `<span class="stock-alert">⚠ Solo quedan ${p.stock}</span>`;
    else stockHTML = `<span class="stock-ok">✓ En stock (${p.stock} ${p.unidad})</span>`;

    const div = document.createElement('div');
    div.className = 'product-card';
    div.dataset.categoria = p.categoria;
    div.innerHTML = `
        <img src="${base}${p.imagen}" alt="${p.nombre}">
        <div class="product-card-body">
            <span class="product-category">${p.categoria}</span>
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <div class="product-price">$${p.precio.toLocaleString('es-CL')} / ${p.unidad}</div>
            ${stockHTML}
            <div style="display:flex;gap:0.5rem;flex-direction:column;">
                <a href="${base}src/components/detalle.html?id=${p.id}" class="btn-secondary" style="text-align:center;padding:0.6rem;">Ver Detalle</a>
                <button class="btn-add-cart" onclick="agregarAlCarrito(${p.id})" ${p.stock === 0 ? 'disabled' : ''}>
                    ${p.stock === 0 ? 'Sin Stock' : '+ Agregar al Carrito'}
                </button>
            </div>
        </div>`;
    return div;
}

window.agregarAlCarrito = function(idProducto) {
    const producto = dbProductos.find(p => p.id === idProducto);
    if (!producto) return;

    let carrito = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const existente = carrito.find(i => i.id === idProducto);

    if (existente) {
        if (existente.cantidad < producto.stock) existente.cantidad++;
        else { alert(`Sin más stock disponible para "${producto.nombre}".`); return; }
    } else {
        if (producto.stock > 0) carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, unidad: producto.unidad, cantidad: 1 });
        else { alert('Producto agotado.'); return; }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`"${producto.nombre}" añadido al carrito ✓`);
};

function renderizarCarrito() {
    const tbody = document.getElementById('cart-items-container');
    const tabla = document.getElementById('cart-table');
    const msgVacio = document.getElementById('cart-empty-msg');
    const resumen = document.getElementById('cart-summary');
    const btnVaciar = document.getElementById('btn-empty-cart');

    const carrito = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (carrito.length === 0) {
        msgVacio.classList.remove('hidden');
        tabla && tabla.classList.add('hidden');
        resumen && resumen.classList.add('hidden');
        btnVaciar && btnVaciar.classList.add('hidden');
        return;
    }

    msgVacio.classList.add('hidden');
    tabla && tabla.classList.remove('hidden');
    resumen && resumen.classList.remove('hidden');
    btnVaciar && btnVaciar.classList.remove('hidden');

    tbody.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.nombre}</strong></td>
            <td>$${item.precio.toLocaleString('es-CL')}</td>
            <td>
                <div class="quantity-controls">
                    <button class="btn-qty" onclick="modificarCantidad(${item.id}, -1)">-</button>
                    <span class="qty-val">${item.cantidad}</span>
                    <button class="btn-qty" onclick="modificarCantidad(${item.id}, 1)">+</button>
                </div>
            </td>
            <td>$${subtotal.toLocaleString('es-CL')}</td>
            <td><button class="btn-delete" onclick="eliminarItem(${item.id})">Quitar</button></td>`;
        tbody.appendChild(tr);
    });

    const sub = document.getElementById('summary-subtotal');
    const tot = document.getElementById('summary-total');
    if (sub) sub.textContent = `$${total.toLocaleString('es-CL')}`;
    if (tot) tot.textContent = `$${total.toLocaleString('es-CL')}`;
}

window.modificarCantidad = function(id, cambio) {
    let carrito = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const item = carrito.find(i => i.id === id);
    const prod = dbProductos.find(p => p.id === id);
    if (!item || !prod) return;

    const nueva = item.cantidad + cambio;
    if (nueva <= 0) { eliminarItem(id); return; }
    if (cambio > 0 && nueva > prod.stock) { alert(`Solo hay ${prod.stock} unidades disponibles.`); return; }
    item.cantidad = nueva;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
};

window.eliminarItem = function(id) {
    let carrito = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    carrito = carrito.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
};

window.vaciarCarrito = function() {
    if (confirm('¿Vaciar el carrito?')) {
        localStorage.removeItem(STORAGE_KEY);
        renderizarCarrito();
        actualizarContadorCarrito();
    }
};

window.procesarPago = function() {
    alert('Redirigiendo a la pasarela de pago...');
};

function inicializarRegistro() {
    const form = document.getElementById('registro-form');
    const selectRegion = document.getElementById('region');
    const selectComuna = document.getElementById('comuna');

    Object.keys(chileGeografia).forEach(r => {
        const opt = document.createElement('option');
        opt.value = r; opt.textContent = r;
        selectRegion.appendChild(opt);
    });

    selectRegion.addEventListener('change', () => {
        const reg = selectRegion.value;
        selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
        if (reg && chileGeografia[reg]) {
            chileGeografia[reg].forEach(c => {
                const opt = document.createElement('option');
                opt.value = c; opt.textContent = c;
                selectComuna.appendChild(opt);
            });
            selectComuna.disabled = false;
        } else selectComuna.disabled = true;
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        limpiarErrores(['error-run','error-email','error-password','error-region','error-comuna']);
        const summary = document.getElementById('error-summary');
        if (summary) summary.style.display = 'none';

        const run = document.getElementById('run').value.trim().toUpperCase();
        const nombre = document.getElementById('nombre')?.value.trim() || '';
        const apellidos = document.getElementById('apellidos')?.value.trim() || '';
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const region = selectRegion.value;
        const comuna = selectComuna.value;
        const direccion = document.getElementById('direccion')?.value.trim() || '';
        let valido = true;

        if (!/^[0-9]{7,8}[0-9K]$/.test(run) || !validarRUT(run)) {
            mostrarError('error-run', 'RUN inválido. Sin puntos ni guion (ej: 12345678K).');
            valido = false;
        }

        if (nombre.length === 0) { mostrarError('error-nombre', 'El nombre es obligatorio.'); valido = false; }
        else if (nombre.length > 50) { mostrarError('error-nombre', 'El nombre no puede superar 50 caracteres.'); valido = false; }

        if (apellidos.length === 0) { mostrarError('error-apellidos', 'Los apellidos son obligatorios.'); valido = false; }
        else if (apellidos.length > 100) { mostrarError('error-apellidos', 'Los apellidos no pueden superar 100 caracteres.'); valido = false; }

        const dominios = ['@inacap.cl','@inacapmail.cl','@profesor.inacap.cl','@gmail.com'];
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !dominios.some(d => email.endsWith(d))) {
            mostrarError('error-email', 'Correo inválido. Dominios aceptados: @gmail.com, @inacap.cl, @inacapmail.cl, @profesor.inacap.cl');
            valido = false;
        }

        if (password.length < 4 || password.length > 10) {
            mostrarError('error-password', 'La contraseña debe tener entre 4 y 10 caracteres.');
            valido = false;
        }

        if (!region) { mostrarError('error-region', 'Selecciona una región.'); valido = false; }
        if (!comuna) { mostrarError('error-comuna', 'Selecciona una comuna.'); valido = false; }

        if (direccion.length === 0) { mostrarError('error-direccion', 'La dirección es obligatoria.'); valido = false; }
        else if (direccion.length > 300) { mostrarError('error-direccion', 'La dirección no puede superar 300 caracteres.'); valido = false; }

        if (valido) {
            alert('¡Registro exitoso! Bienvenido/a a HuertoHogar.');
            form.reset();
            selectComuna.disabled = true;
        } else if (summary) {
            summary.textContent = 'Por favor corrige los errores antes de continuar.';
            summary.style.display = 'block';
        }
    });
}

function inicializarLogin() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        limpiarErrores(['error-login-email','error-login-password']);
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const password = document.getElementById('login-password').value;
        let valido = true;

        const dominiosLogin = ['@inacap.cl','@inacapmail.cl','@gmail.com'];
        if (!email || email.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !dominiosLogin.some(d => email.endsWith(d))) {
            mostrarError('error-login-email', 'Correo inválido. Dominios permitidos: @gmail.com, @inacap.cl, @inacapmail.cl. Máx. 100 caracteres.');
            valido = false;
        }
        if (password.length < 4 || password.length > 10) {
            mostrarError('error-login-password', 'La contraseña debe tener entre 4 y 10 caracteres.');
            valido = false;
        }

        if (valido) {
            const usuarios = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY)) || [];
            const usuarioAdmin = { run: 'ADMIN', nombre: 'Administrador', apellidos: 'Sistema', rol: 'Administrador', email: 'admin@inacap.cl' };
            const encontrado = usuarios.find(u => u.email && u.email.toLowerCase() === email) || 
                               (email === 'admin@inacap.cl' ? usuarioAdmin : null);

            if (!encontrado) {
                mostrarError('error-login-email', 'No existe una cuenta con ese correo. Regístrate primero.');
                return;
            }

            setSesion({ run: encontrado.run, nombre: encontrado.nombre, rol: encontrado.rol, email: encontrado.email });

            if (encontrado.rol === 'Administrador') {
                window.location.href = 'admin_home.html';
            } else {
                window.location.href = '../../index.html';
            }
        }
    });
}

function inicializarContacto() {
    const form = document.getElementById('contact-form');
    const textarea = document.getElementById('comentario');
    const counter = document.getElementById('char-count');

    if (textarea && counter) {
        textarea.addEventListener('input', () => {
            counter.textContent = `${textarea.value.length}/500`;
        });
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        limpiarErrores(['error-nombre','error-email-contacto','error-comentario']);
        const nombre = document.getElementById('nombre-contacto').value.trim();
        const email = document.getElementById('email-contacto').value.trim().toLowerCase();
        const comentario = textarea ? textarea.value.trim() : '';
        let valido = true;

        if (!nombre || nombre.length > 100) { mostrarError('error-nombre', 'El nombre es requerido y no puede superar 100 caracteres.'); valido = false; }
        const dominiosContacto = ['@inacap.cl','@profesor.inacap.cl','@gmail.com'];
        if (!email || email.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !dominiosContacto.some(d => email.endsWith(d))) {
            mostrarError('error-email-contacto', 'Correo inválido. Dominios permitidos: @gmail.com, @inacap.cl, @profesor.inacap.cl. Máx. 100 caracteres.'); valido = false;
        }
        if (!comentario || comentario.length > 500) { mostrarError('error-comentario', 'El comentario es requerido y no puede superar 500 caracteres.'); valido = false; }

        if (valido) {
            const msg = document.getElementById('contact-success');
            if (msg) { msg.classList.remove('hidden'); form.reset(); if (counter) counter.textContent = '0/500'; }
        }
    });
}

function renderizarPaginaProductos() {
    const contenedor = document.getElementById('productos-page-container');
    if (!contenedor) return;

    dbProductos.forEach(p => contenedor.appendChild(crearCardProducto(p, getBasePath())));

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filtro = btn.dataset.filter;
            contenedor.innerHTML = '';
            const lista = filtro === 'all' ? dbProductos : dbProductos.filter(p => p.categoria === filtro);
            lista.forEach(p => contenedor.appendChild(crearCardProducto(p, getBasePath())));
        });
    });
}

function renderizarDetalle() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const producto = dbProductos.find(p => p.id === id);
    const contenedor = document.getElementById('detalle-container');

    if (!producto || !contenedor) {
        contenedor.innerHTML = '<p style="text-align:center;padding:3rem;">Producto no encontrado. <a href="productos.html">Volver</a></p>';
        return;
    }

    let stockHTML = '';
    if (producto.stock === 0) stockHTML = '<p style="color:#e74c3c;font-weight:700;">⚠ Producto agotado</p>';
    else if (producto.stock <= 5) stockHTML = `<p style="color:#e74c3c;font-weight:700;">⚠ Solo quedan ${producto.stock} ${producto.unidad}</p>`;
    else stockHTML = `<p style="color:#2E8B57;font-weight:600;">✓ En stock — ${producto.stock} ${producto.unidad} disponibles</p>`;

    contenedor.innerHTML = `
        <div class="detail-grid">
            <img src="../../${producto.imagen}" alt="${producto.nombre}">
            <div class="detail-info">
                <span class="product-category">${producto.categoria}</span>
                <h2>${producto.nombre}</h2>
                <div class="detail-price">$${producto.precio.toLocaleString('es-CL')} / ${producto.unidad}</div>
                <p>${producto.descripcion}</p>
                <div class="detail-meta">
                    <p><strong>Origen:</strong> ${producto.origen}</p>
                    <p><strong>Categoría:</strong> ${producto.categoria}</p>
                    <p><strong>Unidad:</strong> ${producto.unidad}</p>
                </div>
                ${stockHTML}
                <div class="qty-selector">
                    <label for="qty-input">Cantidad:</label>
                    <input type="number" id="qty-input" min="1" max="${producto.stock}" value="1" ${producto.stock === 0 ? 'disabled' : ''}>
                </div>
                <button class="btn-primary btn-block" onclick="agregarConCantidad(${producto.id})" ${producto.stock === 0 ? 'disabled' : ''} style="margin-bottom:1rem;">
                    + Agregar al Carrito
                </button>
                <a href="productos.html" class="btn-secondary btn-block" style="text-align:center;">← Volver a Productos</a>
            </div>
        </div>`;
}

window.agregarConCantidad = function(id) {
    const qty = parseInt(document.getElementById('qty-input')?.value) || 1;
    const producto = dbProductos.find(p => p.id === id);
    if (!producto) return;

    let carrito = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const existente = carrito.find(i => i.id === id);
    const cantidadActual = existente ? existente.cantidad : 0;

    if (cantidadActual + qty > producto.stock) {
        alert(`Stock insuficiente. Máximo disponible: ${producto.stock}`); return;
    }

    if (existente) existente.cantidad += qty;
    else carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, unidad: producto.unidad, cantidad: qty });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`${qty} ${producto.unidad} de "${producto.nombre}" añadido al carrito ✓`);
};

function inicializarAdminUsuarios() {
    renderizarTablaUsuarios();
    const form = document.getElementById('admin-user-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const errorBox = document.getElementById('admin-error-msg');
        const successBox = document.getElementById('admin-success-msg');
        errorBox.classList.add('hidden'); successBox.classList.add('hidden');

        const run = document.getElementById('admin-run').value.trim().toUpperCase();
        const nombre = document.getElementById('admin-nombre').value.trim();
        const apellidos = document.getElementById('admin-apellidos').value.trim();
        const rol = document.getElementById('admin-rol').value;
        const email = document.getElementById('admin-email').value.trim();
        const direccion = document.getElementById('admin-direccion').value.trim();
        const fecha = document.getElementById('admin-fecha')?.value || '';

        if (!run || !nombre || !apellidos || !rol || !email || !direccion) { mostrarFeedback(errorBox, 'Todos los campos obligatorios deben estar completos.'); return; }
        if (!/^[0-9]{7,8}[0-9K]$/.test(run) || !validarRUT(run)) { mostrarFeedback(errorBox, 'RUN inválido. Sin puntos ni guion.'); return; }
        if (nombre.length > 50) { mostrarFeedback(errorBox, 'El nombre no puede superar 50 caracteres.'); return; }
        if (apellidos.length > 100) { mostrarFeedback(errorBox, 'Los apellidos no pueden superar 100 caracteres.'); return; }
        if (direccion.length > 300) { mostrarFeedback(errorBox, 'La dirección no puede superar 300 caracteres.'); return; }

        let usuarios = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY)) || [];
        if (usuarios.find(u => u.run === run)) { mostrarFeedback(errorBox, `Ya existe un usuario con RUN ${run}.`); return; }

        usuarios.push({ run, nombre, apellidos, rol, email, direccion, fecha });
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(usuarios));
        mostrarFeedback(successBox, 'Usuario registrado exitosamente.');
        form.reset();
        renderizarTablaUsuarios();
    });
}

function renderizarTablaUsuarios() {
    const tbody = document.getElementById('admin-users-list');
    if (!tbody) return;
    const usuarios = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY)) || [];
    tbody.innerHTML = '';

    if (usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:#999;">No hay usuarios registrados.</td></tr>';
        return;
    }

    usuarios.forEach(u => {
        const badge = u.rol === 'Administrador' ? 'badge-admin-role' : u.rol === 'Vendedor' ? 'badge-seller-role' : 'badge-client-role';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${u.run}</strong></td>
            <td>${u.nombre}</td>
            <td>${u.apellidos || '-'}</td>
            <td><span class="badge-role ${badge}">${u.rol}</span></td>
            <td>${u.email}</td>
            <td>${u.direccion || '-'}</td>
            <td><button class="btn-delete" onclick="eliminarUsuario('${u.run}')">Eliminar</button></td>`;
        tbody.appendChild(tr);
    });

    const stat = document.getElementById('admin-stats-usuarios');
    if (stat) stat.textContent = usuarios.length;
}

window.eliminarUsuario = function(run) {
    if (!confirm(`¿Eliminar usuario con RUN ${run}?`)) return;
    let usuarios = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY)) || [];
    usuarios = usuarios.filter(u => u.run !== run);
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(usuarios));
    renderizarTablaUsuarios();
};

function inicializarAdminProductos() {
    renderizarTablaProductos();
    const form = document.getElementById('admin-product-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const errorBox = document.getElementById('prod-error-msg');
        const successBox = document.getElementById('prod-success-msg');
        errorBox.classList.add('hidden'); successBox.classList.add('hidden');

        const nombre = document.getElementById('prod-nombre').value.trim();
        const precio = parseFloat(document.getElementById('prod-precio').value);
        const stock = parseInt(document.getElementById('prod-stock').value);
        const stockCritico = document.getElementById('prod-stock-critico').value !== '' ? parseInt(document.getElementById('prod-stock-critico').value) : null;
        const categoria = document.getElementById('prod-categoria').value;
        const descripcion = document.getElementById('prod-descripcion')?.value.trim() || '';
        const imagen = document.getElementById('prod-imagen')?.value.trim() || 'src/assets/manzanas.jpg';

        if (!nombre || isNaN(precio) || isNaN(stock) || !categoria) {
            mostrarFeedback(errorBox, 'Nombre, precio, stock y categoría son obligatorios.'); return;
        }
        if (precio < 0) { mostrarFeedback(errorBox, 'El precio no puede ser negativo.'); return; }
        if (stock < 0) { mostrarFeedback(errorBox, 'El stock no puede ser negativo.'); return; }
        if (nombre.length > 50) { mostrarFeedback(errorBox, 'El nombre no puede superar 50 caracteres.'); return; }
        if (descripcion.length > 500) { mostrarFeedback(errorBox, 'La descripción no puede superar 500 caracteres.'); return; }

        let productos = JSON.parse(localStorage.getItem(STORAGE_PRODUCTS_KEY)) || [];
        const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 100;
        productos.push({ id: codigo, nombre, precio, stock, stockCritico, categoria, descripcion, imagen, unidad: 'kg' });
        localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(productos));
        mostrarFeedback(successBox, 'Producto registrado exitosamente.');
        form.reset();
        renderizarTablaProductos();
    });
}

function renderizarTablaProductos() {
    const tbody = document.getElementById('admin-products-list');
    if (!tbody) return;
    const productosExtra = JSON.parse(localStorage.getItem(STORAGE_PRODUCTS_KEY)) || [];
    const todos = [...dbProductos, ...productosExtra];
    tbody.innerHTML = '';

    todos.forEach(p => {
        const tr = document.createElement('tr');
        const stockDisplay = p.stock === 0 ? '<span style="color:#e74c3c;font-weight:700;">Agotado</span>' : (p.stockCritico !== null && p.stockCritico !== undefined && p.stock <= p.stockCritico ? `<span style="color:#e67e22;font-weight:700;">⚠ ${p.stock}</span>` : p.stock);
        tr.innerHTML = `
            <td><strong>${p.id}</strong></td>
            <td>${p.nombre}</td>
            <td><span class="badge-role badge-client-role">${p.categoria}</span></td>
            <td>$${Number(p.precio).toLocaleString('es-CL')}</td>
            <td>${stockDisplay}</td>
            <td>${p.stockCritico !== null && p.stockCritico !== undefined ? p.stockCritico : '<span style="color:#999">-</span>'}</td>
            <td>${p.id >= 100 ? `<button class="btn-delete" onclick="eliminarProducto(${p.id})">Eliminar</button>` : '<span style="color:#999;font-size:0.8rem">Base</span>'}</td>`;
        tbody.appendChild(tr);
    });

    const stat = document.getElementById('admin-stats-productos');
    if (stat) stat.textContent = todos.length;
}

window.eliminarProducto = function(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    let productos = JSON.parse(localStorage.getItem(STORAGE_PRODUCTS_KEY)) || [];
    productos = productos.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(productos));
    renderizarTablaProductos();
};

function actualizarStatsAdmin() {
    const usuarios = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY)) || [];
    const productosExtra = JSON.parse(localStorage.getItem(STORAGE_PRODUCTS_KEY)) || [];
    const carrito = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const su = document.getElementById('admin-stats-usuarios');
    const sp = document.getElementById('admin-stats-productos');
    const sc = document.getElementById('admin-stats-carrito');
    if (su) su.textContent = usuarios.length;
    if (sp) sp.textContent = dbProductos.length + productosExtra.length;
    if (sc) sc.textContent = carrito.reduce((a, i) => a + i.cantidad, 0);
}

function validarRUT(run) {
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);
    let suma = 0, mult = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += mult * parseInt(cuerpo[i]);
        mult = mult < 7 ? mult + 1 : 2;
    }
    const dvEsperado = 11 - (suma % 11);
    const dvCalc = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : String(dvEsperado);
    return dv === dvCalc;
}

function mostrarError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
}

function limpiarErrores(ids) {
    ids.forEach(id => { const el = document.getElementById(id); if (el) el.textContent = ''; });
}

function mostrarFeedback(el, msg) {
    el.textContent = msg;
    el.classList.remove('hidden');
}
