var Dog;

var shelf;

var happyDog;

var Food;

var FoodStock;

var database;

var gameState = 0;

var foodObj;

var lastFed;

function preload()
{
  shelfImage = loadImage("Images/Shelf.png");

	DogImage = loadImage("Images/dogImg.png");

  happyDogImage = loadImage("Images/dogImg1.png");

  backgroundImg = loadImage("Images/BgImage1.jpg");
  
  MilkImage = loadImage("Images/Milk.png");
}

function setup() {
	createCanvas(700,500);

  database = firebase.database();
  
  Dog = createSprite(550,400);
  Dog.addImage(DogImage);
  Dog.scale = 0.2;

  foodObj = new Milk();
  
  FoodStock = database.ref('Food');
  FoodStock.on("value", readStock);

  feed = createButton("Feed The Dog");
  feed.position(600, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}


function draw() {  
 background(backgroundImg); 

 lastFedRef = database.ref('FeedTime');
 lastFedRef.on("value", function(data){
   lastFed  = data.val();
   console.log(lastFed);
 })

 foodObj.display();
 


  textSize(20);
  fill("black");
  text("Food Remaining: " + FoodStock, 310, 110);

  if(FoodStock <= 0){
    Dog.addImage(DogImage);
  }

  if(lastFed >= 12){
    text("Last Feed: " + lastFed % 12 + " PM", 330, 30);
  }
  else if(lastFed == 0){
    text("Last Feed: 12 AM", 330, 30);
  }
  else{
    text("Last Feed: " + lastFed + " AM", 330,30);
  }

  drawSprites();
}

function readStock(data){
  FoodStock = data.val();
  foodObj.updateFoodStock(FoodStock);
}

function writeStock(x){

  if(x <=0){
    x = 0;
  }
  else{
    x = x-1;
    Dog.addImage(happyDogImage);
  }

  database.ref('/').update({
    Food: x
  })

}

function feedDog(){

  Dog.addImage(happyDogImage);
  
  if(foodObj.getFoodStock()<= 0){
    Dog.addImage(DogImage);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    addFood.show();
  }

  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
 if(FoodStock <= 24){
  FoodStock++;
  database.ref("/").update({
    Food: FoodStock
  })
}
else{
  addFood.hide();
}
}



