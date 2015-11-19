nameApp.controller('UserRetentionChartCtrl', ['$scope','analyticsService',function ($scope,analyticsService)
{

      $(function() {

          $('#reportrange').daterangepicker({
          	    minDate: moment().subtract(365, 'days'),
                maxDate: moment(),
              // ranges: {
                 // "Last 30 Days": [moment().subtract(29, 'days'), moment()],
                 // "Last 7 Days": [moment().subtract(6, 'days'), moment()],
                 // "Last 365 Days": [moment().subtract(365, 'days'), moment()],
                 // "Today": [moment(), moment()],
                 // "Yesterday": [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                 // "This Month": [moment().startOf('month'), moment().endOf('month')],
                 // "Last Month": [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
              // }
          }, cb);

          cb(moment().subtract(3, 'month').startOf('day'), moment().endOf('day'),"Week");

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
              // var scope = angular.element(
              //       document.
              //       getElementById("devicepiecharts")).
              //       scope();
              if(!$scope.$$phase) {
                    $scope.$apply(function () {
                        $scope.UpdateRetention();
                    });
              }
              //$scope.setDates(start,end,freq);
          }
          

      });

      $scope.init = function(){
                  if(!$scope.$$phase) {
                      $scope.$apply(function() {
                          
                          $scope.UpdateRetention();

                      });
                }
                else
                {
                  $scope.UpdateRetention();
                }
    };

  $scope.alreadyretentionchartloaded=false;

  $scope.UpdateRetention = function()
  {
      // $scope.startdate=start;
      // $scope.enddate=end;
      // $scope.selectedfrequency=freq;

   var UserRetentionPromise  = analyticsService.getUserRetentionData($scope.startdate,$scope.enddate,$scope.selectedfrequency);
   UserRetentionPromise.then(function(response){

      data1 = response.data;
      console.log(data1);

      // data2=[ 
      //                 {"20140901":{"totnumberofusers":"628","Less 1 week":"500","1 week":"402","2 week":"300","3 week":"25"}},
      //                 {"20140908":{"totnumberofusers":"728","Less 1 week":"515","1 week":"412","2 week":"313","3 week":"88"}},
      //                 {"20140915":{"totnumberofusers":"828","Less 1 week":"534","1 week":"434","2 week":"329","3 week":"89"}},
      //                 {"20140922":{"totnumberofusers":"928","Less 1 week":"589","1 week":"467","2 week":"389","3 week":"101"}}
      //              ];
      //      console.log(data2);        
      updateuserretentionchart1("userRetentionchart",data1);

      $scope.alreadyretentionchartloaded = true; 
     })
  }

	function updateuserretentionchart1(tableId,data)
	{
		// console.log(data[0]["_id"]["key"]);
		// console.log(data[0]._id.key);
		// console.log(data[0].value);
		// console.log(data[0].value[0]);
		// console.log(data[1].value[0]);
		// console.log(data[2].value[0]);
		// console.log(data[3].value[0]);
		// console.log(data[4].value[0]);
		// console.log(data[5].value[0]);


	   var table = document.getElementById(tableId);
	   var rowCount = table.rows.length;
	   console.log(rowCount);
	   if(rowCount>0)
	   {
         console.log("if function called");
         $("table").children().remove();
	   }

       var i=0;
       var row,newcell;
	   if(data.length > 0)
	   { 
	      //console.log(mainkey);
	      
	      row = table.insertRow(0);
	      newcell=row.insertCell(i);
	      newcell.innerHTML ='<h4>&nbsp; Range &nbsp;</h4>';
	      newcell.className = 'headercolumn';
	      for(var key in data[0].value[0])
	      {
	      	i++;
	      	newcell = row.insertCell(i);
	      	if($scope.selectedfrequency=="Month")
	   	    {
               newcell.innerHTML ='<h4> &nbsp;'+moment(key, 'YYYYMM').format('MMM YYYY')+'&nbsp;</h4>';
	   	    }
			else
			{
				newcell.innerHTML ='<h4> &nbsp;'+moment(key, 'YYYYMMDD').format('DD MMM YYYY')+'&nbsp;</h4>';
			}
              //newcell.innerHTML ='<h4> &nbsp;'+key+'&nbsp;</h4>';
              newcell.className = 'headercolumn';
	      	  //console.log(key);
	      }

	      var j;

		  for(i=0;i<data.length;i++)
		  {
		   	
		   	row = table.insertRow(i+1);
	   	    j=0;
	   	    newcell = row.insertCell(j);
	   	    //moment(data[i]._id.key, 'yyyymmdd').format('ddmmyyyy')
	   	    if($scope.selectedfrequency=="Month")
	   	    {
               newcell.innerHTML ='<h4> &nbsp;'+moment(data[i]._id.key, 'YYYYMM').format('MMM YYYY')+'&nbsp;&nbsp;&nbsp;</h4>';
	   	    }
			else
			{
				newcell.innerHTML ='<h4> &nbsp;'+moment(data[i]._id.key, 'YYYYMMDD').format('DD MMM YYYY')+'&nbsp;&nbsp;&nbsp;</h4>';
			}
            
            newcell.className = 'headercolumn';
            mainkey=data[i]._id.key;
            j++;

		   	 for(var key in data[i].value[0])
		   	 { 

		   	 	 //console.log(mainkey);

		   	 	    newcell = row.insertCell(j);
		            newcell.innerHTML ='<h5> &nbsp;'+data[i].value[0][key]+'&nbsp;</h5>';
		            if((parseInt(data[i].value[0][key])/parseInt(data[i].value[0][mainkey])*100)>70)
		            {
		            	newcell.className = 'category71to100';
		            }
		            else if((parseInt(data[i].value[0][key])/parseInt(data[i].value[0][mainkey])*100)>40)
		            {
		            	newcell.className = 'category41to70';
		            }
		            else if((parseInt(data[i].value[0][key])/parseInt(data[i].value[0][mainkey])*100)>0)
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

       //   for(var mainkey in data[0].value[0])
	      // { 
	         
	      //    console.log(data[0].value[0]);
	      //    console.log(data[0].value[0]);
	      //    console.log(data[0].value[0]);
	      //    console.log(data[0].value[0]);
	      //    console.log(data[0].value[0][mainkey]);
	      //    //console.log(data[0].value[0]."20150829");
	      // }
	}
  // function updateuserretentionchart(tableId,data)
  // {

	 //   console.log(data);

	 //   var table = document.getElementById(tableId);
	 //   var rowCount = table.rows.length;
	 //   console.log(rowCount);
	 //   if(rowCount>0)
	 //   {
  //        //$(tableId + " tr").remove(); 
  //        console.log("if function called");
  //        //$(tableId).html("");
  //        $("table").children().remove();
	 //   }
       
  //      var i=0;
  //      var row,newcell;
	 //   for(var mainkey in data[0])
	 //   { 
	 //      //console.log(mainkey);
	      
	 //      row = table.insertRow(0);
	 //      newcell=row.insertCell(i);
	 //      newcell.innerHTML ='<h4>&nbsp; Range &nbsp;</h4>';
	 //      newcell.className = 'headercolumn';
	 //      for(var key in data[0][mainkey])
	 //      {
	 //      	  i++;
	 //      	  newcell = row.insertCell(i);
  //             newcell.innerHTML ='<h4> &nbsp;'+(key=="totnumberofusers"?"Total number of users":key)+'&nbsp;</h4>';
  //             newcell.className = 'headercolumn';
	 //      	  //console.log(key);
	 //      }
	 //   }

  //      var j;

	 //   for(i=0;i<data.length;i++)
	 //   {
	   	
	 //   	row = table.insertRow(i+1);

	 //   	 for(var mainkey in data[i])
	 //   	 { 
	 //   	 	j=0;
	 //   	    newcell = row.insertCell(j);
	 //   	    moment(mainkey, 'yyyymmdd').format('ddmmyyyy')
  //           newcell.innerHTML ='<h4> &nbsp;'+moment(mainkey, 'YYYYMMDD').format('MMM-DD-YYYY')+'&nbsp;&nbsp;&nbsp;</h4>';
  //           newcell.className = 'headercolumn';
  //           j++;

	 //   	 	 console.log(mainkey);
	 //   	 	 for(var key in data[i][mainkey])
	 //   	 	 {
	 //   	 	    newcell = row.insertCell(j);
	 //            newcell.innerHTML ='<h5> &nbsp;'+data[i][mainkey][key]+'&nbsp;</h5>';
	 //            if((parseInt(data[i][mainkey][key])/parseInt(data[i][mainkey]["totnumberofusers"])*100)>70)
	 //            {
	 //            	newcell.className = 'category71to100';
	 //            }
	 //            else if((parseInt(data[i][mainkey][key])/parseInt(data[i][mainkey]["totnumberofusers"])*100)>40)
	 //            {
	 //            	newcell.className = 'category41to70';
	 //            }
	 //            else if((parseInt(data[i][mainkey][key])/parseInt(data[i][mainkey]["totnumberofusers"])*100)>0)
	 //            {
	 //            	newcell.className = 'category0to40';
	 //            }
	 //            else
	 //            {
	 //            	newcell.className = 'categorynone';
	 //            }	            
	 //            j++;
	 //   	 	 }
	 //   	 }
	 //   }

  //  }

}]);