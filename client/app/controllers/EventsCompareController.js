nameApp.controller('EventsCompareCtrl', ['$scope','$http','analyticsService',function ($scope,$http,analyticsService){


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
          
           function moveItems(origin, dest) {
                $(origin).find(':selected').appendTo(dest);
            }
             
            function moveAllItems(origin, dest) {
                $(origin).children().appendTo(dest);
            }
            
            $("#btnLeft").click(function () {
                moveItems('#ComparedEvents', '#EventsSelector');
            });
             
            $("#btnRight").on('click', function () {
                moveItems('#EventsSelector', '#ComparedEvents');
            });

            $("#btnCompare").on('click', function () {
            	$scope.selectedevents = [];
                

            	$('#ComparedEvents option').each(function (i, option) {
				      $scope.selectedevents[i] = $(option).text();
				});
                //console.log($scope.selectedevents);

               if(!$scope.$$phase) {
                $scope.$apply(function() {
                  
                    //$scope.setDates($scope.startdate,$scope.enddate,$scope.selectedfrequency);
                    $scope.updateuniquecountchart();
   
                });
              }
            });

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

          cb(moment().subtract(7, 'day').startOf('day'), moment().endOf('day'),"Day");


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


              // if(!$scope.$$phase) {
              //   $scope.$apply(function() {
                  
              //       //$scope.setDates($scope.startdate,$scope.enddate,$scope.selectedfrequency);
              //       $scope.updateeventstable();

              //   });
              // }
          }


      });


    $scope.alreadyeventsloaded=false;
    // $scope.alreadysessionloaded=false;
    $scope.eventsdata = [];


$scope.init = function(){
                  if(!$scope.$$phase) {
                      $scope.$apply(function() {
                          
                          $scope.loadevents();

                      });
                }
                else
                {

                          $scope.loadevents();
         

                }
};

$scope.loadevents = function(){

     //Get the data

     var EventsDataPromise  = analyticsService.loadevents();
     EventsDataPromise.then(function(response){

     $scope.eventsdata =  response.data;
     console.log($scope.eventsdata);

    });

};


 $scope.updateuniquecountchart = function(){

	   var EventsDataPromise  = analyticsService.getEventsComparisionData($scope.startdate,$scope.enddate,$scope.selectedfrequency,$scope.selectedevents);
	   EventsDataPromise.then(function(response){

	   var eventscomparisondata =  response.data;
     var eventscomparisondata1 =  response.data;

     // for(i=0; i<eventscomparisondata.length;i++)
     // {
     //   console.log(eventscomparisondata[i].event);
     //   console.log(eventscomparisondata[i].value);
     // }

            if(!$scope.$$phase) {

                      $scope.$apply(function() {
                          
                          //$scope.setDates($scope.startdate,$scope.enddate,$scope.selectedfrequency);
                        //$scope.drawnonuniquechart(eventscomparisondata);
                        $scope.drawuniquechart(eventscomparisondata1);
                      });
                }
                else
                {
                          //$scope.setDates($scope.startdate,$scope.enddate,$scope.selectedfrequency);
                    //$scope.drawnonuniquechart(eventscomparisondata);
                    $scope.drawuniquechart(eventscomparisondata1);         

                }

      $scope.alreadyeventsloaded=true;
      // drawnonuniquechart(eventscomparisondata);
      // drawuniquechart(eventscomparisondata);
       
	  });

 };

 $scope.drawnonuniquechart = function(data)
 {

  if($scope.alreadyeventsloaded==true)
  {
    d3.select("#the_SVG_ID_1").remove();
  }
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 70, left: 50},
    width = 950 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Parse the date / time
var parseDate;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
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

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var eventsline = d3.svg.line() 
    .x(function(d) { return x(d.event_date); })
    .y(function(d) { return y(d.Non_Unique_User_Count); });
    
