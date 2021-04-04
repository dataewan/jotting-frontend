<script>
    import {onMount} from 'svelte';
    import { selectedNote } from './../stores.js';
    export let links;
    let withLinks = getWithLinks()
    let backlinks = getBacklinks()
    let outlinks = getOutlinks()

    $: {
      $selectedNote
      withLinks = getWithLinks()
      backlinks = getBacklinks()
      outlinks = getOutlinks()
    }

    function getWithLinks(){
        if (!links){
            return
        }
        const val = links.filter(d => d.links)
            .map(d => d.links.map(link => {
                return {
                    source: d.title,
                    target: link,
                }
            }))
            .flat()

        return val
    }

    function getBacklinks(){
        if (!withLinks){
            return
        }

        const val = withLinks
            .filter(d => d.target.linktype === "Markdown")
            .map(d => {
                return {
                    source: d.source,
                    target: d.target.destination
                        .replace(/.md$/, "")
                        .replace(/^\.\//, "")
                }
            })
            .filter(d => d.target === $selectedNote)
        return val

    }

    function getOutlinks(){
        if (!withLinks){
            return
        }
        return withLinks
            .filter(d => d.source === $selectedNote)
    }
</script>

<style>
    div#referencescontainer{
        display: flex;
    }

    div#backlinks{
        width: 400px;
    }

    a{
        display: block;
        font-size: 0.75em;
        font-weight: 200;
    }

    a:hover{
        background-color: coral;
    }

    a.Markdown:before{
        content: "Ⓜ"
    }

    a.Wikipedia:before{
        content: "Ⓦ"
    }

    a.External:before{
        content: "ⓔ"
    }

    div#outlinks{
        width: 400px;
    }
</style>


<hr />
<h3>References</h3>
<div id="referencescontainer">
    {#if backlinks}
        <div id="backlinks">
            <h4>Referenced by</h4>
                {#each backlinks as backlink}
                    <a href={`${backlink.source}`}>{backlink.source}</a>
                {/each}
        </div>
    {/if}
    {#if outlinks}
        <div id="outlinks">
            <h4>References</h4>
            {#each outlinks as outlink}
                <a href={outlink.target.destination} class={outlink.target.linktype}>{outlink.target.text}</a>
            {/each}    
        </div>
    {/if}
</div>
