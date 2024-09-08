import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const Projects = ({ animationOn, projects, onProjectClick }) => {

  
  const [ autoSpin, setAutoSpin ] = useState(true);
  const [ isActive, setIsActive ] = useState(false);

  const timerRef = useRef (null);
  const spinDirectionRef = useRef(0);
  const initializedRef = useRef (false);


  gsap.registerPlugin(ScrollTrigger);

 
  const positionCards = ( toSpin = false, dir = 0 ) => {

    const pCards = document.querySelectorAll(".project-card");

    const hRad = (pCards.length*10) + 100, vRad = 70;

    pCards.forEach( ( pCard, o ) => {

        if ( toSpin ) {

            if ( dir === 0 ) {
                o = Number(pCard.dataset.index) - 1 >= 0 ? Number(pCard.dataset.index) - 1 : pCards.length - 1;
            }else {
                o = Number(pCard.dataset.index) + 1 <= (pCards.length - 1)? Number(pCard.dataset.index) + 1 : 0;
            }

        }   

        pCard.dataset.index = o;

        const l = 180 - 360 / pCards.length * o;

        let a = Math.floor(0 + Math.sin(Math.PI / 180 * l) * hRad),
            c = Math.floor(-40 - Math.cos(Math.PI / 180 * l) * vRad);

        const d = l < 0 ? l + 1 : l,
                s = Math.abs(l) / 180 * .3 + .7;

        gsap.to(pCard, { x: a, y: c, scale: s, zIndex: Math.abs(Math.ceil(d)), duration: .5, transformOrigin:'50% 50%', ease: "linear" });

    });

  };

  const spinCards = ( inited = false, auto = true, dir = 0 ) => {

    if (!inited ) {
       positionCards ();
    }else {
      positionCards(true, dir);
    }

    if ( timerRef.current ) clearInterval(timerRef.current);

    if ( auto ) {

      timerRef.current = setInterval ( () => {
        positionCards (true, dir );
      }, 1500 );

    }

  }

  const pauseSpin = () => {
    if ( timerRef.current ) clearInterval(timerRef.current);
  }

   
  useEffect ( () => {
    
    const trigger = ScrollTrigger.create({
      id: "projects",
      trigger: "#projects",
      start: "25% center",
      end: "75% center",
      scrub : 2,
      // markers : true,
      onEnter: () => setIsActive (true),
      onLeave: () => setIsActive (false),
      onEnterBack: () => setIsActive (true),
      onLeaveBack: () => setIsActive (false),
    
    });

    return () => {
      clearInterval (timerRef.current);
      trigger.kill ();
    }

  }, []);


 

  useEffect ( () => {
    

    if ( animationOn ) {
      if ( isActive ) {
        if ( !initializedRef.current) {
          spinCards (false);
          initializedRef.current = true;
        }else {
          if ( autoSpin ) spinCards (true, true, spinDirectionRef.current);
        }
        showControls ();
      }else {
        pauseSpin ();
        showControls (false);
      }
    }else {
      pauseSpin ();
      showControls (false);
    }

  }, [animationOn, isActive ] );

  
  const showControls = ( show = true, d = 0.5 ) => {
    if (show) {
      gsap.set ('.controls', { display : 'block' });
      gsap.fromTo ('.controls', { opacity : 0, yPercent : 100 }, { opacity: 1, yPercent : 0, ease : 'linear', duration : d });
    }else {
      gsap.fromTo ('.controls', { opacity : 1, yPercent : 0 }, { opacity: 0, yPercent : 100, ease : 'linear', duration : d, onComplete : () => {
        gsap.set ('.controls', { display : 'none' });
      }});
    }
  }
  const handleClick = (data) => {
    onProjectClick (data);
  }

  const handleControlsClick = (e) => {

    if ( !isActive ) return;

    const {name} = e.target.dataset;

    if ( name === 'left' ) {

      spinCards ( true, autoSpin, 0 );

      spinDirectionRef.current = 0;
      
    }else if ( name === 'right') {

      spinCards ( true, autoSpin, 1 );

      spinDirectionRef.current = 1;


    }else if ( name === 'toggle' ) {

      if ( autoSpin ) {
        pauseSpin ();
      }else {
        spinCards (true, true, spinDirectionRef.current );
      }
      setAutoSpin ( prevState => !prevState );


    }
   
  }

  return (
    <section id="projects" className="bg-gray-100 dark:bg-gray-700 pb-[50px] w-full min-h-[calc(100dvh-4rem)] flex justify-center items-center overflow-hidden">

      <div className="w-full max-w-3xl mx-auto">
          
          <h1 className="text-3xl lg:text-4xl py-2 text-center font-bold mt-6 dark:text-gray-200">Project Gallery</h1>

          <div className="w-full h-[500px] overflow-h  idden flex items-center justify-center relative">
              <div className="w-[750px] h-full flex justify-center items-center absolute start-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">

                  {projects.map ((project, index) => (
                    
                    <div key={index} data-index={index} data-type={project.type} data-url={project.url} className="project-card p-3 absolute bg-white dark:bg-gray-600 h-auto w-[240px] aspect-[0.75] shadow-lg rounded-lg overflow-hidden border border-gray-400 dark:border-gray-500 select-none" onClick={(e) => handleClick(e.target.dataset)}>

                      <div className="w-full h-auto aspect-square border border-gray-500 dark:border-gray-600 overflow-hidden pointer-events-none">
                          <img className="w-full h-full object-cover" src={`/assets/images/recentwork/${project.image}`} alt={project.title} />
                      </div>
                      <div className="grow overflow-hidden py-1 pointer-events-none">

                          <div className="font-bold text-lg dark:text-gray-200">{project.title}</div>

                          <div className="text-sm dark:text-gray-200">
                              {project.description}
                          </div>
                      </div>

                    </div>


                  ))}

                  <div className="controls w-[35%] h-8 bottom-1 absolute z-[999]">
                    <div className="w-full h-full grid grid-cols-3 justify-around gap-2">

                        <button data-name="left" className="bg-gray-800 dark:bg-gray-600 border border-gray-500 h-full text-white hover:bg-gray-600 rounded flex items-center justify-center" title="rotate cards to the left" onClick={(e) => handleControlsClick(e)}>
                            <span className="material-symbols-outlined font-bold pointer-events-none">
                                chevron_left
                            </span>
                        </button>

                        <button data-name="right" className="bg-gray-800 dark:bg-gray-600 border border-gray-500 h-full text-white hover:bg-gray-600 rounded flex items-center justify-center" title="rotate cards to the right" onClick={(e) => handleControlsClick(e)}>
                            <span className="material-symbols-outlined font-bold pointer-events-none">
                                chevron_right
                                </span>
                        </button>

                        <button data-name="toggle" className="bg-gray-800 dark:bg-gray-600 border border-gray-500 h-full text-white hover:bg-gray-600 rounded flex items-center justify-center" title="toggle auto-rotate cards" onClick={(e) => handleControlsClick(e)}>
                            <span className="material-symbols-outlined pointer-events-none">
                                {autoSpin ? 'pause' : 'play_arrow'}
                            </span>
                        </button>
                    </div>
                  </div>
              </div>
          </div>
      </div>

    </section>
  );
};

export default Projects;
