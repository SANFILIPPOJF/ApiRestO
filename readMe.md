# DOC API RESTO

## Structure des reponses
Toutes les reponses de l'API ont un **body** avec la même structure :

```json
{ 
	"status"  : { code de statut } ,                // number 
	"message" : { Information sur la reponse } ,    // string 
    "data"    : { Les données }                     // detaillé pour chaque requete 
}
```
## Structure des données récurrentes

**{ USER DATA }**
```json
{ 
    "id"        : { Identifiant de l'utilisateur } ,    // number 
    "name"      : { Nom de l utilisateur } ,            // string 
    "admin_lvl" : { Niveau d'Admin de l utilisateur }   // number 
}
```
**{ RESTO DATA }**
```json
{ 
    "id"    :  { Identifiant du commentaire }  ,    //number
    "city"  :  { Nom de la ville }                  //string
}
```
**{ MENU DATA}**
```json
{ 
    "id"    :   { Identifiant du menu }  ,  //number
    "name"  :   { Nom du menu }  ,          //string
    "price" :   { Prix du menu }            //number
}
```
**{ ORDER DATA }**
```json
{ 
    "id"            : { identifiant de la commande } ,  // number 
    "status"        : { Etat de la commande } ,         // number   
    "created_at"    : { Date de création } ,            // date 
    "validated_at"  : { Date de validation } ,          // date 
    "checked_at"    : { Date de prise en compte } ,     // date
    "served_at"     : { Date de livraison },            // date
}
```
**{ ORDERLINE DATA }**
```json
{ 
    "id" :            { identifiant de la ligne de commande } , // number 
    "multiplicator" : { multiplicateur du menu } ,              // number
}
```
## Les differents états d'une commande

    * Etat de la commande
    - 1: en cours
    - 2: validée (par le client)
    - 3: prise en compte (restaurant)
    - 4: servie 

## Les niveaux d'admin
Les niveaux d'admin permettent d'acceder à differentes requetes.
Bien sur avoir un niveau d'admin superieur à 0 permet quand meme d'acceder aux requetes de niveau inférieur.

    * Niveau d'admin du user
    -   : Visiteur
    - 0 : Client loggé
    - 1 : Caisse
    - 2 : Admin

* * *
# Les requetes par niveau d'admin
## Visiteur (non loggé)

### voir les restaurants
```
GET /api/restos/
```
response body data
```json
{ 
    "data"    : [
        {
            { RESTO DATA }  // tableau des données de chaque restaurant
        },
        ...
    ]
}
```
* voir les menus
```
GET /api/menus/
```
response body data
```json
{ 
    [
        {
            { MENU DATA }   // tableau des données de chaque menu
        },
        ...
    ]
}
```
* Ajouter un nouvel utilisateur
```
POST /api/users/
```
resquest body
```json
{ 
	"name"     : { Nom de l utilisateur },   // string
    "password" : { Mot de passe }            // string 
}
```
response body data
```json
{ 
    { USER DATA }   // données du user créé
}
```
* se logger

Authentification d'un utilisateur. Fourni un **Bearer Token** d'authentification nécessaire pour les requetes à partir du niveau d'admin 0 (client loggé)

```
POST /api/users/login/
```
**Request body** 

```json
{
	"name" : { Nom de l utilisateur },   // string
	"password" : { Mot de passe }        // string 
}
```
**Response body data**

```json
{
    { USER DATA },                          // données du user connecté
    "token" : { Token d'Authentification }  // string 
}
```
* * *
### Client (loggé adminLvl 0)

* voir ses commandes et leur statut

```
GET /api/users/
```
**Response body data**

```json
{
    { USER DATA },  // données du User effectuant connecté effectuant la demande
    "orders" : [
        {
            { ORDER DATA }, // tableau de ses commandes
            "lines" : [
                {
                    { ORDERLINE DATA }, // tableau des lignes de chaque commande
                    "menu" : {
                        { MENU DATA }   // données menu lié a chaque ligne de commande
                    }
                },
                ...
            ],
            "resto"         : {
                { RESTO DATA } // Données du resto lié a la commande
                }
        },
        ...
    ]
}
```
* creer une commande (statut = 1)

si l'utilisateur a deja une commande en cours la requete retourne **cette** commande

```
POST /api/orders/
```
**Request body** 

```json
{
	"restoId" : { Identifiant du restorant },   // number
}
```
**Response body data**

