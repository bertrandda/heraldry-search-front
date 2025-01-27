import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

export const PageContext = createContext({
  pageInfo: null,
  hidePage: () => {},
});

export const PageContextProvider = ({ children, emblemInfo }) => {
  const [pageInfo, setPageInfo] = useState(emblemInfo);

  const hidePage = () => {
    setPageInfo(undefined);
  };

  return (
    <PageContext.Provider value={{ pageInfo, hidePage }}>
      {children}
    </PageContext.Provider>
  );
};

PageContextProvider.propTypes = {
  children: PropTypes.any,
};
