<h1>
    LINKS
</h1>

<script context="module">
    import * as d3 from "d3";
    import { selectedNote, server } from './../stores.js';
    import {onMount} from 'svelte';

    export async function preload(page, session){
        const res = await this.fetch(`${server}/api/links`)
        const json = await res.json();

        return {json}
    }

    const width = 800;
    const height = 900;
</script>

<script>

    function extractLinks(json){
        const index = json.map(d => d.title)
        let links = []
        json.forEach(node => {
            if (node.links){
                node.links.forEach(link => {
                    if (link.linktype === "Markdown"){
                        const sourceStr = node.title
                        const targetStr = link.destination.replace(/.md$/, "").replace(/\.\//, "")
                        if (!index.includes(targetStr)){
                            console.log(targetStr)
                        } else {
                            links.push({
                                source: index.indexOf(sourceStr),
                                target: index.indexOf(targetStr)
                            })
                        }
                    }
                })
            }
        })
        return links
    }

    export let json
    export let nodeData
    export let linkData

    $: nodeData = json.map(d => {
        return {
            name: d.title
        }
    })

    $: linkData = extractLinks(json)


    onMount(() =>{
        const svg = d3.select('svg#links')
            .attr('width', width)
            .attr('height', height)
            .attr("viewBox", [-width / 2, -height / 2, width, height]);


        const simulation = d3.forceSimulation(nodeData)
            .force("link", d3.forceLink(linkData))
            .force("charge", d3.forceManyBody())
            .force("x", d3.forceX())
            .force("y", d3.forceY());

        const drag = simulation => {
        
            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }
            
            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }
            
            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }
            
            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }

        let links = svg
            .selectAll('path.link')
            .data(linkData)
            .enter()
            .append('path')
            .attr('stroke', 'black')
            .attr('fill', 'none');

        function handleMouseover(d, i){
            $selectedNote = d.target.__data__.name
            svg.selectAll("circle")
                .attr("fill", d => $selectedNote === d.name ? "aquamarine" : "grey")
        }

        let nodes = svg
            .selectAll("circle")
            .data(nodeData)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr('fill', d => $selectedNote === d.name ? "aquamarine" : "grey")
            .on("click", handleMouseover)
            .call(drag(simulation))


        const lineGenerator = d3.line();

        simulation.on('tick', () => {
            nodes.attr('cx', d => d.x);
            nodes.attr('cy', d => d.y);
            links.attr('d', d => lineGenerator([
                [d.source.x, d.source.y], 
                [d.target.x, d.target.y]])
            )
        });
    })
</script>

<style>
    div#flexcontainer{
        display: flex;
    }
    svg{
        flex: 1;
    }

    div#note{
        width: 300px;
    }
</style>

<div id="flexcontainer">
    <svg id="links">
    </svg>
    <div id="note">
        {$selectedNote}
    </div>    
</div>
