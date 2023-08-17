import { mdiCheckAll, mdiClose, mdiOpenInNew, mdiShareVariant } from '@mdi/js';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useLocation, useNavigate } from 'react-router-dom';

import { generateUrl } from '../helpers/image';
import './EmblemModal.css';

ReactModal.setAppElement('#root');

const EmblemModal = () => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const closeModal = () => navigate('/');

  const [shareIcon, setShareIcon] = useState(mdiShareVariant);

  const copyShareLink = () => {
    navigator.clipboard.writeText(`${process.env.REACT_APP_HOST}${pathname}`);
    setShareIcon(mdiCheckAll);

    setTimeout(() => setShareIcon(mdiShareVariant), 1000);
  };

  return (
    <ReactModal
      className="emblem-modal-window"
      overlayClassName="emblem-modal"
      isOpen={true}
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
      <h2 className="emblem-title-modal">{state.emblem.name}</h2>
      <img
        className="emblem-image-modal"
        src={
          state.emblem.imageUrl &&
          generateUrl(
            state.emblem.imageUrl.replace(
              /g\/\d*px/g,
              `g/${
                window.innerWidth < window.innerHeight
                  ? window.innerWidth
                  : window.innerHeight
              }px`
            )
          )
        }
        alt={`Armoiries ${state.emblem.name}`}
      />
      {state.emblem.credits && (
        <div className="credit-wikipedia-modal">
          Crédits :{' '}
          <span
            className="credit-value-wikipedia-modal"
            dangerouslySetInnerHTML={{
              __html: state.emblem.credits.replaceAll(
                '<a ',
                '<a target="_blank" '
              ),
            }}
          />
        </div>
      )}
      <div
        dangerouslySetInnerHTML={{
          __html:
            state.emblem.description &&
            state.emblem.description.replace(
              /href="\//gim,
              'target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/'
            ),
        }}
      />
      {state.emblem.sourceUrl && (
        <div className="link-wikipedia-modal">
          <a
            href={state.emblem.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
            <Icon
              className="link-wikipedia-icon"
              path={mdiOpenInNew}
              size={0.5}
              title="Ouvrir dans un nouvel onglet"
            />
          </a>
        </div>
      )}
      {process.env.REACT_APP_HOST && (
        <Icon
          className="share-link-icon"
          path={shareIcon}
          size={0.9}
          title="Copier le lien de partage"
          onClick={copyShareLink}
        />
      )}
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
