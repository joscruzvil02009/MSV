/* =========================================================
   MSV SUBASTAS
   ARCHIVO: script.js

   Este archivo controla:
   - Productos
   - Búsqueda
   - Categorías
   - Subastas
   - Ventanas emergentes
   - Inicio de sesión
   - Registro
   - Notificaciones
   - Interés en productos
   ========================================================= */


/* =========================================================
   LISTA DE PRODUCTOS
   ========================================================= */

const products = [

    {
        id: 1,

        name: "Reloj",

        category: "tegnologia",

        price: 1850,

        initialPrice: 1200,

        auctionDate: "28 Sep 2026 19:00",

        image: "pagina_web/script/style/fotos/reloj1.jpeg"

        description:
            "Reloj de muñeca analógico de cuarzo para caballero, cronógrafo de acero inoxidable, con calendario "
    },


    {
        id: 2,

        name: "Audifonos Air Pro",

        category: "Tecnología",

        price: 18500,

        initialPrice: 15000,

        auctionDate: "29 Sep 2026 20:00",

        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",

        description:
            "Audífonos Inalámbricos Bluetooth Air Pro, Sonido HiFi, Baja Latencia, Reducción de Ruido".
    },


    {
        id: 3,

        name: "Motocicleta deportiva",

        category: "Vehículos",

        price: 65000,

        initialPrice: 50000,

        auctionDate: "30 Sep 2026 18:30",

        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",

        description:
            "Motocicleta deportiva con diseño moderno y excelente presencia."
    },


    {
        id: 4,

        name: "Cámara profesional",

        category: "Tecnología",

        price: 12500,

        initialPrice: 9500,

        auctionDate: "02 Oct 2026 19:30",

        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",

        description:
            "Cámara profesional para fotografía y creación de contenido."
    },


    {
        id: 5,

        name: "Reloj clásico",

        category: "Coleccionables",

        price: 8500,

        initialPrice: 6000,

        auctionDate: "03 Oct 2026 17:00",

        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",

        description:
            "Reloj clásico ideal para coleccionistas y amantes de los accesorios."
    },


    {
        id: 6,

        name: "Auto deportivo",

        category: "Vehículos",

        price: 480000,

        initialPrice: 400000,

        auctionDate: "05 Oct 2026 20:30",

        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",

        description:
            "Auto deportivo de gran diseño para quienes buscan un vehículo especial."
    }

];


/* =========================================================
   VARIABLES GENERALES
   ========================================================= */

// Producto que se está mostrando actualmente
let currentProduct = null;

// Categoría seleccionada actualmente
let currentCategory = "Todos";

// Texto de búsqueda
let currentSearch = "";


/* =========================================================
   ELEMENTOS DEL HTML
   ========================================================= */

const productsGrid =
    document.getElementById("productsGrid");

const auctionList =
    document.getElementById("auctionList");

const searchInput =
    document.getElementById("searchInput");

const productModal =
    document.getElementById("productModal");

const productModalContent =
    document.getElementById("productModalContent");

const loginModal =
    document.getElementById("loginModal");

const notificationModal =
    document.getElementById("notificationModal");

const toast =
    document.getElementById("toast");


/* =========================================================
   FORMATEAR PRECIOS
   ========================================================= */

function formatPrice(price) {

    return new Intl.NumberFormat("es-MX", {

        style: "currency",

        currency: "MXN",

        maximumFractionDigits: 0

    }).format(price);

}


/* =========================================================
   MOSTRAR MENSAJE TEMPORAL
   ========================================================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================================
   OBTENER PRODUCTOS GUARDADOS COMO INTERESANTES
   ========================================================= */

function getInterestedProducts() {

    return JSON.parse(
        localStorage.getItem("msvInterestedProducts") || "[]"
    );

}


/* =========================================================
   GUARDAR PRODUCTOS DE INTERÉS
   ========================================================= */

function saveInterestedProducts(productsIds) {

    localStorage.setItem(
        "msvInterestedProducts",
        JSON.stringify(productsIds)
    );

}


/* =========================================================
   MOSTRAR PRODUCTOS
   ========================================================= */

