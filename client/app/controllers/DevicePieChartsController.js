nameApp.controller('DevicePieChartCtrl', ['$scope','analyticsService',function ($scope,analyticsService)
{

      $(function() {


          $('#reportrange').daterangepicker({
              minDate: moment().subtract(365, 'days'),
              maxDate: moment(),
              // ranges: {
              //    "Last 30 Days": [moment().subtract(29, 'days'), moment()],
              //    "Last 7 Days": [moment().subtract(6, 'days'), moment()],
              //    "Last 365 Days": [moment().subtract(365, 'days'), moment()],
              //    "Today": [moment(), moment()],
              //    "Yesterday": [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              //    "This Month": [moment().startOf('month'), moment().endOf('month')],
              //    "Last Month": [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
              // }
          }, cb);

          cb(moment().subtract(6, 'month').startOf('day'), moment().endOf('day'),"Week");

          function cb(start, end, freq) {
            if(freq==undefined)
            {
               var diff = end.diff(start,'days');
               if(diff<=31)
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
              $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
              $scope.startdate=moment(start).valueOf();
              $scope.enddate=moment(end).valueOf();
              $scope.selectedfrequency=freq;

              if(!$scope.$$phase) {
                    $scope.$apply(function () {
                        $scope.UpdatePiecharts();
                    });
              }
              //$scope.setDates(start,end,freq);
          }

      });

      $scope.init = function(){
                  if(!$scope.$$phase) {
                      $scope.$apply(function() {
                          
                          $scope.UpdatePiecharts();

                      });
                }
                else
                {
                  $scope.UpdatePiecharts();
                }
    };

  $scope.alreadypiechartloaded=false;

  $scope.UpdatePiecharts = function()
  {

      var DevicePieChartsPromise  = analyticsService.getDevicePieCharts($scope.startdate,$scope.enddate,$scope.selectedfrequency);
      DevicePieChartsPromise.then(function(response){

      devicepiechartdata = response.data;
      console.log(devicepiechartdata);

      for(i=0;i<devicepiechartdata.length;i++)
      {
        if(devicepiechartdata[i]._id=="device")
        {
          devicedata = devicepiechartdata[i].value;
        }
        else if(devicepiechartdata[i]._id=="deviceManufacturer")
        {
          deviceManufacturerdata = devicepiechartdata[i].value; 
        }
        else if(devicepiechartdata[i]._id=="deviceType")
        {
          deviceTypedata = devicepiechartdata[i].value; 
        }
        else if(devicepiechartdata[i]._id=="platform")
        {
          platformdata = devicepiechartdata[i].value; 
        }
        else if(devicepiechartdata[i]._id=="operatingSystemVersion")
        {
          operatingSystemVersiondata = devicepiechartdata[i].value; 
        }
        else if(devicepiechartdata[i]._id=="appVersion")
        {
          appVersiondata = devicepiechartdata[i].value; 
        }
        else if(devicepiechartdata[i]._id=="carrier")
        {
          carrierdata = devicepiechartdata[i].value; 
        }
        else if(devicepiechartdata[i]._id=="resolution")
        {
          resolutiondata = devicepiechartdata[i].value; 
        }                                        
      }

console.log(devicedata);
console.log(deviceManufacturerdata);
console.log(deviceTypedata);
console.log(platformdata);
console.log(operatingSystemVersiondata);
console.log(appVersiondata);
console.log(carrierdata);
console.log(resolutiondata);

updatedevicepiechart("#divdevice",devicedata);
updatedevicepiechart("#divdeviceManufacturer",deviceManufacturerdata);
updatedevicepiechart("#divdeviceType",deviceTypedata);
updatedevicepiechart("#divplatform",platformdata);
updatedevicepiechart("#divoperatingSystemVersion",operatingSystemVersiondata);
updatedevicepiechart("#divappVersion",appVersiondata);
updatedevicepiechart("#divcarrier",carrierdata);
updatedevicepiechart("#divresolution",resolutiondata);


      // data1 = analyticsService.getDeviceUsersbyCompanyData($scope.startdate,$scope.enddate,$scope.selectedfrequency);
      // updatedevicepiechart("#deviceCompanyPieChart",data1);
      // data2 = analyticsService.getDeviceUsersbyCarriersData($scope.startdate,$scope.enddate,$scope.selectedfrequency);
      // updatedevicepiechart("#deviceCarriersPieChart",data2)
      // data3 = analyticsService.getDeviceUsersbyOSVersions($scope.startdate,$scope.enddate,$scope.selectedfrequency);
      // updatedevicepiechart("#deviceOSVersionsPieChart",data3)

      $scope.alreadypiechartloaded = true;

     })
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
        .value(function(d) { return d.Unique_User_Count; });

    data.forEach(function(d) {
      d.Unique_User_Count = +d.Unique_User_Count;
    });
     
     var total=0;
     for(var i = 0;i<data.length;i++)
     {
       total = total + data[i].Unique_User_Count;
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
                return d._id + " - " + d.Unique_User_Count + " users"; 
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
                return d._id + " - " + d.Unique_User_Count + " users";  
            });


     }


   

    }

}]);