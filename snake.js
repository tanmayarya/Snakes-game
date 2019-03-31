//snake game


function init(){
	canvas = document.getElementById('mycanvas');
	scorecard = document.getElementById('score');
	score = 0;
	gameOver =false;
	pen = canvas.getContext('2d');
	W = canvas.width;
	H = canvas.height;

	food = getRandomFood();

	snake = {
		init_length: 5,
		color: "yellow",
		cells: [],
		direction: "right", 

		createSnake: function(){ 
			for (var i = this.init_length - 1; i >= 0; i--) {
				this.cells.push({x:i,y:0});
			}
		},

		drawSnake: function(){
			pen.fillStyle = this.color;
			pen.strokeStyle = "black";
			pen.lineWidth = 3;

			for (var i = 0; i < this.cells.length; i++) {
				pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
				pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
			}
		},

		updateSnake: function(){
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(snake.direction=="right"){
				nextX = headX + 1;
				nextY =headY;
			}
			else if(snake.direction=="left"){
				nextX = headX - 1;
				nextY =headY;
			}
			else if(snake.direction=="up"){
				nextX = headX;
				nextY =headY - 1;
			}
			else if(snake.direction=="down"){
				nextX = headX;
				nextY =headY + 1;
			}
			if(headX == food.x && headY == food.y){
				scorecard.textContent = "Score :  " + ++score;
				food = getRandomFood();
			}
			else
				this.cells.pop();

			this.cells.unshift({x:nextX , y:nextY});

			var lastX = Math.round(W/10);
			var lastY = Math.round(H/10);

			if(this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY){
				alert("Game Over");
				gameOver = true;
			}

		}

	};


	snake.createSnake();

	function KeyPressed (e){
		if(e.key == "ArrowRight")
			snake.direction = "right";

		else if(e.key == "ArrowLeft")
			snake.direction = "left";

		else if(e.key == "ArrowUp")
			snake.direction = "up";

		else if(e.key == "ArrowDown")
			snake.direction = "down";
	}

	document.addEventListener('keydown', KeyPressed);
}

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	console.log("draw");


	pen.fillStyle = food.color;
	pen.fillRect(food.x*10,food.y*10,10,10);

}

function update(){
	snake.updateSnake();
}


function gameLoop(){

	draw();
	update();

	if(gameOver == true){
		clearInterval(f);
	}
}

function getRandomFood(){
	var foodX = Math.round(Math.random()*(W-10)/10);
	var foodY = Math.round(Math.random()*(H-10)/10);

	foodColors = ["red", "green", "aqua", "coral", "orchid", "white", "blue"];
	var i = Math.round(Math.random()*(foodColors.length - 1));

	var food = {
		x: foodX,
		y: foodY,
		color:foodColors[i]
	};

	return food;
}

init();
var f = setInterval(gameLoop,100);