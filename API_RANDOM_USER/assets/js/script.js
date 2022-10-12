//documentation : https://randomuser.me/documentation

// API endpointRU : https://randomuser.me/api/
let endpointRU = "https://randomuser.me/api/?results=50";





// 1. Fetch des datas
// **************************************
// https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch

// Vérifier que le navigateur peut faire du fetch
if (window.fetch) {


    // Appel
    fetch(endpointRU)
    .then(
        // Premier fonction de callback, c'est la fonction en cas de succès
        // Et on aura un paramètre qui est la réponse
        function ( response ) {
            console.info ( "SUCCESS" );
            console.log ( response );

            // Tester le statut de la reponse
            // et en fonction on continue ou non
            if ( response.statusText === "OK" ){
                console.log("response.statusText === OK")
                // On pet continuer
                // Par defaut, l'API renvoie le format JSON
                // Transformer la réponse en JSON interprétable
                /*
                    Quand retourne une promesse alors ".then()"
                */
                response.json()
                .then(
                    // Succès e la promesse de transformation de la réponse en JSON
                    function ( datas ) {
                        // Succès
                        // console.log ( "Succès de la promesse de transformation de la réponse en JSON")
                        console.table( datas.results );

                        let tabUsers = document.getElementById( "userLines" );

                        datas.results.forEach(element => {


                            // ajouter à l'élement id userLines la ligne générée
                            tabUsers.appendChild( generateUserLine( element ) );

                        });


                    }
                    ,
                    // Erreur de la promesse de trasnformation de la réponse en JSON
                    function ( error ){
                        console.error ( "ERROR de trasnformation de la réponse en JSON" );
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
    
    alert("Votre navigateur ne permet pas de faire du fetch");
    // On devra faire du XmlHttRequest

}

// 2. Fonction de création des lignes HTML des users
// **************************************

function generateUserLine( element ){
    /*
        Cette fonction va recevoir les infos d'un utilisateur
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
            <td>ID</td>
            <td>M/F/ND</td>
            <td>NOM PRENOM</td>
            <td><img src="" alt=""/> </td>
            <td>VILLE</td>
            <td>PAYS</td>
        </tr>

    */
    let generatedUserLine = document.createElement('TR');

    // // Création de la structure 
    // let trHTML = document.createElement('TR');

    // ID
    let tdIDHTML = document.createElement('TD');
    tdIDHTML.innerText = element.login.username;
    tdIDHTML.setAttribute("class", "align-middle")
    
    // Genre
    let tdGenreHTML = document.createElement('TD');
    let imgGenreHTML = document.createElement('IMG');

    switch ( element.gender ) 
    { 
        case "male":
            imgGenreHTML.setAttribute("src", "./assets/img/gender-male-1.svg")
            imgGenreHTML.setAttribute("width", "80")
            break ;
        
        case "female":
            imgGenreHTML.setAttribute("src", "./assets/img/gender-female-1.svg")
            imgGenreHTML.setAttribute("width", "80")
            break ;
    }
    imgGenreHTML.setAttribute("alt", element.gender)



    // Nom prenom
    // @TODO : NOM en majuscule
    let tdNomHTML = document.createElement('TD');
    tdNomHTML.innerText = element.name.last.toUpperCase() + " " + element.name.first // @TODO : mettre nom en majuscul
    tdNomHTML.setAttribute("class", "align-middle")

    // Photo
    let tdPhotoHTML = document.createElement('TD');
    let imgPhotoHTML = document.createElement('IMG');
    imgPhotoHTML.setAttribute("src", element.picture.large) // @TODO
    imgPhotoHTML.setAttribute("alt", "Photo de profil de " + element.name.last + " " + element.name.first) // @TODO
    imgPhotoHTML.setAttribute("class", "rounded") //rounded-circle
    imgPhotoHTML.setAttribute("width", "80")

    // Ville
    let tdVilleHTML = document.createElement('TD');
    tdVilleHTML.innerText = element.location.city; 
    tdVilleHTML.setAttribute("class", "align-middle")

    // PAYS
    // Liens des icon : https://openbase.com/js/country-flag-emoji-json/documentation
    let tdPaysHTML = document.createElement('TD');
    let imgPaysHTML = document.createElement('IMG');
    imgPaysHTML.setAttribute("src", "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/" + element.nat +".svg")
    imgPaysHTML.setAttribute("alt", element.location.country)
    imgPaysHTML.setAttribute("width", "80")

    



    // Affectation des valeurs


    //____Filiations____
    // Filliation de l'élement id à tr
    generatedUserLine.appendChild( tdIDHTML );
    
    // genre
    tdGenreHTML.appendChild( imgGenreHTML );
    generatedUserLine.appendChild( tdGenreHTML );

    // Nom Prenom
    generatedUserLine.appendChild( tdNomHTML );

    // Photo
    tdPhotoHTML.appendChild( imgPhotoHTML );
    generatedUserLine.appendChild( tdPhotoHTML );

    // Ville
    generatedUserLine.appendChild( tdVilleHTML );

    // Pays
    tdPaysHTML.appendChild( imgPaysHTML )
    generatedUserLine.appendChild( tdPaysHTML );

    return generatedUserLine
}

function apiMeteo ( lat, lon )
{

    // API openweathermap endpointOWM : https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    // api clé : 849ef81fb4d6baaf44b471587ab96e1c
    
    let enpointOWM = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "& lon= " + lon + "&appid=849ef81fb4d6baaf44b471587ab96e1c"


    
    fetch(enpointOWM)
    .then(
        // Premier fonction de callback, c'est la fonction en cas de succès
        // Et on aura un paramètre qui est la réponse
        function ( response ) {
            console.info ( "SUCCESS" );
            console.log ( response );

            // Tester le statut de la reponse
            // et en fonction on continue ou non
            if ( response.statusText === "OK" ){
                console.log("response.statusText === OK")
                // On pet continuer
                // Par defaut, l'API renvoie le format JSON
                // Transformer la réponse en JSON interprétable
                /*
                    Quand retourne une promesse alors ".then()"
                */
                response.json()
                .then(
                    // Succès e la promesse de transformation de la réponse en JSON
                    function ( datas ) {
                        // Succès
                        // console.log ( "Succès de la promesse de transformation de la réponse en JSON")
                        console.table( datas.results );

                        let tabUsers = document.getElementById( "userLines" );

                        datas.results.forEach(element => {

                            // renvoi des données
                            return element;

                        });


                    }
                    ,
                    // Erreur de la promesse de trasnformation de la réponse en JSON
                    function ( error ){
                        console.error ( "ERROR de trasnformation de la réponse en JSON" );
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


}