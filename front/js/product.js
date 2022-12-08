// afficher produit id
const queryString_url_id = window.location.search;
console.log(queryString_url_id);


// extraire l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get("id");
console.log(id);

// afficher un produit(un objet) qui à été Sélectionné par l'id
fetch(`http://localhost:3000/api/products/${id}`)
.then((product) => product.json()) 
.then((product) => {});

// Déclarer les variables nécessaires
let image = document.querySelector(".item__img");
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let description = document.querySelector("#description");
let color = document.querySelector("#colors");
let quantity = document.querySelector("#quantity");
let addToCart = document.querySelector("#addToCart");

//Sélection de la classe où on injecte le code html
const positionElmt = document.querySelector(".item")
console.log(positionElmt);




              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description"><!-- Dis enim malesuada risus sapien gravida nulla nisl arcu. --></p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Choisir une couleur :</label>
                  <select name="color-select" id="colors">
                      <option value="">--SVP, choisissez une couleur --</option>
<!--                       <option value="vert">vert</option>
                      <option value="blanc">blanc</option> -->
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>

            </div>
          </article>


function productAdded(){
  document.querySelector(".product__added").textContent = `Votre commande viens d'etre ajoutée au panier`;
  style()
}

function excessQuantity(){
  document.querySelector(".excess__quantity").textContent = "La quantité total d'un même article ne peux dépasser 100";
  styleError()
}
//------------------------------------------------------------