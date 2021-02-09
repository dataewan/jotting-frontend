<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous">

</svelte:head>

<script context="module">
    import hljs from "highlight.js"
    import katex from "katex"
    import { selectedNote, server } from './../stores.js';
    export async function preload(page, session){

        let { notetitle } = page.params;

        notetitle = notetitle.replace(/.md$/, '')

        const res = await this.fetch(`${server}/api/files/${notetitle}/contents`)
        const note = await res.json();

        return {note}
    }
</script>  

<script>
    import { stores } from '@sapper/app';
    const { page } = stores();
    import {onMount} from 'svelte';
    import {changeImageSource} from '../images.js';
    import Notelinks from "./Notelinks.svelte"
    export let note;

    let sections;
    let linksPromise;

    const tidyPath = (path) => {
        if (!path){
            return ""
        }
        return path
            .replace(/.md$/, "")
            .replace(/^\.\//, "")
            .replace(/^\//, "")
    }

    $: $selectedNote = tidyPath($page.path)
    $: sections = note.sections

    async function getLinks(){
        const res = await fetch(`${server}/api/links`)
        return res.json()
    }

    onMount(() => {
        linksPromise = getLinks();

        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightBlock(block)
        })

        document.querySelectorAll("img").forEach(image => {
            changeImageSource(image, server)
        })
    
        var math = document.getElementsByClassName('math');
        for (var i = 0; i < math.length; i++) {
            const contents = math[i].textContent
                .replace("\\[", "")
                .replace("\\]", "")
                .replace("\\(", "")
                .replace("\\)", "")

            katex.render(contents, math[i]);
        }
    })
</script>


<style>
  ul{
    list-style: circle;
  }
</style>


<h1>
    {note.title}
</h1>

{#each sections as section}
<div>
    {@html section.sectionhtml}
</div>    
{/each}

{#await linksPromise}
<p>waiting</p>
{:then links}
<Notelinks {links} />
{:catch error}
<p style="color: red">{error.message}</p>
{/await}

<link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@10.4.1/styles/agate.min.css">
