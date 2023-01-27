# DOC API RESTO

## Doc

## Structure

### Visiteur (non loggé)

* voir les restaurants
* voir les menus
* se register
* se logger

### Client (loggé)

* voir ses commandes et leur statut    // user(loggé) => getDataById
* creer une commande (s'il n'y en a pas deja en cours) (statut = 1)
    * ajouter un menu a une commande
    * supprimer un menu d'une commande
    * annuler la commande en cours (statut < 2)
* valider une commande (statut = 2)
* annuler une commande validée (statut < 3)

### Caisse (loggé adminLvl 1)

* voir les commandes d'un client (order => getAllByUserId)
* prendre en compte la commande (statut = 3)
* servir une commande (statut = 4)

### Gestionnaire (loggé adminLvl 2)

* CRUD des restaurants
* CRUD des menus
* changer le niveau d'admin
