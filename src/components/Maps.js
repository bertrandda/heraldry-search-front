import L from 'leaflet';
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

import '@fontsource/hind';
import 'leaflet/dist/leaflet.css';
import './Maps.css';

const Maps = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map', { zoomControl: false }).setView(
        [48.8566, 2.3522],
        13
      );

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      L.control
        .zoom({
          position: 'bottomright',
        })
        .addTo(map);

      mapRef.current = map;
    }
  }, []);

  return (
    <div>
      <Helmet>
        <meta property="og:title" content="Armorial de France" />
        <meta name="twitter:title" content="Armorial de France" />
        <meta
          name="description"
          content="Naviguer sur une carte des blasons des villes et villages de France."
        />
        <meta
          property="og:description"
          content="Naviguer sur une carte des blasons des villes et villages de France."
        />
        <meta
          name="twitter:description"
          content="Naviguer sur une carte des blasons des villes et villages de France."
        />
        <meta property="og:url" content="https://armorialdefrance.org" />
        <meta property="og:image" content="/icon-og.png" />
        <meta name="twitter:image" content="/icon-twitter.png" />
        <link rel="canonical" href="https://armorialdefrance.org/" />
      </Helmet>
      <div id="map"></div>
      <Outlet />
    </div>
  );
};

export default Maps;
