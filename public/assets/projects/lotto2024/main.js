(function () {

    let mainArr = [];

    let combs = 7;

    let schedule = [
        [ 58, 49 ],
        [ 55, 45 ],
        [ 58, 49, 42 ],
        [ 55, 45 ],
        [ 49, 42 ],
        [ 58, 45 ],
        [ 55, 42 ]
    ];

    let dateNames = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    let date = new Date ();
   
    function init () {


        document.getElementById ('generateBtn').addEventListener ('click', () => {
            getGame();
        });
        document.getElementById ('showSchedule').addEventListener ('click', () => {
            showSchedule ();
        });
        document.getElementById ('closeBtn').addEventListener ('click', () => {
            showSchedule (false);
        });

        document.querySelectorAll('#game option').forEach ( (el, i ) => {
            if ( el.value == schedule[date.getDay()][0]) {
                el.selected = true;
            }
        });

        //..
        var schedCont = document.getElementById('sched-cont');

        var arr = schedule [ date.getDay() ];


        for ( let i = 0; i < arr.length; i++ ) {

            var sched = document.createElement ('div');
            sched.classList.add ('sched');
            sched.innerText = '6/' + arr [i];
            
            schedCont.append (sched);

        }

        initCalendar ();

    }

    function getGame () {
        
        let game = document.querySelector('#game').value;

        console.log ('this', game);

        mainArr = [];

        for ( let i = 0; i < combs; i++ ) {

            let arr = generateCombination ( game );

            mainArr.push ( arr );
        }

        //console.log ( mainArr );

        showGeneratedCombinations ();

        getIdenticalNumbers ();
    }

    function showFinal ( number ) {

        return number < 10 ? '0' + number : number;
    }

    function showGeneratedCombinations () {

        document.getElementById('identicals').innerHTML = "";

        var container = document.getElementById('res');

        container.innerHTML = "";


        for ( let i = 0; i < mainArr.length; i++ ) {

            var combContainer = document.createElement('div');
            
            combContainer.classList.add ('combination');

            for ( let j = 0; j < mainArr[i].length; j++ ) {

                var box = document.createElement('div');
            
                box.classList.add ('box', 'box-'+ j + '-' + i);

                box.innerText = showFinal ( mainArr [i][j])

                combContainer.appendChild( box);
            }

            container.append (combContainer);
        }

        //check...


    }

    function generateCombination ( gameValue = 42 ) {

        let tmpArr = [];

        for ( var i = 0; i < gameValue; i++ ) {

            tmpArr.push ( i + 1 );
        }

        let finArr = [];

        do {

            let randomIndex = Math.floor (Math.random() * tmpArr.length);

            // console.log ( tmpArr.length );

            finArr.push ( tmpArr[ randomIndex ]);

            tmpArr.splice ( randomIndex, 1);

        }while ( finArr.length < 6 );

        finArr.sort(function(a, b) {
            return a - b;
        });

        return finArr;
    }
    
    function getIdenticalNumbers () {
        //..
      
        // var tmpArr = [];

        var container = document.getElementById('identicals');

        var comb = document.createElement ('div');
        
        comb.classList.add ('combination');

        container.append (comb);


        for (let i = 0; i < 6; i++) {

            let arr = [];

            for (let j = 0; j < mainArr.length; j++) {
                //..
                arr.push ( mainArr[j][i] );
            }
            

            let obj = { number : 0, count : 0 };

            for ( let k = 0; k < arr.length; k++ ) {

                // let count = 0;

                let identicalArr = [];

                identicalArr.push ( k );


                for ( let l = 0; l < arr.length; l++ ) {

                    if (  k !== l && arr[k] === arr[l] ) {
                        
                        // count += 1;

                        identicalArr.push ( l );

                    }
                    
                }


                if ( obj.number !== arr[k] && obj.count < identicalArr.length && identicalArr.length > 1 ) {

                    obj.number = arr [k];

                    obj.count = identicalArr.length;

                    blinkIt ( i, identicalArr );
                }

            }
            
            //..

            var box = document.createElement('div');
            
            box.classList.add ('box', 'box-fin-' + i );

            box.innerText = obj.number == 0 ? '-' : showFinal ( obj.number )

            comb.appendChild(box);


        }

        return false;
    }

    function blinkIt ( col, arr ) {

        //..
        // console.log ( 'asdf', col, arr );

        for ( let i = 0; i < arr.length; i++ ) {

            var box = document.querySelector ('.box-' + col + '-' + arr[i] );

            box.classList.add ('blink');
        }
    }

    function initCalendar () {

        var cont = document.querySelector('.dates');

        var cont2 = document.querySelector('.games');


        for ( let i = 0; i < schedule.length; i++ ) {

            var adiv = document.createElement ('div');
                
            adiv.classList.add ('item');

            if ( i === date.getDay() ) adiv.style.backgroundColor = "#c3c3c366";

            cont2.append ( adiv );


            //..
            var dates = document.createElement ('div');
                
            dates.classList.add ('date');

            dates.innerText = dateNames [i];

            cont.append ( dates );

            
            for ( let j = 0; j < schedule[i].length; j++ ) {

                var sdiv = document.createElement ('div');
                
                sdiv.classList.add ('item-box');

                sdiv.innerText = '6/' + schedule[i][j];

                adiv.append ( sdiv );
                
            }

        }

        
    }

    function showSchedule ( show = true ) {

        document.getElementById('calendar-cont').style.visibility = show ? 'visible' : 'hidden';
    }
    init ();


})();