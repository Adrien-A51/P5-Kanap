// Déclaration de la variable basket dans laquelle on met les keys et les valeurs qui sont dans le LocalStorage 
let basket = JSON.parse(localStorage.getItem("produits")); 
// JSON.parse c'est pour convertir les données au format JSON qui sont dans le Local Storage en objet js
console.log(basket);

//----------------------------------- Afficher les produits dans le panier ------------------------------------------------
// Sélection de la classe où Mettre le code html
const basket_container = document.querySelector("#cart__items"); 
console.log(basket_container);

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

  // fetch product_id
  let params = (new URL(document.location)).searchParams;
  let product_id = params.get('id');

  // afficher un produit(un objet) qui à été Sélectionné par l'id
fetch(`http://localhost:3000/api/products/${product_id}`)
.then((response) => response.json()) 
.then((kanap) => {console.log(kanap);

});
    
    structureProduitPanier = structureProduitPanier + `

    <section id="cart__items">   
      <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${basket[i].imageUrl}" alt="${basket[i].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${basket[i].name}</h2>
                    <p>${basket[i].color}</p>
                    <p>${basket[i].price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>quantité </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
      </article>   
    </section> 
            `;
  }
  // ajout du code html dans la page panier
  basket_container.innerHTML = structureProduitPanier;
          
}
