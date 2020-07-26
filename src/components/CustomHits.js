import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import mediumZoom from 'medium-zoom';
import { connectHits } from 'react-instantsearch-dom';
import EmblemItem from './EmblemItem';

const zoom = mediumZoom();

const Hits = ({ hits }) => {
  const zoomRef = useRef(zoom);
  zoomRef.current.detach();

  useEffect(() => {
    zoomRef.current.on('opened', () => {
      document.getElementsByClassName(
        'medium-zoom-image--opened'
      )[0].style.visibility = 'hidden';
    });
  }, []);

  return (
    <div className="ais-Hits">
      <div className="ais-Hits-list">
        {hits.map((hit, i) => (
          <div key={`${i}-${hit.name}-item`} className="ais-Hits-item">
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
