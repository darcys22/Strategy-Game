class Boot extends Phaser.State {
 
    create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.state.start('Load');
    }
 
}
