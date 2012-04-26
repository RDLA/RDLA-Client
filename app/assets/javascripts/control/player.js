/*
 * This file contains the Player object, which handle all
 * interactions, such as binding keyboard for movement.
 */ 

var Player = {
  // Variables declaration
  
  // Functions declaration
   
  // Public: Bind all functions to corresponding events
  // 
  // Returns nothing
  bind_events: function()
    {
      $("body").on("keydown", Player.observe); // Maybe on body?
    },



  // Public: Observe the map for sending movement message if arrow keypress
  // is pressed.
  // 
  // evt - The jQuery.Event Triggered when user hit a key. You can find
  // information about JQuery.Event object here: http://api.jquery.com/category/events/event-object/
  // 
  // Returns nothing    
  observe: function(evt)
    {
      if(current_player.state == state.wait) // We handle a new action only if the player do nothing
        {
          switch(evt.which)
          {
            case     keys.up: Player.move(current_player.id, "/UP");    break;
            case   keys.down: Player.move(current_player.id, "/DOWN");  break;
            case   keys.left: Player.move(current_player.id, "/LEFT");  break;
            case  keys.right: Player.move(current_player.id, "/RIGHT"); break;
          }
        }
    }, // End Observe Function
  
  
  
  // Public: Move the specified player to the specified direction
  // 
  // idPlayer - The Id of the player to move. Must be an Integer
  //
  // direction - The direction of the player. Must be /LEFT|/RIGHT|/UP|/DOWN
  // 
  // Returns nothing    
  move: function(idPlayer, direction)
  { //TODO: Try to refactor and optimize
  	switch(direction)
  	{
  	  case '/LEFT': 
  	    $('#player'+idPlayer).removeClass("rabbit_up rabbit_right rabbit_down").addClass("rabbit_left");
  	  break;
  	  case '/RIGHT':
  	    $('#player'+idPlayer).removeClass("rabbit_up rabbit_left rabbit_down").addClass("rabbit_right");
  	  break;
  	  case '/UP':
  	    $('#player'+idPlayer).removeClass("rabbit_right rabbit_left rabbit_down").addClass("rabbit_up");
  	  break;
  	  case '/DOWN':
  	   $('#player'+idPlayer).removeClass("rabbit_up rabbit_right rabbit_left ").addClass("rabbit_down");
  	  break;
  	}
    if(idPlayer == current_player.id && current_player.state == state.wait) // This is the current player
    {
      $("body").off(); // The player is not allowed to send keydown.
      var mov_top = "+=0px";
      var mov_left = "+=0px";
      switch(direction)
  	    {
  	    case '/LEFT':
  	      mov_left = "+=72px";
  	      current_player.state = state.left;
  	    break;
  	    case '/RIGHT':
  	      mov_left = "-=72px";
  	      current_player.state = state.right;
  	    break;
  	    case '/UP':
  	      mov_top = "+=72px";
  	      current_player.state = state.up;
  	    break;
  	    case '/DOWN':
  	      mov_top = "-=72px";
  	      current_player.state = state.down;
  	    break;
  	    }
      // Now we can send the command.
      Connection.send(direction);
      Player.animate('#field_container, #player_container', idPlayer, mov_left, mov_top);
    }
    else // This is another player
    {
      var mov_top = "+=0px";
      var mov_left = "+=0px";
      switch(direction)
  	    {
  	    case '/LEFT':
  	      mov_left = "-=72px";
  	      players_informations[idPlayer].state = state.left;
  	    break;
  	    case '/RIGHT':
  	      mov_left = "+=72px";
  	      players_informations[idPlayer].state = state.right;
  	    break;
  	    case '/UP':
  	      mov_top = "-=72px";
  	      players_informations[idPlayer].state = state.up;
  	    break;
  	    case '/DOWN':
  	      mov_top = "+=72px";
  	      players_informations[idPlayer].state = state.down;
  	    break;
  	    }
  	   Player.animate('#player'+idPlayer+', #player_name'+idPlayer, idPlayer, mov_left, mov_top);
    }
  },


  // Internal: Set the background position Y of an element
  // 
  // ele - The element to update, specified in JQuery style
  // val - the new value of the background-position css property
  // 
  // Returns nothing 
  set_backpos_y: function (ele, val)
    {
      var posX = $(ele).css('background-position').split(' ')[0];
      $(ele).css('background-position', posX+' '+val+'px');
    },



  // Internal: Toggle sprite to animate an element.
  // 
  // ele - The element to toggle
  //
  // Returns nothing 
  toggleFrame: function (ele)
    {
    var posY = $(ele).css('background-position').split(' ')[1];
    if(posY == "-72px")
      {
      Player.set_backpos_y(ele,0);
      }
    else
      {
      Player.set_backpos_y(ele,-72);
      }
    },



  // Internal: Move a player with animation
  // 
  // elements - A list of element to move. Can be container or player_name
  // idPlayer - The id of the player currently moving.
  // mov_left - The left translation to do. Format: +Xpx
  // mov_top - The top translation to do. Format: +Xpx
  //
  // Returns nothing  
  animate: function(elements, idPlayer, mov_left, mov_top)
    {
      var count = 0; // Count for sprite animation
      
      $(elements).animate({ 
                            left: mov_left,
                            top: mov_top
                          }, 
                          {
                            duration: 500, 
                            easing: 'linear',
                            step: function(now,fx)
                              {
        	                    if(++count % 10 == 0)
		    			          Player.toggleFrame('#player'+idPlayer); // We change the frame for animating the sprite	
                              },
      	                    complete: function()
      	                      {
      	                      if (this.id.substring(0,7) == "player_")
      	                      {
      	                      	console.log("Alert Complete");
      	                        $('#player'+idPlayer).css('background-position',''); // We reset the background position to css based value
      	                        if(idPlayer == current_player.id)
      	                          {
      	                            current_player.state = state.wait;
      		                        Player.bind_events();
      		                        Map.synchronize_fields();
      		                        Map.synchronize_players();
      	                          }
      	                        else
      	                          {
      	                            players_informations[idPlayer].state = state.wait;
      	                            
      	                          }
      	                      }
      	                      
      	                         
      	                          
      	                      }
      	                   });
    }, // End of animate
    complete: function()
    {
    	
    }
}
