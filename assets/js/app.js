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
    //I'll be using these two variables for my chart
    //+ inside of map converts string values to int
    var poverty = healthData.map(data => +data.poverty);
    var obesity = healthData.map(data => +data.obesity);

    //Print both variables to the Console
    console.log("Poverty", poverty);
    console.log("Obesity", obesity);

    //Create X and Y scale functions
    var xAxis = d3.scaleLinear()
                    .range([chartHeight,0])
                    .domain([0, d3.max(healthData, data => data.poverty)]);
    var yAxis = d3.scaleLinear()
                    .range([chartWidth,0])
                    .domain([0, d3.max(healthData, data => data.obesity)]);

    //Create axis functions
    var bottomAxis = d3.axisBottom(xAxis);
    var leftAxis = d3.axisLeft(yAxis);

    //Create the Scatter Plot
    var drawLine = d3
                    .line()
                    .x(data => xAxis(data.poverty))
                    .y(data => yAxis(data.obesity));

    //********STOPPING HERE*********/

      // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
  // The drawLine function returns the instructions for creating the line for milesData
  .attr("d", drawLine(healthData))
  .classed("line", true);

// Append an SVG group element to the SVG area, create the left axis inside of it
chartGroup.append("g")
  .classed("axis", true)
  .call(leftAxis);

// Append an SVG group element to the SVG area, create the bottom axis inside of it
// Translate the bottom axis to the bottom of the page
chartGroup.append("g")
  .classed("axis", true)
  .attr("transform", "translate(0, " + chartHeight + ")")
  .call(bottomAxis);
}).catch(function(error) {
console.log(error);

});
