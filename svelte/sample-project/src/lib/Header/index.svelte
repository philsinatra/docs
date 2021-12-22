<script type="ts">
	import { menu } from '../../stores'
	import { onDestroy, onMount } from 'svelte'

	let menuStatus
	const unsubscribe = menu.subscribe(value => (menuStatus = value))
	onDestroy(unsubscribe)

	function toggleMenu() {
		menuStatus = menuStatus === 'visible' ? 'hidden' : 'visible'
		$menu = menuStatus
	}

	// https://svelte.dev/repl/30667c29ab92487597f7e845578f263a?version=3.44.3
	let windowWidth
	function handleResize() {
		window.innerWidth >= 850 ? (menuStatus = 'visible') : (menuStatus = 'hidden')
		$menu = menuStatus
		windowWidth = window.innerWidth
	}

	onMount(() => handleResize())
</script>

<svelte:window on:resize={handleResize} />

<header>
	<div>logo here</div>
	<button hidden={windowWidth >= 850} on:click={toggleMenu}>
		<span class="visually-hidden">menu</span>
		{#if menuStatus === 'visible'}
			<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M17.25 6.75L6.75 17.25"
				/>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M6.75 6.75L17.25 17.25"
				/>
			</svg>
		{:else}
			<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M4.75 5.75H19.25"
				/>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M4.75 18.25H19.25"
				/>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M4.75 12H19.25"
				/>
			</svg>
		{/if}
	</button>
</header>

<style type="scss">
	header {
		--shadow-height: 0.5rem;
		--shadow-gradient: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.1) 0%,
			rgba(0, 0, 0, 0.05) 30%,
			transparent 100%
		);

		align-items: center;
		background-color: var(--color-header-background);
		display: flex;
		height: var(--nav-h);
		justify-content: space-between;
		padding: 0 1rem;
		position: relative;
		z-index: 2000;

		&::after {
			background: var(--shadow-gradient);
			bottom: calc(-1 * var(--shadow-height));
			content: '';
			height: var(--shadow-height);
			left: 0;
			position: absolute;
			width: 100%;
		}

		button {
			background: transparent;
			border: 0;
			color: var(--color-header-icon);
		}
	}
</style>