function showProducts(list = products) {

    productsGrid.innerHTML = "";


    // Si no hay productos
    if (list.length === 0) {

        productsGrid.innerHTML = `
            <div class="empty-products">
                <h3>😕 No encontramos productos</h3>
                <p>Intenta con otra búsqueda o categoría.</p>
            </div>
        `;

        return;
    }


    // Obtener productos guardados
    const interestedProducts =
        getInterestedProducts();


    // Crear cada tarjeta
    list.forEach(product => {

        const isSaved =
            interestedProducts.includes(product.id);


        const card = document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="product-price">

                    Precio actual

                    <strong>
                        ${formatPrice(product.price)}
                    </strong>

                </div>


                <div class="product-actions">

                    <button
                        class="btn-interest ${isSaved ? "saved" : ""}"
                        onclick="toggleInterest(${product.id})"
                    >
                        ${isSaved ? "🔔 Interesado" : "🔔 Me interesa"}
                    </button>


                    <button
                        class="btn-view"
                        onclick="openProduct(${product.id})"
                    >
                        Ver producto
                    </button>

                </div>

            </div>

        `;


        productsGrid.appendChild(card);

    });

}


/* =========================================================
   FILTRAR PRODUCTOS
   ========================================================= */

function applyFilters() {

    const filteredProducts =
        products.filter(product => {

            const matchesCategory =
                currentCategory === "Todos" ||
                product.category === currentCategory;


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(currentSearch.toLowerCase());


            return matchesCategory && matchesSearch;

        });


    showProducts(filteredProducts);

}


/* =========================================================
   BUSCADOR
   ========================================================= */

searchInput.addEventListener("input", function () {

    currentSearch = this.value;

    applyFilters();

});


/* =========================================================
   BOTONES DE CATEGORÍAS
   ========================================================= */

document.querySelectorAll(".category-btn")
    .forEach(button => {

        button.addEventListener("click", function () {

            // Quitar active de todos
            document
                .querySelectorAll(".category-btn")
                .forEach(btn => {
                    btn.classList.remove("active");
                });


            // Activar el botón seleccionado
            this.classList.add("active");


            // Obtener categoría
            currentCategory =
                this.dataset.category;


            applyFilters();

        });

    });


/* =========================================================
   ABRIR PRODUCTO
   ========================================================= */

function openProduct(productId) {

    const product =
        products.find(item => item.id === productId);


    if (!product) return;


    currentProduct = product;


    productModalContent.innerHTML = `

        <img
            class="modal-product-image"
            src="${product.image}"
            alt="${product.name}"
        >


        <span class="modal-product-category">
            ${product.category}
        </span>


        <h2 class="modal-product-title">
            ${product.name}
        </h2>


        <div class="modal-product-price">
            ${formatPrice(product.price)}
        </div>


        <p class="modal-product-description">
            ${product.description}
        </p>


        <p>
            <strong>
                Precio inicial:
            </strong>

            ${formatPrice(product.initialPrice)}
        </p>


        <p>
            <strong>
                Próxima subasta:
            </strong>

            ${product.auctionDate}
        </p>


        <br>


        <button
            class="auth-submit"
            onclick="toggleInterest(${product.id})"
        >
            🔔 Avisarme sobre esta subasta
        </button>

    `;


    productModal.classList.add("show");

}


/* =========================================================
   CERRAR MODAL DE PRODUCTO
   ========================================================= */

document.getElementById("closeProductModal")
    .addEventListener("click", () => {

        productModal.classList.remove("show");

    });


/* =========================================================
   CERRAR MODALES AL HACER CLIC FUERA
   ========================================================= */

window.addEventListener("click", event => {

    if (event.target === productModal) {

        productModal.classList.remove("show");

    }


    if (event.target === loginModal) {

        loginModal.classList.remove("show");

    }


    if (event.target === notificationModal) {

        notificationModal.classList.remove("show");

    }

});


/* =========================================================
   INTERÉS EN UN PRODUCTO
   ========================================================= */

function toggleInterest(productId) {

    const currentUser =
        JSON.parse(
            localStorage.getItem("msvCurrentUser")
        );


    // Si no inició sesión
    if (!currentUser) {

        showToast(
            "Debes iniciar sesión para recibir avisos."
        );

        loginModal.classList.add("show");

        return;

    }


    let interestedProducts =
        getInterestedProducts();


    if (interestedProducts.includes(productId)) {

        interestedProducts =
            interestedProducts.filter(
                id => id !== productId
            );

        showToast(
            "Quitaste este producto de tus avisos."
        );

    } else {

        interestedProducts.push(productId);

        showToast(
            "Te avisaremos sobre esta subasta 🔔"
        );

    }


    saveInterestedProducts(
        interestedProducts
    );


    applyFilters();

}


/* =========================================================
   MOSTRAR SUBASTAS
   ========================================================= */

function showAuctions() {

    auctionList.innerHTML = "";


    products.forEach(product => {

        const auction =
            document.createElement("div");


        auction.className = "auction-item";


        auction.innerHTML = `

            <div>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Oferta actual:
                    ${formatPrice(product.price)}
                </p>

            </div>


            <div class="auction-date">

                🕒 ${product.auctionDate}

            </div>

        `;


        auctionList.appendChild(auction);

    });

}


/* =========================================================
   USUARIOS

   IMPORTANTE:

   Esto es solamente una demostración.

   NO es un sistema seguro para una página real.

   Las cuentas se guardan en localStorage.
   ========================================================= */

function getUsers() {

    return JSON.parse(
        localStorage.getItem("msvUsers") || "[]"
    );

}


function saveUsers(users) {

    localStorage.setItem(
        "msvUsers",
        JSON.stringify(users)
    );

}


/* =========================================================
   VARIABLES DEL LOGIN
   ========================================================= */

let isRegisterMode = false;


/* =========================================================
   ELEMENTOS DEL LOGIN
   ========================================================= */

const loginBtn =
    document.getElementById("loginBtn");

const closeLoginModal =
    document.getElementById("closeLoginModal");

const authForm =
    document.getElementById("authForm");

const authTitle =
    document.getElementById("authTitle");

const authDescription =
    document.getElementById("authDescription");

const authSwitchBtn =
    document.getElementById("authSwitchBtn");

const authSwitchText =
    document.getElementById("authSwitchText");

const nameGroup =
    document.getElementById("nameGroup");

const authName =
    document.getElementById("authName");

const authEmail =
    document.getElementById("authEmail");

const authPassword =
    document.getElementById("authPassword");


/* =========================================================
   ABRIR LOGIN
   ========================================================= */

loginBtn.addEventListener("click", () => {

    updateAuthMode();

    loginModal.classList.add("show");

});


/* =========================================================
   CERRAR LOGIN
   ========================================================= */

closeLoginModal.addEventListener("click", () => {

    loginModal.classList.remove("show");

});


/* =========================================================
   CAMBIAR LOGIN / REGISTRO
   ========================================================= */

authSwitchBtn.addEventListener("click", () => {

    isRegisterMode = !isRegisterMode;

    updateAuthMode();

});


/* =========================================================
   ACTUALIZAR TEXTO DEL LOGIN
   ========================================================= */

function updateAuthMode() {

    if (isRegisterMode) {

        authTitle.textContent =
            "Crear cuenta";

        authDescription.textContent =
            "Regístrate para recibir avisos.";

        nameGroup.style.display =
            "block";

        authName.required = true;

        authSwitchText.textContent =
            "¿Ya tienes una cuenta?";

        authSwitchBtn.textContent =
            "Iniciar sesión";

        document.querySelector(".auth-submit")
            .textContent =
            "Registrarme";

    } else {

        authTitle.textContent =
            "Iniciar sesión";

        authDescription.textContent =
            "Entra a tu cuenta de MSV Subastas.";

        nameGroup.style.display =
            "none";

        authName.required = false;

        authSwitchText.textContent =
            "¿No tienes una cuenta?";

        authSwitchBtn.textContent =
            "Registrarme";

        document.querySelector(".auth-submit")
            .textContent =
            "Iniciar sesión";

    }

}


/* =========================================================
   PROCESAR LOGIN / REGISTRO
   ========================================================= */

authForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        authName.value.trim();

    const email =
        authEmail.value.trim().toLowerCase();

    const password =
        authPassword.value;


    let users = getUsers();


    /* ==========================================
       REGISTRO
       ========================================== */

    if (isRegisterMode) {

        const exists =
            users.some(
                user => user.email === email
            );


        if (exists) {

            showToast(
                "Este correo ya está registrado."
            );

            return;

        }


        const newUser = {

            id: Date.now(),

            name: name,

            email: email,

            password: password

        };


        users.push(newUser);

        saveUsers(users);


        localStorage.setItem(
            "msvCurrentUser",
            JSON.stringify(newUser)
        );


        showToast(
            "Cuenta creada correctamente 🎉"
        );


        loginModal.classList.remove("show");

        updateLoginButton();

        authForm.reset();

        return;

    }


    /* ==========================================
       INICIAR SESIÓN
       ========================================== */

    const user =
        users.find(
            user =>
                user.email === email &&
                user.password === password
        );


    if (!user) {

        showToast(
            "Correo o contraseña incorrectos."
        );

        return;

    }


    localStorage.setItem(
        "msvCurrentUser",
        JSON.stringify(user)
    );


    showToast(
        `Bienvenido, ${user.name} 👋`
    );


    loginModal.classList.remove("show");

    authForm.reset();

    updateLoginButton();

});


/* =========================================================
   ACTUALIZAR BOTÓN DE LOGIN
   ========================================================= */

function updateLoginButton() {

    const currentUser =
        JSON.parse(
            localStorage.getItem("msvCurrentUser")
        );


    if (currentUser) {

        loginBtn.textContent =
            `👤 ${currentUser.name}`;

    } else {

        loginBtn.textContent =
            "👤 Iniciar sesión";

    }

}


/* =========================================================
   CERRAR SESIÓN
   ========================================================= */

loginBtn.addEventListener("dblclick", () => {

    const currentUser =
        JSON.parse(
            localStorage.getItem("msvCurrentUser")
        );


    if (!currentUser) return;


    localStorage.removeItem(
        "msvCurrentUser"
    );


    showToast(
        "Sesión cerrada."
    );


    updateLoginButton();

});


/* =========================================================
   NOTIFICACIONES
   ========================================================= */

const notificationBtn =
    document.getElementById("notificationBtn");

const closeNotificationModal =
    document.getElementById("closeNotificationModal");

const enableNotificationsBtn =
    document.getElementById("enableNotificationsBtn");

const testNotificationBtn =
    document.getElementById("testNotificationBtn");

const notificationStatus =
    document.getElementById("notificationStatus");


/* =========================================================
   ABRIR NOTIFICACIONES
   ========================================================= */

notificationBtn.addEventListener("click", () => {

    updateNotificationStatus();

    notificationModal.classList.add("show");

});


/* =========================================================
   CERRAR NOTIFICACIONES
   ========================================================= */

closeNotificationModal.addEventListener("click", () => {

    notificationModal.classList.remove("show");

});


/* =========================================================
   ACTUALIZAR ESTADO
   ========================================================= */

function updateNotificationStatus() {

    if (!("Notification" in window)) {

        notificationStatus.textContent =
            "Tu navegador no permite notificaciones.";

        return;

    }


    if (Notification.permission === "granted") {

        notificationStatus.textContent =
            "✅ Las notificaciones están activadas.";

    } else if (
        Notification.permission === "denied"
    ) {

        notificationStatus.textContent =
            "❌ Las notificaciones están bloqueadas.";

    } else {

        notificationStatus.textContent =
            "Las notificaciones están desactivadas.";

    }

}


/* =========================================================
   SOLICITAR PERMISO PARA NOTIFICACIONES
   ========================================================= */

enableNotificationsBtn.addEventListener(
    "click",
    async () => {

        if (!("Notification" in window)) {

            showToast(
                "Tu navegador no permite notificaciones."
            );

            return;

        }


        const permission =
            await Notification.requestPermission();


        updateNotificationStatus();


        if (permission === "granted") {

            showToast(
                "Notificaciones activadas 🔔"
            );

        }

    }
);


/* =========================================================
   NOTIFICACIÓN DE PRUEBA
   ========================================================= */

testNotificationBtn.addEventListener(
    "click",
    () => {

        if (
            !("Notification" in window)
        ) {

            showToast(
                "Tu navegador no permite notificaciones."
            );

            return;

        }


        if (
            Notification.permission !== "granted"
        ) {

            showToast(
                "Primero activa las notificaciones."
            );

            return;

        }


        new Notification(
            "MSV Subastas 🔨",
            {
                body:
                    "Hay nuevas oportunidades de subasta disponibles."
            }
        );

    }
);


/* =========================================================
   INICIAR LA PÁGINA
   ========================================================= */

function initializePage() {

    // Mostrar productos
    showProducts();


    // Mostrar subastas
    showAuctions();


    // Actualizar usuario
    updateLoginButton();


    // Actualizar notificaciones
    updateNotificationStatus();

}


/* =========================================================
   EJECUTAMOS TODO
   ========================================================= */

initializePage();
