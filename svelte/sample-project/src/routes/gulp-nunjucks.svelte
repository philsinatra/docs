<script lang="ts">
	import Highlight from 'svelte-highlight'
	import nord from 'svelte-highlight/src/styles/nord'
	import javascript from 'svelte-highlight/src/languages/javascript'
	import shell from 'svelte-highlight/src/languages/shell'
	import plaintext from 'svelte-highlight/src/languages/plaintext'
</script>

<svelte:head>
	{@html nord}
</svelte:head>

<main>
	<h1 id="title-primary">Gulp Nunjucks</h1>
	<section aria-labelledby="title-primary">
		<div class="contain">
			<Highlight
				language={shell}
				langtag={true}
				code={`npm install gulp-nunjucks-render --save-dev`}
			/>
			<Highlight
				language={javascript}
				langtag={true}
				code={`const nunjucksRender = require('gulp-nunjucks-render')`}
			/>
			<p>Setup some type of project structure that allows easy use of Nunjucks.</p>
			<Highlight
				language={plaintext}
				langtag={true}
				code={`project/
  |- app/
      |- index.html and other .html files
      |- pages/
      |- templates/
          |- partials/`}
			/>
			<p>
				The <i>templates</i> folder is used for storing all Nunjucks partials and other Nunjucks files
				that will be added to files in the pages folder.
			</p>
			<p>
				The <i>pages</i> folder is used for storing files that will be compiled into HTML. Once they
				are compiled, they will be created in the app folder.
			</p>
			<p>
				One good thing about Nunjucks (that other template engines might not have) is that it allows
				you to create a template that contains boilerplate HTMl code which can be inherited by other
				pages. Let’s call this boilerplate HTML <code>layout.nunjucks</code>.
			</p>
			<p>
				Create a file called layout.nunjucks and place it in your templates folder. It should
				contain some boilerplate code like <code>&#60;html&#62;</code>, <code>&#60;head&#62;</code>
				and <code>&#60;body&#62;</code> tags. It can also contain things that are similar across all
				your pages, like links to CSS and JavaScript files.
			</p>
			<p>Example:</p>
		</div>
	</section>
	<!-- <section>
		<h2 />
		<div class="contain" />
	</section>
	<section>
		<h2 />
		<div class="contain" />
	</section> -->
	<section>
		<h2>References</h2>
		<div class="contain">
			<ul>
				<li>
					<a href="http://example.com" target="_blank" rel="noopener noreferrer">Example</a>
				</li>
			</ul>
		</div>
	</section>
</main>
