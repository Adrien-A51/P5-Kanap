// Sélection de la class items
let items_container = document.querySelector(".items");

// Récupération des données de l'API
fetch(`http://localhost:3000/api/products`)
  .then((products) => products.json())
  .then((products) => {console.log(products);
    Produit(products);
  });

//Création et affichage des élèments + rajout des données dans ces balises
function Produit(products) {
  
  for (let i = 0; i < products.length; i++) {
    items_container.innerHTML += `
    <a href="./product.html?id=${products[i]._id}"> 
      <article>
        <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
        <h3 class="productName">${products[i].name}</h3> 
        <p class="productDescription">${products[i].description}</p>
      </article>
    </a>`;
  }
}
