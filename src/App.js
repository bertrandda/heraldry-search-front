import { mdiFormatListText, mdiMap } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import '@fontsource/hind';
import './App.css';
import Maps from './components/Maps';
import Search from './components/Search';

const App = ({ page }) => {
  const [listView, setListView] = useState(page === 'search');

  useEffect(() => {}, [listView]);

  return (
    <div>
      <div className="header-type-container">
        <Link
          className="header-type-button"
          role="button"
          tabIndex={0}
          to="/"
          onClick={() => setListView(true)}
        >
          <Icon
            className={`header-type-item${
              listView ? ' header-type-item--active' : ''
            }`}
            path={mdiFormatListText}
            size={0.75}
          />
        </Link>
        <Link
          className="header-type-button"
          role="button"
          tabIndex={0}
          to="/maps"
          onClick={() => setListView(false)}
        >
          <Icon
            className={`header-type-item${
              !listView ? ' header-type-item--active' : ''
            }`}
            path={mdiMap}
            size={0.75}
          />
        </Link>
      </div>
      <Outlet />
      {page === 'search' && <Search />}
      {page === 'maps' && <Maps />}
    </div>
  );
};

export default App;
