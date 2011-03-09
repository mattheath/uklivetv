boxee.enableLog(true);
boxee.renderBrowser=true;
boxee.autoChoosePlayer=false;

var player_ref = 'iplayer.models.Emp.getInstance()';

bbc = {

   isInitialised: function()
   {
      if (this.execute('isInitialised()') == 'true') return true;
      else return false;
   },

   play: function()
   {
      if (!this.isPlaying())
      {
         width = boxee.getActiveWidget().width;
         height = boxee.getActiveWidget().height;
         this.click(width/2, height/2);
      }
   },

   isPlaying: function()
   {
      if (this.execute('_isPlaying') == 'true') return true;
      else return false;
   },

   execute: function(str)
   {
      return browser.execute(player_ref+'.'+str);
   },

   isActive: function()
   {
      if (typeof boxee.getActiveWidget() == 'object') return true;
      else return false;
   },

   click: function(x, y)
   {
      boxee.getActiveWidget().click(x, y);
      boxee.getActiveWidget().mouseMove( - 1, -1);
   }

}

_findPlayer = setInterval(function()
{
      boxee.getWidgets().forEach(function(widget)
      {
         if (widget.getAttribute("id") == 'bbc_emp_embed_channels_emp_0')
         {
            boxee.renderBrowser=false;
            widget.setActive(true);
            boxee.setCanPause(false);
            boxee.setCanSkip(false);
            boxee.setCanSetVolume(true);
			startPlayer();
            clearInterval(_findPlayer);
         }
      });
}, 500);

function startPlayer() {
	_waitForPlayer = setInterval(function() {
		if (bbc.isPlaying()) {
			clearInterval(_waitForPlayer);
		}
		if (bbc.isActive()) {
			bbc.play()
		}
	},1000);
}