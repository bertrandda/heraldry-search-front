import L from 'leaflet';
import React, { useContext, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import { ModalContext } from '../contexts/ModalContext';
import { PageContext } from '../contexts/PageContext';
import { searchInBbox } from '../helpers/algolia';
import { generateUrl } from '../helpers/image';

import '@fontsource/hind';
import 'leaflet/dist/leaflet.css';
import './Maps.css';

const Maps = () => {
  const mapRef = useRef(null);
  const markerGroupRef = useRef(null);
  const timeoutRef = useRef(null);
  const { showModal } = useContext(ModalContext);
  const { hidePage } = useContext(PageContext);

  const fetchEmblems = async () => {
    const bounds = mapRef.current.getBounds().pad(-0.1);

    const boundCrop = [
      [
        Number(bounds.getNorth().toFixed(3)),
        Number(bounds.getEast().toFixed(3)),
      ],
      [
        Number(bounds.getSouth().toFixed(3)),
        Number(bounds.getWest().toFixed(3)),
      ],
    ];

    const {
      results: [{ hits }],
    } = await searchInBbox(boundCrop);

    const x = 60;

    const newMarkerGroup = L.layerGroup(
      hits.map((hit) => {
        const y =
          hit.size?.[1] && hit.size?.[0] ? (hit.size[1] / hit.size[0]) * x : 66;

        const marker = L.marker([hit._geoloc.lat, hit._geoloc.lng], {
          icon: L.icon({
            iconUrl: generateUrl(hit.imageUrl),
            iconSize: [x, y],
            iconAnchor: [x / 2, y / 2],
          }),
          alt: hit.name,
        }).on('click', () => showModal(hit));

        return marker;
      })
    ).addTo(mapRef.current);
    markerGroupRef.current.remove();
    markerGroupRef.current = newMarkerGroup;
  };

  useEffect(() => {
    if (window.__EMBLEM_DATA__) {
      delete window.__EMBLEM_DATA__;
      hidePage();
    }

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

      map.on('movestart', () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      });
      map.on(
        'moveend',
        () => (timeoutRef.current = setTimeout(fetchEmblems, 500))
      );

      mapRef.current = map;
      fetchEmblems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="maps-container">
      <Helmet>
        <title>Armorial de France - Carte</title>
        <meta property="og:title" content="Armorial de France - Carte" />
        <meta name="twitter:title" content="Armorial de France - Carte" />
        <meta
          name="description"
          content="Explorez une carte interactive affichant les blasons des communes de France. Plongez dans l’histoire et l’héritage héraldique de chaque ville et village."
        />
        <meta
          property="og:description"
          content="Explorez une carte interactive affichant les blasons des communes de France. Plongez dans l’histoire et l’héritage héraldique de chaque ville et village."
        />
        <meta
          name="twitter:description"
          content="Explorez une carte interactive affichant les blasons des communes de France. Plongez dans l’histoire et l’héritage héraldique de chaque ville et village."
        />
        <meta property="og:url" content="https://armorialdefrance.org/maps" />
        <meta
          property="og:image"
          content={`${window.location.origin}/icon-map-og.png`}
        />
        <meta
          name="twitter:image"
          content={`${window.location.origin}/icon-map-twitter.png`}
        />
        <link rel="canonical" href="https://armorialdefrance.org/maps" />
      </Helmet>
      <div id="map"></div>
      <Outlet />
    </div>
  );
};

export default Maps;
