nameApp.controller('DualChartSessionandTimeCtrl', ['$scope','analyticsService',function ($scope,analyticsService){


    $(function() {
          $('#reportrange').daterangepicker({
              ranges: {
                "Last 365 Days": [moment().subtract(365, 'days'), moment()],
                 "Last 30 Days": [moment().subtract(29, 'days'), moment()],
                 "Last 7 Days": [moment().subtract(6, 'days'), moment()],                
                 "Today": [moment(), moment()],
                 "Yesterday": [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                 "This Month": [moment().startOf('month'), moment().endOf('month')],
                 "Last Month": [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
              }
          }, cb);

          cb(moment().subtract(365, 'days'), moment(),"Last 365 Days");

          function cb(start, end, freq) {

              $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
              $scope.startdate=start;
              $scope.enddate=end;
              $scope.selectedfrequency=freq;

              if(!$scope.$$phase) {
                $scope.$apply(function() {
                  
                    $scope.setDates($scope.startdate,$scope.enddate,$scope.selectedfrequency);
                    //$scope.updatesessionchart();
                    //$scope.updatetimechart();
                    $scope.updateuserchart();
                });
              }
          }


      });


    //$scope.selectedfrequency ="Last 30 Days";
    // $scope.startdate="";
    // $scope.enddate="";
    $scope.alreadysessionloaded=false;
     $scope.alreadytimeloaded=false;
     $scope.alreadyuserchartloaded=false;


    $scope.init = function(){
                  if(!$scope.$$phase) {
                      $scope.$apply(function() {
                          
                          $scope.setDates($scope.startdate,$scope.enddate,$scope.selectedfrequency);
                          //$scope.updatesessionchart();
                          //$scope.updatetimechart();
                          $scope.updateuserchart();
                      });
                }
                else
                {
                          $scope.setDates($scope.startdate,$scope.enddate,$scope.selectedfrequency);
                          //$scope.updatesessionchart();
                          //$scope.updatetimechart();    
                           $scope.updateuserchart();           

                }
    };

    $scope.setDates = function(start,end,freq){
            $scope.startdate=start;
            $scope.enddate=end;
            $scope.selectedfrequency=freq;
 
    };

    $scope.updatesessionchart = function(){

//Get the data

data = analyticsService.getUserSessionData($scope.startdate,$scope.enddate,$scope.selectedfrequency);


  var margin = {top: 30, right: 40, bottom: 30, left: 50},
  width = 950 - margin.left - margin.right,
  height = 270 - margin.top - margin.bottom;
  var parseDate = d3.time.format("%d-%b-%Y %H:%M").parse;

  var parseYear = d3.time.format("%b-%Y").parse;


  var x = d3.time.scale().range([0, width]);
  var y0 = d3.scale.linear().range([height, 0]);
  var y1 = d3.scale.linear().range([height, 0]);

  var valueline1 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y0(d.totnumberofsessions); });
      

  var valueline2 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y1(d.avgnumberofsessions); });

  var xAxis = d3.svg.axis().scale(x)
      .orient("bottom");

if(($scope.selectedfrequency == "Last 7 Days") 
     || ($scope.selectedfrequency == "Last 30 Days")
     || ($scope.selectedfrequency == "This Month")
     || ($scope.selectedfrequency == "Last Month"))
{
      xAxis.ticks(d3.time.days, 1)
      .tickFormat(d3.time.format("%d %b"));
}

if(($scope.selectedfrequency == "Today") || ($scope.selectedfrequency == "Yesterday"))
{
      xAxis.ticks(d3.time.hours, 1)
      .tickFormat(d3.time.format("%H:%M"));
}
if($scope.selectedfrequency == "Last 365 Days")
{
      xAxis.ticks(d3.time.months, 1)
      .tickFormat(d3.time.format("%b"));
}

  var yAxisLeft = d3.svg.axis().scale(y0)
      .orient("left").ticks(5)
      .innerTickSize(-width)
      .outerTickSize(0);

  var yAxisRight = d3.svg.axis().scale(y1)
      .orient("right").ticks(5)
      .innerTickSize(-width)
      .outerTickSize(0); 

//drawline(data);
if($scope.selectedfrequency == "Last 365 Days")
{
  data.forEach(function(d) {
      d.date = parseYear(d.date);
      d.totnumberofsessions = +d.totnumberofsessions;
      d.avgnumberofsessions = +d.avgnumberofsessions;
  });
}
else
{
  data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.totnumberofsessions = +d.totnumberofsessions;
      d.avgnumberofsessions = +d.avgnumberofsessions;
  });
}

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y0.domain([0, d3.max(data, function(d) { 
      return Math.max(d.totnumberofsessions); })]);  
  y1.domain([0, d3.max(data, function(d) {
      return Math.max(d.avgnumberofsessions); })]); 



 var svg = d3.select("#dualchartsession");

   var tip1 = d3.tip()
     .attr('class', 'd3-tip')
     .offset([-10, 0])
     .html(function (d) {
     return "<strong>Total Number of Sessions:</strong> <span style='color:red'>" + d.totnumberofsessions +"</span>";
 })

  var tip2 = d3.tip()
       .attr('class', 'd3-tip')
       .offset([-10, 0])
       .html(function (d) {
       return "<strong>Avg Number of Sessions:</strong> <span style='color:red'>" + d.avgnumberofsessions +"</span>";
   })


