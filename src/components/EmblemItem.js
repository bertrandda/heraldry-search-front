import PropTypes from 'prop-types'
import { useContext, memo } from 'react'
import { Link } from 'react-router'

import { ModalContext } from '../contexts/ModalContext'
import { generateUrl } from '../helpers/image'
import './EmblemItem.css'

const EmblemItem = memo(({ hit = {} }) => {
  const { showModal } = useContext(ModalContext)

  const clickItem = (emblem) => {
    showModal(emblem)
  }

  return (
    <Link
      className="emblem-item-link"
      role="button"
      tabIndex={0}
      onClick={() => clickItem(hit)}
    >
      <article className="emblem-container">
        <div className="emblem-image-container">
          <img
            className="emblem-image"
            src={generateUrl(hit.imageUrl)}
            alt={`Armoiries ${hit.name}`}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="emblem-info-container">
          <h2 className="emblem-title">{hit.name}</h2>
          <p className="emblem-description">{hit.descriptionText}</p>
        </div>
      </article>
    </Link>
  )
})

EmblemItem.propTypes = {
  hit: PropTypes.object,
}

export const SkeletonItem = () => (
  <div className="emblem-container emblem-skeleton-item">
    <div className="emblem-image-container emblem-skeleton-block" />
    <div className="emblem-info-container emblem-skeleton-info">
      <div className="emblem-skeleton-block emblem-skeleton-title-line" />
      <div className="emblem-skeleton-block emblem-skeleton-desc-line" />
      <div className="emblem-skeleton-block emblem-skeleton-desc-line" />
    </div>
  </div>
)

export default EmblemItem
