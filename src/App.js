import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  Hits,
  SearchBox,
  Pagination,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">hearaldry-front-search</a>
          </h1>
          <p className="header-subtitle">
            using{' '}
            <a href="https://github.com/algolia/react-instantsearch">
              React InstantSearch
            </a>
          </p>
        </header>

        <div className="container">
          <InstantSearch searchClient={searchClient} indexName="emblems">
            <div className="search-panel">
              <div className="search-panel__results">
                <Configure hitsPerPage={5} />
                <SearchBox
                  className="searchbox"
                  translations={{
                    placeholder: 'De gueules...',
                  }}
                />
                <Hits hitComponent={Hit} />

                <div className="pagination">
                  <Pagination />
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
}

function Hit({ hit }) {
  return (
    <article className="emblem-container">
      <div className="emblem-image-container">
        <img
          className="emblem-image"
          src={hit.imageUrl}
          alt={`Armoiries ${hit.name}`}
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

// function renderHtml(html) {
//   return { __html: html };
// }

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
