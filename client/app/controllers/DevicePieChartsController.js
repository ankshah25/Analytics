nameApp.controller('DevicePieChartCtrl', ['$scope','analyticsService',function ($scope,analyticsService)
{

      $(function() {

          function cb(start, end, freq) {
              $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
              $scope.startdate=start;
              $scope.enddate=end;
              $scope.selectedfrequency=freq;
              // var scope = angular.element(
              //       document.
              //       getElementById("devicepiecharts")).
              //       scope();
              if(!$scope.$$phase) {
                    $scope.$apply(function () {
                        $scope.setDates(start,end,freq);
                    });
              }
              //$scope.setDates(start,end,freq);
          }
          cb(moment().subtract(29, 'days'), moment(),"Last 30 Days");

          $('#reportrange').daterangepicker({
              ranges: {
                 "Last 30 Days": [moment().subtract(29, 'days'), moment()],
                 "Last 7 Days": [moment().subtract(6, 'days'), moment()],
                 "Last 365 Days": [moment().subtract(365, 'days'), moment()],
                 "Today": [moment(), moment()],
                 "Yesterday": [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                 "This Month": [moment().startOf('month'), moment().endOf('month')],
                 "Last Month": [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
              }
          }, cb);

      });

      $scope.init = function(){
                  if(!$scope.$$phase) {
                      $scope.$apply(function() {
                          
                          $scope.setDates($scope.startdate,$scope.enddate,$scope.selectedfrequency);

                      });
                }
                else
                {
                  $scope.setDates($scope.startdate,$scope.enddate,$scope.selectedfrequency);
                }
    };

  $scope.alreadypiechartloaded=false;

  $scope.setDates = function(start,end,freq)
  {
      $scope.startdate=start;
      $scope.enddate=end;
      $scope.selectedfrequency=freq;

      data1 = analyticsService.getDeviceUsersbyCompanyData($scope.startdate,$scope.enddate,$scope.selectedfrequency);
      updatedevicepiechart("#deviceCompanyPieChart",data1);
      data2 = analyticsService.getDeviceUsersbyCarriersData($scope.startdate,$scope.enddate,$scope.selectedfrequency);
      updatedevicepiechart("#deviceCarriersPieChart",data2)
      data3 = analyticsService.getDeviceUsersbyOSVersions($scope.startdate,$scope.enddate,$scope.selectedfrequency);
      updatedevicepiechart("#deviceOSVersionsPieChart",data3)

      $scope.alreadypiechartloaded = true;
  }

  function updatedevicepiechart(div,data)
  {


    var width = 600,
        height = 300,
        radius = Math.min(width, height) / 2;

    // var color = d3.scale.ordinal()
    //     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

    var color = d3.scale.category20();
    //var color = d3.scale.category20c();

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.usercount; });

    data.forEach(function(d) {
      d.usercount = +d.usercount;
    });
     
     var total=0;
     for(var i = 0;i<data.length;i++)
     {
       total = total + data[i].usercount;
     }

    if($scope.alreadypiechartloaded == false)
    {
        var svg = d3.select(div)
           .append("svg")
            .attr("class","p")
            .attr("width", width)
            .attr("height", height);
          // .append("g")
          //   .attr("class","g1")
          //   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var arcs = svg.selectAll("g.arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + height / 2  + "," + height / 2  + ")");



        var paths = arcs.append("path")
            .attr("fill", function (d, i) {
                    return color(i);
                })
            .attr("d", arc);

        arcs.append("text")
        .attr("transform", function (d) {
            d.innerRadius = radius;
                return "translate(" + arc.centroid(d) + ")";
            })
        .attr("text-anchor", "middle")
            .text(function (d) {
                return  parseFloat((parseInt(d.value)/total * 100.00)).toFixed(2) +"%";
            })
        .style("fill", "#fff");



        var legend = svg.append("g")
        .attr("class", "legend")
        .attr("height", 100)
        .attr("width", 100)
        .attr('transform', 'translate(-90,60)');
    
        legend.selectAll('rect')
        .data(data)
        .enter()
        .append("rect")
        .attr("x", width - 75)
        .attr("y", function (d, i) {
                return i * 20;
            })
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d, i) {
                return color(i);
            });
    
    legend.selectAll('text')
        .data(data)
        .enter()
        .append("text")
        .attr("x", width - 52)
        .attr("y", function (d, i) {
                return i * 20 + 9;
            })
        .text(function (d, i) {
                //return t[i];
                return d.label + " - " + d.usercount + " users"; 
            });

    }
     else
     {

      d3.select(div).select("svg").selectAll("g.arc").remove();
      d3.select(div).select("svg").selectAll("rect").remove();
      d3.select(div).select("svg").selectAll("text").remove();

      var paths = d3.select(div).select("svg").selectAll("g.arc").data(pie(data));


      var pathsEnter = paths
        .enter()
      .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + radius + "," + radius + ")");
    
    pathsEnter
      .append("path")
        .attr("fill", function (d, i) {
                return color(i);
            })
        .attr("d", arc);

        pathsEnter.append("text")
        .attr("transform", function (d) {
            d.innerRadius = radius;
                return "translate(" + arc.centroid(d) + ")";
            })
        .attr("text-anchor", "middle")
            .text(function (d) {
                return  parseFloat((parseInt(d.value)/total * 100.00)).toFixed(2) +"%";
            })
        .style("fill", "#fff");

        var svg = d3.select(div).select("svg");

        var legend = svg.append("g")
        .attr("class", "legend")
        .attr("height", 100)
        .attr("width", 100)
        .attr('transform', 'translate(-90,60)');
    
        legend.selectAll('rect')
        .data(data)
        .enter()
        .append("rect")
        .attr("x", width - 75)
        .attr("y", function (d, i) {
                return i * 20;
            })
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d, i) {
                return color(i);
            });
    
    legend.selectAll('text')
        .data(data)
        .enter()
        .append("text")
        .attr("x", width - 52)
        .attr("y", function (d, i) {
                return i * 20 + 9;
            })
        .text(function (d, i) {
                //return t[i];
                return d.label + " - " + d.usercount + " users";  
            });


     }


   

    }

}]);