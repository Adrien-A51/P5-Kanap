// Déclaration de la variable basket dans laquelle on met les keys et les valeurs qui sont dans le LocalStorage 
let basket = JSON.parse(localStorage.getItem("produits")); 
// JSON.parse c'est pour convertir les données au format JSON qui sont dans le Local Storage en objet js

//----------------------------------- Afficher les produits dans le panier ------------------------------------------------
// Sélection de la classe où Mettre le code html
let basket_container = document.querySelector("#cart__items"); 

// Sélection de l'id totalQuantity qui est égal à 0
document.getElementById("totalQuantity").textContent = 0;

// Sélection de l'id totalPrice qui est égal à 0
document.getElementById("totalPrice").textContent = 0;


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

  // Création du tableau vide kanapData
  let kanapData = [];


  // fetch pour se connecter à l'API
    async function kanapFetch(id) {
      await fetch(`http://localhost:3000/api/products/` + id)
        .then((res) => res.json())
        .then((promise) => {
          kanapData = promise;
  
     });
    };
  
  
     // fonction pour aller chercher le contenu HTML de des articles produit du panier
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
                                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[i].quantity}">
                              </div>
                              <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                              </div>
                            </div>
                </div>
        </article>
        `;


///******************************  Calcul du nombre et du prix total des articles   ********************************///

// Calcul du nombre total d'article présents dans le panier
// Sélection de l'id totalQuantity qui est égal au nombre 0 auquel on ajoute les quantités de chaque produit les unes après les autres
document.getElementById("totalQuantity").textContent = Number(document.getElementById("totalQuantity").textContent) + Number(basket[i].quantity);
        
// Calcul du prix total des articles présents dans le panier
// Sélection de l'id totalPrice qui est égal au nombre 0 auquel on ajoute les prix de chaque produit les unes après les autres
document.getElementById("totalPrice").textContent = Number(document.getElementById("totalPrice").textContent) + Number(basket[i].quantity) * Number(kanapData.price);
        
///*****************************************************************************************************************///


///*****************  Modification de la quantité et calcul du nouveau prix total des articles   *******************///
  
// Sélection de chaque article avec la classe cart__item où l'on modifie la quantité
let input_quantity = document.querySelectorAll(".cart__item");

  // La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.
  input_quantity.forEach((input_quantity) => {

    // écoute et détéction du changement de quantité de l'input quantity
    input_quantity.addEventListener("change", (e) => {

      // Sélection de l'article le plus proche de l'input_quantity
      let article = input_quantity.closest("article");
      // Sélection du dataset-id
      let dataset_id = article.getAttribute("data-id");
      // Sélection du dataset-color
      let dataset_color = article.getAttribute("data-color");
      // boucle for pour modifier la qty a chaque modification pour chaque produit
      for (let i = 0; i < basket.length; i++) {

        if (basket[i].id === dataset_id && basket[i].color === dataset_color) {
          // si qty > 100
          if (e.target.value > 100) {
            // qty réduite à 100 max
            e.target.value < 100;
            // basket[i].quantity réduit à 100 max
            basket[i].quantity = 100;
            // envoie de la nouvelle qty sur le LocalStorage
            localStorage.setItem("produits", JSON.stringify(basket));
          } 
          
          // si qty < 1
          if (e.target.value < 1) {
            // qty réduite à 1 min
            e.target.value = 1;
            // basket[i].quantity réduit à 1 min
            basket[i].quantity = 1;
            // envoie de la nouvelle qty sur le LocalStorage
            localStorage.setItem("produits", JSON.stringify(basket));
          } 
          else {
            // parseInt() analyse une chaîne de caractère fournie en argument et renvoie un entier exprimé dans le LS
            basket[i].quantity = parseInt(e.target.value);
            // envoie de la nouvelle qty sur le LocalStorage
            localStorage.setItem("produits", JSON.stringify(basket));
                
            // Rechargement de la page
            window.location.href = "cart.html";
          }
        }
      }
    });
  });

  ///*****************************************************************************************************************///


  ///********************************  Bouton deleteItem qui supprime l'article souhaité  ****************************///

        if (i == basket.length - 1){

          // Sélection de la class du btn Supprimer
          let deleteItem = document.getElementsByClassName("deleteItem");
    
          // si deleteItem != 0 (est diferent de 0) on supprime chaque produit
          if (deleteItem.length != 0) {
    
            // boucle for qui supprime les produits à chaque click
            for (let j = 0; j < deleteItem.length; j++) {

              // écoute et détéction du click pour suppimer l'article sur lequel on clique
              deleteItem[j].addEventListener("click", function (e) {
       
              // Enregistrement de l'id et de la couleur séléctionnée par le bouton supprimer
              let dataset_Id = basket[i].id;
              let dataset_Color = basket[i].color;

              // Sélection des éléments à garder avec la méthode .filter pour suppimer l'article sur lequel on clique
              basket = basket.filter((element) => element.id !== dataset_Id || element.color !== dataset_Color);

              // on envoie la Suppression dans le LocalStorage
              // Transformation en format JSON + envoi dans la key produits du LS
              localStorage.setItem("produits", JSON.stringify(basket));
    
              alert("Le canapé à bien été supprimé du panier");
    
              // Rechargement de la page
              window.location.href = "cart.html";

              });// / addEventListener click
            };// / boucle for qui supprime les produits à chaque click
          };// / if deleteItem
        };// / if basket
     };// /  const kanap fonction pour aller chercher le contenu HTML des produits du panier
     kanap();

  };// / boucle for pour ajouter les produits aux panier
  };// / else si le panier n'est pas vide

///*****************************************************************************************************************///


///************************************  Vérification de la validité du formulaire  ********************************///

// Récupération des elements
let first_Name = document.querySelector('#firstName');
let last_Name = document.querySelector('#lastName');
let adress = document.querySelector('#address');
let city = document.querySelector('#city');
let email = document.querySelector('#email');
let btn_commander = document.querySelector('#order');

// Sélection de l'id firstNameErrorMsg
function firstNameError() {
  return document.getElementById("firstNameErrorMsg");
}

// Sélection de l'id lastNameErrorMsg
function lastNameError() {
  return document.getElementById("lastNameErrorMsg");
}

// Sélection de l'id addressErrorMsg
function addressError() {
  return document.getElementById("addressErrorMsg");
}

// Sélection de l'id cityErrorMsg
function cityError() {
  return document.getElementById("cityErrorMsg");
}

// Sélection de l'id emailErrorMsg
function emailError() {
  return document.getElementById("emailErrorMsg");
}

//// => vérification du champ Prénom
function verif_firstName() {
  firstName = document.getElementById("firstName").value
  //A-Z et a-z => toutes les lettres entre a et z   3,10 => minimum 3 crt et maximum 10 crt
  if (/^[A-Za-z]{3,10}$/.test(firstName)) {
    firstNameError().innerText = "Le Prénom est valide";
    return true; 
  } else {
    firstNameError().innerText = 
    "Le Prénom doit contenir uniquement des lettres et entre 3 et 10 caractères";
    return false; 
  }
};
  
  document
    .getElementById("firstName")
    .addEventListener("input", function(e) {
      verif_firstName();
  });
//// <=

//// => vérification du champ Nom
  function verif_lastName() {
    lastName = document.getElementById("lastName").value
    if (/^[A-Za-z]{3,15}$/.test(lastName)) {
      lastNameError().innerText = "Le Nom est valide";
      return true; 
    } else {
      lastNameError().innerText = 
      "Le Nom doit contenir uniquement des lettres et entre 3 et 10 caractères";
      return false; 
    }
  }

  document
    .getElementById("lastName")
    .addEventListener("input", function(e) {
      verif_lastName();
  });
//// <=

//// => vérification du champ Adresse
  function verif_address(){
    address = document.getElementById("address").value
    if (/^[a-zA-Z0-9\s,.'-]{6,20}$/.test(address)) {
      addressError().innerText = "L'adresse est valide";
      return true; 
    } else {
      addressError().innerText = 
      "L'adresse doit contenir d'abord un nombre et ensuite uniquement des lettres et entre 5 et 20 caractères";
      return false; 
    }
  };

  document
    .getElementById("address")
    .addEventListener("input", function(e) {
      verif_address();
  });
//// <=
  
//// => vérification du champ Ville
  function verif_city() {
    city = document.getElementById("city").value
    if (/^[a-zA-Z0-9\s,.'-]{7,20}$/.test(city)) {
      cityError().innerText = "La ville est valide";
      return true; 
    } else {
      cityError().innerText = 
      "La ville doit être au format 75000 Paris";
      return false; 
    }
  };

  document
    .getElementById("city")
    .addEventListener("input", function(e) {
    verif_city();
  });
//// <=

//// => vérification du champ Email  
  function verif_email() {
    email = document.getElementById("email").value
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i.test(email)) {
      emailError().innerText = "L'adresse email est valide";
      return true; 
    } else {
      emailError().innerText = 
      "L'adresse e-mail doit être au format email@domain.com";
      return false; 
    }
  };

  document
    .getElementById("email")
    .addEventListener("input", function(e) {
    verif_email();
  });
//// <=

// addEventListener click btn_commander
btn_commander.addEventListener('click', (event) => {
  event.preventDefault(event);

let firstName_ok = verif_firstName();
let lastName_ok = verif_lastName();
let address_ok = verif_address();
let city_ok = verif_city();  
let email_ok = verif_email();
alert("ok"+ firstName_ok + lastName_ok + address_ok + city_ok + email_ok);

if (basket === null) {
  alert("Le panier est vide")
} else {
  alert("le panier n'est pas vide")
}

});// FIN addEventListener click btn_commander


///*****************************************************************************************************************///