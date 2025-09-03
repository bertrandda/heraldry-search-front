import { mdiFormatListText, mdiMap } from '@mdi/js'
import Icon from '@mdi/react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Link, Outlet } from 'react-router'

const EmblemModal = lazy(() => import('./components/EmblemModal'))
const Maps = lazy(() => import('./components/Maps'))
const Search = lazy(() => import('./components/Search'))

import { ModalContextProvider } from './contexts/ModalContext'
import { PageContextProvider } from './contexts/PageContext'

import '@fontsource/hind'
import './App.css'

const App = ({ page }) => {
  const [listView, setListView] = useState(page === 'search')

  useEffect(() => {}, [listView])

  return (
    <div className="app-container">
      <div className="header-type-container">
        <Link
          className="header-type-button"
          role="button"
          tabIndex={0}
          to="/"
          aria-label="Page recherche"
          onClick={() => setListView(true)}
        >
          <Icon
            className={`header-type-item${
              listView ? ' header-type-item--active' : ''
            }`}
            path={mdiFormatListText}
            size={0.75}
          />
        </Link>
        <Link
          className="header-type-button"
          role="button"
          tabIndex={0}
          to="/maps"
          aria-label="Page carte"
          onClick={() => setListView(false)}
        >
          <Icon
            className={`header-type-item${
              !listView ? ' header-type-item--active' : ''
            }`}
            path={mdiMap}
            size={0.75}
          />
        </Link>
      </div>
      <Outlet />
      <HelmetProvider>
        <PageContextProvider emblemInfo={window.__EMBLEM_DATA__}>
          <ModalContextProvider>
            <Suspense fallback={<div className="loading-placeholder">Chargement...</div>}>
              {page === 'search' && <Search />}
              {page === 'maps' && <Maps />}
              <EmblemModal />
            </Suspense>
          </ModalContextProvider>
        </PageContextProvider>
      </HelmetProvider>
    </div>
  )
}

export default App
