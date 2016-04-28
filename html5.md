# Picture Element

```html
<picture>
    <source type="image/svg+xml" srcset="path/to/image.svg">
    <img src="path/to/fallback.png" alt="Image description">
</picture>
```

# Video

## Captions

- [https://github.com/iandevlin/mdn](https://github.com/iandevlin/mdn)

The following can be used to style the captions via `css`:

```css
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

Example `html`:

```html
<figure id="videoContainer" data-fullscreen="false">
    <video id="video" preload="metadata">
        <source src="video/sample.mp4" type="video/mp4">
        <!-- <source src="video/sintel-short.webm" type="video/webm"> -->
        <track label="English" kind="subtitles" srclang="en" src="subtitles/vtt/sintel-en.vtt" default>
        <track label="Deutsch" kind="subtitles" srclang="de" src="subtitles/vtt/sintel-de.vtt">
        <track label="Español" kind="subtitles" srclang="es" src="subtitles/vtt/sintel-es.vtt">
    </video>
</figure>
```

Custom CC functionality:

```javascript
var v = document.getElementById('video');
// v.play();

// http://stackoverflow.com/questions/14916914/toggling-closed-caption-in-html5-video-and-disabling-default-video-controls
var cc = document.getElementById('cc');
cc.addEventListener('click', function() {
    var ccMode = v.textTracks[0].mode;
    if (ccMode === 'showing') ccMode = 'hidden';
    else ccMode = 'showing';
    v.textTracks[0].mode = ccMode;
}, false);
```


