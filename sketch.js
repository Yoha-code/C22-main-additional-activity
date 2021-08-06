const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

let engine;
let world;
var ball, ball2;
var ground;
var con, con2;
var log;
let angle;

function setup() {
  createCanvas(400,400);
  engine = Engine.create();
  
  world = engine.world;

  var ball_options = {
    restitution: 0.8
  }

  var log_options = {
    isStatic : true
  }
  
  
  ball = Bodies.circle(200,50,10,ball_options);
  World.add(world,ball);

  ball2 = Bodies.circle(200, 300, 10, ball_options);
  World.add(world, ball2);

  log = Bodies.rectangle(100, 200, 100, 20, log_options);
  World.add(world, log);
  
  con = Matter.Constraint.create({
          pointA:{x:200,y:20},
          bodyB:ball,
          pointB:{x:0,y:0},
          length:100,
          stiffness:0.01
        });
  
      World.add(world,con);

  con2 = Matter.Constraint.create({
        bodyA: ball,
        bodyB: ball2,
        length:100,
        stiffness:0.01
      });

      World.add(world, con2);
      
  
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  
}

function draw() 
{
  background(51);

  Engine.update(engine);
  
  Matter.Body.rotate(log, angle);

  push();
  
  translate(log.position.x, log.position.y);
  rotate(angle);
  
  rect(0, 0, 100, 20);

  pop();

  angle += 0.1;

  ellipse(ball.position.x,ball.position.y,10);
  ellipse(ball2.position.x,ball2.position.y,10);

  push();

  strokeWeight(2);
  stroke(255);
  line(con.pointA.x,con.pointA.y,ball.position.x,ball.position.y);
  line(ball.position.x,ball.position.y,ball2.position.x,ball2.position.y);

  pop();
  
}

function keyPressed()
{
  if(keyCode==RIGHT_ARROW)
    {
      Matter.Body.applyForce(ball,{x:0,y:0},{x:0.05,y:0});
    }
}

