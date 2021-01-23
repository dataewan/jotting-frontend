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
    export let notes;
</script>

<style>
    .selected{
        background-color: aquamarine;
    }
</style>


<ul>
    {#each notes as note}
        <li>
            <a class:selected="{$selectedNote === note.title}"href="{`${note.title}`}">{note.title}</a>
        </li>
    {/each}
</ul>
