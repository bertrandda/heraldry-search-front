import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import mediumZoom from 'medium-zoom';
import { connectHits } from 'react-instantsearch-dom';
import EmblemItem from './EmblemItem';

const Hits = ({ hits }) => {
  const zoom = useRef(mediumZoom());
  zoom.current.detach();

  return (
    <div className="ais-Hits">
      <div className="ais-Hits-list">
        {hits.map((hit, i) => (
          <div key={`${i}-${hit.name}-item`} className="ais-Hits-item">
            <EmblemItem hit={hit} zoom={zoom.current} />
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
