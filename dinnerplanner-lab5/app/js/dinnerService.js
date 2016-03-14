// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  
  //check to see whether the numberOfGuest is in cookies
  // if yes, use the value in cookies, otherwise set 1
  var numberOfGuest = 1;
  if($cookieStore.get("numberOfGuest")!=undefined){

    numberOfGuest=$cookieStore.get("numberOfGuest");
  }

  var confirmSwitch


 /*reset the confirm button*/
   this.checkConfirmButton = function(){
    confirmSwitch=true;
    if(menu.length>0){
      confirmSwitch=false;
    }

    return confirmSwitch;
   }


  
  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
    $cookieStore.put("numberOfGuest",num);
  }

  this.getNumberOfGuests = function() {
    var result=$cookieStore.get("numberOfGuest");
    return result;

  }


/*test to see how to operate cookies out of dinnerService**/
this.getCookieNumberOfGuest=function(){
    var result=$cookieStore.get("numberOfGuest");
    return result;
}


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'18f3cT02U9f6yRl3OKDpP8NA537kxYKu'});
  
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'18f3cT02U9f6yRl3OKDpP8NA537kxYKu'}); 

  var menu = [];
  var menuInCookies=[];

  if($cookieStore.get("menu")){
    menuInCookies =$cookieStore.get("menu");
   // alert(menuInCookis.length);
    for(var i=0;i<menuInCookies.length;i++){
    //alert(menuInCookis[i]);
      var receipeInCookies=this.Dish.get({id:menuInCookies[i]});
      console.log("menuIncookies"+i+": "+menuInCookies[i]);
      menu.push(receipeInCookies);
    }
   // menu=menuInCookis;
  }

 

  this.getFullMenuCookies=function(){
    var result=$cookieStore.get("menu");
    return result;
  }
  this.getFullMenu = function(){
    
    return menu;
  }

  
  this.removeDishFromMenu = function(pos){
    menu.splice(pos, 1);
    menuInCookies.splice(pos,1);
    $cookieStore.put("menu", menuInCookies);

     }

  this.addDishtoMenuCookies=function(id){
    menuInCookies.push(id);
    $cookieStore.put("menu",menuInCookies);
    console.log("menu after adding"+$cookieStore.get("menu").length);
  }
 

  var totalCost = 0;


  this.getTotalMenuPrice = function(cost){

    var cells = document.querySelectorAll(".itemCost");
   
    console.log(cells);


    for (var i = 0; i < cells.length; i++){
      if(isNaN(cells[i].innerHTML) == true){
        cells[i].innerHTML = 0;
      }

      totalCost+=parseFloat(cells[i].innerHTML);
    }
     console.log(totalCost);
       
    return totalCost;

  }

  
  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});