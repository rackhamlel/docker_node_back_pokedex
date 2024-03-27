/** 
 *  Serveur Backend Pokedex
 */


var express = require('express')
var cors = require('cors')
var app = express()
const fs= require('fs');
app.use(cors())
app.use(express.static('FILES'));
// Définir l'emplacement des fichiers bases de données

const POKEDEX = "./DATA/pokedex.json";

// Définir l'emplacement des images

const IMAGE_POKEMON = "./FILES/images";

// Définir un port 

const port = 5001;

// lancer un serveur express



// lancer le serveur et attendre
app.listen(port, '0.0.0.0',
    ()=>{
        console.log('Server Pokedex is listening on ' + port);
    }
);

// Crée la route qui renvoie tout

app.get('/', findAllPokemon);
app.get('/random', RandomPokemon);  
app.get('/pokemon/:id', FindPokemon);  
app.get('/nom/:name', NomPokemon)
    // fonction
function findAllPokemon(request, response) {
    // Lecture du fichier
    let data = fs.readFileSync(POKEDEX);

    // Analyse du JSON
    let pokedex = JSON.parse(data);

    
    response.json(pokedex);


    
}


function RandomPokemon(request, response){

   
    // Lecture du fichier
    let data = fs.readFileSync(POKEDEX);

    // Analyse du JSON
    let pokedex = JSON.parse(data);
    

    let random = Math.floor(Math.random() * pokedex.length) + 1;



    // Renvoin le json interprété random

    response.send(pokedex[random]);
}
function FindPokemon(request, response){
    const id = request.params.id; // Récupérez le id depuis les paramètres de l'URL
    // Lecture du fichier
    let data = fs.readFileSync(POKEDEX);

    // Analyse du JSON
    let pokedex = JSON.parse(data);

    // envoie du pokémon
    response.send(pokedex[id-1]);
}
function NomPokemon(request, response){

    // Lecture du fichier
    let data = fs.readFileSync(POKEDEX);

    // Analyse du JSON
    let pokedex = JSON.parse(data);

    let nom = request.params.name;

    const result = pokedex.filter((pokemon) => pokemon.name.french === nom);
    response.send(result);
}