if($scope.alreadysessionloaded==false)
{
    
      svg = d3.select("#dualchartsession")
          .append("svg")
              .attr("width", width + margin.left + margin.right + 10)
              .attr("height", height + margin.top + margin.bottom + 30)
          .append("g")
              .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");

      svg.call(tip1);
      svg.call(tip2);

      var xAxisOrig = svg.append("g")            // Add the X Axis
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis);

       xAxisOrig.selectAll("text")  // select all the text elements for the xaxis
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", function(d) {
              return "rotate(-90)";
        });

      var yAxisLeftG = svg.append("g")
          .attr("class", "y axis axisLeft")
          .style("fill", "steelblue")
          .call(yAxisLeft);   

        var yAxisLeftLabelText = "Total number of sessions";
        var yAxisLeftLabelOffset = 40;

        var yAxisLeftLabel = yAxisLeftG.append("text")
          .style("text-anchor", "middle")
          .attr("transform", "translate(-" + yAxisLeftLabelOffset + "," + (height / 2) + ") rotate(-90)")
          .attr("class", "label")
          .text(yAxisLeftLabelText);

      var yAxisRightG = svg.append("g")             
                      .attr("class", "y axis axisRight")    
                      .attr("transform", "translate(" + width + " ,0)") 
                      .style("fill", "red")       
                      .call(yAxisRight);

        var yAxisRightLabelText = "Average number of sessions";
        var yAxisRightLabelOffset = 40;

        var yAxisRightLabel = yAxisRightG.append("text")
          .style("text-anchor", "middle")
          .attr("transform", "translate(" + yAxisRightLabelOffset + "," + (height/2) + ") rotate(90)")
          .attr("class", "label")
          .text(yAxisRightLabelText);

      svg.append("path")        // Add the valueline path. 
      .style("stroke", "steelblue")
      .style("fill", "none")
      .style("stroke-width", "2")
          .attr("d", valueline1(data))
          .attr("class","line1");

      svg.append("path")        // Add the valueline2 path.
          .style("stroke", "red")
          .style("fill", "none")
          .style("stroke-width", "2")
          .attr("d", valueline2(data))
          .attr("class","line2");

      var bluecircles = svg.selectAll(".data-point1").data(data);

      bluecircles.enter()
             .append("svg:circle")
             .attr("class", 'data-point1');


      bluecircles
      .attr("cx", function (d, i) {
             return x(d.date);
         })
      .attr("cy", function (d, i) {
             return y0(d.totnumberofsessions);
         })
      .attr("r", 3)
      .on('mouseover', tip1.show)
      .on('mouseout', tip1.hide);

      bluecircles
      .exit()
      .transition()
      .attr('r', 0)
      .remove();

      var redcircles = svg.selectAll(".data-point2").data(data);

      redcircles.enter()
             .append("svg:circle")
             .attr("class", 'data-point2');


      redcircles
      .attr("cx", function (d, i) {
             return x(d.date);
         })
      .attr("cy", function (d, i) {
             return y1(d.avgnumberofsessions);
         })
      .attr("r", 3)
      .on('mouseover', tip2.show)
      .on('mouseout', tip2.hide);

      redcircles
      .exit()
      .transition()
      .attr('r', 0)
      .remove();

      //updatecircle(data);

      $scope.alreadysessionloaded = true;
    }
    else
    {


    // Select the section we want to apply our changes to
    var svg = d3.select("#dualchartsession").transition();

      var tip3 = d3.tip()
       .attr('class', 'd3-tip')
       .offset([-10, 0])
       .html(function (d) {
       return "<strong>Total Number of Sessions:</strong> <span style='color:red'>" + d.totnumberofsessions +"</span>";
   })

    var tip4 = d3.tip()
         .attr('class', 'd3-tip')
         .offset([-10, 0])
         .html(function (d) {
         return "<strong>Avg Number of Sessions:</strong> <span style='color:red'>" + d.avgnumberofsessions +"</span>";
     })
    

    //svg.call(tip);
    // Make the changes
        svg.select(".line1")   // change the line
            .duration(750)
            .attr("d", valueline1(data));
        svg.select(".line2")   // change the line
            .duration(750)
            .attr("d", valueline2(data));
        var xAxisOrig = svg.select(".x.axis") // change the x axis
                        .duration(750)
                        .call(xAxis);

        xAxisOrig.selectAll("text")  // select all the text elements for the xaxis
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-90)";
          });


        svg.select(".y.axis.axisLeft") // change the y axis
            .duration(750)
            .call(yAxisLeft);
        svg.select(".y.axis.axisRight") // change the y axis
            .duration(750)
            .call(yAxisRight);

      var svg = d3.select("#dualchartsession").select("svg").select("g");

      svg.call(tip3);
      svg.call(tip4);
      // svg.call(tip);
                //Attach the data to the graph
      var bluecircles = svg.selectAll(".data-point1").data(data);

      bluecircles.enter()
             .append("svg:circle").attr("class", 'data-point1');


      bluecircles
      .attr("cx", function (d, i) {
             return x(d.date);
         })
      .attr("cy", function (d, i) {
             return y0(d.totnumberofsessions);
         })
      .attr("r", 3)
      .on('mouseover', tip3.show)
      .on('mouseout', tip3.hide);

      bluecircles
      .exit()
      .transition()
      .attr('r', 0)
      .remove();


      var redcircles = svg.selectAll(".data-point2").data(data);

      redcircles.enter()
             .append("svg:circle")
             .attr("class", 'data-point2');


      redcircles
      .attr("cx", function (d, i) {
             return x(d.date);
         })
      .attr("cy", function (d, i) {
             return y1(d.avgnumberofsessions);
         })
      .attr("r", 3)
      .on('mouseover', tip4.show)
      .on('mouseout', tip4.hide);

      redcircles
      .exit()
      .transition()
      .attr('r', 0)
      .remove();

    }

  };

   $scope.updatetimechart = function()
   {

//Get the data

data = analyticsService.getUserTimeSpentData($scope.startdate,$scope.enddate,$scope.selectedfrequency );


  var margin = {top: 30, right: 40, bottom: 30, left: 50},
  width = 950 - margin.left - margin.right,
  height = 270 - margin.top - margin.bottom;
  var parseDate = d3.time.format("%d-%b-%Y %H:%M").parse;

  var parseYear = d3.time.format("%b-%Y").parse;


  var x = d3.time.scale().range([0, width]);
  var y0 = d3.scale.linear().range([height, 0]);
  var y1 = d3.scale.linear().range([height, 0]);

  var valueline1 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y0(d.tottimespent); });
      

  var valueline2 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y1(d.avgtimespent); });

  var xAxis = d3.svg.axis().scale(x)
      .orient("bottom");

