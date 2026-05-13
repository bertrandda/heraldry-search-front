import PropTypes from 'prop-types'
import { useHits, useInstantSearch } from 'react-instantsearch'

import EmblemItem, { SkeletonItem } from './EmblemItem'

const HITS_PER_PAGE = 18

const Hits = ({ hits = [] }) => {
  const { status } = useInstantSearch()
  const showSkeleton = (status === 'loading' || status === 'stalled') && hits.length === 0

  const items = showSkeleton
    ? Array.from({ length: HITS_PER_PAGE }, (_, i) => (
        <div key={`skeleton-${i}`} className="ais-Hits-item">
          <SkeletonItem />
        </div>
      ))
    : hits.map(hit => (
        <div
          key={`${hit.objectID || hit.emblemId}-${hit.name}-item`}
          className="ais-Hits-item"
        >
          <EmblemItem hit={hit} />
        </div>
      ))

  return (
    <div className="ais-Hits">
      <div className="ais-Hits-list">
        {items}
      </div>
    </div>
  )
}

const CustomHits = connectHits(Hits)

Hits.propTypes = {
  hits: PropTypes.array,
}

export default CustomHits

function connectHits(Component) {
  return function (props) {
    const data = useHits(props)

    return <Component {...props} {...data} />
  }
}
