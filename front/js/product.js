// Récuperer l'id du produit
let params = (new URL(document.location)).searchParams;
let product_id = params.get('id');

// afficher un produit(un objet) qui à été Sélectionné par l'id
fetch(`http://localhost:3000/api/products/${product_id}`)
.then((response) => response.json()) 
.then((product) => {console.log(product);
// appel de la fonction displayProductInfos
PageProductInfos(product)
});// .then product

// Afficher les informations du produit avec une boucle for pour les couleurs
function PageProductInfos(product) {

// Déclaration des selectors
let product_image = document.querySelector(".item__img");
let product_title = document.querySelector("#title");
let product_price = document.querySelector("#price");
let product_description = document.querySelector("#description");
let product_colors = document.querySelector("#colors");


  product_image.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  product_title.innerHTML += `<h1 id="title"> ${product.name} </h1>`;
  product_price.innerHTML += `<span id="price"> ${product.price} </span>`;
  product_description.innerHTML += `<p id="description"> ${product.description} </p>`;
  // boucle for pour l'ajout des couleurs
  for (let i = 0; i < product.colors.length; i++) {
    product_colors.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
  }
};


// Envoi des produits sélectionnés dans le LocalStorage au clic sur le bouton Ajouter au panier
let btn = document.querySelector("#addToCart");

// Événement click
btn.addEventListener("click", () => {
  let couleurChoisie = document.querySelector("#colors").value; // récupère la couleur sélectionnée
  let quantity = document.querySelector("#quantity").value; // récupère de la quantité saisie

  // Déclaration de la variable basket dans laquelle on met les keys et les valeurs qui sont dans le LocalStorage 
  let basket = JSON.parse(localStorage.getItem("produits")); 
  
  // fonction qui vérifie que si un autre produit avec la même couleur est ajouté au panier seul la quantité s'ajoute

  if (couleurChoisie === "" || quantity < 1 || quantity > 100){              //  si la couleur n'a pas été choisie
    alert("Veuillez choisir une couleur et une quantité comprise entre 1 et 100"); // le message d'alerte s'affiche
  }
/*
  if (quantity < 1 || quantity > 100){      //  si la quantité est inférieure à 1 ou supérieure à 100
  alert("Veuillez choisir une quantité comprise entre 1 et 100"); // le message d'alerte s'affiche
  }
  */
  else {
    alert("votre produit à été ajouté au panier"); // sinon le message de confirmation s'affiche
    window.location.href = "cart.html"; //renvoie sur la page panier (cart.html)

  // création nouveau produit avec les 3 références
  let newProduct = {
    id: product_id,
    quantity: Number(quantity),
    color: couleurChoisie,
  };


  // Rechercher si un produit est déja présentnt dans le LocalStorage
  let found = basket.find(
    // element => id et couleur ajouté au panier est Identique au id et couleur qui est déjà présent dans le panier
    (element) => element.id == product_id && element.color == couleurChoisie
  );
  // si found est inégale a undefined
  if (found != undefined) {

    // quantité de produits dans le LS + quantité actuelle
    let totalQuantity = parseInt(found.quantity) + parseInt(quantity);
    found.quantity = totalQuantity;
    
  } else {
    basket.push(newProduct); // on enregistre les éléments dans le LocalStorage si il n'existe pas
  }
  // on enregistre le nouvel element et on additionne la qty dans le LS/
  //STRINGIFY = on récupère sous forme de chaine de Caractère
  localStorage.setItem("produits", JSON.stringify(basket)); 
  console.log(basket)



}});// fin addEventListener click ajt au panier

// JSON dans le Local Storage
// exemple d'un produit
// produits: [{"id":"77711f0e466b4ddf953f677d30b0efc9","quantity":1,"color":"Navy"}];

