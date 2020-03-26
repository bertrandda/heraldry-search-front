import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ModalContext = createContext({
  modalInfo: {},
  showModal: () => {},
  hideModal: () => {},
});

export function ModalContextProvider({ children }) {
  const [modalInfo, setModalInfo] = useState({});

  const showModal = (emblemInfo) => {
    document.body.style.overflow = 'hidden';
    setModalInfo(emblemInfo);
  };

  const hideModal = () => {
    document.body.style.overflow = 'unset';
    setModalInfo({});
  };

  return (
    <ModalContext.Provider value={{ modalInfo, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
}

ModalContextProvider.propTypes = {
  children: PropTypes.any,
};

ModalContextProvider.defaultProps = {
  children: '',
};
