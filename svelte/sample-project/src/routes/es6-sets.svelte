<script lang="ts">
	import Highlight from 'svelte-highlight'
	import nord from 'svelte-highlight/src/styles/nord'
	import javascript from 'svelte-highlight/src/languages/javascript'
</script>

<svelte:head>
	{@html nord}
</svelte:head>

<main>
	<h1 id="title-primary">ES6 Sets</h1>
	<section aria-labelledby="title-primary">
		<div class="contain">
			<p>
				Imagine you have a JavaScript array that contains many elements, some of which are
				duplicated:
			</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`let dupeArray = [1, 1, 4, 5, 4, 4, 2, 1, 5]`}
			/>
			<p>Your goal is to remove the duplicates and leave only one entry per value:</p>
			<Highlight language={javascript} langtag={true} code={`let uniqueArray = [1, 4, 5, 2]`} />
			<p>Let's create a Set, add some values to it and query the size.</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`let mySet = new Set().add(1).add(3).add(2).add(1)
// Set(3) {1, 3, 2}
mySet.size
// 3`}
			/>
			<p>
				Notice how the final 1 wasn't added and the size of the Set remained at 3 instead of 4. In
				an array, it would have been added and the length would be 4.
			</p>
			<p>
				There are two ways to add values to a Set. Firstly by using the add method as above.
				Secondly by passing an array to the constructor <code>(new Set())</code>:
			</p>
			<Highlight language={javascript} langtag={true} code={`let arraySet1 = new Set([3, 2, 1])`} />
			<p>Duplicated values are also removed if they are included in the initial array:</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`let arraySet2 = new Set([8, 8, 9, 2])
// Set(3) {8,9,2}`}
			/>
			<p>
				All that’s left to do is to convert this Set into an array and we’ve achieved our original
				goal. There are two ways to do this: both using ES6 methods.
			</p>
		</div>
	</section>
	<section>
		<h2>Array.from Method</h2>
		<div class="contain">
			<p>The Array.from method creates a new array from an array-like structure.</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`let dupeArray = [3, 2, 3, 3, 5, 2]
let uniqueArray = Array.from(new Set(dupeArray))`}
			/>
		</div>
	</section>
	<section>
		<h2>... Spread Operator</h2>
		<div class="contain">
			<p>
				Those three dots are ubiquitous in ES6. They crop up everywhere and have several uses (and
				they're a right pain to google). When we use them as the spread operator they can be used to
				create an array:
			</p>
			<Highlight
				language={javascript}
				langtag={true}
				code={`let uniqueArray = [...new Set(dupeArray)]`}
			/>
			<p>
				Which of these two methods should you use? The spread syntax looks cool, but Array.from is
				more explicit in its purpose and easier to read. They both accomplish the same thing.
			</p>
		</div>
	</section>
</main>
