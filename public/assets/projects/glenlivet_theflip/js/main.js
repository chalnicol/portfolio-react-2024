
( function () {


    let cardShown = 0, cardsTotal = 3;

    let cardMoving = false;

    let pulsateAnim;

    let autoFlipTimer;

    window.onresize = resize;
    
    function getFlex () {

        //375 : 747 

        //125 : 249

        const ratio = { wR : 125, hR : 249 };
        
        const w = document.querySelector('.nt-wrapper').clientWidth;
        
        const h = document.querySelector('.nt-wrapper').clientHeight;

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

    function resize() {

        const flex = getFlex();

        gsap.set('.nt-ad-container', { width: flex.w, height: flex.h });
    }
        
    function preloadFiles() {

        var toPreload = [

            { type: "js", url: "js/gsap.min.js" },
            { type: "js", url: "js/hammer.min.js" },

            // { type: "image", url: "images/cta.png", },
            { type: "image", url: "images/cta.png" },

            { type: "image", url: "images/img1_bot.png" },
            { type: "image", url: "images/img1_top.png" },
            { type: "image", url: "images/img2_bot.png" },
            { type: "image", url: "images/img2_top.png" },
            { type: "image", url: "images/img3_bot.png" },
            { type: "image", url: "images/img3_top.png" },

            { type: "image", url: "images/intro_copy.png" },

            { type: "image", url: "images/introimg_bot.png" },
            { type: "image", url: "images/introimg_top.png" },
            
            { type: "image", url: "images/logo_intro.png" },

            { type: "image", url: "images/desc1.png" },
            { type: "image", url: "images/desc2.png" },
            { type: "image", url: "images/desc3.png" },

            { type: "image", url: "images/arr_down.png" },
            { type: "image", url: "images/arr_up.png" },



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

                document.querySelector(".nt-progress").style.width = perc + "%";

                if (perc >= 100) {
                    document.querySelector(".nt-progress-bar-cont").style.display = "none";

                    initAd();
                }

            });


        }

    }

    function initAd() {


        //..
        gsap.set(".nt-ad-container", { display: "block" });

        resize();

        var tl = gsap.timeline({
            defaults: { ease: "power2.out", duration: 0.6 },

            onComplete : initAnimEnded,
            
            delay : 0.3,

            // repeat : 2,
            // repeatDelay : 5
        });

        //insert initial animation here..

        tl

            .add ('intro')

            .from ('.img-intro-cont', { rotateY : -180, translateZ: -1800, duration : 1.2, ease : 'linear' }, 'intro')

            .to (['.img-intro-2', '.img-intro-3', '.img-intro-4'], { rotateX : 360,  duration : 0.6, stagger : 0.08, ease : 'linear' }, 'intro')

            .add('scene1')

            .set ('.frame-1', { display : 'none' }, 'scene1')

            .set ('.frame-2', { display : 'block' }, 'scene1')


            .to ('.img-bot-0', { rotateX : 0, duration : 1.5 }, 'scene1')

            .to ('.img-back', { rotateX : -180, duration : 1.5  }, 'scene1')

            .to ('.shadow-cont', { clipPath : 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)', duration : 0.8, }, 'scene1+=0.4')


            .from ('.logo0', { scale : 0, transformOrigin : '50% 8%', duration : 0.5}, 'scene1+=1.2')

            .from ('.intro-copy', { scale : 0, transformOrigin : '50% 76.4%', duration : 0.5 }, 'scene1+=1.4')

            .from ('.cta', { scale : 0, transformOrigin: '50% 92%', duration : 0.8, ease : 'elastic(1.2, 0.6)' }, 'scene1+=1.8')

            .to ('.arr-down', { opacity : 1, duration : 0.6 })

            .from ('.indicator-cont', { xPercent : -300 }, 'scene1+=1')
        

    }

    function initAnimEnded () {


        let count = 0;

        let upDir = false;

        pulsateIcon ();

        addEvents ();

        autoFlipTimer = setInterval ( () => {

            console.log ('hit');

            if ( !upDir ) {
                flipNext ();
            }else {
                flipPrevious ();
            }

            count++;
            if ( count >= cardsTotal ) {
                count = 0;
                upDir = !upDir;
            }

        }, 5000 )

    }

    function pulsateIcon () {

        console.log ('pulsate Icon');

        pulsateAnim = gsap.timeline ();
        
        pulsateAnim

            .add ('scene')

            .to ('.arr-down', { yPercent : 0.5, yoyo:true, ease : 'linear', repeat : -1, duration : 0.4 }, 'scene')

            .to ('.arr-up', { yPercent : -0.5, yoyo:true, ease : 'linear', repeat : -1, duration : 0.4 }, 'scene');

    }

    function flipNext ( auto = true ) {

        if ( cardMoving ) return;


        if ( cardShown < cardsTotal ) {

            cardMoving = true;

            if (!auto) syncUp ({ track : 'Flip to Card ' + (cardShown + 1) });

            // console.log ('next card');
            pulsateAnim.pause ();

            gsap.set (['.desc', '.arr' ], { opacity : 0 });

            // gsap.to ('.logo' + (cardShown + 1) , { opacity : 1, duration : 1 });
                

            gsap.set ( ['.img-top-' + (cardShown + 1), '.img-bot-' + (cardShown + 1)], { opacity : 1, delay : 0.1 } );

            gsap.to ( '.img-top-' + cardShown, { rotateX : -180, duration : 1, ease : 'power2.out' });

            gsap.to ( '.img-bot-' + (cardShown+1), { rotateX : 0, duration : 1, ease    : 'power2.out' });


            gsap.delayedCall ( 0.9, () => {

                
                cardShown += 1;

                cardMoving = false;

                
                if ( cardShown == 1 ) pulsateAnim.kill ();


                showDesc ();
                
            });

            
        }
    }


    function flipPrevious ( auto = true ) {

        if ( cardMoving ) return;


        if ( cardShown > 0 ) {

            cardMoving = true;

            if (!auto) syncUp ({ track : 'Flip to Card ' + (cardShown + 1) });

            // console.log ('previous card');
            gsap.set (['.desc', '.arr' ], { opacity : 0 });


            // gsap.to ('.logo' + (cardShown - 1) , { opacity : 1, duration : 1 });
                


            gsap.to ( '.img-bot-' + cardShown , { rotateX : 180, duration : 1, ease : 'power2.out' });

            gsap.to ( '.img-top-' + (cardShown - 1) , { rotateX : 0, duration : 1, ease : 'power2.out' });

            gsap.delayedCall ( 0.9, () => {

                gsap.set ( ['.img-top-' + cardShown, '.img-bot-' + cardShown ], { opacity : 0 } );

                cardShown -= 1;

                cardMoving = false;

                gsap.to ('.intro-icon', { opacity : cardShown == 0 ? 1 : 0, duration : 0.5  });

                showDesc ()


            });

            
        }

      

    }

    function showDesc () {


        gsap.set ('.intro-icon', { opacity : cardShown <= 0 ? 1 : 0 });

        gsap.to ('.arr-up', { opacity : cardShown > 0 ? 1 : 0 });

        gsap.to ('.arr-down', { opacity : cardShown < cardsTotal ? 1 : 0 });

        pulsateAnim.play ();

        gsap.set ('.ind', { backgroundColor : '#ffffff' });

        gsap.set ('.ind-' + (cardShown + 1), { backgroundColor : '#D8A97B' });

        if ( cardShown !== 0 ) {

            gsap.set ('.desc', { opacity : 0 });

            gsap.set ('.desc-' + cardShown, { opacity : 1 });

            gsap.fromTo ('.desc-' + cardShown, { yPercent : -20 }, { yPercent : 0, duration : 0.7, ease : 'power2.out'} );
        }


    }

    function addEvents() {

    
        document.querySelector(".clickthru").addEventListener("click", exit);

        // create a simple instance
        // by default, it only adds horizontal recognizers
        var mc = new Hammer( document.querySelector(".flip-hs") );

        mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

        // listen to events...
        mc.on("swipeup swipedown tap", function(ev) {
            // myElement.textContent = ev.type +" gesture detected.";

            console.log ('g', ev.type)

            if ( ev.type == 'swipedown')  {
                clearInterval ( autoFlipTimer );
                flipNext ( false );
            }else if ( ev.type == 'swipeup') {
                clearInterval ( autoFlipTimer );
                flipPrevious ( false );
            }else {
                exit ();
            }


        });

    }

    function exit() {
        // window.open(clickTag);
        // syncUp ({ exit : 'Clickthru Exit' });

        if ( cardShown !== 0 ) {
            syncUp ({ exit : 'Clickthru Exit ' + cardShown });

        }else {
            syncUp ({ exit : 'Clickthru Exit' });

        }
    }

    function syncUp ( data )  {
        console.log ( data );
        window.parent.postMessage ( data, '*');
    }

    preloadFiles ();

})();

