import React, { useState, useEffect } from 'react';
import gsap from 'gsap';



const Navbar = ({ onNavClick, onThemeClick }) => {


  // const [menuOpen, setMenuOpen] = useState(false);

 

    const [menuOpen, setMenuOpen ] = useState(false);
    const [darkMode, setDarkMode] = useState(false);


    const handleLinkClick = (event, targetId) => {
        event.preventDefault();
        showMenu(false);
        onNavClick (targetId);
    };

    window.addEventListener('resize', () => {
        // console.log (navShown, window.innerWidth);
        // setMenuOpen ( window.innerWidth <= 640 && navShown );
        setMenuOpen (false);
    });

    const showMenu = ( show = true ) => {
        if ( show ) {
            gsap.to ('#responsive-menu', { xPercent : -100, duration : 0.3, ease: 'power4.out' });
        }else {
            gsap.to ('#responsive-menu', { xPercent : 0, duration : 0.3, ease: 'power4.out', onComplete: () => setMenuOpen(false) });
        }
    }

    const handleToggleMenu = () => {
        if ( !menuOpen) {
            showMenu();
            setMenuOpen(true);
        }else {
            showMenu(false);
        }
    }
 
    const menuContainerStyle = {
        backgroundColor : '#0a0a0a99'
    };

    const links = [
        { title : "Project Gallery", href : "#projects" },
        { title : "Skills", href : "#skills" },
        { title : "Work Experience", href : "#experience" },
        { title : "Contacts", href : "#contacts" },
    ];

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
        // If theme is stored, use that
        setDarkMode(storedTheme === 'dark');
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        } else {
        // If no theme is stored, use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
        }
    }, []);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (

        <nav className="bg-gray-900 h-16 w-full border-b-2 border-gray-300 text-white shadow-md sticky top-0 z-[50]">

            <div className="px-5 h-full mx-auto relative flex justify-between items-center">
                <div id="nav-left" className="flex items-center gap-4">
                    <div id="nav-brand">
                        <a href="/" className="nav-brand" onClick={(e) => handleLinkClick (e, '#about')}>
                            <div className="flex items-center">
                                <img className="h-9 mr-3" src="/assets/images/mylogocn.png" alt="logo" />
                                <span className="text-lg font-bold">Portfolio Website</span>
                            </div>
                        </a>
                    </div>
                </div>

                <div id="nav-right" className="flex items-center gap-4">

                    <div id="nav-right-links" className="hidden md:block">

                        <div className="flex items-center gap-6">

                            {links.map ( (link, index) => (
                            
                                <div key={index}>
                                    <a href={link.href} className="my-link hover:text-gray-300" onClick={(e) => handleLinkClick(e, link.href)}>{link.title}</a>
                                </div>

                            ))}

                        </div>
                    </div>

                    <button class="border border-gray-500 rounded flex items-center px-1" onClick={toggleTheme}>
                        <span class="material-symbols-outlined text-base">{ darkMode ? 'light_mode' : 'dark_mode' }</span>
                    </button>

                    <div id="nav-right-hamburger" className="md:hidden" >
                        <span className="material-symbols-outlined leading-normal active:scale-90" onClick={handleToggleMenu}>
                            menu
                        </span>
                    </div>

                </div>

                <div id="responsive-menu-container" className={`md:hidden absolute w-full h-[calc(100vh-4rem)] top-16 start-0 z-100 overflow-hidden bg-gray-300 ${menuOpen ? 'block' : 'hidden'}`} style={menuContainerStyle} >

                <div id="responsive-menu" className="w-3/4 h-full bg-gray-500 absolute start-full">

                        {links.map ( (link, index) => (
                            <a key={index} href={link.href} onClick={(e) => handleLinkClick(e, link.href) }>
                            <div className="p-3 border-b">
                                {link.title}
                            </div>
                            </a>
                        ))}
                </div>
                    
                </div>

            </div>

        </nav>

    );
};

export default Navbar;
