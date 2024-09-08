class Preloader extends Phaser.Scene {

    constructor ()
    {
        super('Preloader');
    }

   
    preload ()
    {
        
        const rW = 510, rH = 30;

        let preloadCont = this.add.container ( 960, 540 );

        let txta = this.add.text ( 0, -(rH + 30), 'Loading Files : 0%', { color:'#3a3a3a', fontFamily: 'Oswald', fontSize: 30 }).setOrigin(0.5);

        let recta = this.add.rectangle ( 0, 0, rW + 8, rH + 8 ).setStrokeStyle ( 2, 0x0a0a0a );

        let rectb = this.add.rectangle ( -rW/2, -rH/2, 5, rH, 0x3a3a3a, 1 ).setOrigin ( 0 );

        preloadCont.add ( [ txta, recta, rectb ] );


        this.load.on ('complete', function () {

            preloadCont.visible = false;

            this.showProceed ();

        }, this);

        this.load.on ('progress', function (progress) {

            preloadCont.last.width = progress * rW;

            preloadCont.first.text = 'Loading Files : ' +  Math.floor (progress  * 100)  + '%';

        });
        
        this.load.audioSprite('sfx', 'assets/sfx/fx_mixdown.json', [
            'assets/sfx/sfx.ogg',
            'assets/sfx/sfx.mp3'
        ]);
        
        this.load.audio ('properBg', ['assets/sfx/starcommander.ogg', 'assets/sfx/starcommander.mp3'] );

        this.load.audio ('introBg', ['assets/sfx/lounge.ogg', 'assets/sfx/lounge.mp3'] );
        
        this.load.image('bg', 'assets/images/bg.jpg');

        this.load.image('title', 'assets/images/title.png');

        this.load.image('clickhere', 'assets/images/clickhere.png');

        this.load.spritesheet('menu', 'assets/images/menu.png', { frameWidth: 368, frameHeight: 380 });

        this.load.spritesheet('proceed', 'assets/images/proceed.png', { frameWidth: 180, frameHeight: 180 });

        this.load.spritesheet('kinds', 'assets/images/kinds.png', { frameWidth: 100, frameHeight: 100 });

        this.load.spritesheet('kinds_sm', 'assets/images/kinds_sm.png', { frameWidth: 25, frameHeight: 25 });

        this.load.spritesheet('card', 'assets/images/card.png', { frameWidth: 140, frameHeight: 190 });

        this.load.spritesheet('people', 'assets/images/people.png', { frameWidth: 100, frameHeight: 135 });

    }

    showProceed () {

        var click = this.add.image ( 960, 540, 'clickhere');

        var img = this.add.image ( 960, 540, 'proceed').setInteractive ();

        img.on ('pointerover', function () {
            this.setFrame (1);
        });
        img.on ('pointerdown', function () {
            this.setFrame (2);
        });
        img.on ('pointerout', function () {
            this.setFrame (0);
        });
        img.on ('pointerup', () => {

            this.scene.start('SceneA');
        });

    }
    
    
}
