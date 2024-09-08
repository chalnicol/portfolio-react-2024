

var cards = [], 

    currentCardShown = 0,

    cardShown = false,

    cardMoving = false;

let swiped = false;

let timer, flashAnim;

const myPanels = [ 'Malory Towers', 'La Course Toques', 'Kung Fu Panda', 'La Agents Jean', 'Alvin Chipmunks' ];

window.onload = preloadFiles;

window.addEventListener('resize', resize );



function preloadFiles() {

    var toPreload = [

        { type: "js", url: "js/gsap.min.js" },
        { type: "js", url: "js/hammer.min.js" },
  
        { type: "image", url: "images/nav_back.png", },
        { type: "image", url: "images/nav_next.png", },
        
        { type: "image", url: "images/bg.png", },

        { type: "image", url: "images/img1.png", },
        { type: "image", url: "images/img2.png", },
        { type: "image", url: "images/img3.png", },
        { type: "image", url: "images/img4.png", }, 
        { type: "image", url: "images/img5.png", }, 

        { type: "image", url: "images/desc1.png", },
        { type: "image", url: "images/desc2.png", },
        { type: "image", url: "images/desc3.png", },
        { type: "image", url: "images/desc4.png", }, 
        { type: "image", url: "images/desc5.png", }, 
        
        { type: "image", url: "images/tap_logo.png", },
        { type: "image", url: "images/tap_txt1.png", },
        { type: "image", url: "images/tap_txt2.png", },
        { type: "image", url: "images/tap_view.png", }, 

        { type: "image", url: "images/bot_logo.png", }, 
        { type: "image", url: "images/bot_txt.png", }, 
        { type: "image", url: "images/bot_bg.png", }, 
        
        
    ];
  
  
    var filesLoaded = 0,
      perc = 0;
  
    for (var i in toPreload) {
  
      let file;
  
  
      if (toPreload[i].type == "js") {
  
        file = document.createElement("script");
  
        file.src = toPreload[i].url;
  
        document.body.appendChild(file);
  
        // script.addEventListener("load", countLoaded);
  
      } else if (toPreload[i].type == "image") {
  
        file = new Image();
  
        file.src = toPreload[i].url;
  
        // img.addEventListener("load", countLoaded);
  
      }
  
      file.addEventListener ('load', () => {
  
        filesLoaded++;
  
        console.log(filesLoaded + "/" + toPreload.length);
  
        perc = (filesLoaded / toPreload.length) * 100;
  
        document.querySelector(".progress").style.width = perc + "%";
  
        if (perc >= 100) {
          document.querySelector(".progress-bar-cont").style.display = "none";
  
          initAd();
        }
  
      });
  
  
    }
  
}

function getFlex () {

    //375 : 747 

    //125 : 249

    const ratio = { wR : 125, hR : 249 };
    
    const w = document.querySelector('.container').clientWidth;
    
    const h = document.querySelector('.container').clientHeight;

    let fw = 0, fh = 0;

    if ( w > h ) {

        fh = h;

        fw =  (ratio.wR / ratio.hR) *fh;

    }else {

        const calcW = w; 

        const calcH = ratio.hR / ratio.wR * calcW;

        if ( calcH > h ) {
        
            fh = h;

            fw =  (ratio.wR / ratio.hR) *fh;

            //fw = 2/3 *fh;

        }else {

            fw = w;

            // fh = 3/2*fw;;

            fh =  (ratio.hR / ratio.wR ) *fw;

        }
    
    }

    return { w : fw, h : fh };

}

function resize () {

     // flexible
     const flex = getFlex ();

     gsap.set ('.flex', { width : flex.w, height : flex.h });
 
     console.log ( flex.w, flex.h );

}

function initAd () {


    gsap.set('.container', { display: 'block' });

    //resize..
    resize ();

    //..
    getCards ();


    //init animation..
    let tl = gsap.timeline({ defaults: { ease:'none' }, onComplete : addEvent });

    tl.add ('scene1')

    .to('.card', {duration: .4, xPercent : function ( index ) {
            return ( index * 100/ cards.length ) - 100;
        }, 
        stagger : {
            each : 0.1,
            from : 'start'
        },
        ease : 'power3.out'
    }, 'scene1+=0.3')

    .to ('.card-img', { duration : .2, xPercent: (i) => {

       let xP = 0;

        switch (i) {
            case 0 : 
                xP = -38;
                break;
            case 1 : 
                xP = -30;
                break;
            case 2 : 
                xP = -36;
                break;
            case 3 : 
                xP = -42;
                break;
            case 4 : 
                xP = -35;
                break;
            default : 
                xP = -30;
        }
       return xP;

    } }, 'scene1+=0.3')

    .from ('.tap-logo', { duration:0.6, opacity: 0 }, 'scene1+=0.8')

    .from ('.tap-txt-1', { duration:0.8, opacity: 0 }, 'scene1+=1.1')

    .from ('.tap-txt-2', { duration:0.8, opacity: 0 }, 'scene1+=1.4')

    .from ('.tap-view', { duration:0.8, opacity: 0 }, 'scene1+=1.8')
    
    .to ('.tap-view', { scale:0.90, duration : 0.2, yoyo:true, repeat : 3, transformOrigin:'50% 65%' }, 'scene1+=2.1')

    // .to (['.tap-overlay', '.tap-txt', '.tap-logo', '.tap-view'], { opacity : 0 }, 'scene1+=3')

    // .add ('scene2', 'scene1+=3.3')

    // .set ('.bottom-panel', { display:'block', opacity: 1 }, 'scene2' )

    // .from ('.bottom-bg', { xPercent : -100, duration : 0.4},'scene2' )

    // .from ('.bottom-logo', { xPercent : -100, duration : 0.4},'scene2' )

    // .from ('.bottom-txt', { xPercent : -100, duration : 0.4 },'scene2' )
    
    // .from ('.bottom-cta', { xPercent : -100, duration : 0.4 } ,'scene2' )

    .call ( flashCard, [], 'scene1+=2.1')


};  

