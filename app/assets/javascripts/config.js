/*
 * Current file contains all information about configuration.
 * All fixed setting go here, like game server url, state, keyboard/
*/


// General information about configuration.
var config = {
  websocket_url: "localhost:8081",
  server_online: false	,
  sprite_size: 72
}
// Motion Control: All player can have this following state: default is "wait"
var state = {wait:1, left: 2, up: 3, right: 4, down: 5, walking: 6 };
var keys = {enter:13, left: 37, up: 38, right: 39, down: 40 };

WEB_SOCKET_SWF_LOCATION = "WebSocketMain.swf"; //Needed for websocket flash fallback
