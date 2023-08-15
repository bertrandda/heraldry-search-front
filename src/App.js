import { mdiGithub } from '@mdi/js';
import Icon from '@mdi/react';
import algoliasearch from 'algoliasearch/lite';
import React, { useEffect } from 'react';
import {
  InstantSearch,
  Configure,
  SearchBox,
  Pagination,
  PoweredBy,
} from 'react-instantsearch-dom';

import CustomHit from './components/CustomHits';
import EmblemModal from './components/EmblemModal';
import { ModalContextProvider } from './contexts/ModalContext';

import '@fontsource/hind';
import './App.css';

let searchClient;

if (process.env.REACT_APP_SEARCH_SERVICE === 'algolia') {
  searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY
  );
} else if (process.env.REACT_APP_SEARCH_SERVICE === 'custom') {
  searchClient = {
    search: (requests) =>
      fetch(`${process.env.REACT_APP_CUSTOM_SEARCH_URL}/search`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requests }),
      }).then((res) => res.json()),
  };
}

const App = () => {
  useEffect(() => {
    document
      .getElementsByClassName('ais-SearchBox-input')[0]
      .setAttribute('aria-label', 'Recherche');
  }, []);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.REACT_APP_ALGOLIA_INDEX}
    >
      <header className="header">
        <div className="header-title-container">
          <h1 className="header-title">Armorial de France</h1>
          <p className="header-subtitle">Villes, villages et familles</p>
        </div>
        <SearchBox
          className="searchbox"
          translations={{
            placeholder: 'Parti, de gueules, famille...',
          }}
          submit={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 18 18"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.67"
                transform="translate(1 1)"
              >
                <circle cx="7.11" cy="7.11" r="7.11" />
                <path d="M16 16l-3.87-3.87" />
              </g>
            </svg>
          }
        />
        {process.env.REACT_APP_SEARCH_SERVICE === 'algolia' && <PoweredBy />}
      </header>

      <ModalContextProvider>
        <div className="container">
          <div className="search-panel">
            <div className="search-panel__results">
              <Configure hitsPerPage={18} />
              <CustomHit />
              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
          <div className="link-github">
            <a
              href="https://github.com/bertrandda/heraldry-search-front"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="link-github-icon" path={mdiGithub} size={0.8} />
            </a>
          </div>
        </div>
        <EmblemModal />
      </ModalContextProvider>
    </InstantSearch>
  );
};

export default App;
