//récupération de l'orderid de confirmation pour affichage du numéro de commande
let produit_Id = new URL(window.location.href).searchParams.get("orderid");

// cherche l' orderId pour savoir où afficher le numéro de commande
let order_Id = document.getElementById("orderId");
order_Id.innerHTML = produit_Id;

// on vide le LocalStorage pour que le numero de la commande et les infos du panier ne soit pas stocké ds le ls
localStorage.clear();