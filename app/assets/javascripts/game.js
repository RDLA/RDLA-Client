list_players = null;
info_player = null;
list_fields = null;
players_name = new Array();

state = {wait:1, left: 2, up: 3, right: 4, down: 5 };
player_state = state.wait;

$(function()
{

	$("body").on("keydown",check_move);

});
function update_player_move(direction,player)
{
	if(!document.getElementById("player"+player))
	{
		refresh_map();
	}
	else
	{

mov_left = '+=0px'; mov_top = '+=0px';
	switch(direction)
	{
		case 'LEFT':
			mov_left = '-=72px';
			$('#player'+player).removeClass("rabbit_up rabbit_right rabbit_down").addClass("rabbit_left");
		break;
		case 'RIGHT':
			mov_left = '+=72px';
			$('#player'+player).removeClass("rabbit_up rabbit_left rabbit_down").addClass("rabbit_right");
		break;
		case 'UP':
			mov_top = '-=72px';
			$('#player'+player).removeClass(" rabbit_right rabbit_left rabbit_down").addClass("rabbit_up");
		break;
		case 'DOWN':
			mov_top = '+=72px';
			$('#player'+player).removeClass("rabbit_up rabbit_right rabbit_left").addClass("rabbit_down");
		break;
		
	}
	
		var count = 0;
		$('#player'+player+", #player_name"+player).animate({ 
        left: mov_left,
        top: mov_top

      }, {
        duration: 500,
        easing: 'linear',
        step: function(now,fx)
        {
        	console.log(fx.elem.id);
        	if(fx.elem.id == "player"+player)
        	{

		    	if(++count % 10 == 0)
		    	{
							toggleFrame('#player'+player);	
		    	}
        	}
        	
        },
      	complete: function(){
      		
      		refresh_map();
      	}
      	
      } );
	
	}
}
function check_move(evt)
{

if(player_state == state.wait)
{
	  var keyCode = evt.keyCode || evt.which,
      arrow = {left: 37, up: 38, right: 39, down: 40 };
      switch (keyCode) 
      	{
		case arrow.left: move("/LEFT"); break;
		case arrow.up: move("/UP"); break;
		case arrow.right: move("/RIGHT"); break;
		case arrow.down: move("/DOWN"); break;
  		}
  	}
}
function set_backpos_y(ele, val){
var posX = $(ele).css('background-position').split(' ')[0];
$(ele).css('background-position', posX+' '+val+'px');
}
function toggleFrame(ele)
{
	var posY = $(ele).css('background-position').split(' ')[1];
	if(posY == "-72px")
	{
		set_backpos_y(ele,0);
	}
	else
	{
		set_backpos_y(ele,-72);
	}
}

function move(cmd)
{

	if(player_state == state.wait)
	{
		$("body").off();
		mov_left = '+=0px'; mov_top = '+=0px';
		if(cmd == "/LEFT") { player_state = state.left; mov_left = '+=72px';$('#player'+info_player.id).removeClass("rabbit_up rabbit_right rabbit_down").addClass("rabbit_left"); }
		else if(cmd == "/RIGHT") {player_state = state.right; mov_left = '-=72px';$('#player'+info_player.id).removeClass("rabbit_up rabbit_left rabbit_down").addClass("rabbit_right"); }
		else if(cmd == "/UP") {player_state = state.up; mov_top = '+=72px';$('#player'+info_player.id).removeClass(" rabbit_right rabbit_left rabbit_down").addClass("rabbit_up"); }
		else if(cmd == "/DOWN") {player_state = state.down; mov_top = '-=72px'; $('#player'+info_player.id).removeClass("rabbit_up rabbit_right rabbit_left ").addClass("rabbit_down");}
		
		websocket.send(cmd);

		var count = 0;
		$('#field_container').animate({ 
        left: mov_left,
        top: mov_top

      }, {
        duration: 500,
        easing: 'linear',
        step: function(now,fx)
        {
        	if(++count % 10 == 0)
        	{
		    			toggleFrame('#player'+info_player.id);	
        	}
        	
        },
      	complete: function(){
      		player_state = state.wait;
      		$("body").on("keydown",check_move);
      		refresh_map();
      	}
      	
      } );

		
		
	
		
	}
}
function refresh_map()
{

if(list_fields != null && list_players != null)
	{
		map = ""
		map_player = ""
		for(y = 0; y < 13 ; y++)
		{
			for(x = 0; x < 13 ; x++)
			{
				hide = "";
				if((x*72) < 0 || (y*72) < 0)
				{
					hide = ""
				}
				map += "<div id='pos_"+x+"_"+y+"' title='pos_"+x+"_"+y+"' class='field field"+list_fields[y][x]+"' style='left:"+(x*72)+"px;top:"+(y*72)+"px;"+hide+"'></div>"	
				if(list_players[y][x] != 0)
				{
					
					idp = "player"+list_players[y][x];
					name = players_name[list_players[y][x]] == undefined ? "" : players_name[list_players[y][x]].name;
					if(name == "")
						websocket.send("/INFO player "+list_players[y][x]);
					if(document.getElementById(idp))
						{
							class_list = $("#"+idp).attr("class");
						}
					else
						{
							class_list = "player rabbit"
						}
						
					if(x == 6 && y == 6)
						{
						if(name != "")
							map_player += "<span id='player_name"+list_players[y][x]+"' class='player_name' style='left:"+(x*72)+"px;top:"+((y*72)-5)+"px;' >"+name+"</span>";		
						map_player += "<div id='"+idp+"' class='"+class_list+"' style='left:"+(x*72)+"px;top:"+(y*72)+"px;'></div>";
						}
						else
						{
						if(name != "")
							map += "<span class='player_name' id='player_name"+list_players[y][x]+"' style='left:"+(x*72)+"px;top:"+((y*72)-5)+"px;' >"+name+"</span>";
						map += "<div id='"+idp+"' class='"+class_list+"' style='left:"+(x*72)+"px;top:"+(y*72)+"px;'></div>";
						}
					  	
				}		
			}	
		}
		
		$("#field_container").empty().append(map);
		$("#player_container").empty().append(map_player);
		$("#field_container").css("top","-72px");
		$("#field_container").css("left","-72px");
		
	}
}


