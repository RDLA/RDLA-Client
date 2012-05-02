/* 
 * This file is very important. It contains the Map object, which handle
 * the display of all the information of the map: position of fields, 
 * of players...
 */
 
var Map = {

  // Variables declaration
  canvas: {
    html: null , // The HTML Reference of the canvas element.
  	width: 0, // Width of the canvas
  	height: 0  // Height of the canvas.
  },
  

  sprites: { // Reference to all spritesheet for displaying fields and players
  	player: null,
  	field: null
  },
  
  stage: null, // The stage of the Map
  preload: null, // Used for preloading Image.
  
  // Link to all assets
  assets: ["http://assets.rdla.fr/field.png", 
          "/assets/sprites/rabbit.png"],
  
  // Boolean to check if the Map is ready or not.
  ready : false, // Boolean set to true when all assets are loaded.
  
  // Functions declaration
  
  // Public: Bind all functions to corresponding events
  // 
  // Returns nothing
  bind_events: function()
    {
  	  $("body").on("player_connected", Map.initialize_map);
    }, 



  // Public: Preload all assets needed to render the map, and set default
  // value to variables.
  // 
  // Returns nothing  
  preload: function()
    {
    	Map.canvas.html = document.getElementById("map");
    	Map.canvas.width = document.getElementById("map").width;
    	Map.canvas.height = document.getElementById("map").height;

    	
    	stage = new Stage(Map.canvas.html);

    	// Preload elements
        Map.preload = new PreloadJS(false);
    	Map.preload.onProgress = Map.preloadCheck;
    	Map.preload.onError = Map.preloadError;
    	Map.preload.loadManifest(Map.assets, true);
    	    	
    },



  // Internal: Triggered when loading. Check when all assets are loaded
  // and call initialize_map when ready
  //
  // Returns nothing  
  preloadCheck: function(event)
    {      
      if(event.loaded == event.total)
        {
          Map.ready = true;
          Map.initialize_map();	
        }
      else
        Map.ready = false;
    },

  // Internal: Triggered when an error occured when loading. 
  // TODO: Log the error
  //
  // Returns nothing      
  preloadError: function(error)
    {
  	  console.log("Error occured when loading file: "+error.src)
    },
 
    
  // Public: Prepare the map by configuring element of the EaselJS framework
  //
  // Returns nothing
  initialize_map: function()
    {
      // Create Sprites
      Map.create_spritesheets();
      // Add listener for tick();
      Ticker.addListener(Map);
      Ticker.useRAF = true;
      // On vise le taux d’images/seconde optimal (60 FPS)
      Ticker.setInterval(17);
      
      // For debug: Get FPS
      txtFps = new Text("FPS");
      txtFps.color = "#FFF";
      txtFps.x = 690;
      txtFps.y = 10;
      stage.addChild(txtFps);
      // End get FPS.
      
    },

  // Internal: Prepare all animation and spritesheet for player and field
  //
  // Returns nothing    
  create_spritesheets: function()
  {
  	Map.sprites.player = new SpriteSheet({
      	images : ["/assets/sprites/rabbit.png"],
      	frames : [
      		[0,0,72,72],
      		[0,68,72,72],
      		[72,0,72,72],
      		[72,68,72,72],
      		[144,0,72,72],
      		[144,68,72,72],
      		[216,0,72,72],
      		[216,68,72,72]
      	],
      	animations : {
      		wait: [0, "wait",5], 
      		left: [2,3, "left",5],
      		right:[0,1, "right",5],
      		up  : [4,5, "up",5],
      		down: [6,7, "down",5]
      	}
      	
      	});
      	Map.sprites.field = new SpriteSheet({
      	images : ["http://assets.rdla.fr/field.png"],
      	frames : {width:72, height:72, regX: 36, regY:36}     
      	});
      	
      	
      	// For Testing only
      	animation = new BitmapAnimation(Map.sprites.player);
      	
      	animation.gotoAndPlay("right");
      
      	animation.name = "Rabbit!";
      	animation.vX = 2;
      	animation.x = 0;
      	animation.y = 36;
      	animation.currentFrame = 0;
      	animation.direction = 1;
      	stage.addChild(animation);
      	// End Testing
      	
      	
  },
  tick: function()
    {
    	txtFps.text = Math.round(Ticker.getMeasuredFPS())+" fps";
    	
    	// For Testing only
        animation.x += animation.vX*animation.direction;
        // End testing
    	
        stage.update();
    }

 
   
  
}
