import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../contexts/ModalContext';
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
          src={hit.imageUrl}
          data-zoom-src={
            navigator.userAgent.indexOf('Safari') > -1 &&
            navigator.userAgent.search(/Chrom(e|ium)/gm) === -1
              ? `https://www.mediawiki.org/w/index.php?title=Special:Redirect/file/${hit.imageUrl
                  .split('/')
                  .pop()
                  .replace('80px-', '')}&width=${
                  window.innerWidth < window.innerHeight
                    ? window.innerWidth
                    : window.innerHeight
                }&height=${
                  window.innerWidth < window.innerHeight
                    ? window.innerWidth
                    : window.innerHeight
                }`
              : hit.imageUrl.replace(
                  /g\/\d*px/g,
                  `g/${
                    window.innerWidth < window.innerHeight
                      ? window.innerWidth
                      : window.innerHeight
                  }px`
                )
          }
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