function flashCard () {

    let count = 1;

    timer = setInterval ( ()=> {

        flashAnim = gsap.to ('.flash-' + count, { opacity : 0.5, duration : 0.4, yoyo : true, repeat : 1 });

        count++;
        
        if ( count > cards.length ) count = 1;

    }, 800 );

}

function getCards () {

    document.querySelectorAll('.card').forEach ( (el, i) => {
        cards.push ( el );
    });

}

function activateDrag ( el, index ) 
{   
  
    var mc = new Hammer( el );
    
    mc.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    mc.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    // listen to events...
    mc.on("panleft swipeleft tap", function(ev) {
        
        if ( !cardShown ) {

            showCard ( index );
            
        }else {

            if ( ev.type == 'tap') {

                syncUp ( { exit : 'Exit Click - ' + myPanels [ currentCardShown ] });

            }else {

                if ( currentCardShown < (cards.length-1)) {

                    if ( !swiped ) {

                        swiped = true;

                        //syncUp ({ track : 'Swipe to Panel ' + (Number(currentCardShown) + 2) });
                        
                        slideCard ();
                    }

                }
            }
           
        }
        
    });

    mc.on("panright swiperight", function(ev) {

        if ( cardShown ) {

            if ( currentCardShown > 0 ) {
              

                if ( !swiped ) {

                    swiped = true;

                    // syncUp ({ track : 'Swipe to Panel ' + (Number(currentCardShown)) });
                    
                    slideCard ( false );
                }

               
            }

        }
    });

}

function addEvent() {
    
    console.log ('events added');

    document.querySelector('.bottom-hotspot').addEventListener('click', () => {

        syncUp ( { exit : 'Exit Click - ' + myPanels [ currentCardShown ] });


        //syncUp ( { exit : 'Exit Click - Panel ' + ( Number(currentCardShown) + 1 ) });
    
    });

    document.querySelector('.clickthru').addEventListener('click', () => {

        //syncUp ( { exit : 'BG Click - Panel ' + ( Number(currentCardShown) + 1 ) });

    });
    
    document.querySelector('.back').addEventListener('click', () => {

        syncUp ({ track : 'Back Btn Clicked' });

        back ();

    });

    document.querySelector('.next').addEventListener('click', () => {

        //syncUp ({ track : 'Next Btn Clicked' });

        slideCard ();
    });

    document.querySelectorAll('.card').forEach ( (el, i) => {
        
        activateDrag ( el, i );

    });

};

function slideCard ( left = true ) {

    if ( cardMoving ) return;

    cardMoving = true;

    if ( left ) {
        currentCardShown += 1;
    }else {
        currentCardShown += -1;
    }

    syncUp ({ track : 'Showing Panel - ' + myPanels [ currentCardShown ]  });

    // syncUp ({ track : 'Card ' + (currentCardShown + 1) });

    gsap.set('.card-title', { opacity : 0 });
    
    gsap.set('.card-title-'+ Number(currentCardShown + 1), { xPercent: currentCardShown != (cards.length-1) ?  -8 : 0 , delay : 0.4 });

    gsap.to ('.card-title-' + Number(currentCardShown + 1), { duration : 0.5, opacity : 1, delay : 0.4} );
    
    //.
    gsap.to ('.card-' + Number(currentCardShown + 1), { duration : 0.4, xPercent : -100, ease:'power2.out'});

  
     const toRight = cards.slice ( currentCardShown + 1 );

    if ( toRight.length > 0 ) gsap.to (toRight, { duration : 0.4, xPercent : function (index) {

        return -15 + ( index * 15/toRight.length) ;

    }, ease:'power2.out' });

    gsap.to ('.card-img', { duration : 0.2, xPercent : function (index) {

        if ( index == currentCardShown && index < (cards.length-1) ) {
            return -8;
        }else if ( index > currentCardShown ) {
            return -42;
        }
        return 0;
        
    }, ease : 'power2.out' });



    //if ( currentCardShown >= 4 ) gsap.set ('.next', { display : 'none'});


    gsap.set ('.next', { display : currentCardShown == (cards.length-1) ? 'none' : 'block' });

    gsap.delayedCall ( 1,  () => {

        cardMoving = false;

        swiped = false;

    });

    //..

   
}

