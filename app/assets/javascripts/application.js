// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

connect_websocket();
function change_server_state()
{
	if(is_websocket)
	{
		$("#state_server").html("ON").removeClass("state_server_off").addClass("state_server_on");
		
	}
	else
	{
		$("#state_server").html("OFF").removeClass("state_server_on").addClass("state_server_off");;
		setTimeout(connect_websocket,10000); // Try to reconnect every 10 seconds
	}
}

