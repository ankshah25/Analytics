nameApp.controller('TickerChartCntrl', ['$scope','analyticsService',function ($scope,analyticsService){

	var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

		var trial = new Date('10/31/2015 03:30:00');
		var t = 1446175800, // start time (seconds since epoch)
		    v = 70, // start value (subscribers)
		    data = d3.range(30).map(next); // starting dataset
		  
		function next() {
		    return {
		         // time: t=t+1500,
		         time : trial.setSeconds(trial.getSeconds() + 15),
		          value: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
		    };
		}
		var i =0;
		console.log(data);

		  
		var x = d3.time.scale()
		    .range([0, width]);

		var y = d3.scale.linear()
		    .range([height, 0]);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");
		    //.ticks(5);

		xAxis.ticks(d3.time.seconds, 15);

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left") 
		    .ticks(10);

		var chart = d3.select("#tickerchart").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		  data.forEach(function(d) {
		      d.time = +d.time;
		      d.value = +d.value;
		  });

		  //x.domain(data.map(function(d) { return d.time; }));
		  x.domain([d3.min(data, function(d) { return d.time; }), d3.max(data, function(d) { return d.time; })]);
		  y.domain([0, d3.max(data, function(d) { return d.value; })]);

		  var xAxisOrg = chart.append("g")
		                .attr("class", "x axisticker")
		                .attr("transform", "translate(0," + height + ")")
		                .call(xAxis);

		  chart.append("g")
		      .attr("class", "y axisticker")
		      .call(yAxis)
		      .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Users");


		   var tip1 = d3.tip()
		     .attr('class', 'd3-tip')
		     .offset([-10, 0])
		     .html(function (d) {
		     return "<strong>Total number of online users:</strong> <span style='color:red'>" + d.value +"</span>";
		 })

		  chart.call(tip1);

		    chart.selectAll(".tickerbar")
		      .data(data)
		    .enter().append("rect")
		      .attr("class", "tickerbar")
		      //.attr("x", function(d) { return x(d.time); })
		      .attr("x", function(d,i) {return x(d.time); })
		      .attr("width", 10)
		      //.attr("y", function(d) { return y(d.value); })
		      .attr("y", function(d) { return y(d.value); })
		      .attr("height", function(d) { return height - y(d.value); })
		      .on('mouseover', tip1.show)
		      .on('mouseout', tip1.hide);

		  data.shift();
		   data.push(next());
		      redraw();
		     // }
		 setInterval(function() {
		  data.shift();
		   data.push(next());
		   redraw();
		   i++;
		 }, 15010);

		  function redraw() {
		  	
		   //data.push(next());

		      x.domain([d3.min(data, function(d) { return d.time; }), d3.max(data, function(d) { return d.time; })]);
		      y.domain([0, d3.max(data, function(d) { return d.value; })]);

		        data.forEach(function(d) {
		                                    d.time = +d.time;
		                                    d.value = +d.value;
		                                  });

		    var rect = chart.selectAll(".tickerbar")
		        .data(data, function(d) { return d.time; });

		             //slide the x-axis left
		      xAxisOrg.transition()
		          .duration(15000)
		          .ease("linear")
		          .call(xAxis);


		    rect
		    .enter().append("rect")
		      .attr("class", "tickerbar")
		      .attr("x", function(d, i) { return x(d.time + 15000); })
		      .attr("width", 10)
		      .attr("y", function(d) { return y(d.value); })
		      //.attr("y", function(d) { return 100; })
		      .attr("height", function(d) { return height - y(d.value); })
		      .on('mouseover', tip1.show)
		      .on('mouseout', tip1.hide)
		       .transition()
		        .duration(15000)
		        .ease("linear")
		        .attr("x", function(d, i) { return x(d.time); });




		      rect
		       .transition()
		       .duration(15000)
		       .ease("linear")
		       .attr("x", function(d, i) { return x(d.time); }); 

		     rect.exit()
		         .transition()
		         .duration(15000)
		         .ease("linear")
		         .attr("x", function(d, i) {return x(i - 1);})
		         .remove();
		 }

	}]);
