import React from 'react';
import './ContactUs.css'
import Swal from 'sweetalert2'

function Contact() {

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "18e8568a-42db-48a6-95d3-d0c7911d4423");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
            Swal.fire({
                title: "Success!",
                text: "Message sent Successfully!",
                icon: "success"
              });
        }
      };

    return (
        <section className='contact'>
            <form onSubmit={onSubmit}>
                <h2>Contact Form</h2>
                <div className="input-box">
                    <label>Full Name</label>
                    <input type="text" className='field' placeholder='Enter your name' name='name' required />
                </div>
                <div className="input-box">
                    <label>Email Address</label>
                    <input type="email" className='field' placeholder='Enter your email' name='email' required />
                </div>
                <div className="input-box">
                    <label>Contact Number</label>
                    <input type="contact" className='field' placeholder='Enter your contact' name='contact' required />
                </div>
                <div className="input-box">
                    <label>Topic</label>
                    <input type="topic" className='field' placeholder='Enter your ' name='contact' required />
                </div>
                <div className="input-box">
                    <label>Your Message</label>
                    <textarea name='message' id='' className='field mess' placeholder='Enter your message' required></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
            </form>
        </section>
    )
}


export default Contact; 