function back () {

    if ( cardMoving ) return;

    //..

    gsap.to( '.card', {duration: .4, xPercent : function ( index ) {
            return ( index * 100/ cards.length ) - 100;
        },
        ease:'power3.out'
    })
    gsap.to('.card-img', {duration: .4, xPercent : (i) => {

        let xP = 0;

        switch (i) {
            case 0 : 
                xP = -38;
                break;
            case 1 : 
                xP = -30;
                break;
            case 2 : 
                xP = -36;
                break;
            case 3 : 
                xP = -42;
                break;
            case 4 : 
                xP = -35;
                break;
            default : 
                xP = -30;
        }
       return xP;

    }, ease:'power3.out'});

    gsap.set('.card-title', { opacity:0 });

    gsap.to ('.back', { duration: 0.5, opacity: 0 });
    gsap.set('.back', { display:'none', delay : 0.5, onComplete : () => {
        
        cardShown = false;

    } });
   
    gsap.set('.next', { display:'none'});

    flashCard ();

    gsap.to ('.bottom-panel',{ duration: 0.3, opacity: 0, onComplete : function () {
        gsap.set ('.bottom-panel', { display : 'none'});
    } });


    // gsap.set('.tap-overlay', { display:'block'});

    // gsap.set('.tap-view', { display:'block', delay : 0.3 });
   
    // gsap.set('.tap-logo', { display:'block', delay : 0.3 });

    // gsap.set('.tap-txt-1', { display:'block', delay : 0.3 });

    gsap.set (['.tap-logo', '.tap-txt-1', '.tap-txt-2', '.tap-view' ], { opacity : 1, delay : 0.3} )
    
    
}

function showCard ( i ) {


    i = 0;

    cardShown = true;

    cardMoving = true;

    currentCardShown = i;

    flashAnim.kill();

    console.log ('cc', currentCardShown );

    // syncUp ({ track : 'Discover' });

    syncUp ({ track : 'Showing Panel - ' + myPanels [ currentCardShown ]  });

    clearInterval ( timer );

    gsap.set ('.flash', { opacity : 0 });

    gsap.set (['.tap-view', '.tap-logo', '.tap-txt-1', '.tap-txt-2', ], { opacity : 0 } );

    gsap.to ('.card-img-'+(i+1), { duration : 0.4, xPercent: i != (cards.length-1) ? -5 : 0, ease:'power2.out' });

    if ( i < 3 ){

        gsap.to ('.card-img', { duration : 0.2, xPercent: function (index) {

            if ( index > i ) {
                return -40;            
            }
    
        }, ease: 'power2.out' });

        gsap.set ('.next', { display:'block', delay : 0.4 });

        gsap.to ('.next', { opacity:1, duration : 0.5, delay : 0.4 });
        
    }
    
    
    //cards..
    const toLeft = cards.slice(1, i+1 );

    if ( toLeft.length > 0 ) gsap.to (toLeft, { duration : 0.4, xPercent : -100, ease:'power2.out'});
        
    const toRight = cards.slice ( i+1 );

    if ( toRight.length > 0 ) gsap.to (toRight, { duration : 0.4, xPercent : function (index) {

        return -15 + ( index * 15/toRight.length) ;

    }, ease:'power2.out' });


    gsap.set('.back', { display:'block', delay : 0.4 });

    gsap.set('.card-title-'+(i+1), { xPercent: i != (cards.length-1) ? -8 : 0 , delay : 0.4 });

    gsap.to (['.back', '.card-title-'+(i+1) ], { duration: 0.5, opacity: 1, delay : 0.4 });

    //..
    gsap.set ('.bottom-panel', { display:'block', opacity: 1 });

    gsap.from ('.bottom-panel', { xPercent : -100, duration : 0.4, ease : 'power2.out' });


    // gsap.from ('.bottom-bg', { xPercent : -100, duration : 0.4, ease : 'power2.out' });

    // gsap.from ('.bottom-logo', { xPercent : -100, duration : 0.4, ease : 'power2.out' });

    // gsap.from ('.bottom-txt', { xPercent : -100, duration : 0.4, ease : 'power2.out' });
    
    // gsap.from ('.bottom-cta', { xPercent : -100, duration : 0.4, ease : 'power2.out' });
    
    gsap.set (['.tap-txt-1', '.tap-txt-2' ], { opacity : 0 });

    gsap.delayedCall ( 1,  () => cardMoving = false  );

    
}

function exit() {
    //-----------exit guide--------------------------
    //--adword--> ExitApi.exit();
    //--adgear--> ADGEAR.html5.clickThrough('clickTAG');
    //--studio--> Enabler.exit('Background Exit'); 
    //--standard/sizemek/adword no-api--> window.open(clickTag);
    //-----------exit--------------------------------
    

    window.open(clickTag);
}


//call track :  syncUp ( { track : 'This is the tracking event name' } );

//call exit : syncUp ( { exit : 'This is the exit tracking event name' } );

//call action : syncUp ( { action : 'action name here' } );

function syncUp ( data ) {

    console.log (data);

    window.parent.postMessage( data, '*' );

}





        