import mediumZoom from 'medium-zoom';
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { connectHits } from 'react-instantsearch-dom';

import EmblemItem from './EmblemItem';
import './CustomHits.css';

const zoom = mediumZoom();

const Hits = ({ hits }) => {
  const zoomRef = useRef(zoom);
  zoomRef.current.detach();

  useEffect(() => {
    if (
      // Hacky way to avoid blurry image on zoom Safari & iOS/ipadOS browsers
      navigator.userAgent.indexOf('AppleWebKit') > -1 &&
      navigator.userAgent.search(/Chrom(e|ium)/gm) === -1
    ) {
      zoomRef.current.on('opened', () => {
        let customTransition = false;
        const zoomedElem = document.getElementsByClassName(
          'medium-zoom-image--opened'
        )[1];
        zoomedElem.classList.add(
          'safari-zoom-image-invisible',
          'safari-zoom-image-opening'
        );

        const transitionendCb = () => {
          if (customTransition) {
            zoomedElem.classList.add('safari-zoom-image-visible');
            zoomedElem.classList.remove('safari-zoom-image-invisible');
            document
              .getElementsByClassName('medium-zoom-image--opened')[0]
              .classList.add('safari-zoom-image-invisible');
            zoomedElem.removeEventListener('transitionend', transitionendCb);

            return;
          }

          customTransition = true;
        };

        zoomedElem.addEventListener('transitionend', transitionendCb);

        if (window.innerWidth < window.innerHeight) {
          zoomedElem.style.width = '100%';
          zoomedElem.style.removeProperty('height');
        } else {
          zoomedElem.style.height = '100%';
          zoomedElem.style.removeProperty('width');
        }
      });

      zoomRef.current.on('close', () => {
        const zoomableElem = document.getElementsByClassName(
          'medium-zoom-image--opened'
        )[0];
        zoomableElem.classList.add('safari-zoom-image-visible');
        zoomableElem.classList.remove('safari-zoom-image-invisible');
        const zoomedElem = document.getElementsByClassName(
          'medium-zoom-image--opened'
        )[1];
        zoomedElem.classList.add('safari-zoom-image-invisible');
        zoomedElem.classList.remove('safari-zoom-image-visible');
      });
    }
  }, []);

  return (
    <div className="ais-Hits">
      <div className="ais-Hits-list">
        {hits.map((hit) => (
          <div
            key={`${hit.objectID || hit.emblemId}-${hit.name}-item`}
            className="ais-Hits-item"
          >
            <EmblemItem hit={hit} zoom={zoomRef.current} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomHits = connectHits(Hits);

Hits.propTypes = {
  hits: PropTypes.array,
};

Hits.defaultProps = {
  hits: {},
};

export default CustomHits;
