import React, {useEffect, useState} from 'react';
import Skill from './Skill';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Skills = ({ skills }) => {

  const [showSkills, setShowSkills ] = useState (false);

  
  gsap.registerPlugin(ScrollTrigger);

  useEffect (() => {
    ScrollTrigger.create({
      id: 'skills',
      trigger: "#skills",
      start: "25% center",
      end: "75% center",
      // markers : true,
      scrub : 2,
      onEnter: () => setShowSkills(true),
      // onLeave: () => setShowSkills(false),
      // onEnterBack: () => setShowSkills(true), 
      onLeaveBack: () => setShowSkills(false)
    });

    return () => {
      ScrollTrigger.getById("skills").kill(true);
    }
  }, []);

  
  return (

    <section id="skills" className="bg-white dark:bg-gray-800 md:px-0 px-3 pb-[50px] w-full min-h-[calc(100dvh-4rem)] flex justify-center items-center">

      <div className="w-11/12 max-w-4xl mx-auto pointer-none">

          <h1 className="text-3xl lg:text-4xl py-6 text-center font-bold dark:text-white">Skills</h1>

          <div className="w-full grid md:grid-cols-2 gap-x-14 gap-y-2 mt-2 pointer-none">

            {skills.map((skill, index) => (

              <Skill key={index} skill={skill} show={showSkills} />

            ))}
              
          </div>
      </div>

    </section>
  )
};


export default Skills;
