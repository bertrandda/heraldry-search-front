import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useLocation, useNavigate } from 'react-router';

import { ModalContext } from '../contexts/ModalContext';

import './EmblemModal.css';
import EmblemContent from './EmblemContent';

ReactModal.setAppElement('#root');

const EmblemModal = () => {
  const { modalInfo, hideModal } = useContext(ModalContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [emblemData, setEmblemData] = useState(
    modalInfo || window?.__EMBLEM_DATA__
  );

  useEffect(() => {
    if (modalInfo?.path && pathname !== '/maps') {
      navigate(modalInfo.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalInfo]);

  useEffect(() => {
    if (modalInfo) {
      setEmblemData(modalInfo);
    }
  }, [modalInfo]);

  const closeModal = () => {
    hideModal();

    if (pathname !== '/maps') {
      navigate('/');
    }
  };

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
  );
};

export default EmblemModal;
