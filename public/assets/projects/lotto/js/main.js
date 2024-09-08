
( function () {

    //console.log ('chess...');

    let moving = false;

    let isWinner = false;

    let keysInited = false;

    let combinations = [];

    let drawn = [];

    let mainGame = {};

    const games = [

        {
            id : 1,
            name : 'Lotto',
            count : 42,
            sched : [ 2, 4, 6]
        },
        {
            id : 2,
            name : 'Mega Lotto',
            count : 45,
            sched : [ 1 , 3, 5 ]
        },
        {
            id : 3,
            name : 'Super Lotto',
            count : 49,
            sched : [ 0, 2, 4 ]
        },
        {
            id : 4,
            name : 'Grand Lotto',
            count : 55,
            sched : [ 1, 3, 6 ]
        },
        {
            id : 5,
            name : 'Ultra Lotto',
            count : 58,
            sched : [ 0, 5 ]
        },

    ];

    let isWindowFullScreen = false;


    window.onload = initGame;

    window.addEventListener ('contextmenu', e => {
        e.preventDefault();
    });

    window.addEventListener ('fullscreenchange', e => {
        
        if ( document.fullscreenElement ) {
            
            // console.log ('aasdf');

            gsap.set ('.fs-btn-open', { display : 'none' });

            gsap.set ('.fs-btn-close', { display : 'block' });

        }else {
            
            // console.log ('aasdf2');
            
            gsap.set ('.fs-btn-open', { display : 'block' });

            gsap.set ('.fs-btn-close', { display : 'none' });
            
        }
    });


    function initGame () {


        var elem = document.documentElement;


        createMenu ();

        addEvents ();

        animateMenu ();
        

    }

    function goFullScreen ( isFullscreen = true ) {

        if ( isFullscreen ) {

            var elem = document.documentElement;
            
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
            }

        }else {

            if (document.exitFullscreen) {
                document.exitFullscreen();

            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }

        }
    }


    function animateMenu () {

        var tl = gsap.timeline ({

            onComplete : () => {
                
                moving = false;
            }
        });

        tl 
            .add ('scene1')

            .set ('.top', { yPercent : 0 }, 'scene1')

            .fromTo ('.top', {scale : 0 }, { scale : 1, ease : 'power2.out', transformOrigin : '50% 2%', duration : 0.5 }, 'scene1')

            .fromTo ('.menu-item', {xPercent : -130, opacity : 0 }, { xPercent : 0, opacity : 1, ease : 'power2.out', duration : 0.5, stagger : 0.1  }, 'scene1+=0.3');

    }

    function backToMenu () {

        combinations = [];

        drawn = [];

        keysInited = false;

        resetKeyboard ();

        resetCard ();

        resetMainControls ();

        animateMenu ();
    }

    function resetKeyboard () {

        document.querySelectorAll ('.card-key').forEach ( el => {
            el.remove ();
        });

        document.querySelectorAll ('.card-key-lp').forEach ( el => {
            el.remove ();
        });
        
        // document.querySelector ('.card-key-lp').remove();

        gsap.set ('.card-keyboard', { yPercent : 100 });

    }

    function resetCard () {

        gsap.killTweensOf ('.card-number');

        document.querySelectorAll ('.card-element').forEach ( el => {
            el.remove ();
        });

        document.querySelector ('.card-body p').style.display = 'block';

        gsap.set ('.card-cont', { display : 'none' });
    }

    function resetMainControls () {



        document.querySelector('.card-button-1').classList.toggle ('is-disabled', false );

        document.querySelector('.card-button-2').classList.toggle ('is-disabled', true );

        gsap.set ('.card-button',  { yPercent : 0 });

        gsap.set ('.drawn-messaging',  { opacity : 0 });

        gsap.set ('.drawn-cont',  { display : "none" });


    
        console.log ( 'this is called');
        


    }


    function createMenu () {


        const todaysGame  = getTodaysGame ();

        // const todaysGame = games;

        const menuCont = document.querySelector('.menu-cont');

        for ( let i in todaysGame ) {

            
            const menuItem = document.createElement ('div');

            menuItem.classList.add ('menu-item', 'menu-item-'+ ( Number(i) + 1) );

            menuItem.dataset.id = todaysGame[i].id;

            //..
            const title = document.createElement ('div');

            title.classList.add ('menu-item-title' );

            title.innerHTML = "6/" + todaysGame[i].count;

       
            //..
            const desc = document.createElement ('div');

            desc.classList.add ('menu-item-desc' );

            desc.innerHTML = todaysGame[i].name;

            

            menuItem.append ( title, desc );

            //..
            menuCont.appendChild ( menuItem );
        }



    }

    function getTodaysGame () {

        var todaysGame = [];

        const d = new Date().getDay();

        //console.log ( d );

        for ( var i in games ) {

            let gameSched = games [ i ].sched;

            if ( gameSched.includes ( d ) ) todaysGame.push ( games[i] );
        }

        //console.log ( todaysGame );

        return todaysGame;

    }

    function addEvents () {

        document.querySelector('.fs-btn-open').addEventListener ('click', () => {
            goFullScreen ();
        });
        document.querySelector('.fs-btn-close').addEventListener ('click', () => {
            goFullScreen (false);
        });


        document.querySelector('.back').addEventListener ('click', () => {

            console.log ( moving );
            
            if ( !moving) backToMenu();

            
        } );

        document.querySelectorAll('.menu-item').forEach ( (el,i) => {

            el.addEventListener ('click', () => {

                if ( !moving ) menuClick ( Number (el.dataset.id ) - 1 ) ;

            });

        });

        document.querySelectorAll('.card-button').forEach ( (el,i) => {

            el.addEventListener ('click', () => {

                switch ( i ) {

                    case 0 : 
                        if ( combinations.length < 7 ) showEntryCard ();
                        break;
                    case 1:
                        if ( combinations.length >= 1 ) enterDrawSimulation ();
                        break;
                    default:
                }

            });

        });

        document.querySelectorAll('.card-key-bottom').forEach ( (el,i) => {

            el.addEventListener ('click', () => {

                switch ( i ) {

                    case 0 : 

                        resetKeys ();

                        hideKeyboard ();

                        break;
                    case 1:

                        resetKeys ();

                        break;
                    case 2 :

                        lpClick ();
                        // if ( getKeysClicked() >= 6 ) addToCard ();

                        
                        break;
                    default:

                        //..
                }
            });

        });

    }

    function hideKeyboard () {

        gsap.to ('.card-keyboard', { yPercent : 100, ease : 'power3.out',  duration : 0.5 });
    }

    function menuClick ( id ) {

        mainGame = games [ id ];

        //console.log ( mainGame );

        document.querySelector ('.card-title').textContent = '6/' + mainGame.count;

        document.querySelector ('.card-desc').textContent = mainGame.name;
        
        enterSimulation();

    }

    function enterSimulation () {

        moving = true;

        var tl = gsap.timeline({

            defaults : {
                ease : 'power3.out',
                duration : 0.6
            },

            onComplete : () => {
                //console.log ('end')
                moving = false;
            }
        })

        tl 
            .add ('scene1')

            .to ('.top', { yPercent : 1, ease : 'quad.in', duration : 0.2, }, 'scene1')

            .to ('.top', { yPercent : -100, ease : 'quad.inOut', duration : 0.8, }, 'scene1+=0.2')

            .to ('.menu-item', { xPercent : 130, ease : 'power2.out', duration : 0.4, stagger : 0.1  }, 'scene1+=0.3')


            .add ('scene2')

            .set ('.card-cont', { display : 'block' }, 'scene2')
            
            .from ('.card-button', { yPercent : 150 , duration : 0.6, ease : 'power4.out', stagger : 0.1 })


    }

    function showEntryCard ( length )  {

        if ( !keysInited ) keysInit ();

        gsap.set ('.card-keyboard', { display : "block" });

        gsap.fromTo ('.card-keyboard', { yPercent : 100 }, { yPercent : 0, ease : 'power3.out', duration : 0.5 });


    }

    function keysInit () {

        keysInited = true;

        document.querySelector ('.card-keys').classList.toggle ('card-keys-1', mainGame.count < 55 );

        document.querySelector ('.card-keys').classList.toggle ('card-keys-2', mainGame.count >= 55 );
        
        for (let i = 0; i < mainGame.count ; i++ ) {

            const key = document.createElement('div')

            key.classList.add ('card-key');

            key.textContent = i+1;

            key.dataset.isActive = 0;

            key.addEventListener ('click', keyClick );

            document.querySelector ('.card-keys').appendChild (key);

        }

        const lp = document.createElement('div')

        lp.classList.add ('card-key-lp');

        lp.textContent = 'ENTER';

        lp.addEventListener ('click', () => {
            
            if ( getKeysClicked() >= 6 ) addToCard ();

        });

        document.querySelector ('.card-keys').appendChild (lp);


    }

    function keyClick () {

        


        this.dataset.isActive = this.dataset.isActive == 1 ? 0 : 1;

        this.classList.toggle( 'is-active', this.dataset.isActive == 1 );
        
        enableKeys ( getKeysClicked() < 6 );
       
        //..

    }

    function resetKeys () {

        document.querySelectorAll ('.card-key').forEach ( el => {

            el.dataset.isActive = 0;

            el.classList.toggle ( 'is-active', false  );

            el.classList.toggle ( 'is-diisabled', false  );

        });

        enableKeys ();
    }

    function enableKeys ( enable = true ) {


        document.querySelectorAll ('.card-key:not(.is-active)').forEach ( el => {

            el.classList.toggle ('is-disabled', !enable );

            if ( enable ) {

                el.addEventListener ('click', keyClick );

            }else {

                el.removeEventListener ('click', keyClick );

            }

        });
    
    }

    function getKeysClicked () {

        const len = document.querySelectorAll('.card-key.is-active');

        return len.length;

    }

    function addToCard () {

        var combination = [];

        document.querySelectorAll('.card-key.is-active').forEach ( el => {

            combination.push ( Number ( el.textContent ) );

        });
        
        resetKeys ();

        hideKeyboard ();

        addCombinationToCard ( combination );
    }

    function addCombinationToCard ( combination, lp = false ) {

        const letters = "ABCDEFG";

        const tComb = combination.sort(function(a, b){return a - b});


        document.querySelector ('.card-body p').style.display = 'none';

        const cardBody = document.querySelector ('.card-body');

        const cardEl = document.createElement('div')

        cardEl.classList.add ('card-element');

        
        const cardLetter = document.createElement('div')

        cardLetter.classList.add ('card-letter');

        cardLetter.textContent =  letters.charAt( combinations.length ) + ":";


        const cardNumbers = document.createElement('div')

        cardNumbers.classList.add ('card-numbers', 'card-numbers-' + ( Number(combinations.length) + 1 ) );

        for (let i = 0; i < combination.length ; i++ ) {

            const number = document.createElement('div')

            number.classList.add ('card-number', 'card-number-' + ( Number(i) + 1 ) );

            number.textContent = tComb [ i ];

            cardNumbers.appendChild ( number );
        }


        const cardLP = document.createElement('div')

        cardLP.classList.add ('card-lp-indicator');

        cardLP.textContent = lp ? "LP" : "-";


        cardEl.append ( cardLetter, cardNumbers, cardLP );

        cardBody.appendChild  ( cardEl );

        combinations.push ( tComb );


        document.querySelector ('.card-button-1').classList.toggle ('is-disabled', combinations.length >= 7 );

        document.querySelector ('.card-button-2').classList.toggle ('is-disabled', combinations.length < 1 );


    }

    function lpClick () {

        //..
        let randomCombination = [];

        do {

            var randomNumber = Math.floor ( Math.random() * mainGame.count );

            if ( !randomCombination.includes ( randomNumber + 1 ) ) {

                randomCombination.push ( randomNumber + 1 );

            }

        }while ( randomCombination.length < 6 );

        //console.log ( randomCombination.sort(function(a, b){return a - b}) );

        resetKeys ();

        hideKeyboard ();

        addCombinationToCard ( randomCombination, true );


    }   
    
    function getNumbers ( max = 42, count = 10 ) {

        var temp = [];

        do {

            var randomNumber = Math.floor ( Math.random() * max ) + 1;

            if (  !temp.includes ( randomNumber) && !drawn.includes ( randomNumber) ) {

                temp.push ( randomNumber );

            }

        }while ( temp.length < count );


        return temp;

    }

    function drawNumber () {

        const circleCount = 10;

        const randomNumbers = getNumbers ( mainGame.count || 42, circleCount );

        //console.log ( drawn, randomNumbers );

        document.querySelector ('.main-circle').innerHTML = "";

        for ( var i = 0; i < circleCount; i++ ) {

                var circleEl = document.createElement ('div');

                circleEl.classList.add ('main-circle-el')

                circleEl.textContent = randomNumbers [i];

                gsap.set ( circleEl, { yPercent : i * 100 });

                document.querySelector ('.main-circle').appendChild ( circleEl );

        }

        const circLength = circleCount * 100 - 100;

        var tl = gsap.timeline({

            onComplete : drawComplete,

            onCompleteParams : [ randomNumbers [ randomNumbers.length - 1 ] ]
        });

        tl
            .to ('.main-circle-el', { yPercent : '-=' + circLength , duration : 1, ease : 'linear' })

            .set ('.main-circle-el', { yPercent : i => {
                return i * 100;
            }})

            .to ('.main-circle-el', { yPercent : '-=' + circLength , duration : 2, ease : 'power2.out' });

            
        gsap.fromTo ('.draw-progress', { width : 0 }, { width : '100%', ease : 'power2.out', duration : tl.duration() });
            

    }

    function drawComplete ( lastNumber ) {


        drawn.push ( lastNumber );

        // drawn.push ( combinations[0] [ drawn.length ]);

        gsap.set ('.circle-' + drawn.length, { opacity : 1, textContent : lastNumber  });

        gsap.fromTo ('.circle-' + drawn.length, {scale : 0}, { scale : 1, transformOrigin : '50% 50%', ease : 'elastic(1.2, 0.8)', duration : 0.8 });

        if ( drawn.length < 6 ) {
            setTimeout ( drawNumber, 500 );
        }else {
            console.log ('end');
            setTimeout ( showWinningNumbers, 1500 );
        }
        
    }

    function enterDrawSimulation () {

        var tl = gsap.timeline ({

            delay : 0.4,

            onComplete : drawNumber

        });

        tl
            .add ('scene1')

            .to ('.card-button', { yPercent : 300, ease : 'power2.out', duration : 0.8, stagger : {

                each : 0.1,
                from : 'end'

            } }, 'scene1')

            .add ('scene2')

            .set ('.simulation-cont', { display : "block" }, 'scene2')

            .fromTo ('.simulation-cont', { yPercent : 100 },{ yPercent : 0, ease : 'power3.out', duration : 0.8 }, 'scene2');
        
    }

    function showWinningNumbers () {

        moving = true;

        var fin = drawn.sort(function(a, b){return a - b}) ;

       

        gsap.to ('.simulation-cont', { yPercent : 100, ease : 'power3.out', duration : 0.8, onComplete : () => {

            document.querySelector ('.main-circle').innerHTML = "";

            gsap.set ('.circle', { opacity : 0 });

            gsap.set ('.drawn-cont', { display : 'block' });

            gsap.set ('.d-circle', { textContent : i => {

                return fin [i];

            }});

            gsap.to ('.d-circle', { yPercent : -25, ease : 'power2.inOut', yoyoEase : 'bounce', duration : 0.8, stagger : {

                amount : 0.7,
                from : 'start',
                yoyo : true,
                repeat : 1

            }, onComplete : showMatchingNumbers });


            
            
        } });
    }

    function showMatchingNumbers  () {

        for ( let i in combinations ) {


            var counter = 0;

            const numbersCont = document.querySelector ('.card-numbers-' + ( Number(i) + 1 ));

            // console.log ( combinations [i] );


            for ( let j in drawn ) {

                var index = combinations[i].indexOf ( drawn[j] );

                if ( index !== -1 ) {

                    const myNumber = numbersCont.querySelector ('.card-number-' + (Number(index) + 1));

                    gsap.to ( myNumber, { backgroundColor : '#33ff33', yoyo : true, repeat : -1, ease : 'linear', duration : 0.6 })

                    counter++;

                }
            }


            // if ( counter >= 6 ) return true;

            if ( counter >= 6 ) {

                document.querySelector ('.drawn-messaging').textContent = "Congrats! You hit the jackpot.";
                
            }

        }

        gsap.set ('.drawn-messaging', { opacity : 1 });

        gsap.fromTo ('.drawn-messaging', { yPercent : 50, opacity :  0}, { yPercent : 0, opacity : 1, ease : 'power3.out', duration : 1, onComplete : () => {
            moving = false;
        }});


        //return false;
    }

    

})();