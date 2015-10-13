/*#######################################################################
  
  Dan Wahlin
  http://twitter.com/DanWahlin
  http://weblogs.asp.net/dwahlin
  http://pluralsight.com/training/Authors/Details/dan-wahlin

  Normally like the break AngularJS controllers into separate files.
  Kept them together here since they're small and it's easier to look through them.
  example. 

  #######################################################################*/

nameApp.controller('PowerGaugeCtrl', function ($scope,analyticsService){
var gauge = function(container, configuration) {
  var that = {};
  var config = {
    size            : 200,
    clipWidth         : 200,
    clipHeight          : 110,
    ringInset         : 20,
    ringWidth         : 20,
    
    pointerWidth        : 10,
    pointerTailLength     : 5,
    pointerHeadLengthPercent  : 0.9,
    
    minValue          : 0,
    maxValue          : 1000,
    
    minAngle          : -90,
    maxAngle          : 90,
    
    transitionMs        : 750,
    
    majorTicks          : 5,
    labelFormat         : d3.format(',g'),
    labelInset          : 10,
    
    arcColorFn          : d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a'))
  };
  var range = undefined;
  var r = undefined;
  var pointerHeadLength = undefined;
  var value = 0;
  
  var svg = undefined;
  var arc = undefined;
  var scale = undefined;
  var ticks = undefined;
  var tickData = undefined;
  var pointer = undefined;

  var donut = d3.layout.pie();
  
  function deg2rad(deg) {
    return deg * Math.PI / 180;
  }
  
  function newAngle(d) {
    var ratio = scale(d);
    var newAngle = config.minAngle + (ratio * range);
    return newAngle;
  }
  
  function configure(configuration) {
    var prop = undefined;
    for ( prop in configuration ) {
      config[prop] = configuration[prop];
    }
    
    range = config.maxAngle - config.minAngle;
    r = config.size / 2;
    pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

    // a linear scale that maps domain values to a percent from 0..1
    scale = d3.scale.linear()
      .range([0,1])
      .domain([config.minValue, config.maxValue]);
      
    ticks = scale.ticks(config.majorTicks);
    tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});
    
    arc = d3.svg.arc()
      .innerRadius(r - config.ringWidth - config.ringInset)
      .outerRadius(r - config.ringInset)
      .startAngle(function(d, i) {
        var ratio = d * i;
        return deg2rad(config.minAngle + (ratio * range));
      })
      .endAngle(function(d, i) {
        var ratio = d * (i+1);
        return deg2rad(config.minAngle + (ratio * range));
      });
  }
  that.configure = configure;
  
  function centerTranslation() {
    return 'translate('+r +','+ r +')';
  }
  
  function isRendered() {
    return (svg !== undefined);
  }
  that.isRendered = isRendered;
  
  function render(newValue) {
    svg = d3.select(container)
      .append('svg:svg')
        .attr('class', 'gauge')
        .attr('width', config.clipWidth)
        .attr('height', config.clipHeight);
    
    var centerTx = centerTranslation();
    
    var arcs = svg.append('g')
        .attr('class', 'arc')
        .attr('transform', centerTx);
    
    arcs.selectAll('path')
        .data(tickData)
      .enter().append('path')
        .attr('fill', function(d, i) {
          return config.arcColorFn(d * i);
        })
        .attr('d', arc);
    
    var lg = svg.append('g')
        .attr('class', 'label')
        .attr('transform', centerTx);
    lg.selectAll('text')
        .data(ticks)
      .enter().append('text')
        .attr('transform', function(d) {
          var ratio = scale(d);
          var newAngle = config.minAngle + (ratio * range);
          return 'rotate(' +newAngle +') translate(0,' +(config.labelInset - r) +')';
        })
        .text(config.labelFormat);

    var lineData = [ [config.pointerWidth / 2, 0], 
            [0, -pointerHeadLength],
            [-(config.pointerWidth / 2), 0],
            [0, config.pointerTailLength],
            [config.pointerWidth / 2, 0] ];
    var pointerLine = d3.svg.line().interpolate('monotone');
    var pg = svg.append('g').data([lineData])
        .attr('class', 'pointer')
        .attr('transform', centerTx);
        
    pointer = pg.append('path')
      .attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/ )
      .attr('transform', 'rotate(' +config.minAngle +')');
      
    update(newValue === undefined ? 0 : newValue);
  }
  that.render = render;
  
  function update(newValue, newConfiguration) {
    if ( newConfiguration  !== undefined) {
      configure(newConfiguration);
    }
    var ratio = scale(newValue);
    var newAngle = config.minAngle + (ratio * range);
    pointer.transition()
      .duration(config.transitionMs)
      .ease('elastic')
      .attr('transform', 'rotate(' +newAngle +')');
  }
  that.update = update;

  configure(configuration);
  
  return that;
};

