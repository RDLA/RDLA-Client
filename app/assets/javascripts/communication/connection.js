/*
 * This file contains functions needed to communicate with the game server.
 * Communication is made by a connection to a Websocket gameserver. 
 * The JSON "Object" Connection handle all function to Open a connection,
 * reconnect when server disconnected, deal with errors and incomings
 * messages.
 */
var Connection = {
  // Variables declaration
  websocket: null, // WebSocket object use for communication  

  // Functions declaration

  // Public: Try to open a Websocket connection to the gameserver 
  // specified in config file.
  //
  // Returns nothing
  open: function()
    {
      Connection.websocket = new WebSocket("ws://"+config.websocket_url);
      
      // Bind  all functions to the current websocket in order to handle
      // message
      Connection.websocket.onopen    = Connection.onOpen;
      Connection.websocket.onmessage = Connection.onMessage;
      Connection.websocket.onerror   = Connection.onError;
      Connection.websocket.onclose   = Connection.onClose;
    },



  // Public: Reset all the information sent from the server and set a 
  // timeOut to try to reconnect to the server.
  //
  // Returns nothing
  reset: function()
    {
    	initialize_model(); // We set to blank all data stored previously
    	setTimeout(Connection.open,10000); // Try to reconnect in 10 secondes
    },



  // Public: Send an information to the server and force UTF-8 Encoding 
  //
  // Returns nothing
  send: function(data)
    {
      //TODO: Force UTF8 Data
      Connection.websocket.send(data);
    },



  // Public: Executed when the connection to the game server is
  // etablished. 
  //
  // evt - The Event received from the server. Shouldn't be useful. The 
  // event is a simple one with the name "open". Information about Event
  // is available at: https://developer.mozilla.org/en/DOM/event
  //
  // Returns nothing
  onOpen: function(evt) 
    {
		config.server_online = true; // We tell the client the server is now up
    },



  // Public: Executed when the gameServer send a message. It's probably
  // the most important function. This function should only parse 
  // the incoming message and calling a game function.
  //
  // evt - The MessageEvent received from the server. evt.data contains
  // the message. Information about MessageEvent is available at:
  // https://developer.mozilla.org/en/WebSockets/WebSockets_reference/MessageEvent
  //
  // Returns nothing
  onMessage: function(evt)
    {
	var msg = evt.data; // The message transmitted by the server

    // Now We will try to recognize the message
    if(Connection.parseCommand(msg) == "/LIST_PLAYERS")
      {
      // We received a list of all players in the area. We just have to 
      // store it in the model "map_of_players".
      map_of_players = $.parseJSON(Connection.parseData(msg));
      }
	else if(Connection.parseCommand(msg) == "/LIST_FIELDS")
      {
      // We received a list of all field in the area. We just have to 
      // store it in the model "map_of_fields".
      map_of_fields  = $.parseJSON(Connection.parseData(msg));
      }
	else if(Connection.parseCommand(msg) == "/INFO_PLAYER")
	  {
      // We received all the information available about a specified players_name
      // We parse it and store it to the players structure
      var player = $.parseJSON(Connection.parseData(msg));
      players_informations[player.id]=player;
      }
    else if(Connection.parseCommand(msg) == "/MOVE")
      {
      // We received an information: A player has changed position. We
      // have to set the new information and trigger the proper event.
      // TODO : Method not implemented yet.
      /*
        var info = Connection.parseData(msg).split(' ');
	    update_player_move(info[1],info[2]);
	  */ 
	  }
	else if(msg == "/WAIT_AUTH")
      {
      // The gameserver tell us that he is ready to log a player. He's
      // waiting an information about the player to log in.
      // TODO: Securize the authentification with hash
      
      var idplayer = $("#player_connected").val(); // We get the ID of the player logged. Ex: 1 
      Chat.log(Message.LOGGING); // We tell the client that we are currently logging in
      if(idplayer !== undefined) // We check if we have retrieved an id for the current player.
        Connection.send("/LOG player "+idplayer); // We send the request to the server.
      }
    else
      {
      // It is a unknown message. It's probably a chat message, so we
      // just send it to the console.
      Chat.log(msg);
      }
    
    }, // End of onMessage function



  // Public: Executed when the gameServer crash.
  //
  // evt - The Event received from the server. This is a simple event 
  // named "error". Information about Event is available at:
  // https://developer.mozilla.org/en/DOM/event  
  //
  // Returns nothing
  onError: function(evt)
    {
		config.server_online = true; // We tell the client the server is now off
		
		// We tell the developper that they was a problem (Unfortunately),
		// we can't tell him why...
		console.debug("An error occured with websocket connection");
    }, 
 
 
    
  // Public: Executed when the connection between gameserver and client
  // is closed. Should reset the connection to prepare a new one.
  //
  // evt - The CloseEvent received from the server. Information about 
  // CloseEvent is available at:
  // https://developer.mozilla.org/en/WebSockets/WebSockets_reference/CloseEvent
  //
  // Returns nothing 
  onClose: function(evt)
    {
		config.server_online = false; // We tell the client the server is now off
		Connection.reset(); // We want to reset the server in order to try to reconnect
        Chat.log(Message.SERVER_DISCONNECTED); // We tell the user that they is a disconnection
    },



  // Internal: Parse a message to isolate the command sent from the message
  //
  // msg - The message sent throught the Websocket: Format: /COMMAND data
  //
  // Examples
  //  parseCommand("/MOVE 1 UP ") --> Returns /MOVE
  //
  // Returns the Command
   parseCommand:function(msg)
     {
       return msg.substring(0,msg.indexOf(' ',1));
     },
  // Internal: Parse a message to isolate the data sent from the message
  //
  // msg - The message sent throught the Websocket: Format: /COMMAND data
  //
  // Examples
  //  parseData("/MOVE 1 UP ") --> Returns 1 UP
  //
  // Returns the Data
   parseData:function(msg)
     {
       return msg.substring(msg.indexOf(' ',1),msg.length);
     }
};
