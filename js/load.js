class Load extends Phaser.State {
 
    preload() {
      game.load.image('sky', 'assets/sky.png')
      game.load.spritesheet('pieces', 'assets/chess_pieces.png', 64, 64)
         
    }
 
    create() {
      game.state.start('Main');
 
    }

}
