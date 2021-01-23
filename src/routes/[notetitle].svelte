<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous">

</svelte:head>

<script context="module">
    import hljs from "highlight.js"
    import katex from "katex"
	import { selectedNote } from './../stores.js';
    export async function preload(page, session){

        let { notetitle } = page.params;

        notetitle = notetitle.replace(/.md$/, '')

        const res = await this.fetch(`http://localhost:8080/api/files/${notetitle}/contents`)
        const note = await res.json();

        return {note}
    }
</script>  

<script>
    import {onMount} from 'svelte';
    export let note;
    let sections;
    $: sections = note.sections

    onMount( () => {
        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightBlock(block)
            console.log(block)

        })
    
        var math = document.getElementsByClassName('math');
        for (var i = 0; i < math.length; i++) {
            const contents = math[i].textContent
                .replace("\\[", "")
                .replace("\\]", "")
            //console.log(contents)
            katex.render(contents, math[i]);
        }

        $selectedNote = note.title
    })
</script>


<h1>
    {note.title}
</h1>

{#each sections as section}
<div>
    {@html section.sectionhtml}
</div>    
{/each}

<link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@10.4.1/styles/agate.min.css">
