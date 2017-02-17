# HTML5 Video

## VTT Caption Format

Sample HTML

```html
<video poster="https://cdn.brad.is/images/thumb.jpg" preload>
	<source src="https://cdn.brad.is/videos/curiosity.mp4" type="video/mp4">
	<source src="https://cdn.brad.is/videos/curiosity.webm" type="video/webm">
	<track label="English Captions" kind="captions" srclang="en" src="video_cc_en.vtt" default>
</video>
```

Sample VTT

```vtt
WEBVTT

0
00:00:01.000 --> 00:00:04.000 line:90% position:50%
Captions being displayed via WEBVTT track file

1
00:00:04.000 --> 00:00:07.000 line:90% position:50%
But browser vendors couldn't agree on a codec

2
00:00:07.000 --> 00:00:10.000 line:90% position:50%
and older browsers don't support &lt;video&gt; at all.

3
00:00:10.000 --> 00:00:12.000 line:90% position:50%
This means &lt;video src="myfile.mp4" /&gt; doesn't work ...

4
00:00:12.000 --> 00:00:14.000 line:90% position:50%
until now.

5
00:00:14.000 --> 00:00:18.000 line:90% position:50%
Introducing MediaElement.js, an HTML5 &lt;video&gt; and &lt;audio&gt; player

6
00:00:18.000 --> 00:00:21.000 line:90% position:50%
that looks and works the same in every browser (even iPhone and Android).

7
00:00:21.000 --> 00:00:24.000 line:90% position:50%
For older browsers, it has custom Flash and Silverlight plugins

8
00:00:24.000 --> 00:00:26.000 line:90% position:50%
that fully replicate the HTML5 MediaElement API
```

In this example, the _line/position_ attributes are applied to each of the track captions to position the text in the center of the screen horizontally and 90% from the top, which will leave room at the bottom of the video (for a fixed nav bar?). 

- **webvtt** `.vtt` format captions work on both Windows and OSX. 
- There is minimal styling available on non `-webkit` browsers. 
  - OSX browsers by default position white text on a semi-transparent black background. 
  - <span style="color:red">IE11 positions white text with a thin black border on a totally transparent background.</span>
- There is sufficient positioning capabilities built into the `.vtt` file

# Simple Delivery Profile (SDP) / TTML Format

Sample HTML:

```html
<video poster="https://cdn.brad.is/images/thumb.jpg" preload>
  <source src="https://cdn.brad.is/videos/curiosity.mp4" type="video/mp4">
  <source src="https://cdn.brad.is/videos/curiosity.webm" type="video/webm">
  <track src="SDPTest.ttml" label="SDP Examples" default/>
</video>
```

Sample TTML file (`SDPTest.ttml`):

```xml
<?xml version="1.0" encoding="utf-8"?>
<tt xml:lang="en-us" xmlns="http://www.w3.org/ns/ttml"
    xmlns:s="http://www.w3.org/ns/ttml#styling"
    xmlns:p="http://www.w3.org/ns/ttml#parameter">
  <head>
    <p:profile use="http://www.w3.org/ns/ttml/profile/sdp-us"/>
    <styling>
      <!-- define styles for text color and position -->
      <style xml:id="bottomMidStyle" s:textAlign="center" s:textOutline="red 1px" s:backgroundColor="#ff000044"
       s:color="#ffffffff" s:origin='20% 78%' s:extent='30% 10%'/>
      <style xml:id="topMidStyle" s:textAlign="center" s:textOutline="black 1px" s:backgroundColor="#00ff0088"
       s:color="#ff11ffff" s:origin='20% 40%' s:extent='60% 18%'/>
      <style xml:id="topLeftStyle" s:textAlign="left" s:textOutline="blue 1px" s:backgroundColor="transparent"
       s:color="#ff11ffff" s:origin='10% 10%' s:extent='30% 10%'/>
      <style xml:id="bottomRightStyle" s:textAlign="right" s:textOutline="black 1px" s:backgroundColor="white"
       s:color="green" s:origin='70% 70%' s:extent='30% 10%'/>
    </styling>

    <layout>
      <!-- define regions for locating text -->
      <region xml:id="bottomMid" style="bottomMidStyle" />
      <region xml:id="topMid" style="topMidStyle" />
      <region xml:id="topLeft" style="topLeftStyle" />
      <region xml:id="bottomRight" style="bottomRightStyle" />
    </layout>
  </head>
  <body>
    <div style="defaultFont">
      <p region="bottomMid" begin='00:00:00.101' end='00:00:05.000'> This is a Pop-up caption</p>
      <p region="topMid" begin='00:00:05.000' end='00:00:10.000'> This is another Pop-up caption</p>
      <p region="topLeft" begin='00:00:10.000' end='00:00:15.000'> Hello from up top</p>
      <p region="bottomRight" begin='00:00:15.000' end='00:00:20.000'> And back down</p>
   </div>
  </body>
</tt>
```

