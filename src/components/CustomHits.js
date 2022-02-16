import mediumZoom from 'medium-zoom';
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { connectHits } from 'react-instantsearch-dom';

import EmblemItem from './EmblemItem';

const zoom = mediumZoom();

const Hits = ({ hits }) => {
  const zoomRef = useRef(zoom);
  zoomRef.current.detach();

  useEffect(() => {
    if (
      // Hack to avoid blurry image on zoom macOS Safari & iOS/ipadOS browsers
      navigator.userAgent.indexOf('AppleWebKit') > -1 &&
      navigator.userAgent.search(/Chrom(e|ium)/gm) === -1
    ) {
      zoomRef.current.on('opened', () => {
        const zoomedElem = document.getElementsByClassName(
          'medium-zoom-image--opened'
        )[1];
        zoomedElem.style.visibility = 'hidden';
        zoomedElem.style.position = 'fixed';
        if (window.innerWidth < window.innerHeight) {
          zoomedElem.style.width = '100%';
          zoomedElem.style.removeProperty('height');
        } else {
          zoomedElem.style.height = '100%';
          zoomedElem.style.removeProperty('width');
        }
        zoomedElem.style['max-width'] = '100%';
        zoomedElem.style['max-height'] = '100%';
        zoomedElem.style.top = '50%';
        zoomedElem.style.left = '50%';
        zoomedElem.style.transform = 'translate(-50%, -50%)';
        zoomedElem.style.transform = zoomedElem.style.transform.replace(
          /scale\(\d\.\d+\)/,
          ''
        );
        setTimeout(() => {
          zoomedElem.style.visibility = 'visible';
          document.getElementsByClassName(
            'medium-zoom-image--opened'
          )[0].style.visibility = 'hidden';
        }, 300);
      });

      zoomRef.current.on('close', () => {
        document.getElementsByClassName(
          'medium-zoom-image--opened'
        )[0].style.visibility = 'visible';
        document.getElementsByClassName(
          'medium-zoom-image--opened'
        )[1].style.visibility = 'hidden';
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
