var dogimg, happyDog;
var database;
var dog;
var foodS, foodStock;

var addFood, feedFood;
var feedTime, lastFed;
var foodobj;

function preload()
{
	dogimg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(800, 700);
  dog = createSprite(400, 250, 20, 20);
  dog.addImage(dogimg);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock(foodS), showError());

  foodobj = new Food();

  feedFood = createButton("Feed the Dog");
  feedFood.position(700, 95)
  feedFood.mousePressed(feedDog)

  addFood.createButton("Add food")
  addFood.position(800, 95)
  addFood.mousePressed(addFoods)
}


function draw() {
  background(46, 139, 87)

  drawSprites();
  textSize(20)
  fill(255);
  text("Food Stock: " + foodS, 50, 50);

function readStock(data){
  foodS = data.val();
}

function feedDog(x){
   if (x <= 0){
    x = 0;
  } 
  else{
    x = x - 1;
  }

  database.ref('/').update({
    'Food': x
  })
}

function showError(){

}

function reviveStock(x){
  if (x === 0){
    x = 20;
  }

  database.ref('/').update({
    'Food': x
  })
  }
}