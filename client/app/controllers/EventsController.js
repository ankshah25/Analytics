nameApp.controller('EventsCtrl', ['$scope','$http','analyticsService',function ($scope,$http,analyticsService){


    $(function() {
          $('#reportrange').daterangepicker({
            minDate: moment().subtract(365, 'days'),
            maxDate: moment(),
              // ranges: {
              //   "Last 365 Days": [moment().subtract(365, 'days'), moment()],
              //    "Last 30 Days": [moment().subtract(29, 'days'), moment()],
              //    "Last 7 Days": [moment().subtract(6, 'days'), moment()],                
              //    "Today": [moment(), moment()],
              //    "Yesterday": [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              //    "This Month": [moment().startOf('month'), moment().endOf('month')],
              //    "Last Month": [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
              // }
          }, cb);
          

            $("#btntoday").click(function(){
             cb(moment().startOf('day'), moment().endOf('day'),"Hour");
            });

            $("#btnyesterday").click(function(){
             cb(moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day'),"Hour");
            });

            $("#btncurrmonth").click(function(){
             cb(moment().startOf('month').startOf('day'), moment().endOf('day'),"Day");
            });

            $("#btnprevmonth").click(function(){
             cb(moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month').endOf('day'),"Day");
            });

            $("#btn3mnths").click(function(){
             cb(moment().subtract(3, 'month').startOf('day'), moment().endOf('day'),"Week");
            });
                                    
            $("#btn6mnths").click(function(){
             cb(moment().subtract(6, 'month').startOf('day'), moment().endOf('day'),"Week");
            });

            $("#btn1year").click(function(){
             cb(moment().subtract(1, 'year').startOf('day'), moment().endOf('day'),"Month");
            });

          cb(moment().subtract(3, 'month').startOf('day'), moment().endOf('day'),"Week");


          function cb(start, end, freq) {

            if(freq==undefined)
            {
               var diff = end.diff(start,'days');
               if(diff<=2)
               {
                 freq = "Hour";
               }
               else if(diff<=31)
               {
                freq = "Day";
               }
               else if(diff<=180)
               {
                freq = "Week";
               }
               else
               {
                freq = "Month";
               }

            }
              $('#reportrange span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
              $scope.startdate=moment(start).valueOf();
              $scope.enddate=moment(end).valueOf();
              $scope.selectedfrequency=freq;


              if(!$scope.$$phase) {
                $scope.$apply(function() {
                  
                    //$scope.setDates($scope.startdate,$scope.enddate,$scope.selectedfrequency);
                    $scope.updateeventstable();

                });
              }
          }


      });


    $scope.alreadyeventsloaded=false;
    $scope.alreadysessionloaded=false;
    $scope.eventsdata = [];


    $scope.init = function(){
                  if(!$scope.$$phase) {
                      $scope.$apply(function() {
                          
                          $scope.updateeventstable();

                      });
                }
                else
                {

                          $scope.updateeventstable();
         

                }
    };

     $scope.openModel = function(eventname){
      	console.log(eventname);
      	$('#myLargeModalLabel').text(eventname);
      	$('#myModal').modal('show');
      	console.log($scope.startdate,$scope.enddate,$scope.selectedfrequency);


//Get the data

   var SessionCountsPromise  = analyticsService.getSessionCounts($scope.startdate,$scope.enddate,$scope.selectedfrequency);
   SessionCountsPromise.then(function(response){

   data =  response.data;
   console.log(data);
  var margin = {top: 30, right: 40, bottom: 30, left: 50},
  width = 950 - margin.left - margin.right,
  height = 270 - margin.top - margin.bottom;
  var parseDate;

  var x = d3.time.scale().range([0, width]);
  var y0 = d3.scale.linear().range([height, 0]);
  var y1 = d3.scale.linear().range([height, 0]);

  var valueline1 = d3.svg.line()
      .x(function(d) { return x(d._id); })
      .y(function(d) { return y0(d.Non_Unique_User_Count); });
      

  var valueline2 = d3.svg.line()
      .x(function(d) { return x(d._id); })
      .y(function(d) { return y1(d.Unique_User_Count); });

  var xAxis = d3.svg.axis().scale(x)
      .orient("bottom");

  if($scope.selectedfrequency == "Day")
  {
        xAxis.ticks(d3.time.days, 1)
        .tickFormat(d3.time.format("%d %b"));

        parseDate = d3.time.format("%Y%m%d").parse;
  }
  if($scope.selectedfrequency == "Week")
  {
        xAxis.ticks(d3.time.weeks, 1)
        .tickFormat(d3.time.format("%d %b"));

        parseDate = d3.time.format("%Y%m%d").parse;
  }
  if(($scope.selectedfrequency=="Hour"))
  {
        xAxis.ticks(d3.time.hours, 1)
        .tickFormat(d3.time.format("%H:%M"));

        parseDate = d3.time.format("%Y%m%d%H").parse;
  }
  if($scope.selectedfrequency=="Month")
  {
        xAxis.ticks(d3.time.months, 1)
        .tickFormat(d3.time.format("%b %y"));

        parseDate = d3.time.format("%Y%m").parse;
  }

  var yAxisLeft = d3.svg.axis().scale(y0)
      .orient("left").ticks(5)
      .innerTickSize(-width)
      .outerTickSize(0);

  var yAxisRight = d3.svg.axis().scale(y1)
      .orient("right").ticks(5)
      .innerTickSize(-width)
      .outerTickSize(0); 


  data.forEach(function(d) {
      d._id = parseDate(d._id);
      d.Non_Unique_User_Count = +d.Non_Unique_User_Count;
      d.Unique_User_Count = +d.Unique_User_Count;
  });


  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d._id; }));
  y0.domain([0, d3.max(data, function(d) { 
      return Math.max(d.Non_Unique_User_Count); })]);  
  y1.domain([0, d3.max(data, function(d) {
      return Math.max(d.Unique_User_Count); })]); 



 var svg = d3.select("#dualeventdetailchart");

   var tip1 = d3.tip()
     .attr('class', 'd3-modaltip')
     .offset([-10, 0])
     .html(function (d) {
     return "<strong>Total Number of Sessions:</strong> <span style='color:red'>" + d.Non_Unique_User_Count +"</span>";
 })

  var tip2 = d3.tip()
       .attr('class', 'd3-modaltip')
       .offset([-10, 0])
       .html(function (d) {
       return "<strong>Unique Number of Sessions:</strong> <span style='color:red'>" + d.Unique_User_Count +"</span>";
   })


if($scope.alreadysessionloaded==false)
{
    
      svg = d3.select("#dualeventdetailchart")
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

        var yAxisRightLabelText = "Unique number of sessions";
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
             return x(d._id);
         })
      .attr("cy", function (d, i) {
             return y0(d.Non_Unique_User_Count);
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
             return x(d._id);
         })
      .attr("cy", function (d, i) {
             return y1(d.Unique_User_Count);
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
    var svg = d3.select("#dualeventdetailchart").transition();

      var tip3 = d3.tip()
       .attr('class', 'd3-modaltip')
       .offset([-10, 0])
       .html(function (d) {
       return "<strong>Total Number of Sessions:</strong> <span style='color:red'>" + d.Non_Unique_User_Count +"</span>";
   })

    var tip4 = d3.tip()
         .attr('class', 'd3-modaltip')
         .offset([-10, 0])
         .html(function (d) {
         return "<strong>Unique Number of Sessions:</strong> <span style='color:red'>" + d.Unique_User_Count +"</span>";
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

      var svg = d3.select("#dualeventdetailchart").select("svg").select("g");

      svg.call(tip3);
      svg.call(tip4);
      // svg.call(tip);
                //Attach the data to the graph
      var bluecircles = svg.selectAll(".data-point1").data(data);

      bluecircles.enter()
             .append("svg:circle").attr("class", 'data-point1');


      bluecircles
      .attr("cx", function (d, i) {
             return x(d._id);
         })
      .attr("cy", function (d, i) {
             return y0(d.Non_Unique_User_Count);
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
             return x(d._id);
         })
      .attr("cy", function (d, i) {
             return y1(d.Unique_User_Count);
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
  });

 };

     $scope.updateeventstable = function(){

	   //Get the data

	   var EventsDataPromise  = analyticsService.getEventsData($scope.startdate,$scope.enddate,$scope.selectedfrequency);
	   EventsDataPromise.then(function(response){

	   $scope.eventsdata =  response.data;
	   console.log($scope.eventsdata);

	  });

   };

 


}]);
