import mediumZoom from 'medium-zoom';
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { useHits } from 'react-instantsearch';

import EmblemItem from './EmblemItem';
import './CustomHits.css';

const zoom = mediumZoom();

const Hits = ({ hits = [] }) => {
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
        const zoomImages = document.getElementsByClassName(
          'medium-zoom-image--opened'
        );
        zoomImages[1].style.visibility = 'hidden';
        zoomImages[1].classList.add('safari-zoom-image-opening');

        const transitionendCb = () => {
          if (customTransition) {
            zoomImages[1].style.visibility = 'visible';
            zoomImages[0].style.visibility = 'hidden';
            zoomImages[1].removeEventListener('transitionend', transitionendCb);

            return;
          }

          customTransition = true;
        };

        zoomImages[1].addEventListener('transitionend', transitionendCb);

        if (window.innerWidth < window.innerHeight) {
          zoomImages[1].style.width = '100%';
          zoomImages[1].style.removeProperty('height');
        } else {
          zoomImages[1].style.height = '100%';
          zoomImages[1].style.removeProperty('width');
        }
      });

      zoomRef.current.on('close', () => {
        const zoomImages = document.getElementsByClassName(
          'medium-zoom-image--opened'
        );
        zoomImages[0].style.visibility = 'visible';
        zoomImages[1].style.visibility = 'hidden';
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

export default CustomHits;

function connectHits(Component) {
  return function (props) {
    const data = useHits(props);

    return <Component {...props} {...data} />;
  };
}