if(($scope.selectedfrequency == "Last 7 Days") 
     || ($scope.selectedfrequency == "Last 30 Days")
     || ($scope.selectedfrequency == "This Month")
     || ($scope.selectedfrequency == "Last Month"))
{
      xAxis.ticks(d3.time.days, 1)
      .tickFormat(d3.time.format("%d %b"));
}

if(($scope.selectedfrequency == "Today") || ($scope.selectedfrequency == "Yesterday"))
{
      xAxis.ticks(d3.time.hours, 1)
      .tickFormat(d3.time.format("%H:%M"));
}
if($scope.selectedfrequency == "Last 365 Days")
{
      xAxis.ticks(d3.time.months, 1)
      .tickFormat(d3.time.format("%b"));
}

  var yAxisLeft = d3.svg.axis().scale(y0)
      .orient("left").ticks(5)
      .innerTickSize(-width)
      .outerTickSize(0);

  var yAxisRight = d3.svg.axis().scale(y1)
      .orient("right").ticks(5)
      .innerTickSize(-width)
      .outerTickSize(0); 

//drawline(data);
if($scope.selectedfrequency == "Last 365 Days")
{
  data.forEach(function(d) {
      d.date = parseYear(d.date);
      d.tottimespent = +d.tottimespent;
      d.avgtimespent = +d.avgtimespent;
  });
}
else
{
  data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.tottimespent = +d.tottimespent;
      d.avgtimespent = +d.avgtimespent;
  });
}

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y0.domain([0, d3.max(data, function(d) { 
      return Math.max(d.tottimespent); })]);  
  y1.domain([0, d3.max(data, function(d) {
      return Math.max(d.avgtimespent); })]); 



 var svg = d3.select("#dualcharttime");

   var tip1 = d3.tip()
     .attr('class', 'd3-tip')
     .offset([-10, 0])
     .html(function (d) {
     return "<strong>Total Time Spent:</strong> <span style='color:red'>" + d.tottimespent +"</span>";
 })

  var tip2 = d3.tip()
       .attr('class', 'd3-tip')
       .offset([-10, 0])
       .html(function (d) {
       return "<strong>Avg Time Spent:</strong> <span style='color:red'>" + d.avgtimespent +"</span>";
   })