function onDocumentReady() {
  var powerGauge = gauge('#power-gauge', {
    size: 200,
    clipWidth: 200,
    clipHeight: 110,
    ringWidth: 40,
    maxValue: 1000,
    transitionMs: 4000,
  });
  powerGauge.render();
  
  function updateReadings() {
    // just pump in random data here...
    //$scope.totnumofusers = parseInt(Math.random() * 1000)
    $scope.totnumofusers = analyticsService.getCurrentOnlineUsers();
    
    powerGauge.update($scope.totnumofusers);
    $scope.$apply();
  }
  
  // every few seconds update reading values
  updateReadings();
  setInterval(function() {
    updateReadings();
  }, 5 * 1000);
}

if ( !window.isLoaded ) {
  window.addEventListener("load", function() {
    onDocumentReady();
  }, false);
} else {
  onDocumentReady();
}
});

nameApp.controller('DevicePieChartCtrl', function ($scope,analyticsService){

var width = 500,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

//var color = d3.scale.category20c();

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.usercount; });

var svg = d3.select("#devicePieChart")
   .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

 data = analyticsService.getDeviceUsersbyCompanyData();

 drawpie(data);

 function drawpie(data) {

console.log(data);
  data.forEach(function(d) {
    d.usercount = +d.usercount;
  });

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
       .style("fill", function(d) { return color(d.data.companyname); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.companyname; });

};

});

nameApp.controller('DualChartSessionandTimeCtrl', ['$scope','analyticsService',function ($scope,analyticsService){
    //$scope.selectedfrequency ="Last 30 Days";
    $scope.startdate="";
    $scope.enddate="";
    $scope.alreadysessionloaded=false;
     $scope.alreadytimeloaded=false;

    $scope.setDates = function(start,end,freq){
            $scope.startdate=start;
            $scope.enddate=end;
            $scope.selectedfrequency=freq;
            console.log("setdates call start");
        console.log("setdates call  end");
 
    }

    $scope.updatesessionchart = function(){

//Get the data

data = analyticsService.getUserSessionData($scope.startdate,$scope.enddate,$scope.selectedfrequency );


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
      console.log("anks2");

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

   $scope.updatetimechart = function(){

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
      console.log("anks2");

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

}]);
//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is ultimatelybound to the customers view
// app.controller('CustomersController', function ($scope, customersService) {

//     //I like to have an init() for controllers that need to perform some initialization. Keeps things in
//     //one place...not required though especially in the simple example below
//     init();

//     function init() {
//         $scope.customers = customersService.getCustomers();
//     }

//     $scope.insertCustomer = function () {
//         var firstName = $scope.newCustomer.firstName;
//         var lastName = $scope.newCustomer.lastName;
//         var city = $scope.newCustomer.city;
//         customersService.insertCustomer(firstName, lastName, city);
//         $scope.newCustomer.firstName = '';
//         $scope.newCustomer.lastName = '';
//         $scope.newCustomer.city = '';
//     };

//     $scope.deleteCustomer = function (id) {
//         customersService.deleteCustomer(id);
//     };
// });

// //This controller retrieves data from the customersService and associates it with the $scope
// //The $scope is bound to the order view
// app.controller('CustomerOrdersController', function ($scope, $routeParams, customersService) {
//     $scope.customer = {};
//     $scope.ordersTotal = 0.00;

//     //I like to have an init() for controllers that need to perform some initialization. Keeps things in
//     //one place...not required though especially in the simple example below
//     init();

//     function init() {
//         //Grab customerID off of the route        
//         var customerID = ($routeParams.customerID) ? parseInt($routeParams.customerID) : 0;
//         if (customerID > 0) {
//             $scope.customer = customersService.getCustomer(customerID);
//         }
//     }

// });

// //This controller retrieves data from the customersService and associates it with the $scope
// //The $scope is bound to the orders view
// app.controller('OrdersController', function ($scope, customersService) {
//     $scope.customers = [];

//     //I like to have an init() for controllers that need to perform some initialization. Keeps things in
//     //one place...not required though especially in the simple example below
//     init();

//     function init() {
//         $scope.customers = customersService.getCustomers();
//     }
// });

// app.controller('NavbarController', function ($scope, $location) {
//     $scope.getClass = function (path) {
//         if ($location.path().substr(0, path.length) == path) {
//             return true
//         } else {
//             return false;
//         }
//     }
// });

// //This controller is a child controller that will inherit functionality from a parent
// //It's used to track the orderby parameter and ordersTotal for a customer. Put it here rather than duplicating 
// //setOrder and orderby across multiple controllers.
// app.controller('OrderChildController', function ($scope) {
//     $scope.orderby = 'product';
//     $scope.reverse = false;
//     $scope.ordersTotal = 0.00;

//     init();

//     function init() {
//         //Calculate grand total
//         //Handled at this level so we don't duplicate it across parent controllers
//         if ($scope.customer && $scope.customer.orders) {
//             var total = 0.00;
//             for (var i = 0; i < $scope.customer.orders.length; i++) {
//                 var order = $scope.customer.orders[i];
//                 total += order.orderTotal;
//             }
//             $scope.ordersTotal = total;
//         }
//     }

//     $scope.setOrder = function (orderby) {
//         if (orderby === $scope.orderby)
//         {
//             $scope.reverse = !$scope.reverse;
//         }
//         $scope.orderby = orderby;
//     };

// });
