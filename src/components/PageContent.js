import { useContext, useEffect } from 'react'
import { Pagination } from 'react-instantsearch'
import { useNavigate } from 'react-router'

import { PageContext } from '../contexts/PageContext'

import CustomHit from './CustomHits'
import EmblemContent from './EmblemContent'

import '@fontsource/hind'
import './PageContent.css'

const PageContent = () => {
  const { pageInfo } = useContext(PageContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!pageInfo) {
      navigate('/')
    }
  }, [pageInfo]) // eslint-disable-line

  return (
    <div className="search-panel">
      {pageInfo && window.__EMBLEM_DATA__ && (
        <EmblemContent emblemData={pageInfo} />
      )}
      {!pageInfo && (
        <div className="search-panel__results">
          <CustomHit />
          <div className="pagination">
            <Pagination />
          </div>
        </div>
      )}
    </div>
  )
}

export default PageContent
