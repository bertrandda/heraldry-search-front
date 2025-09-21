import PropTypes from 'prop-types'
import { useHits } from 'react-instantsearch'

import EmblemItem from './EmblemItem'

const Hits = ({ hits = [] }) => {
  return (
    <div className="ais-Hits">
      <div className="ais-Hits-list">
        {hits.map(hit => (
          <div
            key={`${hit.objectID || hit.emblemId}-${hit.name}-item`}
            className="ais-Hits-item"
          >
            <EmblemItem hit={hit} />
          </div>
        ))}
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