if($scope.alreadytimeloaded==false)
{
    
      svg = d3.select("#dualcharttime")
          .append("svg")
              .attr("width", width + margin.left + margin.right + 10)
              .attr("height", height + margin.top + margin.bottom + 30)
          .append("g")
              .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");

      svg.call(tip1);
      svg.call(tip2);

      var xAxisOrig = svg.append("g")            // Add the X Axis
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis);

       xAxisOrig.selectAll("text")  // select all the text elements for the xaxis
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", function(d) {
              return "rotate(-90)";
        });

      var yAxisLeftG = svg.append("g")
          .attr("class", "y axis axisLeft")
          .style("fill", "steelblue")
          .call(yAxisLeft);   

        var yAxisLeftLabelText = "Total Time Spent";
        var yAxisLeftLabelOffset = 40;

        var yAxisLeftLabel = yAxisLeftG.append("text")
          .style("text-anchor", "middle")
          .attr("transform", "translate(-" + yAxisLeftLabelOffset + "," + (height / 2) + ") rotate(-90)")
          .attr("class", "label")
          .text(yAxisLeftLabelText);

      var yAxisRightG = svg.append("g")             
                      .attr("class", "y axis axisRight")    
                      .attr("transform", "translate(" + width + " ,0)") 
                      .style("fill", "red")       
                      .call(yAxisRight);

        var yAxisRightLabelText = "Average Time spent";
        var yAxisRightLabelOffset = 40;

        var yAxisRightLabel = yAxisRightG.append("text")
          .style("text-anchor", "middle")
          .attr("transform", "translate(" + yAxisRightLabelOffset + "," + (height/2) + ") rotate(90)")
          .attr("class", "label")
          .text(yAxisRightLabelText);

      svg.append("path")        // Add the valueline path. 
      .style("stroke", "steelblue")
      .style("fill", "none")
      .style("stroke-width", "2")
          .attr("d", valueline1(data))
          .attr("class","line1");

      svg.append("path")        // Add the valueline2 path.
          .style("stroke", "red")
          .style("fill", "none")
          .style("stroke-width", "2")
          .attr("d", valueline2(data))
          .attr("class","line2");

      var bluecircles = svg.selectAll(".data-point1").data(data);

      bluecircles.enter()
             .append("svg:circle")
             .attr("class", 'data-point1');


      bluecircles
      .attr("cx", function (d, i) {
             return x(d.date);
         })
      .attr("cy", function (d, i) {
             return y0(d.tottimespent);
         })
      .attr("r", 3)
      .on('mouseover', tip1.show)
      .on('mouseout', tip1.hide);

      bluecircles
      .exit()
      .transition()
      .attr('r', 0)
      .remove();

      var redcircles = svg.selectAll(".data-point2").data(data);

      redcircles.enter()
             .append("svg:circle")
             .attr("class", 'data-point2');


      redcircles
      .attr("cx", function (d, i) {
             return x(d.date);
         })
      .attr("cy", function (d, i) {
             return y1(d.avgtimespent);
         })
      .attr("r", 3)
      .on('mouseover', tip2.show)
      .on('mouseout', tip2.hide);

      redcircles
      .exit()
      .transition()
      .attr('r', 0)
      .remove();

      //updatecircle(data);

      $scope.alreadytimeloaded = true;
    }
    else
    {


    // Select the section we want to apply our changes to
    var svg = d3.select("#dualcharttime").transition();

      var tip3 = d3.tip()
       .attr('class', 'd3-tip')
       .offset([-10, 0])
       .html(function (d) {
       return "<strong>Total Time Spent:</strong> <span style='color:red'>" + d.tottimespent +"</span>";
   })

    var tip4 = d3.tip()
         .attr('class', 'd3-tip')
         .offset([-10, 0])
         .html(function (d) {
         return "<strong>Avg Time Spent:</strong> <span style='color:red'>" + d.avgtimespent +"</span>";
     })
    

    //svg.call(tip);
    // Make the changes
        svg.select(".line1")   // change the line
            .duration(750)
            .attr("d", valueline1(data));
        svg.select(".line2")   // change the line
            .duration(750)
            .attr("d", valueline2(data));
        var xAxisOrig = svg.select(".x.axis") // change the x axis
                        .duration(750)
                        .call(xAxis);

        xAxisOrig.selectAll("text")  // select all the text elements for the xaxis
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-90)";
          });


        svg.select(".y.axis.axisLeft") // change the y axis
            .duration(750)
            .call(yAxisLeft);
        svg.select(".y.axis.axisRight") // change the y axis
            .duration(750)
            .call(yAxisRight);

      var svg = d3.select("#dualcharttime").select("svg").select("g");

      svg.call(tip3);
      svg.call(tip4);
      // svg.call(tip);
                //Attach the data to the graph
      var bluecircles = svg.selectAll(".data-point1").data(data);

      bluecircles.enter()
             .append("svg:circle").attr("class", 'data-point1');


      bluecircles
      .attr("cx", function (d, i) {
             return x(d.date);
         })
      .attr("cy", function (d, i) {
             return y0(d.tottimespent);
         })
      .attr("r", 3)
      .on('mouseover', tip3.show)
      .on('mouseout', tip3.hide);

      bluecircles
      .exit()
      .transition()
      .attr('r', 0)
      .remove();


      var redcircles = svg.selectAll(".data-point2").data(data);

      redcircles.enter()
             .append("svg:circle")
             .attr("class", 'data-point2');


      redcircles
      .attr("cx", function (d, i) {
             return x(d.date);
         })
      .attr("cy", function (d, i) {
             return y1(d.avgtimespent);
         })
      .attr("r", 3)
      .on('mouseover', tip4.show)
      .on('mouseout', tip4.hide);

      redcircles
      .exit()
      .transition()
      .attr('r', 0)
      .remove();

    }

  };

   $scope.updateuserchart = function()
   {

//Get the data
console.log($scope.selectedfrequency);
data = analyticsService.getUserCountData($scope.startdate,$scope.enddate,$scope.selectedfrequency);
console.log("function called");
console.log(data);
  var margin = {top: 30, right: 40, bottom: 30, left: 60},
  width = 950 - margin.left - margin.right,
  height = 270 - margin.top - margin.bottom;
  var parseDate = d3.time.format("%d-%b-%Y %H:%M").parse;

  var parseYear = d3.time.format("%b-%Y").parse;


  var x = d3.time.scale().range([0, width]);
  //var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
  var y0 = d3.scale.linear().range([height, 0]);
  var y1 = d3.scale.linear().range([height, 0]);

  // var valueline1 = d3.svg.line()
  //     .x(function(d) { return x(d.date); })
  //     .y(function(d) { return y0(d.totnumofnewusers); });
      

  // var valueline2 = d3.svg.line()
  //     .x(function(d) { return x(d.date); })
  //     .y(function(d) { return y1(d.totnumofretusers); });

  var xAxis = d3.svg.axis().scale(x)
      .orient("bottom");

if(($scope.selectedfrequency == "Last 7 Days") 
     || ($scope.selectedfrequency == "Last 30 Days")
     || ($scope.selectedfrequency == "This Month")
     || ($scope.selectedfrequency == "Last Month"))
{
      xAxis.ticks(d3.time.days, 1)
      .tickFormat(d3.time.format("%d %b"));
}

if(($scope.selectedfrequency == "Today") || ($scope.selectedfrequency == "Yesterday"))
{
      xAxis.ticks(d3.time.hours, 1)
      .tickFormat(d3.time.format("%H:%M"));
}
if($scope.selectedfrequency == "Last 365 Days")
{
      xAxis.ticks(d3.time.months, 1)
      .tickFormat(d3.time.format("%b"));
}

  var yAxisLeft = d3.svg.axis().scale(y0)
      .orient("left").ticks(5)
      .innerTickSize(-width)
      .outerTickSize(0);

  var yAxisRight = d3.svg.axis().scale(y1)
      .orient("right").ticks(5)
      .innerTickSize(-width)
      .outerTickSize(0); 

//drawline(data);
if($scope.selectedfrequency == "Last 365 Days")
{
  data.forEach(function(d) {
      d.date = parseYear(d.date);
      d.totnumofnewusers = +d.totnumofnewusers;
      d.totnumofretusers = +d.totnumofretusers;
  });
}
else
{
  data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.totnumofnewusers = +d.totnumofnewusers;
      d.totnumofretusers = +d.totnumofretusers;
  });
}

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y0.domain([0, d3.max(data, function(d) { 
      return Math.max(d.totnumofnewusers); })]);  
  y1.domain([0, d3.max(data, function(d) {
      return Math.max(d.totnumofretusers); })]); 



