import React, { useEffect, useState } from 'react';
import gsap from 'gsap';


const Loader = ({onLoaded}) => {

    // const [ resourcesLoaded, setResourcesLoaded ] = useState(false);
    const [ data, setData ] = useState(null);

    const fetchData = async () => {
        try {
          const response = await fetch('/assets/data/profile.json'); // Fetch JSON data
          const result = await response.json();
          setData(result); // Set fetched data
          console.log ('data loaded successfully');
          onLoaded(result);
        } catch (error) {
          console.error('Error fetching the JSON:', error); // Handle any errors
        } finally {
          //setLoading(false); // Stop loading regardless of success or failure
        }
    };
    
    const preloadImages = () => {
  
      const manifest = [
        'profile1.jpg',
        'profile2.jpg',
        'profile3.jpg',
        'mylogocn.png',
        'recentwork/blockpuzzle.png',
        'recentwork/cgallery.jpg',
        'recentwork/connect4.png',
        'recentwork/flipbook.jpg',
        'recentwork/salpakan.png',
        'recentwork/solitaire.jpg',
        'recentwork/sushi.jpg',
        'recentwork/theflip.jpg',
        'socials/fb.png',
        'socials/github.png',
        'socials/ig.png',
        'socials/linkedin.png',
        'socials/x.png',
      ];

      let loadedCount = 0;
      let loadingProgress = 0;

      return new Promise ((resolve) => {
        manifest.forEach ((src) => {
          const img = new Image();
            img.src = '/assets/images/'+src;
            img.onload = () => {
              loadedCount += 1;
              console.log ('loeadedCount', loadedCount);

              loadingProgress = Math.ceil((loadedCount / manifest.length) * 100);

              gsap.set ('.loading-progress', { width: loadingProgress + '%', });

              if (loadedCount === manifest.length) resolve();

            };
            img.onerror = () => {
              console.error(`Error loading image: ${src}`);
            };
        });
      });
    }

    const removeLoader = () => {
      console.log('removeLoader');
      gsap.to ('.ls-container', { yPercent : -100, duration : 0.5, ease: 'power4.out', delay : 0.5 });
    }
   
    const loadResources = async () => {

      await preloadImages();

      await fetchData();

      removeLoader ();

    }

    useEffect ( () => {
      loadResources();
    }, [])

    return (
      <div className="ls-container absolute h-full w-full bg-white flex items-center justify-center bg-gray-500 z-[99] top-0 start-0">
          <div className="w-[75%] max-w-[450px] border border-gray-500 rounded-md bg-white px-5 py-4 shadow-lg">
              <span className="font-medium text-sm">Loading Page</span>
              <div className="w-full h-1 mt-2 rounded overflow-hidden border border-black relative bg-gray-100" >
                  <div className="loading-progress w-0 h-full absolute bg-gray-700"></div>
              </div>
          </div>
      </div>
    );

};

export default Loader;