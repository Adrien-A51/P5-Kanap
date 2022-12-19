// Déclaration de la variable basket dans laquelle on met les keys et les valeurs qui sont dans le LocalStorage 
let basket = JSON.parse(localStorage.getItem("produits")); 
// JSON.parse c'est pour convertir les données au format JSON qui sont dans le Local Storage en objet js

//----------------------------------- Afficher les produits dans le panier ------------------------------------------------
// Sélection de la classe où Mettre le code html
const basket_container = document.querySelector("#cart__items"); 

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
  async function kanapFetch(id) {
    await fetch(`http://localhost:3000/api/products/` + id)
      .then((res) => res.json())
      .then((promise) => {
        kanapData = promise;
        console.log(kanapData);

   });
  };
   const kanap = async () => {
      await kanapFetch(basket[i].id);

      document.getElementById("cart__items").innerHTML += 
      `
<article class="cart__item" data-id="${basket[i].id}" data-color="${basket[i].color}">
      <div class="cart__item__img">
        <img src="${kanapData.imageUrl}" alt="${kanapData.altTxt}">
      </div>
      <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${kanapData.name}</h2>
                    <p>${basket[i].color}</p>
                    <p>${kanapData.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantité : </p>
<input type="number" class="itemQuantity" 
name="itemQuantity" min="1" max="100" value="${basket[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
        </div>
</article>
      `
   };

   kanap();

}
}

//----------------------------------- Supprimer un produit dans le panier ------------------------------------------------

let deleteItem = document.getElementsByClassName("deleteItem");
console.log(deleteItem);


if (deleteItem.length != 0) {
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", () => {

        let iDdeleteItem = basket[i].id;
        let ColordeleteItem = basket[i].color;
        //console.log(iDdeleteItem);
        //console.log(ColordeleteItem);
        basket = basket.filter(el => el.id !== iDdeleteItem && el.color !== ColordeleteItem);

        let dI = deleteItem.closest("article").remove();
        alert("Produit Supprimé");

      })};
};
