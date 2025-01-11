import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

import { searchInBbox } from '../helpers/algolia';
import { generateUrl } from '../helpers/image';

import EmblemModal from './EmblemModal';

import '@fontsource/hind';
import 'leaflet/dist/leaflet.css';
import './Maps.css';

const Maps = () => {
  const mapRef = useRef(null);
  const markerGroupRef = useRef(null);
  const recRef = useRef(null);
  const [modalInfo, setModalInfo] = useState({});

  const fetchEmblems = async () => {
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
      [
        Number(bounds.getNorth().toFixed(crop)),
        Number(bounds.getEast().toFixed(crop)),
      ],
      [
        Number(bounds.getSouth().toFixed(crop)),
        Number(bounds.getWest().toFixed(crop)),
      ],
    ];
    // for now only display rectangle
    recRef.current.setBounds(boundCrop);
    const { hits } = await searchInBbox(boundCrop);

    markerGroupRef.current.clearLayers();

    const x = 60;
    const y = 66;

    hits.map((hit) => {
      const marker = L.marker([hit._geoloc.lat, hit._geoloc.lng], {
        icon: L.icon({
          iconUrl: generateUrl(hit.imageUrl),
          iconSize: [x, y],
          iconAnchor: [x / 2, y / 2],
        }),
        alt: hit.name,
      })
        .addTo(markerGroupRef.current)
        .on('click', () => setModalInfo(hit));

      return marker;
    });
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

      markerGroupRef.current = L.layerGroup().addTo(map);
      recRef.current = L.rectangle(
        [
          [54.559322, -5.767822],
          [56.1210604, -3.02124],
        ],
        { color: '#ff7800', weight: 1 }
      );
      recRef.current.addTo(map);

      map.addEventListener('moveend', () => fetchEmblems());

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
      <EmblemModal emblem={modalInfo} />
    </div>
  );
};

export default Maps;
