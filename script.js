```javascript
// =========================================================
// OFERTAS
// =========================================================
//
// image:
// Foto que aparecerá en la tarjeta.
//
// detailImage:
// Segunda foto que aparecerá cuando abras el producto.
//
// IMPORTANTE:
// Cambia los nombres de las imágenes por los tuyos.
//
// =========================================================

const offers = [

    {
        name: "Producto en oferta",
        category: "Tecnología",

        price: "$600",
        oldPrice: "$999",

        stock: "1 disponible",

        // // IMAGEN PRINCIPAL DE LA OFERTA 1
        // // Esta aparece en la tarjeta.
        // // Ejemplo:
        // // image: "imagenes/reloj.png",

        image: "imagenes/oferta1.jpg",


        // // SEGUNDA IMAGEN DE LA OFERTA 1
        // // Esta aparece cuando haces clic en el producto.
        // // Ejemplo:
        // // detailImage: "imagenes/oferta1-2.jpg",

        detailImage: "imagenes/oferta1-2.jpg"
    },


    {
        name: "Producto en oferta",
        category: "Tecnología",

        price: "$600",
        oldPrice: "$899",

        stock: "1 disponible",

        // // IMAGEN PRINCIPAL DE LA OFERTA 2

        image: "imagenes/oferta2.jpg",


        // // SEGUNDA IMAGEN DE LA OFERTA 2

        detailImage: "imagenes/oferta2-2.jpg"
    },


    {
        name: "Producto en oferta",
        category: "Tecnología",

        price: "$450",
        oldPrice: "$500",

        stock: "1 disponible",

        // // IMAGEN PRINCIPAL DE LA OFERTA 3

        image: "imagenes/oferta3.jpg",


        // // SEGUNDA IMAGEN DE LA OFERTA 3

        detailImage: "imagenes/oferta3-2.jpg"
    },


    {
        name: "Producto en oferta",
        category: "Coleccionables",

        price: "$1,299",
        oldPrice: "$2,000",

        stock: "3 disponibles",

        // // IMAGEN PRINCIPAL DE LA OFERTA 4

        image: "imagenes/oferta4.jpg",


        // // SEGUNDA IMAGEN DE LA OFERTA 4

        detailImage: "imagenes/oferta4-2.jpg"
    }

];



// =========================================================
// ABRIR OFERTA
// =========================================================

function openOffer(index) {

    const offer = offers[index];

    const modal =
        document.getElementById("offerModal");

    const content =
        document.getElementById("offerModalContent");


    // =====================================================
    // // AQUÍ SE MUESTRA LA SEGUNDA IMAGEN
    // =====================================================

    content.innerHTML = `

        <div class="offer-modal-image">

            ${
                offer.detailImage

                ?

                `
                <img
                    src="${offer.detailImage}"
                    alt="${offer.name}">
                `

                :

                `
                <div class="image-placeholder large">

                    🖼️

                    <span>
                        IMAGEN DE LA OFERTA
                    </span>

                </div>
                `
            }

        </div>


        <span class="offer-category">

            ${offer.category}

        </span>


        <h2>

            ${offer.name}

        </h2>


        <div class="offer-modal-price">

            <del>

                ${offer.oldPrice}

            </del>

            <strong>

                ${offer.price}

            </strong>

        </div>


        <p class="modal-stock">

            🟢 OFERTA ACTIVA

            <br>

            📦 Inventario:

            ${offer.stock}

        </p>


        <button
            class="buy-offer-btn"
            onclick="buyOffer()">

            🛒 Comprar ahora

        </button>

    `;


    modal.classList.add("show");

}



// =========================================================
// CERRAR OFERTA
// =========================================================

function closeOffer() {

    document
        .getElementById("offerModal")
        .classList.remove("show");

}



// =========================================================
// BOTÓN COMPRAR
// =========================================================

function buyOffer() {

    alert(
        "Aquí podrás colocar posteriormente el sistema de compra."
    );

}



// =========================================================
// CERRAR MODAL AL HACER CLIC AFUERA
// =========================================================

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById("offerModal");

        if (event.target === modal) {

            closeOffer();

        }

    }
);
```
