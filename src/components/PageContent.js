import React, { useContext } from 'react';
import { Pagination } from 'react-instantsearch';

import { PageContext } from '../contexts/PageContext';

import CustomHit from './CustomHits';
import EmblemContent from './EmblemContent';

import '@fontsource/hind';
import './PageContent.css';

const PageContent = () => {
  const { pageInfo } = useContext(PageContext);

  return (
    <div className="search-panel">
      {pageInfo && <EmblemContent emblemData={pageInfo} />}
      {!pageInfo && (
        <div className="search-panel__results">
          <CustomHit />
          <div className="pagination">
            <Pagination />
          </div>
        </div>
      )}
    </div>
  );
};

export default PageContent;
