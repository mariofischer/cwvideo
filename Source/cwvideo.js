/*
---
description: CwVideo

authors:
  - Mario Fischer (http://www.chipwreck.de/blog/)

license:
  - MIT-style license

requires:
  core/1.2.4: '*',
  more/1.2.4: Fx.Slider

provides:
  - CwVideo
  
version:
  0.5
...
*/
CwVideo = new Class({

	Implements: [Events, Options],
	
	options: {
 		// onPlaybackHasChanged: function(event) { }, // Shortcut-event triggered on play, pause, loadstart
		implementMediaAdditions: true // For mootools 1.2.4 necessary: Implement new events and attributes for the video-tag
	},
	
	video: false,
	defaultPlaybackRate: 1,
	startTime: 0,
	duration: 0,	

	initialize: function(element, options)
	{
		this.video = $(element);
		this.setOptions(options);
		
		if (this.options.implementMediaAdditions) {
	
			// new properties. true = read/write, false = readonly
			CwVideo.mediaProperties = {
				videoWidth: false, videoHeight: false, poster: true, // HTMLVideoElement
				error: false, networkState: false, preload: true, buffered: false, readyState: false, seeking: false, // HTMLMediaElement
				currentTime: true, startTime: false, duration: false, paused: true, // HTMLMediaElement
				defaultPlaybackRate: true, playbackRate: true, played: false, seekable: false, // HTMLMediaElement, these properties currently do *not* work in firefox  
				ended: false, autoplay: true, loop: true, // HTMLMediaElement
				controls: true, volume: true, muted: true,  // HTMLMediaElement
				autobuffer: true // n/a
			};		
			$each(CwVideo.mediaProperties, function(is_writable, key) {
				if (is_writable) {
					Element.Properties.set(key, {
						set: function(avalue) {
							this[key] = avalue;
						},
						get: function() {
							return this[key];
						}
					});
				} else {
					Element.Properties.set(key, {
						get: function() {
							return this[key];
						}
					});
				}
			});
			
			// new events
			CwVideo.mediaEvents = {
				loadstart: 2, progress: 2, suspend: 2, abort: 2,
				error: 2, emptied: 2, stalled: 2, play: 2, pause: 2,
				loadedmetadata: 2, loadeddata: 2, waiting: 2, playing: 2,
				canplay: 2, canplaythrough: 2, seeking: 2, seeked: 2,
				timeupdate: 2, ended: 2, ratechange: 2, durationchange: 2, volumechange: 2
			};
			Element.NativeEvents = $merge(Element.NativeEvents, CwVideo.mediaEvents);
		}

		// add own events
		this.video.addEvents({
			durationchange: function(event) {
				if ($defined(this.video.get('duration'))) {
					this.duration = this.video.get('duration');
				};				
				if ($defined(this.video.get('startTime'))) {
					this.startTime = this.video.get('startTime');
				};
				if ($defined(event.target.get('defaultPlaybackRate'))) {
					this.defaultPlaybackRate = event.target.get('defaultPlaybackRate');
				};
			}.bind(this),
			loadstart: function(event) { this.fireEvent('playbackHasChanged', event); }.bind(this),
			pause: function(event) { this.fireEvent('playbackHasChanged', event); }.bind(this),
			play: function(event) { this.fireEvent('playbackHasChanged', event); }.bind(this)
		});
	},

	// rewind video to the beginning	
	rewind: function()
	{
		this.video.set('currentTime', this.startTime);
	},
	
	// move playhead forward, backward (positive or negative number) or to a specific position ("mm:ss" as string)
	move: function(secs)
	{
		re = /^([0-9]*):([0-9]+)$/;
		matches = secs.toString().match(re);
		if (matches && matches.length == 3) {
			newtime = this.startTime + matches[1].toInt()*60 + matches[2].toInt();
		}
		else {
			newtime = this.video.get('currentTime') + parseFloat(secs);
		}
		this.video.set('currentTime', newtime.limit(this.startTime, this.startTime + this.duration));
	},

	toggleMute: function()
	{
		this.video.set('muted', !this.video.get('muted'));
	},
	
	// change volume by given amount (positive or negative number between 0 and 1)
	volumeChange: function(amount)
	{
		newvol = this.video.get('volume') + parseFloat(amount);
		this.video.set('volume', newvol.limit(0.0, 1.0));
	},
	
	play: function()
	{
		if (Browser.Engine.trident) {
			return;
		}
		this.video.play();
	},
	
	pause: function()
	{
		if (Browser.Engine.trident) {
			return;
		}	
		this.video.pause();
	},
	
	togglePlay: function()
	{
		if (Browser.Engine.trident) {
			return;
		}
		if (this.video.paused) {
			this.video.play();
		}
		else {
			this.video.pause();
		}
	},
	
	stop: function()
	{
		if (Browser.Engine.trident) {
			return;
		}
		this.rewind();
		this.video.pause();
	},

	// get network state as text
	getNetworkState: function()
	{
		switch (this.video.get('networkState')) {			
			case this.video.NETWORK_EMPTY: return 'empty';
			case this.video.NETWORK_IDLE: return 'idle';
			case this.video.NETWORK_LOADING: return 'loading';
			case this.video.NETWORK_LOADED: return 'loaded';
			case this.video.NETWORK_NO_SOURCE: return 'no source';
			default: return 'unknown state';
		}
	},

	// get ready state as text	
	getReadyState: function()
	{
		switch (this.video.get('readyState')) {
	 		case this.video.HAVE_NOTHING: return 'have nothing';
	 		case this.video.HAVE_METADATA: return 'have meta';
	 		case this.video.HAVE_CURRENT_DATA: return 'have current';
	 		case this.video.HAVE_FUTURE_DATA: return 'have future data';
	 		case this.video.HAVE_ENOUGH_DATA: return 'have enough data';
	 		default: return 'unknown state';
		}
	}
});

