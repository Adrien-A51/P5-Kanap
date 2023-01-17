//récupérer l'orderid de confirmation pr affichage du num de commande

let produit_Id = new URL(window.location.href).searchParams.get("orderid");


let order_Id = document.getElementById("orderId");
order_Id.innerHTML = produit_Id;

// on vide le LocalStorage pour que le numero de la commande et les infos du panier ne soit pas stocké ds le ls
//localStorage.clear();

//**************************************************************************************//