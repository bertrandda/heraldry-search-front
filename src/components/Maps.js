import L from 'leaflet';
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

import '@fontsource/hind';
import 'leaflet/dist/leaflet.css';
import './Maps.css';

const Maps = () => {
  const mapRef = useRef(null);
  const recRef = useRef(null);

  const fetchEmblem = () => {
    const bounds = mapRef.current.getBounds().pad(-0.1);

    let crop;
    if (mapRef.current.getZoom() < 11) {
      crop = 1;
    } else if (mapRef.current.getZoom() < 15) {
      crop = 2;
    } else {
      crop = 3;
    }

    const boundCrop = [
      [bounds.getNorth().toFixed(crop), bounds.getEast().toFixed(crop)],
      [bounds.getSouth().toFixed(crop), bounds.getWest().toFixed(crop)],
    ];
    // for now only display rectangle
    recRef.current.setBounds(boundCrop);
  };

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map', { zoomControl: false }).setView(
        [47.5, 2.3522],
        6
      );

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attributionControl: false,
      }).addTo(map);
      map.attributionControl.remove();
      L.control
        .attribution({ prefix: false })
        .addAttribution(
          '&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        )
        .addTo(map);
      L.control
        .zoom({
          position: 'bottomright',
        })
        .addTo(map);

      recRef.current = L.rectangle(
        [
          [54.559322, -5.767822],
          [56.1210604, -3.02124],
        ],
        { color: '#ff7800', weight: 1 }
      );
      recRef.current.addTo(map);

      map.addEventListener('moveend', () => fetchEmblem());

      mapRef.current = map;
    }
  }, []);

  return (
    <div className="maps-container">
      <Helmet>
        <meta property="og:title" content="Armorial de France" />
        <meta name="twitter:title" content="Armorial de France" />
        <meta
          name="description"
          content="Carte des blasons des villes et villages de France."
        />
        <meta
          property="og:description"
          content="Carte des blasons des villes et villages de France."
        />
        <meta
          name="twitter:description"
          content="Carte des blasons des villes et villages de France."
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
