<script context="module">
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
