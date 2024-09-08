import React from 'react';
import ContactForm from './ContactForm';

const Footer = ({ details }) => {

  return (
    
    <footer id="contacts" className="bg-gray-900">

        <div className="max-w-7xl mx-auto lg:flex px-5 pt-12 pb-20 gap-12" >

            <div className="w-full lg:w-1/2 text-white mb-12 lg:mb-0">
                <h1 className="text-2xl font-bold mb-2">Contacts</h1>
                <hr className="border-white border-b" />

                <div className="flex items-center gap-4 my-3 text-gray-300">
                    <span className="material-symbols-outlined">
                        mail
                    </span>
                    <span>{details.email}</span>
                </div>

                <div className="flex items-center gap-4 my-3 text-gray-300">
                    <span className="material-symbols-outlined">
                        globe
                    </span>
                    <span>{details.website}</span>

                </div>
                <div className="flex items-center gap-4 my-3 text-gray-300">
                    <span className="material-symbols-outlined">
                        smartphone
                    </span>
                    <span>{details.phone}</span>

                </div>
                <div className="flex items-center gap-4 my-3 text-gray-300">
                    <span className="material-symbols-outlined">
                        home
                    </span>
                    <span>{details.address}</span>

                </div>

                <h1 className="text-2xl font-bold mb-2 mt-12">Socials</h1>
                <hr className="border-white border-b" />
                <div className="flex gap-4 mt-4 px-0">

                {details.socials.map((social, index) => (
                    <div key={index} className="h-8 w-8 overflow-hidden shadow-lg z-auto">
                        <a href={social.url} target="_blank">
                            <img className="w-full h-full" src={`/assets/images/socials/${social.thumbnail}`} alt={social.name} />
                        </a>
                    </div>
                ))}

                </div>

            </div>

            <div className="w-full lg:w-1/2 text-white">
                <h1 className="text-2xl font-bold mb-2">Leave A Message</h1>
                <hr className="border-white border-b" />

                <ContactForm  />
        
            </div>

        </div>

        <div className="text-center text-white text-xs py-2 bg-gray-800">
            @ 2024 Chalnicol. Built using React + GSAP + Tailwind
        </div>
        
    </footer>

  );
};

export default Footer;
