import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const About = ({ pictures, firstName, description, onButtonClick }) => {

  const [initialized, setInitialized] = useState(false);

  const timelineRef = useRef(null);
  const scrollTriggerRef = useRef(null);


  const handleButtonClick = () => {
    // Add your button click event here
    onButtonClick();
  };

  const imgStyle = {
    zIndex: 0
  };

  const startAnimation = () => {

    timelineRef.current = gsap.timeline({
      delay : 1
    });
    timelineRef.current
      .addLabel('start')
      .to ('.profile-img', { scale:1.2, transformOrigin : '50% 50%', yPercent : '-=30', xPercent : i => {
          switch (i) {
              case 0: return 100;
                  break;
              case 1: return 0;
                  break;
              case 2: return -100;
                  break;
          };
      }, rotation : (i) => {
          return -(i * 20 + 380) ;
      }, 
      stagger : {
          each : 0.2,
          start : 'end',
          yoyo : true,
          repeat : -1,
          repeatDelay : 2,
      },
      duration :1,
      ease : 'power3.out',

      }, 'start')

      // .to ('.about-arrow', { yPercent : '+=15', yoyo:true, repeat : -1, duration : 1, ease : 'linear' }, 'start');

  }
  const resumeAnimation = () => {
    timelineRef.current.resume();
  }

  const stopAnimation = () => {
    timelineRef.current.pause();
  }

  useEffect (() => {
    // Initialize the animation when the component mounts
    startAnimation ();

    scrollTriggerRef.current = ScrollTrigger.create({
      id: "about",
      trigger: "#about",
      start: "25% center",
      end: "75% center",
      scrub : 2,
      // markers : true,
      onLeave: () => stopAnimation(),
      onEnterBack: () => resumeAnimation(),
    
    });

    return () => {
      timelineRef.current.kill();
      scrollTriggerRef.current.kill ();
    }

  }, []);


  return (

    <section id="about" className="bg-white md:px-0 w-full min-h-[calc(100dvh-4rem)] flex justify-center items-center">
        <div>
            <div className="flex items-center justify-center gap-2 my-8">

            {pictures.map((pic, index) => (
              <div key={index} className={`profile-img h-24 w-24 lg:h-32 lg:w-32 border-8 border-gray-200 rounded-md overflow-hidden shadow-xl`} style={{ transform: `rotate(${index * 20 + 20}deg)` }}>
                <img className="w-full h-full" src={`/assets/images/${pic}`} alt="" style={imgStyle}/>
              </div>
            ))}
                
            </div>
            <div className="w-11/12 max-w-2xl mx-auto">
                <div className="text-center font-bold text-2xl lg:text-4xl xl:text-5xl">
                    Hi, I am {firstName}
                </div>
                <hr className="my-3" />
                <p className="indent-8 text-justify text-md">
                    {description}
                </p>
            </div>

            <div className="my-6">
                <button id="main-cta" className="lg:text-xl py-2 px-5 lg:py-3 lg:px-6 font-bold rounded-s-full rounded-e-full bg-gray-800 text-white flex items-center mx-auto" onClick={handleButtonClick}>
                    <span>VIEW MY WORK</span><span className="about-arrow ml-2 material-symbols-outlined">arrow_circle_down </span>
                </button>
            </div>
        </div>
    </section>
  );
};

export default About;