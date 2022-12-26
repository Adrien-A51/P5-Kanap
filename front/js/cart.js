// Déclaration de la variable basket dans laquelle on met les keys et les valeurs qui sont dans le LocalStorage 
let basket = JSON.parse(localStorage.getItem("produits")); 
// JSON.parse c'est pour convertir les données au format JSON qui sont dans le Local Storage en objet js

//----------------------------------- Afficher les produits dans le panier ------------------------------------------------
// Sélection de la classe où Mettre le code html
let basket_container = document.querySelector("#cart__items"); 

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


  let kanapData = [];


  // fetch
    async function kanapFetch(id) {
      await fetch(`http://localhost:3000/api/products/` + id)
        .then((res) => res.json())
        .then((promise) => {
          kanapData = promise;
  
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
     
  
    // fin de la modif du DOM
    if (i == basket.length - 1){

      let deleteItem = document.getElementsByClassName("deleteItem");

      if (deleteItem.length != 0) {

        for (let j = 0; j < deleteItem.length; j++) {
          deleteItem[j].addEventListener("click", function (e) {
   
            // basket = basket.filter(el => el.id !== iDdeleteItem && el.color !== ColordeleteItem);

            let dI = this.closest("article");
            divproduit = document.getElementById("cart__items")
            divproduit.remove();

            console.log(this);
            //console.log(dI.dataset.id);
            
            // on envoie la Suppression dans le LocalStorage
            // Transformation en format JSON + envoi dans la key produits du LS
            localStorage.setItem("produits", JSON.stringify(basket));

            //console.log(this);
            alert("Le canapé à bien été supprimé du panier");

            // Rechargement de la page
            window.location.href = "cart.html";


          });
        };
      }
        /*else{
            console.log("alert3");
    
        }*/ }

  }// / const kanap

  };// / boucle for basket

//----------------------------------- Calcul du prix total des produits dans le panier ------------------------------------------------
/*
// Variable prix total
let CalculPrixTotal = [];


// Aller chercher les prix des produits dans le panier
for (let i = 0; i < kanapData.length; i++) {
  let prixProduitPanier = kanapData.price;


// Mettre les prix dans la variable "CalculPrixTotal"
//La méthode push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.

  CalculPrixTotal.push(prixProduitPanier);

};

//Addition des prix qu'il y a dans le tableau de la variable "CalculPrixTotal"
const reducer = (accumulator, currentValue) => accumulator + currentValue; 
const prixTotal = CalculPrixTotal.reduce(reducer,0);

*/





//
// Video ytb produitEnregisterDansLocalStorage = basket
//
