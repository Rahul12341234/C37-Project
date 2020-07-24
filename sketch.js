var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var time;
var sun, moon;

function preload(){
sadDog=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");

sun = loadImage("images/4-clipart-sun-4.png");
moon = loadImage("images/full-moon-clipart-free-19.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  time = createSprite(50, 50, 100, 100);

}

function draw() {
  background(46,139,87);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed >=12){
    time.addImage(moon);
    time.scale = 0.5;
    background("black");
    foodObj.display();
    text("Last Feed : "+ lastFed %12 + " PM", 350,30);
   }else if(lastFed==0){
     time.addImage(sun);
     time.scale = 0.05
     background(46,139,87);
     foodObj.display();
     text("Last Feed : 12 AM",350,30);
   }else{
     time.addImage(sun);
     time.scale = 0.05
     background(46,139,87);
     foodObj.display();
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}