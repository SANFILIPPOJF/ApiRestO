# DOC API RESTO

## Structure
Toutes les reponses de l'API ont un **body** avec la même structure :

```json
{ 
	"status"  : { code de statut } ,                // number 
	"message" : { Information sur la reponse } ,    // string 
    "data"    : { Les données }                     // decrit plus bas 
}
```
## Les requetes par niveaux d'admin

Les niveaux d'admin permettent d'acceder à differentes requetes.
Bien sur avoir un niveau d'admin superieur à 0 permet quand meme d'acceder aux requetes de niveau inférieur. 
* * *
### Visiteur (non loggé)

#### voir les restaurants
```
GET /api/restos/
```
response body data
```json
{ 
    "data"    : [
        {
            "id"    :  { Identifiant du commentaire }  ,    //number
            "city"  :  { Nom de la ville }                  //string
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
            "id"    :   { Identifiant du menu }  ,  //number
            "name"  :   { Nom du menu }  ,          //string
            "price" :   { Prix du menu }            //number
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
	"pass" : { Mot de passe } ,         // string 
	"name" : { Nom de l utilisateur }   // string 
}
```
response body data
```json
{ 
    "id"        : { Identifiant de l'utilisateur } ,    // number 
    "name"      : { Nom de l utilisateur } ,            // string 
    "admin_lvl" : { Niveau d'Admin de l utilisateur }   // number 
}
```
* se logger

Authentification d'un utilisateur. Fourni le **Bearer Token** d'Authentification nécessaire pour les requetes marquées **(#)**

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
    "id"        : { identifiant de l'utilisateur } ,    // number 
    "name"      : { Nom de l utilisateur } ,            // string 
    "admin_lvl" : { Niveau d'Admin de l utilisateur } , // number 
    "token"     : { Token d'Authentification }          // string 
}
```
* * *
### Client (loggé adminLvl 0)

* voir ses commandes et leur statut    // user(loggé) => getDataById

```
GET /api/users/
```
**Response body data**

```json
{
    "id"        : { identifiant de l'utilisateur } ,    // number 
    "name"      : { Nom de l utilisateur } ,            // string 
    "admin_lvl" : { Niveau d'Admin de l utilisateur } , // number 
    "orders"    : [
        {
            "id"            : { identifiant de la commande } ,    // number 
            "status"        : { Etat de la commande } ,           // number   
            "created_at"    : { Date de création } ,              // date 
            "validated_at"  : { Date de validation } ,            // date 
            "checked_at"    : { Date de prise en compte } ,       // date
            "served_at"     : { Date de livraison },              // date
            "lines"         : [

            ]
        },
        ...
    ]
        { Token d'Authentification }          // string 
}
```
* Etats d'une commande
    * 1: en cours
    * 2: validée (par le client)
    * 3: prise en compte (restaurant)
    * 4: servie (non modifiable)


* creer une commande (s'il n'y en a pas deja en cours) (statut = 1)
    * ajouter un menu a une commande
    * supprimer un menu d'une commande
    * annuler la commande en cours (statut < 2)
* valider une commande (statut = 2)
* annuler une commande validée (statut < 3)
* * *
### Caisse (loggé adminLvl 1)

* voir les commandes d'un client (order => getAllByUserId)
* prendre en compte la commande (statut = 3)
* servir une commande (statut = 4)
* * *
### Gestionnaire (loggé adminLvl 2)

* CRUD des restaurants
* CRUD des menus
* changer le niveau d'admin
