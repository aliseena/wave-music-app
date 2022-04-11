import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
const Footer = () => {
  return (
    <div className="footer">
      <h3>
        Created with <FontAwesomeIcon icon={faHeart} /> by
        <a href="https://twitter.com/Ali_21O" target="_blank">
          Ali
        </a>
      </h3>
    </div>
  );
};

export default Footer;
