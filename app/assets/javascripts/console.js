$(function(){

	console_opened = true;
	
	$("#command").on("keypress",function(evt){
		command = $.trim($("#command").val());
		if(evt.which == 13 && command != "" )
		{
		console.log(command);
		if(is_websocket)
			websocket.send(command);
		$("#command").val("");
		}
	});
	
	$("#close_chat").click(function(){
		console_opened = false;
		$("#console").hide('fast');
		$("#open_console").show();
	});
	
	$("#open_console").click(function(evt){
		if(!console_opened)
		{
			console_opened = true;
			$("#console").show('fast');
			$("#open_console").hide();
			$("#command").focus();
		}
	});
});
function log(data) { 
	date = new Date();
	seconds = date.getSeconds();
	if (seconds<10) {seconds = "0" + seconds}
	minutes = date.getMinutes();
	if (minutes<10) {minutes = "0" + minutes}
	hours = date.getHours();
	if (hours<10) {hours = "0" + hours}
	$("#chat").prepend("<strong>["+hours+":"+minutes+":"+seconds+""+"]</strong> "+data+"<br />");
	}
