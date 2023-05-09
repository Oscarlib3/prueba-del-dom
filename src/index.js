/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
//web api
//conectarnos al servidor

const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.querySelector("#app")

// Intl
// 1.- Format fechas
// 2.- Format monedas

const formatPrice = price => {

    const newPrice = new window.Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR"
    }).format(price)
 
    return newPrice;
 }

// web api

// Conectarnos al server
window
   .fetch(`${baseUrl}/api/avo`)
   .then(respuesta => respuesta.json())
   .then(responseJson => {

       const todosLosItems = [];
       
       responseJson.data.forEach(item => {
           
           // Crear imagen
           const imagen = document.createElement("img");
           imagen.src = `${baseUrl}${item.image}`;
           imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"

           // Crear título
           const titulo = document.createElement("h2");
           titulo.className = "text-lg"
           titulo.textContent = item.name;

           // Crear precio
           const precio = document.createElement("div");
           precio.className = "text-gray-600"
           precio.textContent = formatPrice(item.price);

           // Creamos un contenedor el título y el precio
           const priceAndTitle = document.createElement("div")
           priceAndTitle.className = "text-center md:text-left";
           priceAndTitle.appendChild(titulo);
           priceAndTitle.appendChild(precio);

           // Metemos todo dentro de una tarjeta contenedora
           const card = document.createElement("div");
           card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
           card.append(imagen, priceAndTitle);

           // Metemos todo dentro del contenedor principal
           const contenedor = document.createElement("div");
           contenedor.appendChild(card);

           todosLosItems.push(contenedor);

       });

       appNode.append(...todosLosItems);
       
   });