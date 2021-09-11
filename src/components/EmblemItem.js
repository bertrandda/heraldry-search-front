import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../contexts/ModalContext';
import { generateUrl } from '../helpers/image';
import './EmblemItem.css';

const EmblemItem = ({ hit, zoom }) => {
  const { showModal } = useContext(ModalContext);
  const zoomRef = useRef(zoom);

  const attachZoom = (image) => {
    zoomRef.current.attach(image);
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
      <span
        className="emblem-info-container"
        role="button"
        tabIndex={0}
        onClick={() => {
          showModal(hit);
        }}
      >
        <h1 className="emblem-title">{hit.name}</h1>
        <p className="emblem-description">{hit.descriptionText}</p>
      </span>
    </article>
  );
};

EmblemItem.propTypes = {
  hit: PropTypes.object,
  zoom: PropTypes.object,
};

EmblemItem.defaultProps = {
  hit: {},
  zoom: {},
};

export default EmblemItem;
