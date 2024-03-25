import React from 'react'
import { Link } from 'react-router-dom'
import WhatsAppLink from './WhatsApp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {

  return (
    <footer className='footer'>
      <p> Copyright © Temima </p>
      <section className='contact'>
      <Link to="https://www.instagram.com/temimaceramics/">
        <FontAwesomeIcon className='instagram' icon={faInstagram} />
        </Link>
      <WhatsAppLink phoneNumber="0584401527" />
      </section>

      <section className="footer-links ">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </section>
    </footer>
  )
}
