import PropTypes from 'prop-types';
import React, { useContext, useRef } from 'react';
import { Link } from 'react-router';

import { ModalContext } from '../contexts/ModalContext';
import { generateUrl } from '../helpers/image';
import './EmblemItem.css';

const EmblemItem = ({ hit = {}, zoom = {} }) => {
  const zoomRef = useRef(zoom);
  const { showModal } = useContext(ModalContext);

  const attachZoom = (image) => {
    zoomRef.current.attach(image);
  };

  const clickItem = (emblem) => {
    showModal(emblem);
  };

  return (
    <article className="emblem-container">
      <div className="emblem-image-container">
        <img
          className="emblem-image"
          src={generateUrl(hit.imageUrl)}
          data-zoom-src={generateUrl(hit.imageUrl, true)}
          alt={`Armoiries ${hit.name}`}
          ref={attachZoom}
        />
      </div>
      <Link
        className="emblem-info-container"
        role="button"
        tabIndex={0}
        onClick={() => clickItem(hit)}
      >
        <h2 className="emblem-title">{hit.name}</h2>
        <p className="emblem-description">{hit.descriptionText}</p>
      </Link>
    </article>
  );
};

EmblemItem.propTypes = {
  hit: PropTypes.object,
  zoom: PropTypes.object,
};

export default EmblemItem;
