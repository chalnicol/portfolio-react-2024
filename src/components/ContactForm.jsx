import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import emailjs from 'emailjs-com';



const ContactForm = () => {

  const [ isSuccess, setIsSuccess ] = useState(false);
  const [ showMsgDialog, setShowMsgDialog ] = useState(false);
  const [ isSending, setIsSending ] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSending (true);

    emailjs
      .send(
        'service_777hkwg', // Replace with your EmailJS service ID
        'template_7wikvih', // Replace with your EmailJS template ID
        formData,
        'wM5bWZY8OkYbbjBmW'     // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          setIsSending (false);
          setIsSuccess (true);

          setFormData({
            name: '',
            email: '',
            message: '',
          });

          showMessageDialog ();

        },
        (error) => {
          setIsSending (false);
          setIsSuccess (false);
          showMessageDialog ();
        }
      );
  };


  const handleCloseMessageClick = () => {
    showMessageDialog (false);
  }
  
  const showMessageDialog = ( show = true ) => {
    if ( show ) {
        setShowMsgDialog (true);
        gsap.set ('.msg', { display : 'block' });
        gsap.fromTo ('.msg', { scaleY : 0 }, { scaleY : 1, ease : 'elastic.out(1, 0.8)', duration : 0.8 });
    }else {
        gsap.fromTo ('.msg', { scaleY : 1 }, { scaleY : 0, ease : 'elastic.in(1, 0.8)', duration : 0.8, onComplete : () => { 
            gsap.set ('.msg', { display : 'none' });
            setShowMsgDialog (false);

        } });
    }
  }

  return (

    <>
        <div className={`msg mt-3 rounded py-2 px-3 select-none scale-y-0 hidden ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
            <div className="flex justify-between text-sm">
                <span className="msg">{ isSuccess ? 'Message sent successfully!' : 'Failed to send message.' }</span>
                <span className="cursor-pointer px-1" onClick={handleCloseMessageClick}>&times;</span>
            </div>
        </div>

        <form id="contactForm" onSubmit={handleSubmit}>

            <div className="my-2">
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full h-10 rounded my-1 px-3 text-black" placeholder="Enter your name" required />
            </div>
            <div className="my-2">
                <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full h-10 rounded my-1 px-3 text-black" placeholder="Enter your e-mail" required />
            </div>
            <div className="my-2">
                <textarea name="message" id="message" value={formData.message} onChange={handleChange} className="w-full h-32 rounded my-1 p-3 text-black" placeholder="Enter message here" required></textarea>
            </div>
            <button type="submit" className={`w-full py-3 rounded-md text-xl font-bold ${ isSending ? 'bg-gray-500 opacity-95 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-500' }`} disabled={isSending}>{ isSending ? 'Sending...' : 'SUBMIT'}</button>
        
        </form>

    </>
    
  );
};

export default ContactForm;