<script>
	import { selectedNote } from './../stores.js';
    export let segment;
    let isnote;

    $: {
        if (segment){
            isnote = segment.replace(/.md$/, "") === $selectedNote
        } else {
            isnote = false
        }
    }
</script>

<style>
    nav {
        border-bottom: 1px solid coral;
        background-color: rgb(249, 254, 255);
		font-weight: 300;
        position: fixed;
        top: 0 ;
        overflow: hidden;
        z-index: 100;
        right: 0px;
        left: 0px;
    }
    
	ul {
		margin: 0;
		padding: 0;
	}
  
	ul::after {
		content: '';
		display: block;
		clear: both;
    }
    
    li{
        display:block;
        float:left;
    }

    [aria-current] {
		position: relative;
		display: inline-block;
	}
	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 5px;
		background-color: coral;
		display: block;
		bottom: -1px;
	}
	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
<ul>
    <li><a aria-current="{segment === undefined ? 'page' : undefined}" href="." >List</a></li>
    <li><a aria-current="{isnote ? 'page' : undefined}" href="./{$selectedNote}">View</a></li>
    <li><a aria-current="{segment === "links" ? "page" : undefined}" href="./links">Links</a></li>
</ul>
</nav>
