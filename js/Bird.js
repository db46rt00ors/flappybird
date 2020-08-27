function Bird(){
	// 所有的鸟的图片数组
	this.image = [game.res["bird0_0"],game.res["bird0_1"],game.res["bird0_2"]]
	this.y = 100;
	this.x = 100;
	// 下降的增量
	this.dy = 0.2;
	// 旋转的角度
	this.deg = 0;
	// 拍打翅膀
	this.wing = 0;
}
Bird.prototype.render = function(){
	// 改变鸟的 原点X,Y 进行小鸟旋转
	game.ctx.save();
	game.ctx.translate(this.x,this.y)
	// rotate 的参数是弧度 不是角度
	game.ctx.rotate(this.deg)
	game.ctx.drawImage(this.image[this.wing], -24 , -24);
	game.ctx.restore();
 
};
Bird.prototype.update = function(){
	// 下降的增量 0.88
	this.dy += 0.88;
	// 旋转的角度的增量 0.06
	this.deg += 0.06;
	this.y += this.dy; 
	// 没2帧拍打一次翅膀
	game.f % 2 && this.wing++;
	if(this.wing > 2){
		this.wing = 0
	}
	// 鸟的包围盒 this.x - 14 …… 因为 在小鸟旋转的时候  已经把 小鸟的 定位原点 移在了小鸟的中心
	this.x1 = parseInt(this.x - 14);
	this.x2 = parseInt(this.x + 14);
	this.y1 = parseInt(this.y - 12);
	this.y2 = parseInt(this.y + 14);
};
Bird.prototype.fly = function(){
	// 小鸟向上飞
	this.dy = -10;
	this.deg = -1.28;
	document.getElementById("fly").play()
};