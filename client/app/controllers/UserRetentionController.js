nameApp.controller('UserRetentionChartCtrl', ['$scope','analyticsService',function ($scope,analyticsService)
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

  $scope.alreadyretentionchartloaded=false;

  $scope.setDates = function(start,end,freq)
  {
      $scope.startdate=start;
      $scope.enddate=end;
      $scope.selectedfrequency=freq;

      data1 = analyticsService.getUserRetentionData($scope.startdate,$scope.enddate,$scope.selectedfrequency);
      updateuserretentionchart("userRetentionchart",data1);

      $scope.alreadyretentionchartloaded = true;
  }

  function updateuserretentionchart(tableId,data)
  {

	   console.log(data);

	   var table = document.getElementById(tableId);
	   var rowCount = table.rows.length;
	   console.log(rowCount);
       
       var i=0;
       var row,newcell;
	   for(var mainkey in data[0])
	   { 
	      //console.log(mainkey);
	      
	      row = table.insertRow(0);
	      newcell=row.insertCell(i);
	      newcell.innerHTML ='<h4>&nbsp; Range &nbsp;</h4>';
	      newcell.className = 'headercolumn';
	      for(var key in data[0][mainkey])
	      {
	      	  i++;
	      	  newcell = row.insertCell(i);
              newcell.innerHTML ='<h4> &nbsp;'+(key=="totnumberofusers"?"Total number of users":key)+'&nbsp;</h4>';
              newcell.className = 'headercolumn';
	      	  //console.log(key);
	      }
	   }

       var j;

	   for(i=0;i<data.length;i++)
	   {
	   	
	   	row = table.insertRow(i+1);

	   	 for(var mainkey in data[i])
	   	 { 
	   	 	j=0;
	   	    newcell = row.insertCell(j);
            newcell.innerHTML ='<h4> &nbsp;'+mainkey+'&nbsp;&nbsp;&nbsp;</h4>';
            newcell.className = 'headercolumn';
            j++;

	   	 	 console.log(mainkey);
	   	 	 for(var key in data[i][mainkey])
	   	 	 {
	   	 	    newcell = row.insertCell(j);
	            newcell.innerHTML ='<h5> &nbsp;'+data[i][mainkey][key]+'&nbsp;</h5>';
	            if((parseInt(data[i][mainkey][key])/parseInt(data[i][mainkey]["totnumberofusers"])*100)>70)
	            {
	            	newcell.className = 'category71to100';
	            }
	            else if((parseInt(data[i][mainkey][key])/parseInt(data[i][mainkey]["totnumberofusers"])*100)>40)
	            {
	            	newcell.className = 'category41to70';
	            }
	            else if((parseInt(data[i][mainkey][key])/parseInt(data[i][mainkey]["totnumberofusers"])*100)>0)
	            {
	            	newcell.className = 'category0to40';
	            }
	            else
	            {
	            	newcell.className = 'categorynone';
	            }	            
	            j++;
	   	 	 }
	   	 }
	   }

	   // var tabledata;
	   // tabledata="<table>";
	   // tabledata+="<tr>";
	   // tabledata+="<th>Range</th>";
	   // for(var mainkey in data[0])
	   // { 
	   //    //console.log(mainkey);
	   //    for(var key in data[0][mainkey])
	   //    {
	   //    	tabledata= tabledata+"<th>"+key+"</th>";
	   //    	console.log(key);
	   //    }
	   // }
	   // tabledata+="</tr>";

	   // for(i=0;i<data.length;i++)
	   // {
    //      tabledata+="<tr>"
	   // 	 for(var mainkey in data[i])
	   // 	 { 
	   // 	 	//tabledata= tabledata+"<td class="+'"'+"firstcolumn"+'"'+">"+mainkey+"</td>";
	   // 	 	 tabledata= tabledata+"<td style=bgcolor='red'>"+mainkey+"</td>";
	   // 	 	 console.log(mainkey);
	   // 	 	 for(var key in data[i][mainkey])
	   // 	 	 {
	   // 	 	 	tabledata= tabledata+"<td>"+data[i][mainkey][key]+"</td>";
	   // 	 	   console.log(data[i][mainkey][key]);	
	   // 	 	 }
	   // 	 }
	   // 	 tabledata+="</tr>"
	   // }
	   // tabledata+="</table>"
    //    console.log(tabledata);

    // $(div).addClass("firstcolumn");
    // $(div).html(tabledata);
   }

}]);