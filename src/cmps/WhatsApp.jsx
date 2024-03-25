import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const WhatsAppLink = ({ phoneNumber }) => {
  const whatsappNumber = phoneNumber.replace(/\s/g, '+');
  const link = `https://wa.me/${whatsappNumber}`;

  return (
    <Link to={link} target="_blank">
      <FontAwesomeIcon className='whatsapp' icon={faWhatsapp} />
    </Link>
  );
};

export default WhatsAppLink;
