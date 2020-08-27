function Background(){
	this.image = game.res["bg_day"];
	this.x = 0; 
}
Background.prototype.render = function(){
	game.ctx.save();
	// 这是天空的 猫腻 
	game.ctx.fillStyle = "#4ec0ca";
	game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height - 512);
	game.ctx.fill();
	// 连续 放3张图片 就可以让 背景无缝滚动
	game.ctx.drawImage(this.image,this.x,canvas.height - 512);
	game.ctx.drawImage(this.image,this.x + 288,canvas.height - 512);
	game.ctx.drawImage(this.image,this.x + 288 * 2,canvas.height - 512);
	game.ctx.restore();
};
Background.prototype.update = function(){
	// 背景 左 移动 小于背景的负宽度的时候 让 X = 0
	this.x--;
	if(this.x < -288){
		this.x = 0
	}
};