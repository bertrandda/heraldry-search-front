import { mdiClose, mdiLinkVariant } from '@mdi/js';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import { useLocation, useNavigate } from 'react-router-dom';

import { generateUrl } from '../helpers/image';
import './EmblemModal.css';

ReactModal.setAppElement('#root');

const EmblemModal = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const closeModal = () => navigate('/');

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
              path={mdiLinkVariant}
              size={0.5}
            />
          </a>
        </div>
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
