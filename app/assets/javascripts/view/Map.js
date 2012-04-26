/* 
 * This file is very important. It contains the Map object, which handle
 * the display of all the information of the map: position of fields, 
 * of players...
 */
 
var Map = {
  // Variables declaration
 

  // Functions declaration
  
  // Public: Place all element on the blank map. Especially set the current
  // player position.
  //
  // Returns nothing
  initialize_map: function()
    {
    
    var player_html = Map.generatePlayerHtml(current_player.id, players_informations[current_player.id].name, 5*config.sprite_size, 5*config.sprite_size);
    if(!document.getElementById("player"+current_player.id))
    {
    	$("#map").append(player_html);
    }
	  
    
    Map.synchronize_fields();
	Map.synchronize_players();
    },

  // Public: Update fields on the map with the most recently information
  // available in the data model.
  //
  // Returns nothing
  synchronize_fields: function()
    {
    var map = ""; // Variable that contains the html output.
    for(var y = 0; y < 13 ; y++)
	  {
      for(var x = 0; x < 13 ; x++)
        {
         map += "<div id='pos_"+x+"_"+y+"' title='pos_"+x+"_"+y+"' class='field field"+map_of_fields[y][x]+"' style='left:"+(x*config.sprite_size)+"px;top:"+(y*config.sprite_size)+"px;'></div>";
        }
      }
    $("#field_container").empty().append(map);
    $("#field_container").css("top","-"+config.sprite_size+"px");
	$("#field_container").css("left","-"+config.sprite_size+"px");
    },

  // Public: Update players on the map with the most recently information
  // available in the data model.
  //
  // Returns nothing
  synchronize_players: function()
    {
    
    var new_player = "";
    var array_of_move = new Array();
    // We mark all the player with a useless class.
    $('#player_container *').addClass("useless");
    for(var y = 0; y < 13 ; y++)
	  {
      for(var x = 0; x < 13 ; x++)
        {
          if(map_of_players[y][x] && map_of_players[y][x] != current_player.id)
          {
            console.log("We found player "+map_of_players[y][x]+" On "+x+"/"+y);
            // Check if the player founded exists already
            if(document.getElementById('player'+map_of_players[y][x]))
            {// The player is already on the map, and may be in move.
              console.log("Player is on the map");
              //TODO: Handle movement, and display player properly.
              if(players_informations[map_of_players[y][x]].state == state.wait || players_informations[map_of_players[y][x]].state == undefined  )
                { // Player is waiting, so we normally just have to display it on the map at the right position
                console.log("Player is waiting");
                  new_player += Map.generatePlayerHtml(map_of_players[y][x], players_informations[map_of_players[y][x]].name, x*config.sprite_size, y*config.sprite_size);	
                }
              else
                {
                  console.log("Player is running");
                  $('#player'+map_of_players[y][x]+", #player_name"+map_of_players[y][x]).removeClass("useless"); // THe player have to be on the map
                  array_of_move.push({id:map_of_players[y][x] , direction: players_informations[map_of_players[y][x]].state, posx: x , posy: y  });
                }
            }
            else
            {// The player isn't already on the map, so we juste have to create it.
            console.log("THe player is not on the map");
            new_player += Map.generatePlayerHtml(map_of_players[y][x], players_informations[map_of_players[y][x]].name, x*config.sprite_size, y*config.sprite_size);	
            }
          }
        }
      }
    // We remove player which are no longer on the map
    $('#player_container').find(".useless").remove();
    
    $("#player_container").append(new_player);
    $("#player_container").css("top","-"+config.sprite_size+"px").css("left","-"+config.sprite_size+"px");
    
    //We reset all player currently moving
    var array_of_move_length = array_of_move.length
    for(var i= 0; i < array_of_move_length ; i++)
    {
      //array_of_move[i].id array_of_move[i].state
     
      $("#player"+array_of_move[i].id+", #player_name"+array_of_move[i].id).stop(true,true);
      $('#player'+array_of_move[i].id).css('background-position','');
      players_informations[array_of_move[i].id].state = state.wait;
      $("#player"+array_of_move[i].id+", #player_name"+array_of_move[i].id).css("top",array_of_move[i].posy*config.sprite_size+"px").css("left", array_of_move[i].posx*config.sprite_size+"px");
      /*switch(array_of_move[i].state)
      {
      	case state.left:
      	  //$("#player_container").css("top",array_of_move[i].posy*config.sprite_size+"px").css("left", array_of_move[i].posx*config.sprite_size+"px");
      	break;
      	case state.right:
      	break;
      	case state.up:
      	break;
      	case state.down:
      	break;      	
      } */
    }
    
    
    },



   // Internal: Retrieve the css class of the player selected or set the
   // default class.
   //
   // idPlayer - The player's id to look.  
   //
   // Returns a string containing all the css class of the player
   getCurrentClass: function(idPlayer)
     {
     if(document.getElementById(idPlayer))
       return $("#player"+idPlayer).attr("class");
	 else
	   return "player rabbit";
     },


   // Internal:Generate all the html needed to display a player on the
   // map
   //
   // idPlayer - The player's id to place.
   // name - the name of the player
   // posx - The left position where positionning the player. Should be
   //        X * Sprite_size  
   // posy - The top position where positionning the player. Should be
   //        Y * Sprite_size
   //
   // Returns the html generated of the player.
   generatePlayerHtml: function(idPlayer, name,  posx, posy )
     {
     classlist = Map.getCurrentClass(idPlayer);
     var player_html = "<span id='player_name"+idPlayer+"' class='player_name' style='left:"+posx+"px;top:"+(posy-5)+"px;' >"+name+"</span>";		
	 player_html += "<div id='player"+idPlayer+"' class='"+classlist+"' style='left:"+posx+"px;top:"+posy+"px;'></div>";
	 return player_html;
     }
   
  
}