/*
---
description: CwVideo.Timeline

authors:
  - Mario Fischer (http://www.chipwreck.de/blog/)

license:
  - MIT-style license

requires:
  core/1.2.4: '*'
  more/1.2.4: Drag.Slider

provides:
  - CwVideo.Timeline
  
version:
  0.5
...
*/
CwVideo.Timeline = new Class({

	Extends: Slider,
	Implements: [Events, Options],
	
	options: {
		video: false, // id of the video element
		timeDisplay: false, // if set: display current time in the given element (mm.s)
		timeAsPercent: false, // if true: display current time as percent (xx%)
		timeDisplayDisabled: '--', // text to show if current time is not available

		onChange: function(position) {
			this.updateVideo(position);
		},
		onError: function(error) {
			this.detach();
			this.updateTime(false);
			this.knob.set('opacity', 0.5); // for example..
		}
	},
	
	video: false,
	duration: 0,
	startTime: 0,
	
	initialize: function(element, knob, options)
	{
		this.parent(element, knob, options);
		this.setOptions(options);
		this.video = $(this.options.video);
		this.detach();
				
		// on video timeupdate: call updatePosition		
		this.video.addEvent('timeupdate', function(an_event) {
			this.updatePosition(this.video.get('currentTime'));
		}.bind(this));

		// if we have finished seeking in the video: call updatePosition
		this.video.addEvent('seeked', function(an_event) {
			this.updatePosition(this.video.get('currentTime'));
		}.bind(this));

		// duration changed?
		this.video.addEvent('durationchange', function(an_event) {
			this.duration = this.video.get('duration');
			if (this.duration == 0) {
				this.fireEvent('error', 'Duration is zero');
			}
		}.bind(this));
		
		// loaded?
		this.video.addEvent('loadstart', function(an_event) {
			this.updatePosition(this.video.get('currentTime'));
		}.bind(this));
		
		// canplay, so we can start
		this.video.addEvent('canplay', function(an_event) {
			if ($defined(this.video.get('startTime'))) {
				this.startTime = this.video.get('startTime');
			}
			this.updateTime(this.startTime);
			this.attach();
		}.bind(this));
	},
	
	updatePosition: function(time)
	{
		this.updateTime(time);
		if (this.video.get('seeking')) { // we are seeking or video has no duration
			return;
		}
		
		position = this.toPosition( time / this.duration * this.range );
		this.knob.setStyle(this.property, position); // we "manually" set the knob position in order to avoid triggering another event
	},
	
	updateVideo: function(position)
	{
		if (!position || this.duration == 0) return;
		videotime = ( position / this.range * this.duration); // from position to time
		this.video.set('currentTime', videotime); // if (this.video.get('readyState') != this.video.HAVE_FUTURE_DATA && this.video.get('readyState') != this.video.HAVE_ENOUGH_DATA ) { }		
	},
	
	updateTime: function(time)
	{
		if (this.options.timeDisplay) {
			if (time === false || !$defined(time)) {
				$(this.options.timeDisplay).set('html', this.options.timeDisplayDisabled);
				return;
			}
			if (this.options.timeAsPercent) {
				if (!this.duration || this.duration == 0) {
					$(this.options.timeDisplay).set('html', "0%");
				}
				else {
					$(this.options.timeDisplay).set('html', (time/this.duration*100).toInt() + "%");
				}
			}
			else {
			    hr = Math.floor(time / 3600);
			    rem = time % 3600;
			    min = Math.floor(rem / 60);
			    sec = Math.floor(rem % 60);
			    if (hr > 0) {
			    	$(this.options.timeDisplay).set('html', hr + ":" + (min < 10 ? "0"+min : min) + ":" + (sec < 10 ? "0"+sec : sec));
			    }
			    else {
			    	$(this.options.timeDisplay).set('html', min + ":" + (sec < 10 ? "0"+sec : sec));
			    }
				
			}		
		}
	}

});

