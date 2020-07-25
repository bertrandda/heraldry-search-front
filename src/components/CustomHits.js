import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import mediumZoom from 'medium-zoom';
import { connectHits } from 'react-instantsearch-dom';
import EmblemItem from './EmblemItem';

const Hits = ({ hits }) => {
  const zoom = useRef(mediumZoom());
  return (
    <div className="ais-Hits">
      <ul className="ais-Hits-list">
        {hits.map((hit, i) => (
          <li key={`${i}-${hit.name}-item`} className="ais-Hits-item">
            <EmblemItem hit={hit} zoom={zoom.current} />
          </li>
        ))}
      </ul>
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
