function Scene() {
    // 当前场景编号
    this.sceneNumber = 1;
    this.score = 0 
    // 初始化 1号场景
    this.init(1);
    this.bindEvent()
}
Scene.prototype.init = function(number) {
	// init 里面 只有一个 初始化的 参数  不要涉及 运动
    switch (number) {
        case 1:
        	// 一号场景  游戏封面  和 开始按钮
            this.background = new Background();
            this.land = new Land();
            // 初始化 title的 位置
            this.titleY = -48;
            // 初始化 button 的位置
            this.buttonY = game.canvas.height + 70;
            // 小鸟的 初始位置
            this.birdY = 170;
            this.birdDirection = "down"
            break;
        case 2:
        	// 教学 场景
            this.background = new Background();
            this.land = new Land();
            this.readyY = -62;
            // 修改 tutorial 的透明度
            this.tutorialOpacity = 1
            this.tutorialOpacityDirection = "down"
            break;
        case 3:
        	// 游戏的主场景
            this.background = new Background();
            this.land = new Land();
            this.bird = new Bird();
            break;
        case 4:
        	// 小鸟 落地 死亡的 爆炸动画 初始 图片
            this.boom = 0;
            break;
    }
};
Scene.prototype.render = function() {
	// 这里面才是真正的 渲染 方法  这里面 可以写动画 ，因为game类里面  render 此方法了
    switch (this.sceneNumber) {
        case 1:
        	// 渲染 背景类 和  大地类
            this.background.render();
            this.background.update();
            this.land.render();
            this.land.update();
            // 渲染title
            game.ctx.drawImage(game.res["title"], (game.canvas.width - 178) / 2, this.titleY);
            // 让title 和 button 动起来
            this.titleY += 2;
            if (this.titleY > 120) {
                this.titleY = 120
            }
            this.buttonY -= 5;
            if (this.buttonY < 330) {
                this.buttonY = 330
            }
            game.ctx.drawImage(game.res["button_play"], (game.canvas.width - 116) / 2, this.buttonY);

            // 小鸟 不停的 上下 动
            if (this.birdDirection == "down") {
                this.birdY++;
                if (this.birdY > 260) {
                    this.birdDirection = "up"
                }
            } else if (this.birdDirection == "up") {
                this.birdY--;
                if (this.birdY < 170) {
                    this.birdDirection = "down"
                }
            }

            game.ctx.drawImage(game.res["bird0_0"], (game.canvas.width - 48) / 2, this.birdY);
            break;
        case 2:
         	// 教学场景动画
            this.background.render();
            this.background.update();
            this.land.render();
            this.land.update();
            this.readyY += 2;
            if (this.readyY > 170) {
                this.readyY = 170
            }
            game.ctx.drawImage(game.res["text_ready"], (game.canvas.width - 196) / 2, this.readyY);
            // 让一个 物体 闪烁 的方式
            game.ctx.save();
            if (this.tutorialOpacityDirection == "down") {
                this.tutorialOpacity -= 0.01;
                if (this.tutorialOpacity <= 0.03) {
                    this.tutorialOpacityDirection = "up"
                }
            } else if (this.tutorialOpacityDirection == "up") {
                this.tutorialOpacity += 0.01;
                if (this.tutorialOpacity >= 1) {
                    this.tutorialOpacityDirection = "down"
                }
            }
            // globalAlpha 改透明度
            game.ctx.globalAlpha = this.tutorialOpacity
            game.ctx.drawImage(game.res["tutorial"], (game.canvas.width - 114) / 2, 250);
            game.ctx.restore();

            game.ctx.drawImage(game.res["bird0_0"] ,100,100)
            break;
        case 3:
            this.background.render();
            this.background.update();
            // 渲染 和 更新 大地类
            if(game.f % 100 == 0){
            	new Pipe(); 
            }
            this.land.render();
            this.land.update();
            // 管子类的渲染 和 更新
            for (var i = 0; i < game.pipeArr.length; i++) {
                game.pipeArr[i].render()
                game.pipeArr[i].update()
            }
            this.bird.render()
            this.bird.update()
            break;
        case 4:
        	// 让所有的 物体 静止 （update 不要调用了）
        	this.background.render();
			this.land.render();
			for (var i = 0; i < game.pipeArr.length; i++) {
                game.pipeArr[i].render() 
            }
            this.bird.render();
            // 让鸟的Y值 急速减少
            this.bird.y += 20;
            // 播放声音
            document.getElementById("down").play()
            // 保证鸟头垂直向下
            this.bird.deg+=0.5;
            if(this.bird.deg > 1.57){
            	this.bird.deg = 1.57
            }
            // 爆炸动画
            if(this.bird.y > game.canvas.height - 112){
            	this.bird.y = game.canvas.height - 112
            	// 没2帧 换一张图
            	game.f % 2 == 0 && this.boom++
            	if(this.boom >= 11){
            		// 清理 管子的数组 为下一回合注备
            		game.pipeArr = []
            		// 将场景编号 设置为1  并且 初始化到1号场景 
            		this.sceneNumber = 1
            		this.init(1);
            		// 分数默认是0
            		this.score = 0
            	}
            	game.ctx.drawImage(game.res["b" + this.boom],this.bird.x - 50,this.bird.y - 110)
            }
        	break;
    }
}
Scene.prototype.bindEvent = function() {
	// 添加监听  是根据 当前场景触发的 事件
    var self = this;
    game.canvas.onmousedown = function(e) {
        switch (self.sceneNumber) {
            case 1:
                var zuo = (game.canvas.width - 116) / 2
                var you = (game.canvas.width - 116) / 2 + 116
                var shang = 330
                var xia = 390
                if (e.offsetX >= zuo && e.offsetX <= you && e.offsetY <= xia && e.offsetY >= shang) {
                    // 点击进到 2号 场景
                    self.sceneNumber = 2
                    self.init(2)
                }
                break;
            case 2:
            	var zuo = (game.canvas.width - 114) / 2
                var you = (game.canvas.width - 114) / 2 + 114
                var shang = 250
                var xia = 350
                if (e.offsetX >= zuo && e.offsetX <= you && e.offsetY <= xia && e.offsetY >= shang) {
                    // 点击进入 3号场景
                    self.sceneNumber = 3
                    self.init(3)
                }
                break;
            case 3:
            	// 小鸟飞
                self.bird.fly()
                break;
            case 4:

        		break;
        }

    }
}