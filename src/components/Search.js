import { mdiGithub } from '@mdi/js';
import Icon from '@mdi/react';
import { liteClient } from 'algoliasearch/lite';
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  InstantSearch,
  Configure,
  SearchBox,
  Pagination,
  PoweredBy,
} from 'react-instantsearch';
import { Outlet } from 'react-router-dom';

import CustomHit from './CustomHits';

import '@fontsource/hind';
import './Search.css';

let searchClient;

if (process.env.REACT_APP_SEARCH_SERVICE === 'algolia') {
  searchClient = liteClient(
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

const Search = () => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.REACT_APP_ALGOLIA_INDEX}
    >
      <Helmet>
        <meta property="og:title" content="Armorial de France" />
        <meta name="twitter:title" content="Armorial de France" />
        <meta
          name="description"
          content="Trouvez le blason que vous voulez grâce à un moteur de recherche puissant contenant les blasons de villes, de villages et de familles de France."
        />
        <meta
          property="og:description"
          content="Trouvez le blason que vous voulez grâce à un moteur de recherche puissant contenant les blasons de villes, de villages et de familles de France."
        />
        <meta
          name="twitter:description"
          content="Trouvez le blason que vous voulez grâce à un moteur de recherche puissant contenant les blasons de villes, de villages et de familles de France."
        />
        <meta property="og:url" content="https://armorialdefrance.org" />
        <meta property="og:image" content="/icon-og.png" />
        <meta name="twitter:image" content="/icon-twitter.png" />
        <link rel="canonical" href="https://armorialdefrance.org/" />
      </Helmet>
      <header className="header">
        <div className="header-title-container">
          <h1 className="header-title">Armorial de France</h1>
          <p className="header-subtitle">Villes, villages et familles</p>
        </div>
        <SearchBox
          className="searchbox"
          submitIconComponent={() => (
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
          )}
          placeholder={'Parti, de gueules, Toulouse...'}
        />
        {process.env.REACT_APP_SEARCH_SERVICE === 'algolia' && <PoweredBy />}
      </header>

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
      <Outlet />
    </InstantSearch>
  );
};

export default Search;
