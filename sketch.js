var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed
var bg,mImg;

function preload(){
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
bg=loadImage('images/BBenz.jpg');
mImg=loadImage('images/Milk.png');
}

function setup() {
	createCanvas(1000, 580);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()

  dog=createSprite(750,350);
  dog.addImage(dogimg1);
  dog.scale=0.5;
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  title=createElement('h1')
  title.html("Take Good Care of the Dog")
  title.position(100,-10);

  title=createElement('h3')
  title.html("Press 'Feed Me' to make the dog ready for eating & then add food and feed your lovely pet.")
  title.position(1080,200);

dogName=createInput("Enter Dog Name Here")
dogName.position(700,80);

enter=createButton("ENTER")
enter.position(900,80);

enter.mousePressed(function(){
  enter.hide();
  dogName.hide();
  var name=dogName.value()
  var greeting=createElement('h2')
  greeting.html("It's Feeding Time "+name);
  greeting.position(400,50)

})

  feed = createButton("FEED ME")
  feed.position(80,80)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(200,80)
  add.mousePressed(AddFood)

} 

function draw(){
 background(bg);

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
