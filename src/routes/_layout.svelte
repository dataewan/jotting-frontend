<script>
	import Nav from './../components/Nav.svelte';
	export let segment;
	import Prism from 'prismjs';
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
		margin-top: 30px;
	}
</style>


̧<Nav {segment}/>

<main>
	<slot></slot>
</main>