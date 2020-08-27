function Pipe() {
	// 两根管子  一根向下 一根向上
    this.pipeDown = game.res["pipe_down"];
    this.pipeUp = game.res["pipe_up"];
    // 让管子 在 屏幕外侧就绪
    this.x = game.canvas.width;
    // 上管子 随机一个高度
    this.pipeDownHeight = _.random(50,300);
    // 间隙
    this.kongge = 130
    // 下管子的高度
    this.pipeUpHeight = game.canvas.height - 112 - this.pipeDownHeight - this.kongge;
    // 将管子 放入数组
    game.pipeArr.push(this)
}
Pipe.prototype.render = function() {
	// 两张图片在画布的位置
    game.ctx.drawImage(this.pipeDown,0,400 - this.pipeDownHeight,52,this.pipeDownHeight,this.x,0,52,this.pipeDownHeight)
    game.ctx.drawImage(
    	this.pipeUp,
    	0,
    	0,
    	52,
    	this.pipeUpHeight,
    	this.x,
    	this.pipeDownHeight + this.kongge,
    	52,
    	this.pipeUpHeight
    ); 
};
Pipe.prototype.update = function(){
	// 更新 管子  (让管子移动)
	this.x -= 2;
	if(this.x < -300){
		// 小于-300 释放数组
		this.goDie();
	}
    // 管子的包围盒
    this.x1 = parseInt(this.x);
    this.x2 = parseInt(this.x + 52);
    this.y1 = parseInt(this.pipeDownHeight);
    this.y2 = parseInt(this.pipeDownHeight + this.kongge);
    // 碰撞检测 写在管子类里面的原因就是 因为 写在小鸟类里面 需要遍历 管子 
    if(game.scene.bird.x2 > this.x1 && ( game.scene.bird.y1 < this.y1 || game.scene.bird.y2 > this.y2 ) && game.scene.bird.x1 < this.x2 || game.scene.bird.y2 > game.canvas.height - 112){
        // 死亡之后 调转4号场景 小鸟下坠 
        game.scene.sceneNumber = 4
        game.scene.init(4);
        document.getElementById("die").play()
    }else if(!this.isScore && game.scene.bird.x1 > this.x2){
        // 这里是记分 条件 就是把 是否 加分的 true 或者 false 给了管子身上
        this.isScore = true;
        game.scene.score ++;
        document.getElementById("score").play()
    }
}
Pipe.prototype.goDie = function(){
	// 释放数组的方法
	game.pipeArr = _.without(game.pipeArr, this);
}