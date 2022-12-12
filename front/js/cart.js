// Déclaration de la variable basket dans laquelle on met les keys et les valeurs qui sont dans le LocalStorage 
let basket = JSON.parse(localStorage.getItem("produits")); 
// JSON.parse c'est pour convertir les données au format JSON qui sont dans le Local Storage en objet js

//----------------------------------- Afficher les produits dans le panier ------------------------------------------------

// si le panier est vide -> affiche le panier est vide
// basket === null - basket est strictement égal à null
if (basket === null) {
// variable qui affiche le panier vide
const panierVide = `
    <div class="panier-vide">
    <div> Le panier est vide</div>
    </div>
`;
  basket_container.innerHTML = panierVide; 
}

else {
// si le panier n'est pas vide -> affiche les produits dans le Local Storage
let structureProduitPanier = "";

//boucle for pour ajouter les produits aux panier
for (let i = 0; i < basket.length; i++ ) {

// Création du tableau
let kanapData = [];

// fetch
  async function kanapFetch() {
    await fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((promise) => {
        kanapData = promise;
        console.log(kanapData);

   });
  };
   const kanap = async () => {
      await kanapFetch();

      document.getElementById("cart__items").innerHTML = `
      <div class="cart__item__img">
        <img src="${kanapData[i].imageUrl}" alt="${kanapData[i].altTxt}">
      </div>
      <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${kanapData[i].name}</h2>
                    <p>${kanapData[i].colors[i]}</p>
                    <p>${kanapData[i].price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantité : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanapData[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
        </div>
      
      
      `
   };

   kanap();

}
}