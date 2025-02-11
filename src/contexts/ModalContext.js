import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

export const ModalContext = createContext({
  modalInfo: null,
  showModal: () => {},
  hideModal: () => {},
});

export const ModalContextProvider = ({ children }) => {
  const [modalInfo, setModalInfo] = useState({});

  const showModal = (emblemInfo) => {
    setModalInfo(emblemInfo);
  };

  const hideModal = () => {
    setModalInfo({});
  };

  return (
    <ModalContext.Provider value={{ modalInfo, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalContextProvider.propTypes = {
  children: PropTypes.any,
};
