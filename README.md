README Calendar :

pour langer le projet :

- cloner depuis github
- npm install ou yarn install pour installer les dependances
- npm start ou yarn start pour lancer le projet

Décomposition des composants React :

EventTree : le composant parent qui presente le conteneur du calendrier.
Affiche le div global du calendrier
trace le timeline du calendrier
Prendre le input des evenements et render le composant event de chaque evenement.

Event: le composant qui affiche chaque evenement spécifique dans la grille

la logique de répartition des evenments consiste à regrouper ces evenements dans chaque tableau suivant leurs positions
demonstration de l'exemple de l'enoncé :
{
key 1 --> event1, event2 , ..
key 2 --> event1 , event2, event 3 ....
...
}

les evenements sont contenus dans des colonnes, si on a un overlaps l'evenements passe de la colonne n a la colonne n+1 .
