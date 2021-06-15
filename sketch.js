var dog, happyDog, database, foodS, foodStock

function preload()
{
	dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  Dog = createSprite(250,300,150,150);
  Dog.addImage(dog)
  Dog.scale = 0.15

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background("green");
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);   
    Dog.addImage(happyDog);
  }


  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food Remaining: " + foodS, 170, 200);
  textSize(10);
  text("Note: Press Up Arrow Key to feed Dog", 120, 10);

}

function readStock(data){
  foodS = data.val();

}

function writeStock(x){
  if(x<=0){
    x=0
  } else {
    x=x-1
  }

  database.ref('/').update({
    Food:x
  });

  
}

