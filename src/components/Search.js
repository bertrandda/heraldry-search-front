import { mdiGithub } from '@mdi/js';
import Icon from '@mdi/react';
import { liteClient } from 'algoliasearch/lite';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  InstantSearch,
  SearchBox,
  PoweredBy,
  Configure,
} from 'react-instantsearch';
import { Outlet } from 'react-router-dom';

import { PageContext } from '../contexts/PageContext';

import PageContent from './PageContent';

import '@fontsource/hind';
import './Search.css';

let searchClient;

if (process.env.REACT_APP_SEARCH_SERVICE === 'algolia') {
  const algoliaClient = liteClient(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY
  );
  searchClient = {
    ...algoliaClient,
    search(requests) {
      if (
        window?.__EMBLEM_DATA__ &&
        requests.every(({ params }) => !params.query)
      ) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: '',
            params: '',
          })),
        });
      }

      return algoliaClient.search(requests);
    },
  };
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

let timerId = undefined;
const timeout = 500;

const Search = () => {
  const { hidePage } = useContext(PageContext);

  const queryHook = (query, search) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => search(query), timeout);
  };

  const onFocus = () => {
    delete window.__EMBLEM_DATA__;
    hidePage();
  };

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.REACT_APP_ALGOLIA_INDEX}
    >
      <Helmet>
        <title>Armorial de France</title>
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
          queryHook={queryHook}
          onFocus={onFocus}
        />
        {process.env.REACT_APP_SEARCH_SERVICE === 'algolia' && <PoweredBy />}
        <Configure hitsPerPage={18} />
      </header>

      <div className="container">
        <PageContent />
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
