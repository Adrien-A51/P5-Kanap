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

          
}
}