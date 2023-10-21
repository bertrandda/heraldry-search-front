import { mdiCheckAll, mdiClose, mdiOpenInNew, mdiShareVariant } from '@mdi/js';
import Icon from '@mdi/react';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ReactModal from 'react-modal';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

import {
  generateLargeUrl,
  generateUrl,
  generateUrlWithPadding,
} from '../helpers/image';
import './EmblemModal.css';

ReactModal.setAppElement('#root');

const EmblemModal = () => {
  const HOST = window.location.origin;

  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const closeModal = () => navigate('/');

  const [shareIcon, setShareIcon] = useState(mdiShareVariant);
  const [shareIconTimeout, setShareIconTimeout] = useState(null);
  const [shareIconText, setShareIconText] = useState('Lien de partage');
  const [emblemData] = useState(state?.emblem || window?.__EMBLEM_DATA__);

  const copyShareLink = () => {
    navigator.clipboard.writeText(`${HOST}${pathname}`);
    setShareIcon(mdiCheckAll);
    setShareIconText('Copié');

    if (shareIconTimeout) {
      clearTimeout(shareIconTimeout);
    }

    setShareIconTimeout(
      setTimeout(() => {
        setShareIcon(mdiShareVariant);
        setShareIconText('Lien de partage');
        setShareIconTimeout(null);
      }, 1500)
    );
  };

  if (!emblemData) {
    return <Navigate to="/" />;
  }

  return (
    <ReactModal
      className="emblem-modal-window"
      overlayClassName="emblem-modal"
      isOpen={true}
      contentLabel="emblem-modal"
      onRequestClose={closeModal}
    >
      <Helmet>
        <meta
          property="og:title"
          content={`Armorial de France - ${emblemData.name}`}
        />
        <meta
          name="twitter:title"
          content={`Armorial de France - ${emblemData.name}`}
        />
        <meta name="description" content={emblemData.descriptionText} />
        <meta property="og:description" content={emblemData.descriptionText} />
        <meta name="twitter:description" content={emblemData.descriptionText} />
        <meta property="og:url" content={`${HOST}${pathname}`}></meta>
        <meta
          property="og:image"
          content={`${generateUrlWithPadding(
            generateLargeUrl(emblemData.imageUrl, 512, false),
            1200,
            627
          )}`}
        />
        <meta
          name="twitter:image"
          content={`${generateUrlWithPadding(
            generateLargeUrl(emblemData.imageUrl, 512, false),
            700,
            700
          )}`}
        ></meta>
      </Helmet>
      <Icon
        className="close-modal"
        path={mdiClose}
        size={1}
        color="rgb(58, 69, 112)"
        onClick={closeModal}
      />
      <h2 className="emblem-title-modal">{emblemData.name}</h2>
      <img
        className="emblem-image-modal"
        src={
          emblemData.imageUrl &&
          generateUrl(
            emblemData.imageUrl.replace(
              /g\/\d*px/g,
              `g/${
                window.innerWidth < window.innerHeight
                  ? window.innerWidth
                  : window.innerHeight
              }px`
            )
          )
        }
        alt={`Armoiries ${emblemData.name}`}
      />
      {emblemData.credits && (
        <div className="credit-wikipedia-modal">
          Crédits :{' '}
          <span
            className="credit-value-wikipedia-modal"
            dangerouslySetInnerHTML={{
              __html: emblemData.credits.replaceAll(
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
            emblemData.description &&
            emblemData.description.replace(
              /href="\//gim,
              'target="_blank" rel="noopener noreferrer" href="https://fr.wikipedia.org/'
            ),
        }}
      />
      {emblemData.sourceUrl && (
        <div className="link-wikipedia-modal">
          <a
            href={emblemData.sourceUrl}
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
      {HOST && (
        <Tooltip
          title={shareIconText}
          placement="top"
          arrow={true}
          enterTouchDelay={0}
          leaveTouchDelay={800}
        >
          <Icon
            className="share-link-icon"
            path={shareIcon}
            size={0.9}
            aria-disabled={true}
            onClick={copyShareLink}
          />
        </Tooltip>
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
