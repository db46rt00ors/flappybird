function Land() {
    this.image = game.res["land"];
    this.x = 0;
}
Land.prototype.render = function() {
    game.ctx.drawImage(this.image, this.x, game.canvas.height - 112)
    game.ctx.drawImage(this.image, this.x + 336, game.canvas.height - 112)
    game.ctx.drawImage(this.image, this.x + 336 * 2, game.canvas.height - 112)
};
Land.prototype.update = function(){
	this.x-=2
	if(this.x < -336){
		this.x = 0
	}
};