
var pug = new Image();
pug.src = "pug.png";

var kitty = new Image();
kitty.src = "kitten.jpg";

var space = new Image();
space.src = "space.jpg";

var alien = new Image();
alien.src = "alien.png";

var woof = new Audio('woof.wav');


var alienList = new Array();
var alienCount = 0;
var kittyList = new Array();
var kittyCount = 0;
var pugX = 50;
var pugY = 50;
var canvas = 0;
var context = 0;
var pugImgX = 0;




//load canvas
window.onload = function(){
		//this sets up the canvas and stuff
		canvas = document.getElementById("paper"),
		context = canvas.getContext("2d");

		setInterval("mainLoop();",32);
		setInterval("alienTest();", 3200);

};

//draw your things (canvas cat pug)
function mainLoop()
{	
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.drawImage(space, 0, 0);	

	context.drawImage(pug, pugImgX, 0, 128, 128, pugX, pugY, 128, 128);
	
	for (var i = 0; i < kittyCount; i++) //sets up kitty list for multiple kitty rockets
		{
			context.drawImage(kitty, 0,0, 50, 38, kittyList[i].x, kittyList[i].y, 50,38);
			kittyList[i].x += 10;
		}

	for (var j = 0; j < alienCount; j++)
		{
			context.drawImage(alien, 0, 0, 100, 100, alienList[j].x, alienList[j].y, 100, 100);
			alienList[j].x -= 10;
		}
		checkCollisions();
}
//these are the controls
function keyDown(evt)
{
   switch (evt.keyCode) 
   {
      case 87: // W
         pugY -= 20;
         break;
      case 65: // A
         pugX -= 20;
         pugImgX = 0;
         break;
      case 83: // S
         pugY += 20;
         break;
      case 68: // D
         pugX += 20;
         pugImgX = 128;
         break;
       case 32: //Spacebar
       	 fireWeapon();
       	 break;
	
       	
    }

    checkPugCollision();
 
	return false; 
   
}

 function checkPugCollision() //pug can't escape 
 {
 	if (pugX < 0)
 		pugX = 0;	
 	if (pugY < 0)
 		pugY = 0;
 	if (pugX > canvas.width - 128)
 		pugX = canvas.width - 128;
 	if (pugY > canvas.height - 128)
 		pugY = canvas.height - 128;
 }

 function fireWeapon()//fire kitties!
{
	 			
    var kittyPos = {x: pugX, y: pugY};
	kittyList[kittyCount] = kittyPos;
	kittyCount = kittyCount + 1; 
	
    woof.play();	

}

 function alienTest()
{
	var alienPos = {x: canvas.width + 50, y: (Math.random() * canvas.height - 150)};
	alienList[alienCount] = alienPos;
	alienCount = alienCount + 1; 
}

 function checkCollisions()
{
	for (var i = 0; i < kittyCount; i++)
	{	
		for (var j = 0; j < alienCount; j++)
		{
			if (kittyList[i].x >= alienList[j].x && kittyList[i].x <= alienList[j].x + 100 && kittyList[i].y >= alienList[j].y && 				kittyList[i].y <= alienList[j].y + 100)
				{
					kittyList[i].x = -100; kittyList[i].y = -100; alienList[j].x = -100, alienList[j].y = -100;		
				}
	
		}
	}	
}
			
window.addEventListener('keydown', keyDown, true); 


