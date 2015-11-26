nameApp.controller('TickerChartCntrl', ['$scope','analyticsService',function ($scope,analyticsService){

var start = moment().subtract(10, 'minutes').startOf('minute');
console.log(start);
$scope.startdate = moment(start).valueOf();
//$scope.startdate = (1420204173 + (86400*167))*1000;

//var startDate = 1420204150 + (86400*167);
//$scope.enddate = $scope.startdate + (300000);

var TickerDataPromise  = analyticsService.getTickerData($scope.startdate);
TickerDataPromise.then(function(response){

    data=response.data;
    totallength = data.length;
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

		//var trial = new Date('10/31/2015 03:30:00');
		//console.log(trial.setSeconds(trial.getSeconds() + 15));
		var t = 1446175800, // start time (seconds since epoch)
		    v = 70, // start value (subscribers)
		    //data = d3.range(20).map(next); // starting dataset
		  i=0;
		// function next() {
		//     return {
		//          // time: t=t+1500,
		//          time : trial.setSeconds(trial.getSeconds() + 15),
		//           value: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5))),
		//     };
		// }
		var i =0;
		//console.log(data);


		// data = [
  //           {time: 1446242430000,value: 69},
  //           {time: 1446242700000,value: 40},
		// 	{time: 1446242715000,value: 42}
  //              ];
		  
		var x = d3.time.scale()
		    .range([0, width]);

		var y = d3.scale.linear()
		    .range([height, 0]);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");
		    //.ticks(5);

		xAxis.ticks(d3.time.seconds, 30);

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left") 
		    .ticks(5);

		var chart = d3.select("#tickerchart").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

         
		  data.forEach(function(d) {
		      d._id = +d._id;
		      d.count = +d.count;
		  });

		  //x.domain(data.map(function(d) { return d._id; }));
		  x.domain([d3.min(data, function(d) { return d._id; }), d3.max(data, function(d) { return d._id; })]);
		  y.domain([0, d3.max(data, function(d) { return d.count; })]);

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
		     return "<strong>Total number of online users:</strong> <span style='color:red'>" + d.count +"</span>";
		 })

		  chart.call(tip1);
		  console.log(data);

		    chart.selectAll(".tickerbar")
		      .data(data)
		    .enter().append("rect")
		      .attr("class", "tickerbar")
		      //.attr("x", function(d) { return x(d._id); })
		      .attr("x", function(d,i) {return x(d._id) ; })
		      .attr("width", 2)
		      //.attr("y", function(d) { return y(d.vax(lu);e); })
		      .attr("y", function(d) { return y(d.count) ; })
		      .attr("height", function(d) { return height - y(d.count); })
		      .on('mouseover', tip1.show)
		      .on('mouseout', tip1.hide);

		      nextnumber = (data[totallength-1]._id + 15000);
		      console.log("this is next number");
               console.log(nextnumber);
		   setInterval(function(){

					         //$scope.startdate = $scope.startdate + 15000;
					        //$scope.enddate = $scope.enddate + 15000;
					        //console.log(nextnumber);
							var TickerDataPromise1  = analyticsService.getTickerData(nextnumber);
							TickerDataPromise1.then(function(response1){
					           
					          
					          data1 = response1.data;
					          //console.log(data);
					          data.shift();
					          // console.log("data1");
					          // console.log(data1);
					          //console.log(data1[17]);
					          
					          data.push(data1[0]);

							   redraw(data);
							   nextnumber = nextnumber + 15000;

					          })
		               },15010);

		     // }
		 // setInterval(function() {
		 //  data.shift();
		 //   data.push(next());
		 //   redraw();
		 //   i++;
		 // }, 15010);

		//  setInterval(function() {
  //       $scope.startdate = $scope.startdate + 15000;
  //       $scope.enddate = $scope.enddate + 15000;
		// var TickerDataPromise1  = analyticsService.getTickerData($scope.startdate,$scope.enddate);
		// TickerDataPromise1.then(function(response1){
           
  //          //data.shift();
  //         data = response.data;
  //         // console.log("data1");
  //         // console.log(data1);
  //         //console.log(data1[17]);
          
  //         //data.push(data1[17]);

		//    redraw(data);

  //         })
		//  }, 15010);



		  function redraw(data) {
		  	
		   //data.push(next());
		   console.log("redraw");
		   console.log(data);

		        data.forEach(function(d) {
                                d._id = +d._id;
                                d.count = +d.count;
                              });

		      x.domain([d3.min(data, function(d) { return d._id; }), d3.max(data, function(d) { return d._id; })]);
		      y.domain([0, d3.max(data, function(d) { return d.count; })]);



		    var rect = chart.selectAll(".tickerbar")
		        .data(data, function(d) { return d._id; });

		             //slide the x-axis left
		      xAxisOrg.transition()
		          .duration(15000)
		          .ease("linear")
		          .call(xAxis);


		    rect
		    .enter().append("rect")
		      .attr("class", "tickerbar")
		      .attr("x", function(d, i) {  console.log(d);console.log(d._id);return x(d._id + 15000);  })
		      //.attr("x", x(findlast(19)))
		      .attr("width", 2)
		      .attr("y", function(d) { return y(d.count) ; })
		      //.attr("y", function(d) { return 100; })
		      .attr("height", function(d) { return height - y(d.count); })
		      .on('mouseover', tip1.show)
		      .on('mouseout', tip1.hide)
		       .transition()
		        .duration(15000)
		        .ease("linear")
		        .attr("x", function(d, i) { return x(d._id) ; });


		      rect
		       .transition()
		       .duration(15000)
		       .ease("linear")
		       .attr("x", function(d, i) { return x(d._id) ; }); 


		       	   // set_idout(function(){
							     rect.exit()
							         .transition()
							         .duration(10)
							         .ease("linear")
							         .attr("x", function(d,i) {return x(0);})
							         .remove();
		               // },500);


		 }
	})

	}]);
