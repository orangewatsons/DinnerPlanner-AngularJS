// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }


  $scope.addDishInCookiesToMenu=function(){
    $scope.menu=$scope.menuInCookies;

  }
  $scope.recipe = Dinner.Dish.get({id:$routeParams.dishId});

  $scope.dishCost = function(items){
  	return items * Dinner.getNumberOfGuests();
  }

  $scope.menu = Dinner.getFullMenu();
  /*
  $scope.menuInCookies=Dinner.getFullMenuCookies();

  for( var i=0; i< $scope.menu.length;i++){

    $scope.receipeInCookies=Dinner.Dish.get({id:$scope.menuInCookies[i]});

    $scope.menuInCookies.push(this.receipeInCookies);
    alert(this.receipeInCookies);
     //$scope.addDishInCookiesToMenu();
     //$scope.menu=$scope.menuInCookies;

  }

*/


  $scope.addDishToMenu = function(){
  //add dish to the menu (also store in to cookies);
  	$scope.menu.push(this.recipe); 
    Dinner.addDishtoMenuCookies($routeParams.dishId);
    

    Dinner.checkConfirmButton();
 

    Dinner.getTotalMenuPrice();
  }

 

 });