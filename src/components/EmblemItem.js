import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { generateUrl } from '../helpers/image';
import './EmblemItem.css';

const EmblemItem = ({ hit = {}, zoom = {} }) => {
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
      <Link
        className="emblem-info-container"
        role="button"
        tabIndex={0}
        to={hit.path}
        state={{ emblem: hit }}
      >
        <h1 className="emblem-title">{hit.name}</h1>
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
