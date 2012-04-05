/*
 * Current file contains all the variable required to set the 
 * structure of the data. It also contains at the bottom a function
 * to initialize or reset all data to blank.
 *
*/

var map_of_players; // Contains all the player visible in the area
var map_of_fields; // Contains ID of all fields visible in the area

// Current_player: Contains all information about the player
// current_player.info : Info about the player, getted by the server
// current_player.state: Info about the current move of the player: is 
// he moving? or waiting?
var current_player;

// players_informations contains an association of player's id and all  
// available information about the player.
var players_informations;

// Public: Initialize the current model by erasing all data. Needed each   
// time we succeed to connect to game server.
//
// Returns nothing
function initialize_model()
{
  current_player = {
                     id:null,
                     state: state.wait
                   };
  map_of_players = null;
  map_of_fields = null;
  players_informations = new Array();
}
