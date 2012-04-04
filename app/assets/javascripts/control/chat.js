/*
 * This file contains the Chat Object. The chat object handle all informations
 * related to the Chat console. For example, function for sending a message, or
 * function for displaying information in the Chat console.
 */
var Chat = {
  // Variables declaration
  opened: true, // Variable to check if the Chat Console is opened or closed
  
  // Fonctions declaration
  
  // Public: Bind all functions to corresponding events
  // 
  // Returns nothing
  bind_events: function()
    {
    //TODO Check the best event: keypress or keydown?
    // Observing Keypress while typing in Chat Console
    $("#command").on("keypress", Chat.observe);   
    // Close Chat when clicking on the Icon
    $("#close_chat").on("click", Chat.close);
    // Open Chat when clicking on the Icon
    $("#open_console").on("click", Chat.open);
    },  
  
  
  
  // Public: Open the console in order to allow user to see Chat info and
  // sending message
  //
  // Returns nothing
  open: function()
  {
    //TODO: Replace Jquery call with Vanilla Javascript
    if(!Chat.opened)
    {
			Chat.opened = true;
			$("#console").show('fast'); 
			$("#open_console").hide(); // We hide the button to open console.
			$("#command").focus(); // We focus to the command input.
    }
  },



  // Public: Close the console to give more space to the map.
  //
  // Returns nothing   
  close: function()
  {
    //TODO: Replace Jquery call with Vanilla Javascript
    if(Chat.opened)
      {
      Chat.opened = false;
      $("#console").hide('fast'); // We hide the div console
      $("#open_console").show(); // We show the button to reopen the console
      }
  },



  // Public: Observe the chat console for sending the message if the user
  // type "Enter"
  // 
  // evt - The jQuery.Event Triggered when user hit a key. You can find
  // information about JQuery.Event object here: http://api.jquery.com/category/events/event-object/
  // 
  // Returns nothing    
  observe: function(evt)
    {
    var command = $.trim($("#command").val()); // We get the message being typed
    if(evt.which == keys.enter && command != "" )
      {
      Chat.log(command); // For debug: TO DELETE After.
      if(config.server_online)
        Connection.send(command); // Send the message to gameserver
      $("#command").val(""); // The message is sent, we can empty the input
      }
    },



  // Public: Display a message in the chat console. 
  //
  // msg - THe message to display in the chat console.
  //
  // Returns nothing  
  log: function(msg)
  {
    // TODO: Try to optimize Date format
    // We set the current time
  	var date = new Date();
	var seconds = date.getSeconds();
	if (seconds<10) {seconds = "0" + seconds}
	var minutes = date.getMinutes();
	if (minutes<10) {minutes = "0" + minutes}
	var hours = date.getHours();
	if (hours<10) {hours = "0" + hours}
	$("#chat").prepend("<strong>["+hours+":"+minutes+":"+seconds+""+"]</strong> "+msg+"<br />");
  }
}