/*
---
description: CwVideo.Volumeslider

authors:
  - Mario Fischer (http://www.chipwreck.de/blog/)

license:
  - MIT-style license

requires:
  core/1.2.4: '*'
  more/1.2.4: Drag.Slider

provides:
  - CwVideo.Volumeslider
  
version:
  0.5
...
*/
CwVideo.Volumeslider = new Class({

	Extends: Slider,
	Implements: [Events, Options],
	
	options: {
		video: false, // id of the video element
		initialVolume: false, // if given: set volume initially to this value (0.0 .. 1.0)

		onChange: function(position) {
			this.updateVolume(position);
		},
		onError: function(error) {
			this.detach();
		}
	},
	
	initialize: function(element, knob, options)
	{
		this.parent(element, knob, options);
		this.setOptions(options);
		this.detach();
				
		// on video volumeupdate: call updatePosition
		$(this.options.video).addEvent('volumechange', function(an_event) {
			if (!this.isDragging) {
				this.updatePosition($(this.options.video).get('volume'));
			}
		}.bind(this));
		
		// canplay, so we can start
		$(this.options.video).addEvent('canplay', function(an_event) {
			if (this.options.initialVolume) {
				$(this.options.video).set('volume', this.options.initialVolume);
			}
			this.attach();
		}.bind(this));
	},
	
	updatePosition: function(volume)
	{
		if (this.options.mode == 'vertical') volume = 1.0 - volume;
		position = this.toPosition( volume / 1.0 * this.range );
		this.knob.setStyle(this.property, position); // we "manually" set the knob position in order to avoid triggering another event
	},
	
	updateVolume: function(position)
	{
		volume = ( position / this.range * 1.0 ); // from position to volume
		if (this.options.mode == 'vertical') volume = 1.0 - volume;
		$(this.options.video).set('volume', volume);
	}


});
