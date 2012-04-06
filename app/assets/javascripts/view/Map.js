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
    // We mark all the player with a useless class.
    $('#player_container *').addClass("useless");
    for(var y = 0; y < 13 ; y++)
	  {
      for(var x = 0; x < 13 ; x++)
        {
          if(map_of_players[y][x] && map_of_players[y][x] != current_player.id)
          {
            $('#player'+map_of_players[y][x]+", #player_name"+map_of_players[y][x]).removeClass("useless"); // THe player have to be on the map
            
            // Check if the player founded exists already
            if(document.getElementById('player'+map_of_players[y][x]))
            {// The player is already on the map, and may be in move.
              //TODO: Handle movement, and display player properly.
              
            }
            else
            {// The player isn't already on the map, so we juste have to create it.
              new_player += Map.generatePlayerHtml(map_of_players[y][x], players_informations[map_of_players[y][x]].name, x*config.sprite_size, y*config.sprite_size);	
            }
            
            //TODO: Fix problem of synchronization
            //map += Map.generatePlayerHtml(map_of_players[y][x], players_informations[map_of_players[y][x]].name, x*config.sprite_size, y*config.sprite_size);            
          }
        }
      }
    // We remove player which are no longer on the map
    $('#player_container').find(".useless").remove();
    
    $("#player_container").append(new_player);
    $("#player_container").css("top","-"+config.sprite_size+"px").css("left","-"+config.sprite_size+"px");
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
