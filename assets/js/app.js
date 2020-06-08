// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Read CSV File
d3.csv("assets/data/data.csv").then(function(healthData) {
    //Print Complete Data to Console
    console.log(healthData);

    //Extract Poverty and Obesity data from full dataset. 
    //+ inside of map converts string values to int
    var poverty = healthData.map(data => +data.poverty);
    var obesity = healthData.map(data => +data.obesity);
    var abbrv = healthData.map(data => data.abbr);

    //Print both variables to the Console
    console.log("Poverty", poverty);
    console.log("Obesity", obesity);
    console.log("Abbreviations", abbrv);

    //Create X and Y scale functions
    var xAxis = d3.scaleLinear()
                    .range([0,chartWidth])
                    .domain([d3.min(poverty) - 5, d3.max(poverty)]);
    var yAxis = d3.scaleLinear()
                    .range([chartHeight,0])
                    .domain([d3.min(obesity) - 5, d3.max(obesity)]);

    //Create axis functions
    var bottomAxis = d3.axisBottom(xAxis);
    var leftAxis = d3.axisLeft(yAxis);


    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    //Create circles and lables for chart
    var circles = chartGroup.selectAll("circle")
                .data(healthData)
                .enter()
                .append("circle")
                .attr("cx", data => xAxis(data.poverty))
                .attr("cy", data => yAxis(data.obesity))
                .attr("r", "15")
                .attr("opacity", "0.95")
                .attr("class", "stateCircle");

     var circlesAbbrv = chartGroup.selectAll("circle").select('text')
                .data(healthData)
                .enter()
                .append("text")
                .attr("x", data => xAxis(data.poverty))
                .attr("y", data => yAxis(data.obesity))
                .attr("dx", 5)
                .attr("class", "stateText")
                .attr("text-anchor", "start")
                .text(data => data.abbr);

// Create axes labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x", 0 - (chartHeight / 2))
.attr("dy", "1em")
.classed("axis-text", true)
.text("Obesity %");

chartGroup.append("text")
.attr("transform", `translate(${chartWidth/ 2}, ${chartHeight + margin.top -20})`)
.classed("axis-text", true)
.text("Poverty %");

});
