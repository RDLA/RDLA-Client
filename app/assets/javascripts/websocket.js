function connect_websocket()
{
	WEB_SOCKET_SWF_LOCATION = "WebSocketMain.swf"; //WEBSocket Fallback
	is_websocket = false;
	websocket = new WebSocket("ws://home.rdla.fr:8081");
		
    websocket.onopen = function(evt) { is_websocket = true; change_server_state(); };
	websocket.onmessage = function(evt) { onMessage(evt); };
	websocket.onerror = function(evt) { console.debug(evt); is_websocket = false; change_server_state(); };
	websocket.onclose =  function(evt) { is_websocket = false; change_server_state(); reset_connection(); };
	
	
}

function onMessage(evt) { 

	msg = evt.data

	if(msg.substring(0,msg.indexOf(' ',1)) == "/LIST_PLAYERS")
		{
			list_players = $.parseJSON(msg.substring(msg.indexOf(' ',1),msg.length));
			console.debug(msg);
			/*if(list_players != null && player_state == state.wait)
				refresh_map();*/

		}
	else if(msg.substring(0,msg.indexOf(' ',1)) == "/LIST_FIELDS")
		{
			list_fields = $.parseJSON(msg.substring(msg.indexOf(' ',1),msg.length));
			console.debug(msg);
			if(list_fields != null && player_state == state.wait)
				refresh_map();
		}
	else if(msg.substring(0,msg.indexOf(' ',1)) == "/YOUR_PLAYER")
		{
			var info_player_msg = $.parseJSON(msg.substring(msg.indexOf(' ',1),msg.length));
			info_player = info_player_msg.player 
			players_name[info_player.id] = info_player;
			console.debug(msg);
		}
	else if(msg.substring(0,msg.indexOf(' ',1)) == "/INFO_PLAYER")
	{
		var player = $.parseJSON(msg.substring(msg.indexOf(' ',1),msg.length));
		players_name[player.id]=player;
		console.debug(players_name);
	}
	else if(msg.substring(0,msg.indexOf(' ',1)) == "/MOVE")
	{
		console.debug(msg);
		info = msg.substring(msg.indexOf(' ',1),msg.length).split(' ');
		console.debug(info);
		update_player_move(info[1],info[2]); 
	}
	else if(msg == "/WAIT_AUTH")
	{
		idplayer = $("#player_connected").val();
		log("Connexion au serveur en cours...");
		if(idplayer !== undefined)
			websocket.send("/LOG player "+idplayer);
	}
	else
		{
		log(msg); 
		}
	}

function reset_connection()
{
	log("Le serveur a cessé de répondre...");
	list_players = null;''
	info_player = null;
	list_fields = null;
	players_name = new Array();
	player_state = state.wait;
	$("#field_container").empty();
	$("#player_container").empty();
	$("#field_container").css("top","-72px");
	$("#field_container").css("left","-72px");
}
