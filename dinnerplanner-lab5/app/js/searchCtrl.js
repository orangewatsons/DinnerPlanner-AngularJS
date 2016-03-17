// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner,$cookieStore) {

  // TODO in Lab 5: you will need to implement a method that searches for dishes
  // including the case while the search is still running.
  //alert($cookieStore.get("query"));
  $scope.$on('$viewContentLoaded', function(){

    if($cookieStore.get("query")!=undefined){
      //alert($cookieStore.get("query"))
      $scope.search($cookieStore.get("query"));
    }else{

      $scope.status = "Searching...";
      Dinner.DishSearch.get(function(data){
        $scope.dishes=data.Results;
        $scope.status = "Showing " + data.Results.length + " results";
      },function(data){
        $scope.status = "There was an error. Try again.";
      });
      console.log($cookieStore.get('numOfGuests'));
      console.log($cookieStore.get('dishID'));
    }      

  });


  $scope.search = function(query, dishType) {
    //alert(query); 
   // alert(2);
    $cookieStore.put("query",query);
  	$scope.status = "Searching...";
   	Dinner.DishSearch.get({any_kw:query},{category:dishType},function(data){
    	$scope.dishes=data.Results;
     	$scope.status = "Showing " + data.Results.length + " results";
   	},function(data){
     	$scope.status = "There was an error. Try again.";
   	});
  }

});