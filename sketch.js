var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,monkeyStop;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivaltime;

function preload(){
  monkeyStop=loadImage("sprite_0.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}


function setup() {
  
  //createCanvas(600,600);
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4
  ground.x = ground.width/2;
  console.log(ground.x);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();

}


function draw() {
  
  background("white");
  
  
  if (gameState===PLAY){
  
  survivaltime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivaltime,100,50);
   if (ground.x < 0){
       ground.x = ground.width/2;
           
  } 
  
  Food();
  
  Obstacles();
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
    
    if(keyDown("space")&& monkey.y >= 100) {
       monkey.velocityY = -12;
  }
  
     else
      {
        
     if(obstacleGroup.isTouching(monkey)){
    
    gameState=END;
       
    ground.velocityX=0;   
    monkey.velocityY=0;     
       
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    //obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
    
  }  
    
  }
}
  drawSprites();

}


function Food() {
  
  //write code here to appear banana
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    monkey.depth =banana.depth;
     monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
    
  }
}
function Obstacles(){
  
 if (frameCount % 300 === 0){
    var obstacle = createSprite(400,310,10,40);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -6;
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 200;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
   
 }
}




