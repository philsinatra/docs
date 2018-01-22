# Bodymovin Animation

<!-- TOC -->

- [Bodymovin Animation](#bodymovin-animation)
	- [Bodymovin Plugin Installation](#bodymovin-plugin-installation)
	- [How to prepare your After Effects files](#how-to-prepare-your-after-effects-files)
	- [Take care with masks](#take-care-with-masks)
	- [Rendering](#rendering)
	- [Load the animation](#load-the-animation)
	- [Add interaction](#add-interaction)
	- [References](#references)

<!-- /TOC -->

## Bodymovin Plugin Installation

- [Bodymovin Installation](https://github.com/airbnb/lottie-web#plugin-installation)

## How to prepare your After Effects files

Support for After Effects features has improved greatly over the last year and you can expect to get pretty good results straight out of the box. That being said, your fancy flying 3D layers won't play nice so be aware of the limits before you get started. Before you begin a project – always download the latest version of Bodymovin and check the GitHub page to see which features are currently supported.

Don't be too hasty to move onto the fun part… tidy files make a tidy mind. In this case they'll also help take some of the extra work away from the browser and give you silky smooth playback. Firstly, you'll want to make sure that your content is in After Effects shape layers for full vector power. To convert any Illustrator file to shape layers you can simply right-click and choose Create Shapes from Vector Layer. Any layers that aren't shapes at this stage will then be converted into images and they won't be rendered as vectors.

Next, have a check through your layers and sublayers; there's a good chance you can simplify the contents of the shape without sacrificing anything. Try to cut down the number of groups, paths and fills to just the bare essentials.

## Take care with masks

Masks are an easy way to slip up at this stage. Be aware that alpha masks will work with the SVG renderer but won't show up should you choose to switch to Canvas. Masks can be expensive in performance so use them efficiently.

## Rendering

Bodymovin works in two parts – an After Effects extension that converts animation data to a JSON file and a Bodymovin.js player to include in your webpage that can interpret this file and render it in the browser.

Think your files are good to go? Open up the Bodymovin extension through Window > Extensions and then Bodymovin.

Once you hit refresh, you'll see a list of all the compositions in this After Effects project. Select your chosen comp and then pick a destination folder inside of your web project. When you're happy just click render and watch the magic happen. When it's done you'll get a 'finished' message. Congratulations! You've just exported a JSON file with all the information that the player needs to re-create the animation.

Check your layers – it could be an unsupported feature or an expression used in After Effects
To test your newly exported animation, click on Preview > Current Renders and remember to scrub through the timeline as you might spot something that looks a little different to what you'd expect. If you do spot any problems jump back and check your layers – it could be an unsupported feature or an expression used in After Effects.

Some After Effects plugins such as Rubberhose now support Bodymovin. Rubberhose makes use of guide layers and hidden layers. To activate these, just click on the settings cog next to your chosen composition and tick the features you need.

If everything looks good, there's just one more thing you need to do before you leave After Effects behind. At this stage you should have a fresh data.json file describing your animation, but no Bodymovin player to interpret it. In the extension, click the 'Get the player' button in the top right and save it with your JSON file.

## Load the animation

Now you have everything you need, let's jump straight into the code and lay down the basics to get your animation showing on the page.

First make a new container `#anim_container` to hold your animation. You also need to include the `bodymovin.js` file before the closing body tag. Next tell Bodymovin everything about your animation and load it into the new container.

Let's walk through the setup step by step:

```javascript
var container = document.getElementById('anim_container');
// Set up our animation

var animData = {
  container: container,
  renderer: 'svg',
  autoplay: true,
  loop: true,
  path : 'data.json'
};
var anim = bodymovin.loadAnimation(animData);
```

You need to define all of the parameters for the animation. Tell Bodymovin the container you want the animation to load into and then tell it to render the animation as SVG elements. Next, tell the animation to play as soon as it's loaded and that you want it to loop back to the start when it's finished.

The path property tells the Bodymovin player where to find the JSON data file for the animation. Due to the cross-origin resource sharing policy (CORS), the technique you'll be using for accessing the JSON file will only work if you are on a server or local server. To work locally, you can make that data.json into a JavaScript file that assigns the object to a variable. In that case your setup might look like this:

```html
<script src="js/data.js"></script>
<script>
var container = document.getElementById('anim_container');
// Set up our animation
var animData = {
  container: container,
  renderer: 'svg',
  autoplay: true,
  loop: true,
  animationData : data
};
var anim = bodymovin.loadAnimation(animData);
</script>
```

Refresh the page and your animation should be playing inside the container! Select with your dev tools and you'll see that each element in the animation is now contained in `<g>` tags, and is being transformed in real-time.

Looks amazing right? You should now have a beautiful, crisp animation showing in the browser (without a wretched  video tag in sight…). The animation will always scale to fit its container, so go ahead and blow it up!

Bodymovin has a range of powerful methods for controlling the animation after it has loaded. Calling a method like `anim.pause()` or `anim.setDirection()` will enable you to manipulate playback in different ways. Let's look at some examples:

- `anim.setDirection(-1)` will play the animation in reverse
- `anim.pause()` and `anim.play()` will start and stop the animation
- `anim.setSpeed(0.5)` will play the animation at half speed

## Add interaction

In this next step you'll explore a few of the different ways to add interaction to your animations through JavaScript. In this example we export an After Effects animation with two sections: section A and section B. Section A uses frames from one to 20 (triangle is holding its pogo stick) section B uses frames from 20 to 40 (triangle is jumping up and down on a pogo stick).

Now, you want to play section a on a loop then (only after the user clicks) play and loop section B. You can make use of the playSegments property to split animations up in this way. This method will take two arguments – an array with start and end values and a second Boolean – isFrame. Setting this to true will tell the animation to read the start and end values as frames, whereas false will tell it to read these values as time.

```javascript
anim.pause();
anim.playSegments([0,20], true);
```

Adding this tells Bodymovin to pause at the first frame and play just the animation from 0 to 20 frames. As you set up your animation with a loop: true property this will continue to play Section A again and again.

Let's set up the whole example. You'll be using two segments of an animation for this example, so you'll create two functions:

```javascript
var container = document.getElementById('anim_container');
// Set up our animation
var animData = {
    container: container,
    renderer: 'svg',
    autoplay: false,
    loop: true,
    path: 'data.json'
};
var anim = bodymovin.loadAnimation(animData);
// When the animation is loaded run our firstLoop function
anim.addEventListener('DOMLoaded',firstLoop);
// Create our playback functions
function firstLoop() {
     anim.playSegments([0,20], true);
};
function secondLoop() {
     anim.playSegments([20,40], true);
};
// Listen for a click event
container.addEventListener('click', function(event) {
     anim.addEventListener( 'loopComplete', secondLoop);
});
```

Now your animation will keep looping until the user clicks on it, then it will start the second loop. The only problem now is that a jump like this is very abrupt and it can ruin the smoothness of the animation.

An ideal situation is to include a third section to the animation, one that transitions from holding the pogo stick to jumping on it. Now your structure will look something like this:

- **firstLoop** – frame 0 to 20
- **transition** – frame 20 to 30
- **secondLoop** – frame 30 to 50

We want your animation to stay in the first loop until it's clicked. At that point you will want to wait for the end of the loop you are currently in and move onto the transition. After the transition is done move to your second loop. This sounds complicated but stay with me! Here's your code in full:

```javascript
var container = document.getElementById('anim_container');
// Set up our animation
var animData = {
 container: container,
 renderer: 'svg',
 autoplay: false,
 loop: true,
 path: 'data.json'
};
var anim = bodymovin.loadAnimation(animData);
// When the animation is loaded run our firstLoop function
anim.addEventListener('DOMLoaded',firstLoop);
// Create our playback functions
function firstLoop() {
  anim.playSegments([0,20], true);
};
function transition() {
   anim.playSegments([20,30], true);
   anim.removeEventListener('loopComplete');
   anim.addEventListener('loopComplete', secondLoop );
};
function secondLoop() {
    anim.playSegments([30,100], true);
    anim.removeEventListener('loopComplete');
};
// Listen for a click event
container.addEventListener('click', function(event) {
     anim.addEventListener( 'loopComplete', transition );
});
```

On click, you're using a `loopComplete` listener to wait until you reach the last frame of the loop, then run your `transition()` function. Here you remove the last listener, play the next set of frames and then do the same again. After the transition is finished it will call `secondLoop()`.

## References

- [Source Article](http://www.creativebloq.com/how-to/export-after-effects-animations-to-html5)
- [Bodymovin AES Plugin](https://aescripts.com/bodymovin/)
- [Bodymovin Installation](https://github.com/airbnb/lottie-web#plugin-installation)
- [Bodymovin CodePen](https://codepen.io/collection/nVYWZR/)
- [Introducting Lottie](http://airbnb.io/lottie/)
- [Lottie GitHub](https://github.com/airbnb/lottie-web)
