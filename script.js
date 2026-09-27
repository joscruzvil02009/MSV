const articulos = [
    {
        nombre: "RELOJ",
        precio: "$500",
        imagen: "reloj.png",
        descripcion: "Reloj de muñeca analógico de cuarzo para caballero, cronógrafo de acero inoxidable, con calendario."
    },

    {
        nombre: "Artículo 2",
        precio: "$2,000",
        imagen: "imagenes/articulo2.jpeg",
        descripcion: "Descripción del segundo artículo disponible para venta o subasta."
    },

    {
        nombre: "Artículo 3",
        precio: "$3,500",
        imagen: "imagenes/articulo3.jpeg",
        descripcion: "Descripción del tercer artículo disponible para venta o subasta."
    },

    {
        nombre: "Artículo 4",
        precio: "$5,000",
        imagen: "imagenes/articulo4.jpeg",
        descripcion: "Descripción del cuarto artículo disponible para venta o subasta."
    }
];


/* =========================================================
   MOSTRAR ARTÍCULOS
   ========================================================= */

function mostrarArticulos() {

    const contenedor = document.getElementById("contenedor-articulos");

    // Si la página no tiene el contenedor, no hacemos nada
    if (!contenedor) {
        return;
    }

    // Limpiamos el contenido anterior
    contenedor.innerHTML = "";


    articulos.forEach((articulo) => {

        const tarjeta = document.createElement("div");

        tarjeta.classList.add("tarjeta-articulo");


        tarjeta.innerHTML = `
            
            <div class="imagen-articulo">

                <img 
                    src="${articulo.imagen}" 
                    alt="${articulo.nombre}"
                    onerror="this.src='imagenes/sin-imagen.jpeg'"
                >

            </div>


            <div class="informacion-articulo">

                <h2>${articulo.nombre}</h2>

                <p class="precio-articulo">
                    ${articulo.precio}
                </p>

                <p class="descripcion-articulo">
                    ${articulo.descripcion}
                </p>

                <button 
                    class="boton-articulo"
                    onclick="verArticulo('${articulo.nombre}')"
                >
                    Ver artículo
                </button>

            </div>

        `;


        contenedor.appendChild(tarjeta);

    });

}


/* =========================================================
   VER ARTÍCULO
   ========================================================= */

function verArticulo(nombre) {

    const articulo = articulos.find(
        item => item.nombre === nombre
    );


    if (!articulo) {
        return;
    }


    alert(
        "Artículo: " + articulo.nombre +
        "\nPrecio: " + articulo.precio +
        "\n\n" + articulo.descripcion
    );

}


/* =========================================================
   BOTÓN ARTÍCULOS
   =========================================================
   
   Puedes utilizar:

   onclick="irAArticulos()"

   en tu botón de HTML.
*/

function irAArticulos() {

    window.location.href = "articulos.html";

}


/* =========================================================
   BOTÓN X / REGRESAR
   =========================================================
   
   Puedes utilizar:

   onclick="regresarInicio()"

   en tu botón X.
*/

function regresarInicio() {

    window.location.href = "index.html";

}


/* =========================================================
   BOTÓN VOLVER
   ========================================================= */

function volver() {

    window.history.back();

}


/* =========================================================
   MENÚ MÓVIL
   ========================================================= */

function abrirMenu() {

    const menu = document.getElementById("menu");

    if (menu) {

        menu.classList.toggle("activo");

    }

}


/* =========================================================
   CERRAR MENÚ
   ========================================================= */

function cerrarMenu() {

    const menu = document.getElementById("menu");

    if (menu) {

        menu.classList.remove("activo");

    }

}


/* =========================================================
   BUSCADOR DE ARTÍCULOS
   ========================================================= */

function buscarArticulos() {

    const buscador = document.getElementById("buscador");

    const contenedor = document.getElementById("contenedor-articulos");


    if (!buscador || !contenedor) {
        return;
    }


    const texto = buscador.value.toLowerCase().trim();


    const resultados = articulos.filter((articulo) => {

        return (
            articulo.nombre.toLowerCase().includes(texto) ||
            articulo.descripcion.toLowerCase().includes(texto) ||
            articulo.precio.toLowerCase().includes(texto)
        );

    });


    contenedor.innerHTML = "";


    if (resultados.length === 0) {

        contenedor.innerHTML = `
            
            <div class="sin-resultados">

                <h2>No se encontraron artículos</h2>

                <p>
                    Intenta buscar otro artículo.
                </p>

            </div>

        `;

        return;
    }


    resultados.forEach((articulo) => {

        const tarjeta = document.createElement("div");

        tarjeta.classList.add("tarjeta-articulo");


        tarjeta.innerHTML = `

            <div class="imagen-articulo">

                <img
                    src="${articulo.imagen}"
                    alt="${articulo.nombre}"
                    onerror="this.src='imagenes/sin-imagen.jpeg'"
                >

            </div>


            <div class="informacion-articulo">

                <h2>${articulo.nombre}</h2>

                <p class="precio-articulo">
                    ${articulo.precio}
                </p>

                <p class="descripcion-articulo">
                    ${articulo.descripcion}
                </p>

                <button
                    class="boton-articulo"
                    onclick="verArticulo('${articulo.nombre}')"
                >
                    Ver artículo
                </button>

            </div>

        `;


        contenedor.appendChild(tarjeta);

    });

}


/* =========================================================
   INICIAR PÁGINA
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Mostrar artículos automáticamente
    mostrarArticulos();


    // Buscador
    const buscador = document.getElementById("buscador");

    if (buscador) {

        buscador.addEventListener(
            "input",
            buscarArticulos
        );

    }


    // Botón artículos
    const botonArticulos =
        document.getElementById("boton-articulos");

    if (botonArticulos) {

        botonArticulos.addEventListener(
            "click",
            irAArticulos
        );

    }


    // Botón X
    const botonCerrar =
        document.getElementById("boton-x");

    if (botonCerrar) {

        botonCerrar.addEventListener(
            "click",
            regresarInicio
        );

    }

});

