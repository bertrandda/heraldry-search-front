import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Icon from '@mdi/react';
import { mdiClose, mdiLinkVariant } from '@mdi/js';
import { ModalContext } from '../contexts/ModalContext';
import './EmblemModal.css';

ReactModal.setAppElement('#root');

const EmblemModal = () => {
  const { modalInfo, hideModal } = useContext(ModalContext);

  return (
    <ReactModal
      className="emblem-modal-window"
      overlayClassName="emblem-modal"
      isOpen={Object.keys(modalInfo).length !== 0}
      contentLabel="emblem-modal"
      onRequestClose={hideModal}
    >
      <Icon
        className="close-modal"
        path={mdiClose}
        size={1}
        color="rgb(58, 69, 112)"
        onClick={hideModal}
      />
      <h2 className="emblem-title-modal">{modalInfo.name}</h2>
      <img
        className="emblem-image-modal"
        src={
          modalInfo.imageUrl &&
          modalInfo.imageUrl.replace(
            /g\/\d*px/g,
            `g/${
              window.innerWidth < window.innerHeight
                ? window.innerWidth
                : window.innerHeight
            }px`
          )
        }
        alt={`Armoiries ${modalInfo.name}`}
      />
      {modalInfo.credits && <div className="credit-wikipedia-modal">
        Crédits : <span className="credit-value-wikipedia-modal"
          dangerouslySetInnerHTML={{
            __html:
              modalInfo.credits.replaceAll('<a ', '<a target="_blank" ')
          }}
        />
      </div>}
      <div
        dangerouslySetInnerHTML={{
          __html:
            modalInfo.description &&
            modalInfo.description.replace(
              /href="\//gim,
              'target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/'
            ),
        }}
      />
      {modalInfo.sourceUrl && <div className="link-wikipedia-modal">
        <a href={modalInfo.sourceUrl} target="_blank" rel="noopener noreferrer">
          Source
          <Icon
            className="link-wikipedia-icon"
            path={mdiLinkVariant}
            size={0.5}
          />
        </a>
      </div>}
    </ReactModal>
  );
};

EmblemModal.propTypes = {
  isOpen: PropTypes.bool,
  emblem: PropTypes.object,
};

EmblemModal.defaultProps = {
  isOpen: false,
  emblem: {},
};

export default EmblemModal;
