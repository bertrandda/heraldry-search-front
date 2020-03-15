import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  Hits,
  SearchBox,
  Pagination,
  PoweredBy,
} from 'react-instantsearch-dom';
import mediumZoom from 'medium-zoom';
import './App.css';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

class App extends Component {
  zoom = mediumZoom();

  attachZoom = image => {
    this.zoom.attach(image);
  };

  render = () => (
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
        <PoweredBy />
      </header>

      <div className="container">
        <div className="search-panel">
          <div className="search-panel__results">
            <Configure hitsPerPage={18} />
            <Hits hitComponent={this.Hit} />

            <div className="pagination">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </InstantSearch>
  );

  Hit = ({ hit }) => (
    <article className="emblem-container">
      <div className="emblem-image-container">
        <img
          className="emblem-image"
          src={hit.imageUrl}
          data-zoom-src={
            navigator.userAgent.indexOf('Safari') > -1 &&
            navigator.userAgent.search(/Chrom(e|ium)/gm) === -1
              ? `https://www.mediawiki.org/w/index.php?title=Special:Redirect/file/${hit.imageUrl
                  .split('/')
                  .pop()
                  .replace('80px-', '')}&width=${
                  window.innerWidth < window.innerHeight
                    ? window.innerWidth
                    : window.innerHeight
                }&height=${
                  window.innerWidth < window.innerHeight
                    ? window.innerWidth
                    : window.innerHeight
                }`
              : hit.imageUrl.replace(
                  /g\/\d*px/g,
                  `g/${
                    window.innerWidth < window.innerHeight
                      ? window.innerWidth
                      : window.innerHeight
                  }px`
                )
          }
          alt={`Armoiries ${hit.name}`}
          ref={this.attachZoom}
        />
      </div>
      <span className="emblem-info-container">
        <h1 className="emblem-title">{hit.name}</h1>
        <p className="emblem-description">{hit.descriptionText}</p>
        <p className="emblem-description-more">...</p>
      </span>
    </article>
  );
}

export default App;