//var svg = d3.select("#dualchartuser");

   var tip1 = d3.tip()
     .attr('class', 'd3-tip')
     .offset([-10, 0])
     .html(function (d) {
     return "<strong>Total number of new users:</strong> <span style='color:red'>" + d.totnumofnewusers +"</span>";
 })

  var tip2 = d3.tip()
       .attr('class', 'd3-tip')
       .offset([-10, 0])
       .html(function (d) {
       return "<strong>Total number of returning users:</strong> <span style='color:red'>" + d.totnumofretusers +"</span>";
   })




if($scope.alreadyuserchartloaded==false)
{
    
    console.log("if called");

      svg = d3.select("#dualchartuser")
          .append("svg")
              .attr("width", width + margin.left + margin.right + 10)
              .attr("height", height + margin.top + margin.bottom + 30)
          .append("g")
              .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");

       svg.call(tip1);
       svg.call(tip2);

      var xAxisOrig = svg.append("g")            // Add the X Axis
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis);

       xAxisOrig.selectAll("text")  // select all the text elements for the xaxis
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", function(d) {
              return "rotate(-90)";
        });

      var yAxisLeftG = svg.append("g")
          .attr("class", "y axis axisLeft")
          .attr("transform", "translate(-10," + 0 + ")")
          .style("fill", "steelblue")
          .call(yAxisLeft);   

        var yAxisLeftLabelText = "Total number of new users";
        var yAxisLeftLabelOffset = 35;

        var yAxisLeftLabel = yAxisLeftG.append("text")
          .style("text-anchor", "middle")
          .attr("transform", "translate(-" + yAxisLeftLabelOffset + "," + (height / 2) + ") rotate(-90)")
          .attr("class", "label")
          .text(yAxisLeftLabelText);

      var yAxisRightG = svg.append("g")             
                      .attr("class", "y axis axisRight")    
                      .attr("transform", "translate(" + (width+10) + " ,0)") 
                      .style("fill", "red")       
                      .call(yAxisRight);

        var yAxisRightLabelText = "Total number of returning users";
        var yAxisRightLabelOffset = 30;

        var yAxisRightLabel = yAxisRightG.append("text")
          .style("text-anchor", "middle")
          .attr("transform", "translate(" + yAxisRightLabelOffset + "," + (height/2) + ") rotate(90)")
          .attr("class", "label")
          .text(yAxisRightLabelText);


