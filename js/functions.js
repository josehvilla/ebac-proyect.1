//Mostrar menu
const headerMenu = document.querySelector(".header");
const menuIcon = document.querySelector(".header__icon--menu");
const menu = document.querySelector(".menu");

menuIcon.addEventListener("click", () => {
    menu.style.left = "0";
})  

//Esconder menu
const closeIcon = document.querySelector(".menu__header--close-icon");
closeIcon.addEventListener("click", () => {
    menu.style.left = "-100%";
})

//Mostrar caja de compras
const headerCart = document.querySelector(".header");
const cartIcon = document.querySelector(".header__icon--cart");
const cart = document.querySelector(".cart");

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("show");
})

//Carrito
const carrito = document.querySelector(".cart");
const productsList = document.querySelector(".products");
const cartContainer = document.querySelector(".cart__content");

let productsCart = [];

registerEventsListener();

function registerEventsListener() {

//Agregar productos al carrito
    productsList.addEventListener("click", addProduct);

//Eliminar productos al carrito
    carrito.addEventListener("click", deleteProduct);
} 

function addProduct(e) {
    if(e.target.classList.contains("products__item--button")) {
        const productSelected = e.target.parentElement;
        readInfo(productSelected);  
    }   
}

function deleteProduct(e) {
    if(e.target.classList.contains("cart__content--delete-icon")) {
        const productId = e.target.getAttribute("data-id");

        productsCart = productsCart.filter(product => product.id !== productId);

        cartHTML();
    }
}

function readInfo(product) {
    const InfoProduct = {
        image: product.querySelector("img").src,
        name: product.querySelector("h3").textContent,
        price: product.querySelector("p").textContent,
        id: product.querySelector("button").getAttribute("data-id"),
        quantity: 1
    }

    const exist = productsCart.some(product => product.id === InfoProduct.id);

    if(exist) {
        const products = productsCart.map(product => {
            if(product.id === InfoProduct.id) {
                product.quantity++;
                return product;
            }
            else {
                return product;
            }
        });
        [...productsCart, InfoProduct]
    } else{
        productsCart = [...productsCart, InfoProduct];
    }

    cartHTML();
}

function cartHTML() {
    cleanHTML();

    let total = 0;
    let totalOfProducts = 0;

    productsCart.forEach(product => {
        const row = document.createElement("div");
        row.classList.add("cart__content--item");
        row.innerHTML = `
            <img class="cart__content--item--img" src=${product.image}></img>
            <p class="cart__content--item--quantity">${product.quantity}</p>
            <p class="cart__content--item--product">${product.name}</p>
            <p class="cart__content--item--price">${product.price}</p>
            <i><img class="cart__content--item--delete-icon" src="img/delete.png" data-id="${product.id}"></i>
        `;

        cartContainer.appendChild(row);

        total = total + parseInt(product.quantity * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity;
    });

//Sumar importes y productos
    const valorTotal = document.querySelector(".cart__total--total");
    const countProducts = document.querySelector(".header__icon--badge");

    valorTotal.innerText = `$${total}`
    countProducts.innerText = totalOfProducts;
}

function cleanHTML() {
    while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild)
    }
}

//Resaltar productos
const product = document.querySelector(".mouse");

product.addEventListener("mouseenter", () => {
    product.style.opacity = ".6";
});

product.addEventListener("mouseleave", () => {
    product.style.opacity = "1";
});