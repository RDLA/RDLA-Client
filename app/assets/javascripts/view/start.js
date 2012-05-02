/* 
 * This file is equivalent of main function. It start when the page
 * is loaded
 */
$(function()
  {
  if (window.location.pathname == "/")
    Home.bind_events();
  else if(window.location.pathname == "/game")
    {
      Map.bind_events();
      Map.preload();
    }
    
  });