bars1 = svg.selectAll(".bar1").data(data);

bars1.enter().append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.date)-10; })
      .attr("width", 10)
      .attr("y", function(d) { return y0(d.totnumofnewusers); })
      .attr("height", function(d,i,j) { return height - y0(d.totnumofnewusers); })
      .on('mouseover', tip1.show)
      .on('mouseout', tip1.hide);

bars2 = svg.selectAll(".bar2").data(data);

bars2.enter().append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.date); })
      .attr("width", 10)
      .attr("y", function(d) { return y1(d.totnumofretusers); })
      .attr("height", function(d,i,j) { return height - y1(d.totnumofretusers); })
      .on('mouseover', tip2.show)
      .on('mouseout', tip2.hide);



      $scope.alreadyuserchartloaded = true;
    }
    else
    {

   var tip1 = d3.tip()
     .attr('class', 'd3-tip')
     .offset([-10, 0])
     .html(function (d) {
     return "<strong>Total number of new users:</strong> <span style='color:red'>" + d.totnumofnewusers +"</span>";
 })

  var tip2 = d3.tip()
       .attr('class', 'd3-tip')
       .offset([-10, 0])
       .html(function (d) {
       return "<strong>Total number of returning users:</strong> <span style='color:red'>" + d.totnumofretusers +"</span>";
   })


  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y0.domain([0, d3.max(data, function(d) { 
      return Math.max(d.totnumofnewusers); })]);  
  y1.domain([0, d3.max(data, function(d) {
      return Math.max(d.totnumofretusers); })]); 

       var svg = d3.select("#dualchartuser").transition();



        var xAxisOrig = svg.select(".x.axis") // change the x axis
                        .duration(750)
                        .call(xAxis);

        xAxisOrig.selectAll("text")  // select all the text elements for the xaxis
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-90)";
          });


        svg.select(".y.axis.axisLeft") // change the y axis
            .duration(750)
            .call(yAxisLeft);
        svg.select(".y.axis.axisRight") // change the y axis
            .duration(750)
            .call(yAxisRight);

       var svg = d3.select("#dualchartuser").select("svg").select("g");

       svg.call(tip1);
       svg.call(tip2);

       svg.selectAll(".bar1").remove();
       svg.selectAll(".bar2").remove();

        bars1 = svg.selectAll(".bar1").data(data);

        bars1.enter().append("rect")
              .attr("class", "bar1")
              .attr("x", function(d) { return x(d.date)-10; })
              .attr("width", 10)
              .attr("y", function(d) { return y0(d.totnumofnewusers); })
              .attr("height", function(d,i,j) { return height - y0(d.totnumofnewusers); })
              .on('mouseover', tip1.show)
              .on('mouseout', tip1.hide);

        bars2 = svg.selectAll(".bar2").data(data);

        bars2.enter().append("rect")
              .attr("class", "bar2")
              .attr("x", function(d) { return x(d.date); })
              .attr("width", 10)
              .attr("y", function(d) { return y1(d.totnumofretusers); })
              .attr("height", function(d,i,j) { return height - y1(d.totnumofretusers); })
              .on('mouseover', tip2.show)
              .on('mouseout', tip2.hide);



