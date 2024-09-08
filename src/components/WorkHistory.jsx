import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



const WorkHistory = ({ workHistory }) => {

    gsap.registerPlugin(ScrollTrigger);

    const scrollTriggersRef = useRef([]);

    useEffect(() => {

        initScrollTriggers();

        return () => {
            scrollTriggersRef.current.forEach (trigger => trigger.kill());
        }

    }, []);

    const showCards = ( el ) => {

        const line = el.querySelector('.w-hline');
        const card = el.querySelector('.content');
        const circ = el.querySelector('.w-circ')

        const tl = gsap.timeline ();

        tl
            .add ('key1')

            .set (circ, { display : 'block'}, 'key1')

            .fromTo (circ, {scale:0.6}, {scale:1, duration: 1, transformOrigin: '50% 50%', ease: "elastic.out(1.2, 0.5)" }, "key1")

            .set (line, { display : 'block'}, 'key1+=0.3')

            .fromTo (line, { scaleX : 0 }, { scaleX : 1, duration:0.3, ease: "power4.out", transformOrigin : '0 50%' }, 'key1+=0.3')

            .fromTo (card, { scale : 0 }, { scale: 1, duration: 0.8, ease: "elastic.out(1, 0.8)" }, 'key1+=0.3')

    }

    const hideCards = ( el ) => {

        const line = el.querySelector('.w-hline');

        const card = el.querySelector('.content');

        const circ = el.querySelector('.w-circ');


        const tl = gsap.timeline ();

        tl
            .add ('key1')

            .fromTo (card, { scale : 1 }, { scale: 0, duration:0.5, ease: "elastic.in(1, 0.8)" }, 'key1')

            .fromTo (line, { scaleX : 1 }, { scaleX : 0, duration:0.3, ease: "power4.out", transformOrigin : '0%50%' }, 'key1+=0.3')

            .set (line, { display : 'none'}, 'key1+=0.6')

            .fromTo (circ, {scale:1}, {scale: 0.6, duration: 0.8, transformOrigin: '50% 50%', ease: "elastic.in(1.2, 0.5)" }, "key1")

            .set (circ, { display : 'none'}, 'key1+=0.8')

           
    };

    const initScrollTriggers = () => {

        const containers = gsap.utils.toArray('.work-card-container');

        containers.forEach( ( container, i ) => {

            const trigger = ScrollTrigger.create({
                trigger: container,
                start: "top center",
                end: "top 63px",
                // markers : true,
                onEnter: ( self ) => showCards(self.trigger),
                onLeaveBack: ( self ) => hideCards(self.trigger)
            });
            scrollTriggersRef.current.push(trigger);

        });

    };

    return (

        <section id="experience" className="bg-gray-100 dark:bg-gray-700 md:px-0 px-3 pb-[100px] w-full min-h-[calc(100dvh-4rem)]">

            <div className="w-11/12 max-w-3xl flex flex-col items-center justify-center mx-auto pointer-none">

                <h1 className="text-3xl lg:text-4xl pb-6 mt-12 text-center font-bold dark:text-gray-200">Work Experience</h1>

                { workHistory.map ((work, index) => (

                    <div key={index} className="flex w-full work-card-container">

                        <div className="min-w-6 md:min-w-14 relative">

                            { index === 0 ? (
                                <>
                                    <div className="w-vline absolute h-[65%] w-1 bg-black dark:bg-gray-500 start-1 top-[35%] translate-x-[-50%] rounded-t-full"></div>
                                    <div className="absolute w-4 h-4 bg-black dark:bg-gray-500 start-1 origin-center rounded-full top-[35%] start-1 translate-x-[-50%] translate-y-[-50%]"></div>
                                    
                                    {/* <div className='absolute top-[35%] start-1 font-bold translate-x-[-50%] translate-y-[-50%] bg-gray-100 border-2 border-black text-xs rounded rotate-[-20deg] px-2 py-1'>start</div> */}

                                </>
                            ) : index === (workHistory.length - 1) ? (
                                <>
                                    <div className="w-vline absolute h-[65%] w-1 bg-black dark:bg-gray-500 start-1 translate-x-[-50%] rounded-b-full"></div>
                                    <div className="absolute w-4 h-4 bg-black dark:bg-gray-500 start-1 origin-center rounded-full top-[65%] translate-x-[-50%] translate-y-[-50%]"></div>
                                    
                                    {/* <div className='absolute top-[65%] start-1 font-bold translate-x-[-50%] translate-y-[-50%] bg-gray-100 border-2 border-black text-xs rounded rotate-[-20deg] px-2 py-1'>end</div> */}

                                </>

                            ) : (
                                <div className="w-vline absolute h-full w-1 bg-black dark:bg-gray-500 start-1 translate-x-[-50%] "></div>
                            )}
                            
                            <div className="w-hline absolute w-full h-1 bg-black dark:bg-gray-500 start-1 top-1/2 origin-center translate-y-[-50%] rounded-full hidden"></div>

                            <div className="w-circ absolute w-3 h-3 dark:bg-gray-500 bg-black start-1 origin-center rounded-full top-1/2 translate-x-[-50%] translate-y-[-50%] hidden"></div>
                        </div>

                        <div className="grow py-2 z-20">

                            <div className="w-card relative">
                                
                                <div className="content bg-white dark:bg-gray-800 rounded-lg border border-black dark:border-gray-700 shadow-lg overflow-hidden scale-0">

                                    <div className="bg-gray-800 dark:bg-gray-900 text-sm text-white dark:text-gray-400 p-3">
                                        {`${work.start} - ${work.end}`}
                                    </div> 

                                    <div className="px-3 md:px-5 pb-8 pt-2">
                                        <div className="font-bold text-xl md:text-2xl dark:text-gray-400 ">
                                            {work.position}
                                        </div>
                                        {work.company && (
                                            <div className="text-sm text-gray-600 dark:text-gray-500">
                                                Company: <span className="font-semibold">{work.company}</span>
                                            </div>
                                        )}
                                        <div className="mt-2 ml-6">
                                            <ul className="list-disc">
                                                {work.jobDescription.map((desc,index) => (

                                                    <li key={index} className="text-gray-700 dark:text-gray-400 text-sm md:text-base">{desc}</li>

                                                ))}
                                            
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>

                ))}
            
            </div>


        </section>
    
    );
    
};

export default WorkHistory;
