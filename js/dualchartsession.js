var margin = {top: 30, right: 40, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale().range([0, width]);
var y0 = d3.scale.linear().range([height, 0]);
var y1 = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxisLeft = d3.svg.axis().scale(y0)
    .orient("left").ticks(5);

var yAxisRight = d3.svg.axis().scale(y1)
    .orient("right").ticks(5); 

var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y0(d.avgnumberofsessions); });
    
var valueline2 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y1(d.totnumberofsessions); });
  
var svg = d3.select("#dualchartsession")
    .append("svg")
        .attr("width", width + margin.left + margin.right + 10)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// // Get the data
// d3.csv("data2a.csv", function(error, data) {
//     data.forEach(function(d) {
//         d.date = parseDate(d.date);
//         d.avgnumberofsessions = +d.avgnumberofsessions;
//         d.totnumberofsessions = +d.totnumberofsessions;
//     });

//Get the data
data = [ {date:"1-Sep-15",totnumberofsessions:"628",avgnumberofsessions:"33"},
          {date:"9-Sep-15",totnumberofsessions:"530",avgnumberofsessions:"27"},
          {date:"13-Sep-15",totnumberofsessions:"456",avgnumberofsessions:"31"},
         {date:"18-Sep-15",totnumberofsessions:"312",avgnumberofsessions:"29"},
         {date:"19-Sep-15",totnumberofsessions:"567",avgnumberofsessions:"19"},
         {date:"25-Sep-15",totnumberofsessions:"413",avgnumberofsessions:"13"},
         {date:"30-Sep-15",totnumberofsessions:"300",avgnumberofsessions:"18"}


       ]

drawline(data);

function drawline(data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.avgnumberofsessions = +d.avgnumberofsessions;
        d.totnumberofsessions = +d.totnumberofsessions;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y0.domain([0, d3.max(data, function(d) {
        return Math.max(d.avgnumberofsessions); })]); 
    y1.domain([0, d3.max(data, function(d) { 
        return Math.max(d.totnumberofsessions); })]);

    svg.append("path")        // Add the valueline path. 
    .style("stroke", "steelblue")
    .style("fill", "none")
    .style("stroke-width", "2")
        .attr("d", valueline(data));

    svg.append("path")        // Add the valueline2 path.
        .style("stroke", "red")
        .style("fill", "none")
        .style("stroke-width", "2")
        .attr("d", valueline2(data));

    svg.append("g")            // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    var yAxisLeftG = svg.append("g")
        .attr("class", "y axis")
        .style("fill", "steelblue")
        .call(yAxisLeft);   

      var yAxisLeftLabelText = "Average number of sessions";
      var yAxisLeftLabelOffset = 30;

      var yAxisLeftLabel = yAxisLeftG.append("text")
        .style("text-anchor", "middle")
        .attr("transform", "translate(-" + yAxisLeftLabelOffset + "," + (height / 2) + ") rotate(-90)")
        .attr("class", "label")
        .text(yAxisLeftLabelText);

    var yAxisRightG = svg.append("g")             
                    .attr("class", "y axis")    
                    .attr("transform", "translate(" + width + " ,0)")   
                    .style("fill", "red")       
                    .call(yAxisRight);

      var yAxisRightLabelText = "Total number of sessions";
      var yAxisRightLabelOffset = 40;

      var yAxisRightLabel = yAxisRightG.append("text")
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + yAxisRightLabelOffset + "," + (height/2) + ") rotate(90)")
        .attr("class", "label")
        .text(yAxisRightLabelText);



};