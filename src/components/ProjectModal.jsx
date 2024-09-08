import React, {useState, useEffect } from 'react';
import gsap from 'gsap';

const ProjectModal = ({ data, shown, onCloseClick }) => {

    const [iframeSrc, setIframeSrc] = useState('');

    const [dynamicClass, setDynamicClass] = useState('');

    const getUrl = ( url ) => {
        return url.includes('https://') ? url : 'assets/projects/' + url;
    } 

    useEffect(() => {
        // Determine only the dynamic part of the class

        if ( shown ) {
            if (data && typeof data === 'object') {
                if (data.type === 'mobile') {
                setDynamicClass('md:w-auto md:h-[90%] md:max-h-[844px] md:aspect-[9/16]');
                } else {
                setDynamicClass('md:w-[90%] md:max-w-[1100px] md:h-auto md:aspect-[16/9]');
                }
            }
            animateOpen ();
        }

        return () => {
            setIframeSrc('');
        }

    }, [shown, data]);
   
        
    const animateOpen = () => {
        gsap.fromTo ('.iframe-container', { scale : 0 }, { scale : 1, duration : 0.8, ease : 'elastic.out(1, 0.9)', onComplete : () => {
            setIframeSrc(getUrl(data.url));
        }});
    }
    
    const animateClose = () => {
        
        gsap.fromTo ( '.iframe-container', { scale : 1 }, { scale : 0, duration : 0.8, ease : 'elastic.in(1, 0.9)', onComplete : () => {
            setIframeSrc('');
            onCloseClick();
        }});
    }

    const handleCloseClick = () => { 
        animateClose ();
    }

  return (
    
    <div className={`fixed h-full w-full top-0 start-0 z-[99] ${data ? 'block' : 'hidden' }`}>

        <div className="absolute w-full h-full bg-black opacity-[0.8]"></div>

        <div className="absolute w-full h-full flex items-center justify-center">

            <div className={`iframe-container w-full h-full bg-white relative ${dynamicClass}`}>
                
                <div className="absolute w-full h-full flex items-center justify-center">
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                
                <iframe src={iframeSrc} className="absolute w-full h-full block"></iframe>

            </div>
        </div>

        <div className="modal-close absolute h-8 w-8 end-4 top-4 bg-white leading-[1.9rem] border border-gray-500 rounded-full text-center text-lg font-bold cursor-pointer hover:bg-gray-200" onClick={handleCloseClick}>&#x2716;</div>

    </div>

  );

};


export default ProjectModal;
