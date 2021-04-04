<svelte:head>
  <title>Notes</title>
</svelte:head>

<script context="module">
	import { selectedNote } from './../stores.js';
    export async function preload(page, session){
        const res = await this.fetch(`http://localhost:8080/api/files`)
        const json = await res.json()
        const notes = Object.values(json)
        return {notes}
    }
</script>

<script>
    const startsNumeric = d => {
      if (d.match){
        return d.match(/^\d+/)
      }
    }
  
    function compare(a, b){
      if (startsNumeric(a.title) && startsNumeric(b.title)){
        return b.title > a.title ? 1 : -1
      }
      return b.title < a.title ? 1 : -1
    }
    export let notes;
    notes = notes.sort(compare)
</script>

<style>
    .selected{
        background-color: coral;
    }

    ul{
        list-style: none;
    }
</style>


<ul>
    {#each notes as note}
        <li>
            <a class:selected="{$selectedNote === note.title}"href="{`${note.title}`}">{note.title}</a>
        </li>
    {/each}
</ul>
