import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import { useContext, useEffect } from 'react'
import ReactModal from 'react-modal'
import { useLocation, useNavigate } from 'react-router'

import { ModalContext } from '../contexts/ModalContext'

import './EmblemModal.css'
import EmblemContent from './EmblemContent'

ReactModal.setAppElement('#root')

const EmblemModal = () => {
  const { modalInfo, hideModal } = useContext(ModalContext)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const emblemData = modalInfo || window?.__EMBLEM_DATA__

  useEffect(() => {
    if (modalInfo?.path && pathname !== '/maps') {
      navigate(modalInfo.path)
    }
  }, [modalInfo]) // eslint-disable-line

  const closeModal = () => {
    hideModal()

    if (pathname !== '/maps') {
      navigate('/')
    }
  }

  return (
    <ReactModal
      className="emblem-modal-window"
      overlayClassName="emblem-modal"
      isOpen={Boolean(emblemData?.path)}
      contentLabel="emblem-modal"
      onRequestClose={closeModal}
    >
      <Icon
        className="close-modal"
        path={mdiClose}
        size={1}
        color="rgb(58, 69, 112)"
        onClick={closeModal}
      />
      <EmblemContent emblemData={emblemData} />
    </ReactModal>
  )
}

export default EmblemModal
