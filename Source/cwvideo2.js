CwVideo = new Class({

	Implements: [Events, Options],
	
	options: {
 		// onPlaybackHasChanged: function(event) { }, // Shortcut-event triggered on play, pause, loadstart
 		fastSpeed: 3,
		implementMediaAdditions: true // For mootools 1.2.4 necessary: Implement new events and attributes for the video-tag
	},
	
	previouslyPlaying: false, 
	currentPlaybackRate: 0,
	//..
	video: false,
	defaultPlaybackRate: 1,
	startTime: 0,
	duration: 0,	

	startFfwd: function()
	{
		this.startFast(this.options.fastSpeed);
	},
	startFrew: function()
	{
		// http://code.google.com/p/chromium/issues/detail?id=18375 
		if (this.video.get('currentTime') < .5) return;
		this.startFast(-1 * this.options.fastSpeed);
	},
	startFast: function(rate)
	{
		if (this.video.get('readyState') != this.video.HAVE_FUTURE_DATA && this.video.get('readyState') != this.video.HAVE_ENOUGH_DATA ) {
			return;
		}
		if (this.currentPlaybackRate == rate) { // no need to, we're already in ffwd/frew
			return;
		}
		this.currentPlaybackRate = rate;
		this.previouslyPlaying = !this.video.get('paused');
		if (!this.previouslyPlaying) {
			this.video.play();
		}
		this.video.set('playbackRate', this.currentPlaybackRate);

		if (!this.video.get('defaultPlaybackRate') || this.video.get('playbackRate') != this.currentPlaybackRate) { // problems with the firefox..
			console.log("firefox..");
			if (rate > 0) {
				this.video.addEvent('timeupdate', this.simulateFfwd);
			} else {
				this.video.addEvent('timeupdate', this.simulateFrew);
			}
		}
	},
	stopFast: function()
	{
		if (Math.abs(this.currentPlaybackRate) != this.options.fastSpeed) {
			return;
		}	
		if (this.currentPlaybackRate < 0) {
			this.video.removeEvent('timeupdate', this.simulateFrew);
		} else {
			this.video.removeEvent('timeupdate', this.simulateFfwd);
		};		
		if (!this.previouslyPlaying) {
			this.video.pause();
		}
		currTime = this.video.get('currentTime');
		this.currentPlaybackRate = this.defaultPlaybackRate;
		this.video.set('playbackRate', this.defaultPlaybackRate);		
		if ( (this.video.get('currentTime') - currTime) > 0.5) {
			console.log(this.video.get('currentTime') + "!="+ currTime); // (Webkit-bug)
			this.video.set('currentTime', currTime);
		}
	},
	simulateFfwd: function(rate)
	{
		if (this.get('currentTime') < this.get('duration')) {
			this.set('currentTime', this.get('currentTime') + 2);
		}
	},
	simulateFrew: function(rate)
	{
		if (this.get('currentTime') > 2.0) {
			this.set('currentTime', this.get('currentTime') - 2);
		} else {
			this.set('currentTime', 0.0);
		}
	}
	

});
	