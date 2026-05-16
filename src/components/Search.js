import { mdiGithub } from '@mdi/js'
import Icon from '@mdi/react'
import { liteClient } from 'algoliasearch/lite'
import { useContext, useMemo, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  InstantSearch,
  SearchBox,
  PoweredBy,
  Configure,
  useRefinementList,
} from 'react-instantsearch'
import { Outlet } from 'react-router'

import { PageContext } from '../contexts/PageContext'

import PageContent from './PageContent'

import translation from '../assets/translation.json'

import '@fontsource/hind'
import './Search.css'

let timerId = undefined
const timeout = 500
const indexName = process.env.REACT_APP_ALGOLIA_INDEX

const transformFilters = (items) => {
  return items.map(item => ({
    ...item,
    label: translation.fr[item.label] || item.label,
  }))
}

const REFINEMENT_SKELETON_WIDTHS = [85, 85, 85, 85, 70, 95, 65, 75, 55, 115]

const RefinementListSkeleton = () => (
  <div className="ais-RefinementList">
    <ul className="ais-RefinementList-list">
      {REFINEMENT_SKELETON_WIDTHS.map((w, i) => (
        <li key={i} className="ais-RefinementList-item">
          <div
            className="ais-RefinementList-skeleton-pill"
            style={{ width: w }}
          />
        </li>
      ))}
    </ul>
  </div>
)

const CustomRefinementList = (props) => {
  const { items, refine } = useRefinementList(props)
  const showSkeleton = items.length === 0

  if (showSkeleton) return <RefinementListSkeleton />

  return (
    <div className="ais-RefinementList">
      <ul className="ais-RefinementList-list">
        {items.map(item => (
          <li
            key={item.label}
            className={`ais-RefinementList-item${item.isRefined ? ' ais-RefinementList-item--selected' : ''}`}
          >
            <label className="ais-RefinementList-label" onClick={() => refine(item.value)}>
              <span className="ais-RefinementList-labelText">{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Search = () => {
  const { hidePage } = useContext(PageContext)

  const searchClient = useMemo(() => {
    if (process.env.REACT_APP_SEARCH_SERVICE === 'algolia') {
      const algoliaClient = liteClient(
        process.env.REACT_APP_ALGOLIA_APP_ID,
        process.env.REACT_APP_ALGOLIA_API_KEY,
      )
      return {
        ...algoliaClient,
        search(requests) {
          if (
            window?.__EMBLEM_DATA__
            && requests.every(({ params }) => !params.query)
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
            })
          }

          return algoliaClient.search(requests)
        },
      }
    }
    else if (process.env.REACT_APP_SEARCH_SERVICE === 'custom') {
      return {
        search: requests =>
          fetch(`${process.env.REACT_APP_CUSTOM_SEARCH_URL}/search`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requests }),
          }).then(res => res.json()),
      }
    }
    return null
  }, [])

  const queryHook = useCallback((query, search) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => search(query), timeout)
  }, [])

  const onFocus = useCallback(() => {
    delete window.__EMBLEM_DATA__
    hidePage()
  }, [hidePage])

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      initialUiState={{
        [indexName]: {
          refinementList: {
            country: ['france'],
          },
        },
      }}
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
        <meta
          property="og:image"
          content={`${window.location.origin}/icon-og.png`}
        />
        <meta
          name="twitter:image"
          content={`${window.location.origin}/icon-twitter.png`}
        />
        <link rel="canonical" href="https://armorialdefrance.org/" />
      </Helmet>
      <header className="header">
        <div className="header-title-container">
          <h1 className="header-title">
            Armorial de France
            <span className="header-title-ext">et d&apos;Europe</span>
          </h1>
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
          placeholder="Parti, de gueules, Toulouse..."
          queryHook={queryHook}
          onFocus={onFocus}
        />
        {process.env.REACT_APP_SEARCH_SERVICE === 'algolia' && <PoweredBy />}
        <Configure hitsPerPage={18} />
      </header>

      <div className="container">
        <div className="refinement-list">
          <CustomRefinementList attribute="country" sortBy={['name']} transformItems={transformFilters} />
        </div>
        <PageContent />
        <div className="link-github">
          <a
            href="https://github.com/bertrandda/heraldry-search-front"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Projet GitHub"
          >
            <Icon className="link-github-icon" path={mdiGithub} size={0.8} />
          </a>
        </div>
      </div>
      <Outlet />
    </InstantSearch>
  )
}

export default Search
