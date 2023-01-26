# Visiteur (non loggé)
* voir les restaurants
* voir les menus
* se register
* se logger

# Client (loggé)
* voir ses commandes et leur statut    // order => getAllByUserId
* creer une commande (s'il n'y en a pas deja en cours) (statut = 1)
    - ajouter une ligne a une commande
    - modifier une ligne de commande
    - supprimer une ligne de commande
    - annuler la commande en cours (statut < 2)
- valider une commande (statut = 2)
- annuler une commande validée (statut < 3)

# Caisse (loggé adminLvl 1)
- prendre en compte la commande (statut = 3)
- servir une commande (statut = 4)

# Gestionnaire (loggé adminLvl 2)
- CRUD des restaurants
- CRUD des menus
- changer le niveau d'admin
