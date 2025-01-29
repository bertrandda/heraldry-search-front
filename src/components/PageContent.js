import React, { useContext, useEffect } from 'react';
import { Pagination } from 'react-instantsearch';
import { useNavigate } from 'react-router-dom';

import { PageContext } from '../contexts/PageContext';

import CustomHit from './CustomHits';
import EmblemContent from './EmblemContent';

import '@fontsource/hind';
import './PageContent.css';

const PageContent = () => {
  const { pageInfo } = useContext(PageContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pageInfo) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo]);

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
