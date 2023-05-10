var path, path_img, runner, runner_img;
var obstacle, obstaclesGroup, obstacle_img;
var gameState = "play";

function preload(){
  runner_img = loadImage("assets/SUPERMAN.png");
  path_img = loadImage("assets/road.png");
  obstacle_img = loadImage("assets/knight.png");
}

function setup() {
  createCanvas(600, 200);
  path = createSprite(50, 180, 20, 50);
  path.addImage(path_img);
  path.velocityX = -5;
  
  runner = createSprite(70, 150);
  runner.addImage(runner_img);
  runner.scale = 0.05;
  runner.setCollider("circle", 0, 0, 400);
  

  obstaclesGroup = new Group();
}

function draw() {
  background("white");
  
  if (gameState === "play") {
    if (path.x < 0) {
      path.x = path.width / 2;
    }
    
    if (keyDown("up_arrow")) {
      runner.y = runner.y - 3;
    }
    
    if (keyDown("down_arrow")) {
      runner.y = runner.y + 3;
    }
    
    spawnObstacles();
    
    if (obstaclesGroup.isTouching(runner)) {
      gameState = "end";
    }
  } else if (gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
    
    path.velocityX = 0;
    runner.velocityY = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
}




function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(400, random(50, 150), 10, 40); // random y position between 50 and 150
    obstacle.addImage(obstacle_img);
    obstacle.velocityX = -6;
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
    obstacle.setCollider("circle", 0, 0, 100);
    
  }
}


