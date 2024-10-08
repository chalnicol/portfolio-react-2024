import { useState, useEffect } from 'react'
import NavBar from './components/NavBar';
import About from './components/About';
import Footer from './components/Footer';
import Projects from './components/Projects';
import Skills from './components/Skills';
import WorkHistory from './components/WorkHistory';
import ProjectModal from './components/ProjectModal';
import Loader from './components/Loader';


import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';


function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [ projectAnimation, setProjectAnimationOn ] = useState(true);
  const [ projectModalShown, setProjectModalShown ] = useState(false);
  const [ projectModalData, setProjectModalData ] = useState(null);

  gsap.registerPlugin(ScrollToPlugin);


  const scrollTo = (sectionId) => {
    gsap.to(window, { duration: 0.5, ease: 'linear', scrollTo: { y: sectionId, offsetY: 60 } }); // scroll to section
  };

  const handleHeroButtonClick = () => {
    console.log('Hero Button Clicked');
    scrollTo('#projects'); // Scroll to the projects section
  };

  const handleProjectClick = ( modalData ) => {
    openProjectModal (modalData);
  };

  const openProjectModal = (modalData) => {
    // console.log ('opening modal', data )
    setProjectModalData(modalData);
    setProjectModalShown(true);
    setProjectAnimationOn(false);
  }

  const closeProjectModal = () => {
    setProjectModalData(null);
    setProjectModalShown(false);
    setProjectAnimationOn(true);
  }

  const handleLoaded =  (pData) => {
    setData(pData);
    setLoading(false);
  }


  return (

    <>
      
      <NavBar onNavClick={scrollTo}/>
      
      
      <Loader onLoaded={handleLoaded} />

      { !loading && (
        <>

          <About  pictures={data.profile.pictures} firstName={data.profile.firstName} description={data.profile.about} onButtonClick={handleHeroButtonClick}/>
          
          <Projects animationOn={projectAnimation} projects={data.profile.recentWorks} onProjectClick={handleProjectClick} />

          <Skills skills={data.profile.skills} />

          <WorkHistory workHistory={data.profile.workExperience} />

          <Footer details={data.profile.details} />

          <ProjectModal data={projectModalData} shown={projectModalShown} onCloseClick={closeProjectModal}  />
          

        </>

      )}

     
    </>
  
  )
}

export default App
