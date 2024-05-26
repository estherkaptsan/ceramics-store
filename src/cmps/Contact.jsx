import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    //   });
    //   console.log(response);

    //   if (response.ok) {
    //     console.log('Message sent successfully!');
    //     navigate('/');
    //   } else {
    //     console.error('Failed to send message');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
    console.log('send message');
    navigate('/');
  };

  return (
    <section className="contact-us">
      <div className="container">
        <h2 className="section-title">Contact me</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name}
            onChange={handleChange} placeholder="Your Name" required />
          <input type="email" name="email" value={formData.email}
            onChange={handleChange} placeholder="Your Email" required />
          <textarea name="message" value={formData.message}
            onChange={handleChange} placeholder="Message" rows="8" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}
