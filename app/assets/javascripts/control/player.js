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
  { //TODO
  } 
}
