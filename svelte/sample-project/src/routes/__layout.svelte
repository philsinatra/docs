<script type="ts">
	import Header from '$lib/Header/index.svelte'
	import Nav from '$lib/Nav/index.svelte'
</script>

<Header />
<div class="wrapper">
	<slot />
</div>
<Nav />

<style global>
	@import 'normalize.css';
	@import '../app.css';
</style>
