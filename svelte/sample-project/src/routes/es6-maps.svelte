<script lang="ts">
	import Highlight from 'svelte-highlight'
	import nord from 'svelte-highlight/src/styles/nord'
	import javascript from 'svelte-highlight/src/languages/javascript'
</script>

<svelte:head>
	{@html nord}
</svelte:head>

<main>
	<h1 id="title-primary">ES6 Maps</h1>
	<section aria-labelledby="title-primary">
		<div class="contain">
			<p>Similar to Set, Map can also be declared in the same fashion.</p>
			<Highlight language={javascript} langtag={true} code={`const map = new Map()`} />
			<p>
				Adding and Removing Elements from Map The Map supports the object-like key-value pairs.
				Therefore, when adding value, we need to provide a key as well. This is different from what
				we saw with the Set.
			</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`const map = new Map()
map.set('Name', 'iPhone') // map.set(key,value) format
map.set('Brand', 'Apple')
map.set('Price', '$1000')`}
			/>
			<p>
				To remove a value from the Map, we can simply pass the key into the <code>.delete()</code> property.
			</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`const map = new Map()
map.set('Name', 'iPhone')
map.set('Brand', 'Apple')
map.set('Price', '$1000')
map.delete('Price') //removes the element with key 'Price'`}
			/>
			<p>Like Set, we can use <code>.clear()</code> to remove all the elements.</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`map.clear() // removes all the element`}
			/>
		</div>
	</section>
	<section>
		<h2>Size of Map</h2>
		<div class="contain">
			<p>
				The size (length) of the map can easily be retrieved using the <code>.size</code> property.
			</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`const map = new Map()
map.set('Name', 'iPhone')
map.set('Brand', 'Apple')
map.set('Price', '$1000')
console.log(map.size) //=> 3`}
			/>
		</div>
	</section>
	<section>
		<div class="contain">
			<h2>Accessing Elements in Map</h2>
			<p>
				The Map provides us with a <code>.get()</code> method to quickly get the value by passing the
				key as an argument in the method.
			</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`const map = new Map()
map.set('Name', 'iPhone')
map.set('Brand', 'Apple')
map.set('Price', '$1000')
console.log(map.get('Name')) //iPhone
console.log(map.get('Brand')) // Apple`}
			/>
			<p>But what if you want only the keys, values, or both key and value?</p>

			<p>
				Map has <code>.keys()</code> ,<code>.values()</code>, and <code>.entries()</code> respectively
				for achieving the same.
			</p>

			<p>Using the same map from the code above,</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`console.log(map.keys())
// iterator {'Name','Brand',Price'}
console.log(map.values())
// iterator {'iPhone','Apple','$1000'}
console.log(map.entries())
//iterator {'Name':'iPhone','Brand':'Apple',Price':'$1000'}`}
			/>
			<p>Iterating over the map is also quite simple.</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`//with for-each
map.forEach((value, key) => {
  console.log(key, value)
})

// with for-of
for (const [key, value] of map) {
  console.log(key, value)
}`}
			/>
			<p>
				Moreover, you can easily check if an element exists or not using `.has()` property and
				passing the key.
			</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`let map = new Map()
map.set('age', 19)
console.log(map.has('age')) // true since 'age' key is present`}
			/>
		</div>
	</section>
	<section>
		<h2>Converting Object into a Map</h2>
		<div class="contain">
			<p>
				If you decide to convert your object to a map, JavaScript has got you covered. We have
				earlier used <code>.entries()</code> to get all the key-value pairs but this time we are gonna
				use the method on Object.
			</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`const myObject = {
  Age: '25',
  Gender: 'Male',
  Nationality: 'Australian',
}

const myMap = new Map(Object.entries(myObject)) //object to map
const anotherObject = Object.fromEntries(myMap) // map to object`}
			/>
			<p>You can easily convert a map to an object as well as shown above.</p>
			<p>To convert the map into an array we can use the <code>Array.from(myMap)</code>.</p>
		</div>
	</section>
	<section>
		<h2>Map vs Array & Objects</h2>
		<div class="contain">
			<p>
				The Map seems to solve a lot of shortcomings of the array and objects such as able to handle
				much more complex operations. The Map is like a hybrid of array and objects. It has a size
				property like array and can store elements in a key-value pair format. Besides this, it also
				provides methods to like <code>.has()</code> to check if an element exists or not which can save
				you a ton of time. Moreover, it does not necessarily need the key to be of String type. You can
				even use an object as a key that can help you write better code.
			</p>
		</div>
	</section>
	<section>
		<h2>References</h2>
		<div class="contain">
			<ul>
				<li>
					<a
						href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
						target="_blank"
						rel="noopener noreferrer">MDN Map Reference.</a
					>
				</li>
			</ul>
		</div>
	</section>
</main>
