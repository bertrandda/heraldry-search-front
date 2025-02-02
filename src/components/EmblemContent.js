import { mdiCheckAll, mdiOpenInNew, mdiShareVariant } from '@mdi/js';
import Icon from '@mdi/react';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import {
  generateUrl,
  generateLargeUrl,
  generateUrlWithPadding,
} from '../helpers/image';
import './EmblemContent.css';

const EmblemContent = ({ emblemData = {} }) => {
  const HOST = window.location.origin;

  const [shareIcon, setShareIcon] = useState(mdiShareVariant);
  const [shareIconTimeout, setShareIconTimeout] = useState(null);
  const [shareIconText, setShareIconText] = useState('Lien de partage');

  const copyShareLink = () => {
    navigator.clipboard.writeText(`${HOST}${emblemData.path}`);
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

  return (
    <>
      {emblemData?.path && (
        <Helmet>
          <title>Armorial de France - {emblemData.name}</title>
          <meta
            property="og:title"
            content={`Armorial de France - ${emblemData.name}`}
          />
          <meta
            name="twitter:title"
            content={`Armorial de France - ${emblemData.name}`}
          />
          <meta
            name="description"
            content={emblemData.descriptionText.split('\n')[0]}
          />
          <meta
            property="og:description"
            content={emblemData.descriptionText.split('\n')[0]}
          />
          <meta
            name="twitter:description"
            content={emblemData.descriptionText.split('\n')[0]}
          />
          <meta property="og:url" content={`${HOST}${emblemData.path}`} />
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
          />
          <link
            rel="canonical"
            href={`https://armorialdefrance.org${emblemData.path}`}
          />
        </Helmet>
      )}
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
    </>
  );
};

export default EmblemContent;
