function Game() {
	this.f = 0;
    this.init();
    this.pipeArr = []; 
}
Game.prototype.init = function() {
    // 第一步 得到画布
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    // 第二步 创建 资源文件
    this.res = {
        "bg_day": "images/bg_day.png",
        "land": "images/land.png",
        "pipe_down" :"images/pipe_down.png",
        "pipe_up" :"images/pipe_up.png",
        "bird0_0" :"images/bird0_0.png",
        "bird0_1" :"images/bird0_1.png",
        "bird0_2" :"images/bird0_2.png",
        "title" :"images/title.png",
        "button_play" :"images/button_play.png",
        "text_ready" :"images/text_ready.png",
        "tutorial" :"images/tutorial.png",
        "b0" :"images/b0.png",
        "b1" :"images/b1.png",
        "b2" :"images/b2.png",
        "b3" :"images/b3.png",
        "b4" :"images/b4.png",
        "b5" :"images/b5.png",
        "b6" :"images/b6.png",
        "b7" :"images/b7.png",
        "b8" :"images/b8.png",
        "b9" :"images/b9.png",
        "b10" :"images/b10.png",
        "b11" :"images/b11.png",
    }
    var self = this;
    var length = Object.keys(this.res).length;
    var count = 0;
    for(var i in this.res){
    	var image = new Image();
    	image.src = this.res[i];
    	this.res[i] = image;
    	image.onload = function(){
    		count++;
    		self.clear();
    		// save 和 restore 配合使用 可以防止 污染人的样式
    		self.ctx.save();
    		self.ctx.font = "18px 微软雅黑";
    		self.ctx.fillStyle = "blue";
    		self.ctx.textAlign = "center"
    		self.ctx.fillText(`加载中${count} / ${length}`,self.canvas.width / 2 ,80);
    		self.ctx.restore();
    		if(count == length){
    			// 加载完成 可以开始游戏了
    			self.start();
    		}
    	}
    }
};
Game.prototype.clear = function() {
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
}
// 添加监听
// Game.prototype.bindEvent = function() {
// 	var self = this;
// 	this.canvas.onmousedown = function(){
// 		self.bird.fly()
// 	}
// }
Game.prototype.start = function() {
	// 游戏开始主 循环
	var self = this;
	// new 背景类
	// this.background = new Background();
	// this.land = new Land(); 
	// this.bird = new Bird(); 
    this.scene = new Scene(); 
	this.timer = setInterval(function(){
		self.f++;
		self.clear();
		// 渲染 和 更新 背景类
		/*self.background.render();
		self.background.update();
		// 渲染 和 更新 大地类
		self.f % 100 == 0 && new Pipe();
		self.land.render();
		self.land.update();
		// 管子类的渲染 和 更新
		for (var i = 0; i < self.pipeArr.length; i++) {
			self.pipeArr[i].render()
			self.pipeArr[i].update()
		}
		self.bird.render()
		self.bird.update()*/
        self.scene.render()
		self.ctx.font = "16px 微软雅黑";
        self.ctx.fillText(self.f,10,20);
        self.ctx.fillText(self.scene.sceneNumber,10,40);
		self.ctx.fillText(self.scene.score,10,60);
	}, 20)
}