// bars1 = svg.selectAll(".bar1").data(data);

// bars1.enter().append("rect")
//       .attr("class", "bar1")
//       .attr("x", function(d) { return x(d.date)-10; })
//       .attr("width", 10)
//       .attr("y", function(d) { return y0(d.totnumofnewusers); })
//     .attr("height", function(d,i,j) { return height - y0(d.totnumofnewusers); }); 

// bars2 = svg.selectAll(".bar2").data(data);

// bars2.enter().append("rect")
//       .attr("class", "bar2")
//       .attr("x", function(d) { return x(d.date); })
//       .attr("width", 10)
//       .attr("y", function(d) { return y1(d.totnumofretusers); })
//     .attr("height", function(d,i,j) { return height - y1(d.totnumofretusers); }); 
   //  // Select the section we want to apply our changes to
   //  var svg = d3.select("#dualcharttime").transition();

   //    var tip3 = d3.tip()
   //     .attr('class', 'd3-tip')
   //     .offset([-10, 0])
   //     .html(function (d) {
   //     return "<strong>Total Time Spent:</strong> <span style='color:red'>" + d.tottimespent +"</span>";
   // })

   //  var tip4 = d3.tip()
   //       .attr('class', 'd3-tip')
   //       .offset([-10, 0])
   //       .html(function (d) {
   //       return "<strong>Avg Time Spent:</strong> <span style='color:red'>" + d.avgtimespent +"</span>";
   //   })
    

   //  //svg.call(tip);
   //  // Make the changes
   //      svg.select(".line1")   // change the line
   //          .duration(750)
   //          .attr("d", valueline1(data));
   //      svg.select(".line2")   // change the line
   //          .duration(750)
   //          .attr("d", valueline2(data));
   //      var xAxisOrig = svg.select(".x.axis") // change the x axis
   //                      .duration(750)
   //                      .call(xAxis);

   //      xAxisOrig.selectAll("text")  // select all the text elements for the xaxis
   //          .style("text-anchor", "end")
   //          .attr("dx", "-.8em")
   //          .attr("dy", ".15em")
   //          .attr("transform", function(d) {
   //              return "rotate(-90)";
   //        });


   //      svg.select(".y.axis.axisLeft") // change the y axis
   //          .duration(750)
   //          .call(yAxisLeft);
   //      svg.select(".y.axis.axisRight") // change the y axis
   //          .duration(750)
   //          .call(yAxisRight);

   //    var svg = d3.select("#dualcharttime").select("svg").select("g");

   //    svg.call(tip3);
   //    svg.call(tip4);
   //    // svg.call(tip);
   //              //Attach the data to the graph
   //    var bluecircles = svg.selectAll(".data-point1").data(data);

   //    bluecircles.enter()
   //           .append("svg:circle").attr("class", 'data-point1');


   //    bluecircles
   //    .attr("cx", function (d, i) {
   //           return x(d.date);
   //       })
   //    .attr("cy", function (d, i) {
   //           return y0(d.tottimespent);
   //       })
   //    .attr("r", 3)
   //    .on('mouseover', tip3.show)
   //    .on('mouseout', tip3.hide);

   //    bluecircles
   //    .exit()
   //    .transition()
   //    .attr('r', 0)
   //    .remove();


   //    var redcircles = svg.selectAll(".data-point2").data(data);

   //    redcircles.enter()
   //           .append("svg:circle")
   //           .attr("class", 'data-point2');


   //    redcircles
   //    .attr("cx", function (d, i) {
   //           return x(d.date);
   //       })
   //    .attr("cy", function (d, i) {
   //           return y1(d.avgtimespent);
   //       })
   //    .attr("r", 3)
   //    .on('mouseover', tip4.show)
   //    .on('mouseout', tip4.hide);

   //    redcircles
   //    .exit()
   //    .transition()
   //    .attr('r', 0)
   //    .remove();

    }

  };


}]);
