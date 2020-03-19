import React from 'react';
import PropTypes from 'prop-types';
import mediumZoom from 'medium-zoom';
import './EmblemItem.css';

const EmblemItem = ({ hit }) => {
  const zoom = mediumZoom();

  const attachZoom = image => {
    zoom.attach(image);
  };

  zoom.on('opened', () => {
    document.getElementsByClassName(
      'medium-zoom-image--opened'
    )[0].style.visibility = 'hidden';
  });

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
      <span className="emblem-info-container">
        <h1 className="emblem-title">{hit.name}</h1>
        <p className="emblem-description">{hit.descriptionText}</p>
        <p className="emblem-description-more">...</p>
      </span>
    </article>
  );
};

EmblemItem.propTypes = {
  hit: PropTypes.object,
};

EmblemItem.defaultProps = {
  hit: {},
};

export default EmblemItem;