- **TTML** `.ttml` format captions work on <span style="color:red">IE11 only</span>.
- There is **extended** styling and positioning capabilities built into the `.ttml` file.

## Hybrid Solution

Initial solution concept was to supply multiple `track` elements and let the browser select the format it prefers. This does not work however because modern browsers will recognize the `xml` format of the `.ttml` file without being able to natively support it.

Option 2 was to incorporate IE Conditional comments to write one of the two `track` formats based on if the browser is IE or not. However Microsoft has dropped support of conditional comments as of >IE9.

<blockquote>Support for conditional comments has been removed in Internet Explorer 10 standards and quirks modes for improved interoperability and compliance with HTML5. This means that Conditional Comments are now treated as regular comments, just like in other browsers. This change can impact pages written exclusively for Windows Internet Explorer or pages that use browser sniffing to alter their behaviour in Internet Explorer.</blockquote>

- [Internet Explorer Dev Center](https://msdn.microsoft.com/library/hh801214\(v=vs.85\).aspx)

Option 3 uses javascript to detect the browser user agent, and then dynamically build one of two `track` elements with the appropriate `src` attribute value;

```javascript
var video = document.querySelector('video');

var ms_ie = false;
var ua = window.navigator.userAgent;
var old_ie = ua.indexOf('MSIE ');
var new_ie = ua.indexOf('Trident/');

if ((old_ie > -1) || (new_ie > -1)) {
    ms_ie = true;
}

var track_source = document.createElement('track');
track_source.setAttribute('label', 'English Captions');

if (ms_ie) 
  track_source.setAttribute('src', 'SDPTest.ttml');
else 
  track_source.setAttribute('src', 'video_cc_en.vtt');

track_source.setAttribute('default', 'default');
video.appendChild(track_source);
```

## Common Styles

These examples both resize the video to fill the full available window.

```css
video {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  -ms-transform: translateX(-50%) translate(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  background-size: cover;

  /* Full window maintaining aspect ratio */

  /*bottom: 0;
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: -100;

  min-height: 100%;
  min-width: 100%;*/
}
```

Additional styling can be applied to the caption text, however it appears support is spotty:

```css
::cue {
  font-family: "Helvetica Neue";
  font-weight: lighter;
  font-size: 24px;
}

/* Additional `-webkit` only styles available:*/
video::-webkit-media-text-track-container {
    top: -80px;
}

video::-webkit-media-text-track-background {
    background-color: black;
    border-radius: 2px;
    box-shadow: 0 0px 5px 0px #000;
    opacity: 0.5;
    padding: 4px 8px 6px 10px;
}

video::-webkit-media-text-track-display {
    color: white;
    font-family: Open Sans, Georgia;
    font-size: 14px;
    padding: 1px 1px 10px 1px;
}
```

## Javascript Controls

This example is based on some simple text based links being used as video controls. The video element control bar is hidden because we are doing full screen background video.

```html
<div class="controls">
  <a class="btn_rewind">Rewind</a>
  <a class="btn_playpause">Pause</a>
  <a class="btn_captions">Captions</a>
</div>
```

Here's the Javascript to control the video playback and captioning functions:

```javascript
var videoElement = document.querySelector('video');
var textTracks = videoElement.textTracks; // Get all text tracks included
var textTrack = textTracks[0]; // Corresponds to the first track element
var kind = textTrack.kind; // e.g. "subtitles"
var mode = textTrack.mode; // e.g. "disabled, hidden" or "showing"

// A timeout is used to allow the video to preload for a few seconds before playback begins
var t = window.setTimeout(function() {
  videoElement.play();
  mode = 'showing'; // Captions are showing by default.
}, 4000);


// Pause the video and reset the playhead to time:0
var rewindVideo = function(event) {
  event.preventDefault();
  videoElement.pause();
  videoElement.currentTime = 0;
  btn_playpause.innerHTML = 'Play';
};

var btn_rewind = document.querySelector('.btn_rewind');
btn_rewind.addEventListener('click', rewindVideo, false);


// Toggle video playback
var playPauseVideo = function(event) {
  event.preventDefault();
  if (videoElement.paused) {
    videoElement.play();
    btn_playpause.innerHTML = 'Pause';
  }
  else {
    videoElement.pause();
    btn_playpause.innerHTML = 'Play';
  }
};

var btn_playpause = document.querySelector('.btn_playpause');
btn_playpause.addEventListener('click', playPauseVideo, false);


// Toggle captions visibility
var toggleCaptions = function(event) {
  event.preventDefault();
  if (mode === 'showing') {
    document.querySelector('video').textTracks[0].mode = 'hidden';
    mode = 'hidden';
  }
  else {
    document.querySelector('video').textTracks[0].mode = 'showing';
    mode = 'showing';
  }
};

var btn_captions = document.querySelector('.btn_captions');
btn_captions.addEventListener('click', toggleCaptions, false);
```

## Additional Notes

- For captions to work, files must be served from a web server. Running the page locally will not allow caption functionality.
- Web server must include MIME support: 
  ```apache
  AddType text/vtt .vtt
  AddType application/ttml+xml .ttml
  ```

## Resources

### Software

- **[Online Captioning Tool](http://www.subtitle-horse.com)**
- [Microsoft Caption Maker Demo](https://developer.microsoft.com/en-us/microsoft-edge/testdrive/demos/captionmaker/)

### TTML

- [https://msdn.microsoft.com/en-us/library/dn265042\(v=vs.85\).aspx](https://msdn.microsoft.com/en-us/library/dn265042\(v=vs.85\).aspx)
- [https://msdn.microsoft.com/en-us/library/jj152136\(v=vs.85\).aspx](https://msdn.microsoft.com/en-us/library/jj152136\(v=vs.85\).aspx)

### VTT

- [http://html5videoguide.net/presentations/WebVTT/#landing-slide](http://html5videoguide.net/presentations/WebVTT/#landing-slide)
- [http://www.html5rocks.com/en/tutorials/track/basics/](http://www.html5rocks.com/en/tutorials/track/basics/)
- [https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video](https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video)
- [https://www.iandevlin.com/blog/2011/05/html5/webvtt-and-video-subtitles](https://www.iandevlin.com/blog/2011/05/html5/webvtt-and-video-subtitles)
- [https://developer.mozilla.org/en-US/docs/Web/API/Web_Video_Text_Tracks_Format](https://developer.mozilla.org/en-US/docs/Web/API/Web_Video_Text_Tracks_Format)
- [https://books.google.com/books?id=fV0nCgAAQBAJ&pg=PA174&lpg=PA174&dq=webvtt+move+from+bottom+of+video&source=bl&ots=uFnrDyAKYz&sig=zQZEAtRiWMlvPt9_khV2DuM6LGA&hl=en&sa=X&ved=0ahUKEwjF3uWq99TMAhUGWT4KHXa6CmEQ6AEIQzAG#v=onepage&q=webvtt%20move%20from%20bottom%20of%20video&f=false](https://books.google.com/books?id=fV0nCgAAQBAJ&pg=PA174&lpg=PA174&dq=webvtt+move+from+bottom+of+video&source=bl&ots=uFnrDyAKYz&sig=zQZEAtRiWMlvPt9_khV2DuM6LGA&hl=en&sa=X&ved=0ahUKEwjF3uWq99TMAhUGWT4KHXa6CmEQ6AEIQzAG#v=onepage&q=webvtt%20move%20from%20bottom%20of%20video&f=false)
- [https://msdn.microsoft.com/en-us/library/hh772556(v=vs.85).aspx](https://msdn.microsoft.com/en-us/library/hh772556\(v=vs.85\).aspx)
- [https://github.com/iandevlin/mdn](https://github.com/iandevlin/mdn)


## Detect Autoplay

```javascript
function detect_autoplay(acceptable_delay) {
    var autoplay = false;
    var autoplay_test_content = document.createElement('video');

    //create mp4 and webm sources, 5s long
     var mp4 = document.createElement('source');
     mp4.src = "data:video/mp4;base64,AAAAFGZ0eXBNU05WAAACAE1TTlYAAAOUbW9vdgAAAGxtdmhkAAAAAM9ghv7PYIb+AAACWAAACu8AAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAnh0cmFrAAAAXHRraGQAAAAHz2CG/s9ghv4AAAABAAAAAAAACu8AAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAFAAAAA4AAAAAAHgbWRpYQAAACBtZGhkAAAAAM9ghv7PYIb+AAALuAAANq8AAAAAAAAAIWhkbHIAAAAAbWhscnZpZGVBVlMgAAAAAAABAB4AAAABl21pbmYAAAAUdm1oZAAAAAAAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAVdzdGJsAAAAp3N0c2QAAAAAAAAAAQAAAJdhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAFAAOABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAEmNvbHJuY2xjAAEAAQABAAAAL2F2Y0MBTUAz/+EAGGdNQDOadCk/LgIgAAADACAAAAMA0eMGVAEABGjuPIAAAAAYc3R0cwAAAAAAAAABAAAADgAAA+gAAAAUc3RzcwAAAAAAAAABAAAAAQAAABxzdHNjAAAAAAAAAAEAAAABAAAADgAAAAEAAABMc3RzegAAAAAAAAAAAAAADgAAAE8AAAAOAAAADQAAAA0AAAANAAAADQAAAA0AAAANAAAADQAAAA0AAAANAAAADQAAAA4AAAAOAAAAFHN0Y28AAAAAAAAAAQAAA7AAAAA0dXVpZFVTTVQh0k/Ou4hpXPrJx0AAAAAcTVREVAABABIAAAAKVcQAAAAAAAEAAAAAAAAAqHV1aWRVU01UIdJPzruIaVz6ycdAAAAAkE1URFQABAAMAAAAC1XEAAACHAAeAAAABBXHAAEAQQBWAFMAIABNAGUAZABpAGEAAAAqAAAAASoOAAEAZABlAHQAZQBjAHQAXwBhAHUAdABvAHAAbABhAHkAAAAyAAAAA1XEAAEAMgAwADAANQBtAGUALwAwADcALwAwADYAMAA2ACAAMwA6ADUAOgAwAAABA21kYXQAAAAYZ01AM5p0KT8uAiAAAAMAIAAAAwDR4wZUAAAABGjuPIAAAAAnZYiAIAAR//eBLT+oL1eA2Nlb/edvwWZflzEVLlhlXtJvSAEGRA3ZAAAACkGaAQCyJ/8AFBAAAAAJQZoCATP/AOmBAAAACUGaAwGz/wDpgAAAAAlBmgQCM/8A6YEAAAAJQZoFArP/AOmBAAAACUGaBgMz/wDpgQAAAAlBmgcDs/8A6YEAAAAJQZoIBDP/AOmAAAAACUGaCQSz/wDpgAAAAAlBmgoFM/8A6YEAAAAJQZoLBbP/AOmAAAAACkGaDAYyJ/8AFBAAAAAKQZoNBrIv/4cMeQ==";

     var webm = document.createElement('source');
     webm.src = "data:video/webm;base64,GkXfo49CgoR3ZWJtQoeBAUKFgQEYU4BnAQAAAAAAF60RTZt0vE27jFOrhBVJqWZTrIIQA027jFOrhBZUrmtTrIIQbE27jFOrhBFNm3RTrIIXmU27jFOrhBxTu2tTrIIWs+xPvwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFUmpZuQq17GDD0JATYCjbGliZWJtbCB2MC43LjcgKyBsaWJtYXRyb3NrYSB2MC44LjFXQY9BVlNNYXRyb3NrYUZpbGVEiYRFnEAARGGIBc2Lz1QNtgBzpJCy3XZ0KNuKNZS4+fDpFxzUFlSua9iu1teBAXPFhL4G+bmDgQG5gQGIgQFVqoEAnIEAbeeBASMxT4Q/gAAAVe6BAIaFVl9WUDiqgQEj44OEE95DVSK1nIN1bmTgkbCBULqBPJqBAFSwgVBUuoE87EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB9DtnVB4eeBAKC4obaBAAAAkAMAnQEqUAA8AABHCIWFiIWEiAICAAamYnoOC6cfJa8f5Zvda4D+/7YOf//nNefQYACgnKGWgQFNANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQKbANEBAAEQEAAYABhYL/QACIhgAPuC/rKgnKGWgQPoANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQU1ANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQaDANEBAAEQEAAYABhYL/QACIhgAPuC/rKgnKGWgQfQANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQkdANEBAAEQEBRgAGFgv9AAIiGAAPuC/rOgnKGWgQprANEBAAEQEAAYABhYL/QACIhgAPuC/rKgnKGWgQu4ANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQ0FANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQ5TANEBAAEQEAAYABhYL/QACIhgAPuC/rKgnKGWgQ+gANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgRDtANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgRI7ANEBAAEQEAAYABhYL/QACIhgAPuC/rIcU7trQOC7jLOBALeH94EB8YIUzLuNs4IBTbeH94EB8YIUzLuNs4ICm7eH94EB8YIUzLuNs4ID6LeH94EB8YIUzLuNs4IFNbeH94EB8YIUzLuNs4IGg7eH94EB8YIUzLuNs4IH0LeH94EB8YIUzLuNs4IJHbeH94EB8YIUzLuNs4IKa7eH94EB8YIUzLuNs4ILuLeH94EB8YIUzLuNs4INBbeH94EB8YIUzLuNs4IOU7eH94EB8YIUzLuNs4IPoLeH94EB8YIUzLuNs4IQ7beH94EB8YIUzLuNs4ISO7eH94EB8YIUzBFNm3SPTbuMU6uEH0O2dVOsghTM";

    autoplay_test_content.appendChild(webm);
    autoplay_test_content.appendChild(mp4);

    //set attributes -needs to be visible or IE squawks, so we move it way outside
    autoplay_test_content.id = "base64_test_video";
    autoplay_test_content.autoplay = true;
    autoplay_test_content.style.position = "fixed";
    autoplay_test_content.style.left = "5000px";

    // add to DOM
    document.getElementsByTagName('body')[0].appendChild(autoplay_test_content);

    var base64_test_video = document.getElementById("base64_test_video");

    // test for autoplay
    window.setTimeout(function() {
      if (!base64_test_video.paused) autoplay = true;
      document.getElementsByTagName('body')[0].removeChild(autoplay_test_content);
      console.log('autoplay: ' + autoplay);
    }, acceptable_delay);
  }

  detect_autoplay(4000);
```

- [reference](http://stackoverflow.com/questions/7120703/how-do-i-detect-if-the-html5-autoplay-attribute-is-supported)
