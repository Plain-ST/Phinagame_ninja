phina.globalize();

const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 960;
let ASSETS = {
    image: {
        'titlebg':'title.png',
        'enemy': 'typhoon.png',
        'player': 'ninja.png',
        'bg': 'background.png',
    },
}
phina.define('TitleScene', {
    superClass: 'DisplayScene',
    // コンストラクタ
    init: function() {
      this.superInit();
      // グループ
      var bgGroup = DisplayElement().addChildTo(this);
      // 背景追加
      (2).times(function(i) {
        Sprite('titlebg').addChildTo(bgGroup)
                    .setPosition(this.gridX.center() + i * SCREEN_WIDTH, this.gridY.center())
                    .setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

      }, this);
      // タイトル
      Label({
        text: '飛翔忍者',
        fontSize: 64,
      }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4));
  
      Label({
        text: "TOUCH START",
        fontSize: 32,
      }).addChildTo(this)
        .setPosition(this.gridX.center(), this.gridY.span(12))
        .tweener.fadeOut(1000).fadeIn(500).setLoop(true).play();
      // 画面タッチ時
      this.on('pointend', function() {
        // 次のシーンへ
        this.exit();
      });
    },

  });


phina.define("MainScene", {
    superClass: 'DisplayScene',
    init() {
        this.superInit();
        Sprite('bg').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
        this.player = Sprite('player').setPosition(SCREEN_WIDTH / 2, 100).addChildTo(this);
        this.player.width = 70;
        this.player.height = 70;
        this.enemyGroup = DisplayElement().addChildTo(this);
        this.time = 0;
        this.enemyspeed = 5;
        this.point = 0;
        this.coment = "";
    },
    update() {
        if (this.time % 150 === 0) {
            let position = Math.randint(-3, 3);
            Enemy().setPosition(SCREEN_WIDTH / 2 + position * 70, SCREEN_HEIGHT).addChildTo(this.enemyGroup);
            position = Math.randint(-3, 3);
            Enemy().setPosition(SCREEN_WIDTH / 2 + position * 70, SCREEN_HEIGHT).addChildTo(this.enemyGroup);
            position = Math.randint(-3, 3);
            Enemy().setPosition(SCREEN_WIDTH / 2 + position * 70, SCREEN_HEIGHT).addChildTo(this.enemyGroup);
            position = Math.randint(-3, 3);
            Enemy().setPosition(SCREEN_WIDTH / 2 + position * 70, SCREEN_HEIGHT).addChildTo(this.enemyGroup);
        }
        this.enemyGroup.children.each((enemy) => {
            enemy.y = enemy.y - this.enemyspeed;
            if (enemy.hitTestElement(this.player)) {
                this.exit({
                    backgroundColor: "#9400d3",
                    score: this.point,
                    message: this.coment
                });
            }
            if (enemy.y < 0) {
                enemy.remove();
                this.enemyspeed = this.enemyspeed + 0.05;
                this.point = this.point + 5;
                if(this.point<100){
                  this.coment = "まだまだ飛べるはず"
                }else if(this.point<200){
                  this.coment = "忍法鼫の術"
                }else if(this.point<300){
                  this.coment = "I can fly!!"
                }else{
                  this.coment = "ニンジャナンデ!!"
                }
            }
        })
        this.time++;
    },
    onpointstart(e) {
        if (e.pointer.x > SCREEN_WIDTH / 2 && this.player.x < SCREEN_WIDTH / 2 + 200) {
            this.player.x += 70;
        } else if (e.pointer.x < SCREEN_WIDTH / 2 && this.player.x > SCREEN_WIDTH / 2 - 200) {
            this.player.x -= 70;
        }
    }
});

phina.define('Enemy', {
    superClass: 'Sprite',
    init() {
        this.superInit('enemy');
        this.width = 70;
        this.height = 70;
    },
    update() {}
});
phina.main(function() {
  const app = GameApp({
    fps: 60,
    title: '飛翔忍者',
    startLabel: 'title',
    assets: ASSETS,
  })
  app.run();
});