```json
{
    { ORDER DATA },     // données de la commande crée
    "user" :    {
        { USER DATA }   // User ayant créé la commande
    },
    "resto" :   {
        { RESTO DATA }  // Resto lié à la commande
    }
}
```
- ajouter un menu a une commande
```
PUT /api/orders/addMenu/:idMenu
```
**Request body** 

```json
{
	"userId" :  { Identifiant de l'utilisateur },   // string
	"mult" :    { Multiplicateur du menu }          // number
}
```
**Response body data**

```json
{
    { ORDER DATA },     // données de la commande concernée
    "user" :    {
        { USER DATA }   // User ayant créé la commande
    },
    "lines" :[
        {
            { ORDERLINE DATA }  // tableau des lignes de la commande
        }
    ],
    { RESTO DATA}       // resto lié a la commande
}
```
- supprimer un menu d'une commande
```
PUT /api/orders/supMenu/:idMenu
```
**Request body** 

```json
{
	"userId" :  { Identifiant de l'utilisateur },   // string
	"mult" :    { Multiplicateur du menu }          // number
}
```
**Response body data**

```json
{
    { ORDER DATA },     // données de la commande concernée
    "user" :    {
        { USER DATA }   // User ayant créé la commande
    },
    "lines" :[
        {
            { ORDERLINE DATA }  // tableau des lignes de la commande
        }
    ],
    { RESTO DATA}       // resto lié a la commande
}
```
* faire evoluer le statut d'une commande

Un utilisateur loggé a la possibilité de faire evoluer le statut de sa commande en cours. 
```
PUT /api/orders/:orderId   
```
**Response body data**

```json
{
    { ORDER DATA },     // données de la commande dont le statut a evolué
}
```
* Supprimer une commande

 L'utilisateur peut supprimer sa commande en cours si celle ci n'etait pas déja prise en compte (statut < 3)
```
PUT /api/orders/:orderId   
```
**Response body data**

```json
{
    boolean     // 1 : commande supprimée
}
```
* * *
### Caisse (loggé adminLvl 1)

* voir les commandes d'un client
```
GET /api/orders/byUser/:id   
```
**Response body data**

```json
{
    { ORDER DATA },     // tableau des commandes du client
    { USER DATA },
    { RESTO DATA },
    lines : {
        { ORDERLINE DATA}
    }   
},
...

```
* voir les commandes d'un resto
```
GET /api/orders/byResto/:id   
```
**Response body data**

```json
{
    { ORDER DATA },     // tableau des commandes du resto
    { USER DATA },
    { RESTO DATA },
    lines : {
        { ORDERLINE DATA}
    }   
},
...

```
* prendre en compte la commande et servir une commande ce font avec la meme requete (voir details  ***faire evoluer le statut d'une commande***)

```
PUT /api/orders/:orderId   
```
* * *

### Gestionnaire (loggé adminLvl 2)

#### CRUD des restaurants
* Ajouter un restaurant
```
POST /api/users/restos   
```
**Request body** 

```json
{
	"city" :  { Ville du restaurant },   // string
}
```
**Response body data**

```json
{
    { RESTO DATA }      // données du restaurant ajouté 
}
```
* Modifier un restaurant
```
PUT /api/users/restos/:id
```
**Request body** 

```json
{
	"city" :  { Nouveau nom de la ville }   // string
}
```
**Response body data**

```json
{
    { RESTO DATA }      // données du restaurant modifié 
}
```
* Supprimer un restaurant
```
DELETE /api/users/restos/:id  
```
**Response body data**

```json
{
    boolean      // 1 : restaurant supprimé 
}
```
#### CRUD des menus
* Ajouter un menu
```
POST /api/users/menus   
```
**Request body** 

```json
{
	"name" :  { nom du menu },      // string
    "price" : { prix du menu }      // 0 < number < 999.99
}
```
**Response body data**

```json
{
    { MENU DATA }      // données du menu ajouté 
}
```
* Modifier un menu
```
PUT /api/users/menus/:id
```
**Request body** 

```json
{
	"name" :  { Nouveau nom du menu },   // string
    "price":  { nouveau prix }           // 0 < number < 999.99
}
```
**Response body data**

```json
{
    { MENU DATA }      // données du menu modifié 
}
```
* Supprimer un menu
```
DELETE /api/users/menus/:id  
```
**Response body data**

```json
{
    boolean      // 1 : menu supprimé 
}
```
* changer le niveau d'admin
```
PUT /api/users/admin/:userId/:adminLvl   
```
**Response body data**

```json
{
    { USER DATA }     // Donnees du user mise à jour
}
```