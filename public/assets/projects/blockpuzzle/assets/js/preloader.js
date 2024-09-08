class Preloader extends Phaser.Scene {

    constructor ()
    {
        super('Preloader');
    }
    preload ()
    {
        

        const mCont = this.add.container ( 540, 960 );


        let txtb = this.add.text ( 0, -60, 'Loading : 0%', { color:'#333', fontFamily:'Oswald', fontSize:34 }).setOrigin(0.5);

        //..
        let brct = this.add.rectangle ( 0, 0, 350, 40 ).setStrokeStyle (3, 0x0a0a0a);
        
        //..
        const rW = 340, rH = 30;

        let srct = this.add.rectangle ( -170, 0, 5, rH, 0x6a6a6a, 1 ).setOrigin(0, 0.5);


        mCont.add ([ txtb, brct, srct ]);


        this.load.on ('complete', function (progress) {
            mCont.visible = false;
        });


        this.load.on ('progress', function (progress) {

            txtb.setText ( 'Loading : ' + Math.ceil( progress * 100 ) + '%' );

            if ( (rW * progress) > 5) srct.setSize ( rW * progress, rH );

        });

        

        //scene2
        this.load.image('setting', 'assets/images/setting.png');

        this.load.image('gameOver', 'assets/images/gameOverScreen.png');
        
        this.load.image('scoresbg', 'assets/images/scoresbg.png');

        this.load.image('bga', 'assets/images/bg.png');

        this.load.image('settingsBg', 'assets/images/settingsScreen.png');


        this.load.spritesheet('gems', 'assets/images/gems.png', { frameWidth: 150, frameHeight: 150 });


        this.load.spritesheet('controls', 'assets/images/controls.png', { frameWidth: 130, frameHeight: 130 });

        this.load.spritesheet('cells', 'assets/images/cells.png', { frameWidth: 150, frameHeight: 150 });

        this.load.spritesheet('controls_xl', 'assets/images/controls_xl.png', { frameWidth: 160, frameHeight: 160 });
        
        this.load.spritesheet('buts', 'assets/images/buts.png', { frameWidth: 155, frameHeight: 155 });

        this.load.spritesheet('promptbtns', 'assets/images/promptbtns.png', { frameWidth: 210, frameHeight: 110 });

        this.load.audioSprite('sfx', 'assets/sfx/fx_mixdown.json', [
            'assets/sfx/sfx.ogg',
            'assets/sfx/sfx.mp3'
        ]);

        this.load.audio ('bgsound', ['assets/sfx/starcommander.ogg', 'assets/sfx/starcommander.mp3'] );


    }

    create ()
    {

        this.add.text ( 540, 960, 'Click Anywhere To Proceed', { color: '#333', fontFamily:"Oswald", fontSize: 40 }).setOrigin (0.5);

        this.input.once ('pointerup', () => {
            this.scene.start ('Intro');
        })
    }
    
}
