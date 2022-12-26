// Récuperer l'id du produit
let params = (new URL(document.location)).searchParams;
let product_id = params.get('id');

// afficher un produit(un objet) qui à été Sélectionné par l'id
fetch(`http://localhost:3000/api/products/${product_id}`)
.then((response) => response.json()) 
.then((kanap) => {console.log(kanap);

displayProductInfos(kanap)

});

// Afficher les informations du produit avec une boucle for pour les couleurs
function displayProductInfos(product) {

// Déclaration des selectors
let product_img = document.querySelector(".item__img");
let product_title = document.querySelector("#title");
let product_price = document.querySelector("#price");
let product_description = document.querySelector("#description");
let product_colors = document.querySelector("#colors");


  product_img.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  product_title.innerHTML += `<h1 id="title"> ${product.name} </h1>`;
  product_price.innerHTML += `<span id="price"> ${product.price} </span>`;
  product_description.innerHTML += `<p id="description"> ${product.description} </p>`;
  for (let i = 0; i < product.colors.length; i++) {
    product_colors.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
  }
}





// créer une alerte pour l'Utilisateur
//alert("Bonjour")

// Envoi des produits sélectionnés dans le LocalStorage au clic sur le bouton Ajouter au panier
let btn = document.querySelector("#addToCart");

// Événement click
btn.addEventListener("click", () => {
  let couleurChoisie = document.querySelector("#colors").value; // récupère la couleur sélectionnée

  let quantity = document.querySelector("#quantity").value; // récupère de la quantité saisie
  

  
  if (
    quantity == undefined ||      //  si la quantité n'est pas défini
    quantity == null ||           //  si la quantité est égale à null (fausse)
    quantity < 1 ||               //  si la quantité est inférieure à 1
    quantity > 100 ||             //  si la quantité est supérieure à 100
    couleurChoisie === "" ||      //  si la couleur n'a pas été choisie
    couleurChoisie == null ||     //  si la couleur est égale à null
    couleurChoisie == undefined   //  si la couleur n'est pas défini
  )
  {
    alert(
      "Veuillez choisir une couleur et une quantité comprise entre 1 et 100 " // le message d'alerte s'affiche
    );
  } else {
    alert("votre produit à été ajouté au panier");
  //window.location.href = "cart.html"; //renvoie sur la page panier (cart.html)

  // création nouveau produit avec les 3 références
  let newProduct = {
    id: product_id,
    quantity: Number(quantity),
    color: couleurChoisie,
  };

    

//
// Le Local Storage
// Stocker les valeurs dans le Local Storage
//
//

// Déclaration de la variable basket dans laquelle on met les keys et les valeurs qui sont dans le LocalStorage 
let basket = JSON.parse(localStorage.getItem("produits")); 
// JSON.parse c'est pour convertir les données au format JSON qui sont dans le Local Storage en objet js
console.log(basket);

// S'il y a déja des produits d'enregistré dans le Local Storage
if (basket) {
  basket.push(newProduct);
  localStorage.setItem("produits", JSON.stringify(basket));
}

// S'il n'y a pas de produit d'enregistré dans le Local Storage
else{
  basket = [];
  basket.push(newProduct);
  localStorage.setItem("produits", JSON.stringify(basket));

}

}});

// JSON dans le Local Storage
//produits: [{"id":"77711f0e466b4ddf953f677d30b0efc9","quantity":1,"color":"Navy"}];

