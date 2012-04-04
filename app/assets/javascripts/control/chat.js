/*
 * This file contains the Chat Object. The chat object handle all informations
 * related to the Chat console. FOr example, function for sending a message, or
 * function for displaying information in the Chat console.
 */
var Chat = {
  // Variables declaration
  opened: true, // Variable to check if the Chat Console is opened or closed
  
  // Fonctions declaration
  
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
