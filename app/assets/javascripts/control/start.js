/* 
 * This file is equivalent of main function. It start when the page
 * is loaded
 */
$(function()
  {
    if (window.location.pathname == "/game")
      {
      Chat.bind_events(); // Connect events to Chat's functions
      Player.bind_events();
      }
    
  });
