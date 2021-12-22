<script lang="ts">
	import Highlight from 'svelte-highlight'
	import nord from 'svelte-highlight/src/styles/nord'
	import css from 'svelte-highlight/src/languages/css'
	import typescript from 'svelte-highlight/src/languages/typescript'

	const code = `const add = (a: number, b: number) => a + b;
add(1, 2);`

	const cssCode = `body {
  margin: 0 auto;
  width: 400px;
}`
</script>

<svelte:head>
	{@html nord}
</svelte:head>

<main>
	<h1>Primary Title Documentation</h1>
	<section>
		<h2>Before we being</h2>
		<div class="contain">
			<Highlight language={typescript} langtag={true} {code} />
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore vero, eius accusantium eum
				sit nihil voluptas enim tempore, tenetur assumenda ullam dolorem architecto iusto velit?
			</p>
			<Highlight language={css} langtag={true} code={cssCode} />
			<p>
				Temporibus possimus <a href="http://google.com">ratione eum voluptas</a> veritatis magnam perferendis
				alias sequi natus, asperiores aliquid! Facere, voluptatum error sint assumenda minus nam eius
				incidunt rerum facilis maxime?
			</p>
			<Highlight
				language={css}
				langtag={true}
				code={`body {
  margin: 0 auto;
  width: 400px;
}`}
			/>
			<p>
				Laboriosam soluta ullam iure maxime nam quis voluptates facilis minus, rem aliquam numquam
				quod neque rerum cumque consequuntur! A dolore tempore amet totam ipsum rerum!
			</p>
		</div>
	</section>
	<section>
		<h2>Before we being</h2>
		<div class="contain">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore vero, eius accusantium eum
				sit nihil voluptas enim tempore, tenetur assumenda ullam dolorem architecto iusto velit?
			</p>
			<p>
				Temporibus possimus <a href="http://google.com">ratione eum voluptas</a> veritatis magnam perferendis
				alias sequi natus, asperiores aliquid! Facere, voluptatum error sint assumenda minus nam eius
				incidunt rerum facilis maxime?
			</p>
			<p>
				Laboriosam soluta ullam iure maxime nam quis voluptates facilis minus, rem aliquam numquam
				quod neque rerum cumque consequuntur! A dolore tempore amet totam ipsum rerum!
			</p>
		</div>
	</section>
	<section>
		<h2>Before we being</h2>
		<div class="contain">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore vero, eius accusantium eum
				sit nihil voluptas enim tempore, tenetur assumenda ullam dolorem architecto iusto velit?
			</p>
			<p>
				Temporibus possimus <a href="http://google.com">ratione eum voluptas</a> veritatis magnam perferendis
				alias sequi natus, asperiores aliquid! Facere, voluptatum error sint assumenda minus nam eius
				incidunt rerum facilis maxime?
			</p>
			<p>
				Laboriosam soluta ullam iure maxime nam quis voluptates facilis minus, rem aliquam numquam
				quod neque rerum cumque consequuntur! A dolore tempore amet totam ipsum rerum!
			</p>
		</div>
	</section>
	<section>
		<h2>Before we being</h2>
		<div class="contain">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore vero, eius accusantium eum
				sit nihil voluptas enim tempore, tenetur assumenda ullam dolorem architecto iusto velit?
			</p>
			<p>
				Temporibus possimus <a href="http://google.com">ratione eum voluptas</a> veritatis magnam perferendis
				alias sequi natus, asperiores aliquid! Facere, voluptatum error sint assumenda minus nam eius
				incidunt rerum facilis maxime?
			</p>
			<p>
				Laboriosam soluta ullam iure maxime nam quis voluptates facilis minus, rem aliquam numquam
				quod neque rerum cumque consequuntur! A dolore tempore amet totam ipsum rerum!
			</p>
		</div>
	</section>
	<section>
		<h2>Before we being</h2>
		<div class="contain">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore vero, eius accusantium eum
				sit nihil voluptas enim tempore, tenetur assumenda ullam dolorem architecto iusto velit?
			</p>
			<p>
				Temporibus possimus <a href="http://google.com">ratione eum voluptas</a> veritatis magnam perferendis
				alias sequi natus, asperiores aliquid! Facere, voluptatum error sint assumenda minus nam eius
				incidunt rerum facilis maxime?
			</p>
			<p>
				Laboriosam soluta ullam iure maxime nam quis voluptates facilis minus, rem aliquam numquam
				quod neque rerum cumque consequuntur! A dolore tempore amet totam ipsum rerum!
			</p>
		</div>
	</section>
	<section>
		<h2>Before we being</h2>
		<div class="contain">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore vero, eius accusantium eum
				sit nihil voluptas enim tempore, tenetur assumenda ullam dolorem architecto iusto velit?
			</p>
			<p>
				Temporibus possimus <a href="http://google.com">ratione eum voluptas</a> veritatis magnam perferendis
				alias sequi natus, asperiores aliquid! Facere, voluptatum error sint assumenda minus nam eius
				incidunt rerum facilis maxime?
			</p>
			<p>
				Laboriosam soluta ullam iure maxime nam quis voluptates facilis minus, rem aliquam numquam
				quod neque rerum cumque consequuntur! A dolore tempore amet totam ipsum rerum!
			</p>
		</div>
	</section>
</main>
