var game = new Phaser.Game(800, 500, Phaser.AUTO, 'main_game'); 

game.state.add('Boot', Boot, false);
game.state.add('Load', Load, false);
game.state.add('Main', Main, false);
game.state.add('Win', Win, false);
game.state.start('Boot');
