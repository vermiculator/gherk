// From: https://observablehq.com/@d3/donut-chart/2
// Wrapped in function for call from React.

import * as d3 from 'd3'
import { useEffect } from 'react'

const runD3donut = () => {
    d3.csv("http://localhost:5050/data-analysis").then(data => {
        const width = 500;
        const height = Math.min(width, 500);
        const radius = Math.min(width, height) / 2;

        // We are expecting two columns, VALUE being numerical (count, sum etc.):
        const INDEX = "Category"
        const VALUE = "Time Spent (s)"
    
        const arc = d3.arc()
            .innerRadius(radius * 0.67)
            .outerRadius(radius - 1);
    
        const pie = d3.pie()
            .padAngle(1 / radius)
            .sort(null)
            .value(d => d[VALUE]);
    
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d[INDEX]))
            .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());
    
        const svg = //d3.create("svg")
            d3.select("#my_dataviz").append("svg") // !!!
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto;");
    
        svg.append("g")
        .selectAll()
        .data(pie(data))
        .join("path")
            .attr("fill", d => color(d.data[INDEX]))
            .attr("d", arc)
        //.append("title")
        //    .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);
    
        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "middle")
        .selectAll()
        .data(pie(data))
        .join("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .call(text => text.append("tspan")
                .attr("y", "-0.4em")
                .attr("font-weight", "bold")
                .text(d => d.data[INDEX]))
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                .attr("x", 0)
                .attr("y", "0.7em")
                .attr("fill-opacity", 0.7)
                .text(d => d.data[VALUE].toLocaleString("en-US")));
    })
}

export default function D3DonutExample() {
    useEffect(() => {
        runD3donut()
    }, [])

    return (
        <div id="my_dataviz">
        </div>
    )
}
