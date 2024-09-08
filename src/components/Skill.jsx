
import React, {useEffect, useRef, useState} from 'react';

import gsap from 'gsap';


const Skill = ({ skill, show }) => {

    const [ name, setName ] = useState ( skill.name );
    const [ level, setLevel ] = useState ( skill.level );
    const [ displayWidth, setDisplayWidth ] = useState (3);

    const bar = useRef(null);

    useEffect ( () => {
        if (show) {
             gsap.to (bar.current,  { width : `${level}%`, duration : 2, ease : 'power4.out', onUpdate : () => {
                const currentWidth = Math.ceil (bar.current.offsetWidth / bar.current.parentElement.offsetWidth * 100 );
                setDisplayWidth(Math.ceil(currentWidth));
             }});
        }else {
            gsap.to (bar.current,  { width : '3%', duration : 2, ease : 'power4.out', onUpdate : () => {
                const currentWidth = Math.ceil (bar.current.offsetWidth / bar.current.parentElement.offsetWidth * 100 );
                setDisplayWidth(Math.ceil(currentWidth));
             }});
        }
    }, [show]);


    return (

        <div className="flex items-center">

            <div className="min-w-[40%] md:min-w-[33%] font-bold text-md md:text-lg dark:text-gray-200">{name}</div>

            <div className="grow bg-gray-300 dark:bg-gray-200 border border-gray-300 dark:border-gray-500 relative h-6 2xl:h-7 overflow-hidden">

                <div ref={bar} className="absolute w-[3%] h-full">

                    <div className="absolute h-full w-full border-r-4 border-red-800 bg-gray-800 dark:bg-gray-700 dark:border-red-600"></div>

                    <div className="absolute h-full w-full flex justify-end items-center pr-3 " >

                        <span className="text-xs text-white font-bold dark:text-gray-200">{displayWidth}%</span> 

                    </div>

                </div>
               

            </div>

        </div>
                
    )


}

export default Skill;