import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';

const ContactUs = () => {
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const validate = () => {
    const { name, phone, email } = formData;
    const phoneRegex = /^\d+$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      toast.error('Phone must contain numbers');
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error('Enter a valid email address');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone' && /[^\d]/.test(value)) {
      return; 
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    emailjs.sendForm(
      'service_w4drkks',
      'template_k6pxo6b',
      formRef.current,
      'uwKz2pmOF48-syYsH'
    ).then(
      () => {
        toast.success('Message sent successfully!');
        setFormData({ name: '', phone: '', email: '', message: '' });
      },
      (error) => {
        toast.error('Failed to send message');
        console.error('EmailJS Error:', error.text);
      }
    );
  };

  return (
    <section className="contact-section">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="contact-title">Contact us</h2>

      <div className="contact-wrapper">
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
          ref={formRef}
        >
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone*"
            value={formData.phone}
            onChange={handleChange}
            maxLength="15"
          />

          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="form-button">Send</button>
        </form>

        <div className="contact-info">
          <div className="company-info">
            <h5>Curated Codes Technologies Pvt. Ltd.</h5>
            <p>mohammad@curatedcodes.in</p>
            <p>+91 8962132605</p>
          </div>
          <div className="info-title">
            <a
            href="https://wa.me/918962132605"
            className="whatsapp-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/ios-filled/20/25D366/whatsapp.png"
              alt="WhatsApp"
            />
            Message us on WhatsApp
          </a>
          </div>          
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
