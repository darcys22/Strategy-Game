class Main extends Phaser.State {
 
    create() {
      this.bg = game.add.sprite(0,0,'sky');
      this.outposts = game.add.group();
      this.soldiers = game.add.group();
      this.unitText = game.add.group();

      for (var i = 0; i < 5; i++)
        {
          var outpost = this.outposts.create(game.rnd.between(30, this.game.width - 64), game.rnd.between(30, this.game.height - 64), 'pieces');

          outpost.frame = 8
          outpost.scale.setTo(1.3,1.3)
          outpost.inputEnabled = true;
          outpost.anchor.set(0.5, 0.5);
          outpost.input.useHandCursor = true;

          //outpost.events.onInputDown.add(this.selectFromOutpost, this);

        }
      this.outposts.onChildInputDown.add(this.selectFromOutpost, this);
    }

    update() {
      var textgroup = this.unitText;
      textgroup.removeAll()
      //this.unitText.removeAll()
      this.soldiers.forEach(function(baseSprite){
          var text = new Phaser.Text(game, baseSprite.x, baseSprite.y - 30, baseSprite.health);
          text.anchor.setTo(0.5, 0.5);
          textgroup.add(text)
      })
    }

    render() {
    
    }
    
    win() {
      //game.state.start('Landed');
    }

    selectFromOutpost( fromOutpost ) {
      this.fromOutpost = fromOutpost
      this.outposts.onChildInputDown.removeAll();
      this.outposts.onChildInputDown.add(this.selectToOutpost, this);

    }

    selectToOutpost( toOutpost ) {
      this.outposts.onChildInputDown.removeAll();
      this.outposts.onChildInputDown.add(this.selectFromOutpost, this);
      this.sendSoldiers(this.fromOutpost,toOutpost,1)

    }


    sendSoldiers(outpost1, outpost2, numberOfSoldiers) {

      var soldier = this.soldiers.create(outpost1.x, outpost1.y, 'pieces');
      soldier.frame = 11;
      soldier.anchor.set(0.5, 0.5);
      soldier.scale.setTo(0.7,0.7)

      var time = Math.sqrt(Math.pow(outpost1.x-outpost2.x,2)+Math.pow(outpost1.y-outpost2.y,2))*15

      var movement = game.add.tween(soldier);
      movement.to({x: outpost2.x, y: outpost2.y}, time, Phaser.Easing.Sinusoidal.InOut)
      movement.onComplete.add(function(){this.soldierReachOutpost(soldier,outpost2)},this);
      movement.start();
      }

    soldierReachOutpost(sprite, outpost2) {
      sprite.destroy();
    }

  
 
}
