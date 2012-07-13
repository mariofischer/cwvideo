Class: CwVideo {#CwVideo}
=========================



### Implements:

Events, Options




CwVideo Method: constructor {#CwVideo:constructor}
---------------------------------------------------


### Syntax:

	var myCwVideo = new CwVideo(element, options);

### Arguments:

1. element - (**)
2. options - (**)

### Options:

* implementMediaAdditions - (**)

### Returns:





CwVideo Method: set {#CwVideo:set}
-----------------------------------


### Syntax:



### Arguments:

1. avalue - (**)


CwVideo Method: get {#CwVideo:get}
-----------------------------------


### Syntax:



### Returns:





CwVideo Method: durationchange {#CwVideo:durationchange}
---------------------------------------------------------


### Syntax:



### Arguments:

1. event - (**)


CwVideo Method: loadstart {#CwVideo:loadstart}
-----------------------------------------------


### Syntax:



### Arguments:

1. event - (**)


CwVideo Method: pause {#CwVideo:pause}
---------------------------------------


### Syntax:




CwVideo Method: play {#CwVideo:play}
-------------------------------------


### Syntax:




CwVideo Method: rewind {#CwVideo:rewind}
-----------------------------------------


### Syntax:




CwVideo Method: move {#CwVideo:move}
-------------------------------------


### Syntax:



### Arguments:

1. secs - (**)


CwVideo Method: toggleMute {#CwVideo:toggleMute}
-------------------------------------------------


### Syntax:




CwVideo Method: volumeChange {#CwVideo:volumeChange}
-----------------------------------------------------


### Syntax:



### Arguments:

1. amount - (**)


CwVideo Method: togglePlay {#CwVideo:togglePlay}
-------------------------------------------------


### Syntax:




CwVideo Method: stop {#CwVideo:stop}
-------------------------------------


### Syntax:




CwVideo Method: getNetworkState {#CwVideo:getNetworkState}
-----------------------------------------------------------


### Syntax:



### Returns:





CwVideo Method: getReadyState {#CwVideo:getReadyState}
-------------------------------------------------------


### Syntax:



### Returns:





CwVideo Method: fullscreen {#CwVideo:fullscreen}
-------------------------------------------------------


### Syntax:



### Returns:



CwVideo Method: toggleFullscreen {#CwVideo:toggleFullscreen}
-------------------------------------------------------


### Syntax:



### Returns:





Class: CwVideo.Timeline {#CwVideo.Timeline}
===========================================



### Implements:

Events, Options



### Extends:

Slider




CwVideo.Timeline Method: onChange {#CwVideo.Timeline:onChange}
---------------------------------------------------------------


### Syntax:



### Arguments:

1. position - (**)


CwVideo.Timeline Method: onError {#CwVideo.Timeline:onError}
-------------------------------------------------------------


### Syntax:



### Arguments:

1. error - (**)


CwVideo.Timeline Method: constructor {#CwVideo.Timeline:constructor}
---------------------------------------------------------------------


### Syntax:

	var myCwVideo.Timeline = new CwVideo.Timeline(element, knob, options);

### Arguments:

1. element - (**)
2. knob - (**)
3. options - (**)

### Options:

* video - (**)
* timeDisplay - (**)
* timeAsPercent - (**)
* timeDisplayDisabled - (**)

### Events:

* onChange -
* onError -


CwVideo.Timeline Method: updatePosition {#CwVideo.Timeline:updatePosition}
---------------------------------------------------------------------------


### Syntax:



### Arguments:

1. time - (**)

### Returns:





CwVideo.Timeline Method: updateVideo {#CwVideo.Timeline:updateVideo}
---------------------------------------------------------------------


### Syntax:



### Arguments:

1. position - (**)

### Returns:





CwVideo.Timeline Method: updateTime {#CwVideo.Timeline:updateTime}
-------------------------------------------------------------------


### Syntax:



### Arguments:

1. time - (**)

### Returns:




Class: CwVideo.Volumeslider {#CwVideo.Volumeslider}
===================================================



### Implements:

Events, Options



### Extends:

Slider




CwVideo.Volumeslider Method: onChange {#CwVideo.Volumeslider:onChange}
-----------------------------------------------------------------------


### Syntax:



### Arguments:

1. position - (**)


CwVideo.Volumeslider Method: onError {#CwVideo.Volumeslider:onError}
---------------------------------------------------------------------


### Syntax:



### Arguments:

1. error - (**)


CwVideo.Volumeslider Method: constructor {#CwVideo.Volumeslider:constructor}
-----------------------------------------------------------------------------


### Syntax:

	var myCwVideo.Volumeslider = new CwVideo.Volumeslider(element, knob, options);

### Arguments:

1. element - (**)
2. knob - (**)
3. options - (**)

### Options:

* video - (**)
* initialVolume - (**)

### Events:

* onChange -
* onError -


CwVideo.Volumeslider Method: updatePosition {#CwVideo.Volumeslider:updatePosition}
-----------------------------------------------------------------------------------


### Syntax:



### Arguments:

1. volume - (**)


CwVideo.Volumeslider Method: updateVolume {#CwVideo.Volumeslider:updateVolume}
-------------------------------------------------------------------------------


### Syntax:



### Arguments:

1. position - (**)

