// @TODO: YOUR CODE HERE!

d3.csv("assets/data/data.csv").then(function(healthData) {

    console.log(healthData);

    var poverty = healthData.map(data => data.poverty);
    var obesity = healthData.map(data => data.obesity);
    console.log("Poverty", poverty);
    console.log("Obesity", obesity);
});