// Adds the svg canvas
var svg = d3.select("#divNonUniqueChart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id","the_SVG_ID_1")
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
    data.forEach(function(d) {
    d.event_date = parseDate(d.event_date);
    d.Non_Unique_User_Count = +d.Non_Unique_User_Count;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.event_date; }));
    y.domain([0, d3.max(data, function(d) { return d.Non_Unique_User_Count; })]);

    // Nest the entries by event_name
    var dataNest = d3.nest()
        .key(function(d) {return d.event_name;})
        .entries(data);

    var color = d3.scale.category10();   // set the colour scale

    legendSpace = width/dataNest.length; // spacing for the legend

    // Loop through each event_name / key
    dataNest.forEach(function(d,i) { 

        svg.append("path")
            .attr("class", "line")
            .style("stroke", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign ID
            .attr("d", eventsline(d.values));

        // Add the Legend
        svg.append("text")
            .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
            .attr("y", height + (margin.bottom/2)+ 5)
            .attr("class", "legend")    // style the legend
            .style("fill", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .on("click", function(){
                // Determine if current line is visible 
                var active   = d.active ? false : true,
                newOpacity = active ? 0 : 1; 
                // Hide or show the elements based on the ID
                d3.select("#tag"+d.key.replace(/\s+/g, ''))
                    .transition().duration(100) 
                    .style("opacity", newOpacity); 
                // Update whether or not the elements are active
                d.active = active;
                })  
            .text(d.key); 

    });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

  

 };

 
$scope.drawuniquechart = function(data1)
 {
  console.log("this is unique data1");
  console.log(data1);
  if($scope.alreadyeventsloaded==true)
  {
    d3.select("#the_SVG_ID_2").remove();
  }
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 70, left: 50},
    width = 950 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Parse the date / time
var parseDate1;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom");

  if($scope.selectedfrequency == "Day")
  {
        xAxis.ticks(d3.time.days, 1)
        .tickFormat(d3.time.format("%d %b"));

        parseDate1 = d3.time.format("%Y%m%d").parse;
  }
  if($scope.selectedfrequency == "Week")
  {
        xAxis.ticks(d3.time.weeks, 1)
        .tickFormat(d3.time.format("%d %b"));

        parseDate1 = d3.time.format("%Y%m%d").parse;
  }
  if(($scope.selectedfrequency=="Hour"))
  {
        xAxis.ticks(d3.time.hours, 1)
        .tickFormat(d3.time.format("%H:%M"));

        parseDate1 = d3.time.format("%Y%m%d%H").parse;
  }
  if($scope.selectedfrequency=="Month")
  {
        xAxis.ticks(d3.time.months, 1)
        .tickFormat(d3.time.format("%b %y"));

        parseDate1 = d3.time.format("%Y%m").parse;
  }

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var eventsline = d3.svg.line() 
    .x(function(d) { return x(d.event_date); })
    .y(function(d) { return y(d.Unique_User_Count); });
    
// Adds the svg canvas
var svg = d3.select("#divUniqueChart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id","the_SVG_ID_2")
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data1
    data1.forEach(function(d) {
    d.event_date = parseDate1(d.event_date);
    d.Unique_User_Count = +d.Unique_User_Count;
    });

    // Scale the range of the data1
    x.domain(d3.extent(data1, function(d) { return d.event_date; }));
    y.domain([0, d3.max(data1, function(d) { return d.Unique_User_Count; })]);

    // Nest the entries by event_name
    var dataNest = d3.nest()
        .key(function(d) {return d.event_name;})
        .entries(data1);

    var color = d3.scale.category10();   // set the colour scale

    legendSpace = width/dataNest.length; // spacing for the legend

    // Loop through each event_name / key
    dataNest.forEach(function(d,i) { 

        svg.append("path")
            .attr("class", "line")
            .style("stroke", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign ID
            .attr("d", eventsline(d.values));

        // Add the Legend
        svg.append("text")
            .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
            .attr("y", height + (margin.bottom/2)+ 5)
            .attr("class", "legend")    // style the legend
            .style("fill", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .on("click", function(){
                // Determine if current line is visible 
                var active   = d.active ? false : true,
                newOpacity = active ? 0 : 1; 
                // Hide or show the elements based on the ID
                d3.select("#tag"+d.key.replace(/\s+/g, ''))
                    .transition().duration(100) 
                    .style("opacity", newOpacity); 
                // Update whether or not the elements are active
                d.active = active;
                })  
            .text(d.key); 

    });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

  

 };


 


}]);
