/*
 * This file contains information needed to display information on the Homepage.
 *
 */
var Home = {
  // Variables declaration
  
  // Functions declaration
  
  // Public: Bind all functions to corresponding events
  // 
  // Returns nothing
  bind_events: function() 
    {
      $("body").on("state_server", Home.displayServerState); 
    },
  displayServerState: function()
    {
  	if(config.server_online)
  	  {
  	  	$("#state_server").html("ON").removeClass("state_server_off").addClass("state_server_on");
  	  }
  	else
  	  {
  	  	$("#state_server").html("OFF").removeClass("state_server_on").addClass("state_server_off");
  	  } 
    }
} 
