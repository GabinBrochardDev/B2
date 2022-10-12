console.info( "@TEST1 : Execution du script.js")

// doc api : https://v2.jokeapi.dev/
// endpoint api joke avec parametre : https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit
let endpoint = "https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
// let endpoint = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"


/*  -----------------------------------------------------
    1. LocalStorage
    ----------------------------------------------------- */

let nbJoke = 0;

if( localStorage.nbJoke != null ) {

    nbJoke = Number(localStorage.nbJoke);

} else {

    localStorage.nbJoke = 0;

}




/*  -----------------------------------------------------
    2. Fonction d'ajout d'une nouvelle blaque
    ----------------------------------------------------- */

function newJoke( ) {
   
    // Test que le navigateur est compatible avec du fetch
    if ( window.fetch ) {

        // Appel
        fetch(endpoint) // Fetch des datas : https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch
        .then(
            // Premier fonction de callback, c'est la fonction en cas de succès
            // Le paramètre retournée est la réponse
            function ( response ) {
                console.info ( "@SUCCESS-01" );
                console.log ( response );
    
                // Teste du statut de la reponse
                // Si "OK" alors on continu sinon non
                if ( response.statusText === "OK" ) {
    
                    console.log( "response.statusText === OK" )
                    // Par defaut, l'API Joke renvoie les données au format JSON
                    // Transformer la réponse en JSON interprétable
                    response.json()
                    .then(
                        // Succès de la promesse de transformation de la réponse en JSON
                        function ( datas ) {
                            // Succès
                            console.info ( "@SUCCESS-02" );
                            console.log( datas );
                            
                             // Pour les suppression des blague
                            // utilisation d'un compteur
                            nbJoke = nbJoke + 1;
                            localStorage.nbJoke = nbJoke;
                            console.info ("id blague en cours : " + nbJoke);
                            localStorage[nbJoke] = datas;


                            // Création d'un nouvel élément HTML
                            let tabJoke = document.getElementById( "jokeLines" );
                            tabJoke.appendChild ( generateJokeLine( datas ) );
    
                        }
                        ,
                        // Erreur de la promesse de trasnformation de la réponse en JSON
                        function ( error ) {
                            console.error ( "@ERROR-01 de trasnformation de la réponse en JSON" );
                            console.error( error );
                        }
                    )
    
                } else {
                    // Erreur
                }
            },
    
            // Le deuxième fonction de callback, c'est la fonction en cas d'échec
            // On aura comme paramètre l'erreur
            function ( error )
            {
                console.error ( error );
            }
        )
    
    } else {
    
        alert( "Votre navigateur ne permet pas de faire du fetch !" );
    
    }
}

/*  -----------------------------------------------------
    3. Fonction de création des lignes HTML des users
    ----------------------------------------------------- */

function generateJokeLine( datas ) {
    /*
        Cette fonction va recevoir les infos d'une blague
        et elle va renvoyer un élément HTML TR
    */
    /*
        Documentation :
        - https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model/Introduction 
        - https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild
        - https://developer.mozilla.org/fr/docs/Web/API/Document/createElement
    */
    /*
        <tr>
            <th scope="col">Catégorie</th> <!-- Afficher le genre de la blague sous la forme d'un icon -->
            <th scope="col">Blague</th> <!-- Affichage des blagues -->
        </tr>

    */ 
    let generatedJokeLine = document.createElement( 'TR' );
    generatedJokeLine.setAttribute( "id", "joke-" + nbJoke );

    // __________ Création de la structure __________ //

    // Catégorie
    let tdCategorieHTML = document.createElement( 'TD' );
    tdCategorieHTML.innerText = datas.category;
    tdCategorieHTML.setAttribute( "class", "align-middle" )


    // Blague
    /*
        Les blague ne sont pas enregistrer de la même manoere en fonction du type
        Aujourd'hui (221002) il n'existe pas de blague française qui on un data.type = single,
        je choisi tout de même d'intégré cette possibilité dans mon code 
    */
    let tdBlagueHTML = document.createElement( 'TD' );
    tdBlagueHTML.setAttribute( "class", "align-middle" );
    if ( datas.type == "single" ) {
     
        tdBlagueHTML.innerText = datas.joke;

    } else {

        tdBlagueHTML.innerText = datas.setup + "\n" + datas.delivery;   

    }

    /*
    <button type="button" class="btn btn-outline-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                </svg>
                Button
              </button>
    */

    // Suppression d'une blague
    let tdRemoveHTML = document.createElement('TD');
    let buttonRemoveHTML = document.createElement('button');
    // let imgRemoveHTML = doducment.createElement('IMG');
    buttonRemoveHTML.innerText = "Supprimer de la blague";
    // imgRemoveHTML.setAttribute( "src", "./assets/img/trash.svg" )
    
    buttonRemoveHTML.setAttribute("class", "btn btn-outline-danger");
    buttonRemoveHTML.setAttribute("type", "button");
    buttonRemoveHTML.setAttribute("onclick", "removeJoke('joke-" + nbJoke + "');");

    



    // _________ Filiations _________ //
    // Filliation de l'élément tdCategorieHTML à generatedJokeLine
    generatedJokeLine.appendChild( tdCategorieHTML );
    
    // Filliation de l'élément tdBlagueHTML à generatedJokeLine
    generatedJokeLine.appendChild( tdBlagueHTML );

    // // Filliation de l'élément pathRemoveHTML à svgRemoveHTML
    // svgRemoveHTML.appendChild( pathRemoveHTML );

    // Filliation de l'élément imgRemoveHTML à buttonRemoveHTML
    // buttonRemoveHTML.appendChild( imgRemoveHTML );

    // Filliation de l'élément buttonRemoveHTML à tdRemoveHTML
    tdRemoveHTML.appendChild( buttonRemoveHTML );

    // Filliation de l'élément tdRemoveHTML à generatedJokeLine
    generatedJokeLine.appendChild( tdRemoveHTML );

    return generatedJokeLine // renvoi de l'élément html : generatedJokeLine
}


/*  -----------------------------------------------------
    4. Fonction de suppression d'une blague
    ----------------------------------------------------- */

function removeJoke ( idJoke ) {

    const element = document.getElementById( idJoke ); // Sélection de l'élément portant l'id "idJoke"
    element.remove(); // suppression de cet élément

}

