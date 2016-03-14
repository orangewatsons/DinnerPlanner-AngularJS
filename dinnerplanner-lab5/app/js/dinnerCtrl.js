// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.confirmSwitch=Dinner.checkConfirmButton();

    $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

$scope.confirmSwitch = function() {
 
 return Dinner.checkConfirmButton();
 }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

  $scope.menuDishes = Dinner.getFullMenu();

  $scope.dishCost = function(items){
  	return items * Dinner.getNumberOfGuests();
  }

  $scope.remove = function(pos){
  	Dinner.removeDishFromMenu(pos);
    //Dinner.removeDishFromMenuInCookies(pos);
  }

  $scope.menuCost = Dinner.getTotalMenuPrice();




});