'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import sitesData from '@/data/inscriptionSites.json';

// Helper component to programmatic fly to coordinates and handle map events
function MapController({ selectedSite, center, zoom }) {
  const map = useMap();

  useEffect(() => {
    // Invalidate size once mounted to ensure container is properly sized
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (selectedSite) {
      map.flyTo([selectedSite.lat, selectedSite.lng], 11, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [selectedSite, map]);

  return null;
}

// Function to create a clean, elegant SVG marker icon that fixes Leaflet asset issues
function createCustomIcon(isActive = false) {
  const pinColor = isActive ? '#dc2626' : '#b45309'; // Terracotta amber or vivid crimson
  const ringColor = isActive ? '#fef08a' : '#fef3c7';

  const svgHtml = `
    <div style="position: relative; width: 34px; height: 44px; display: flex; align-items: center; justify-content: center;">
      <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 3px 5px rgba(0,0,0,0.35)); transition: transform 0.2s ease;">
        <path d="M17 0C7.61116 0 0 7.61116 0 17C0 26.6875 14.875 42.5 17 44C19.125 42.5 34 26.6875 34 17C34 7.61116 26.3888 0 17 0Z" fill="${pinColor}"/>
        <circle cx="17" cy="17" r="11" fill="white"/>
        <circle cx="17" cy="17" r="8" fill="${pinColor}"/>
        <circle cx="17" cy="17" r="4.5" fill="${ringColor}"/>
      </svg>
      <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 8px; height: 3px; background: rgba(0,0,0,0.3); border-radius: 50%; filter: blur(1px);"></div>
    </div>
  `;

  return L.divIcon({
    className: `custom-leaflet-marker ${isActive ? 'active-marker' : ''}`,
    html: svgHtml,
    iconSize: [34, 44],
    iconAnchor: [17, 44],
    popupAnchor: [0, -42],
  });
}

export default function TamilNaduMap({ onSelectSite, activeSiteId }) {
  const [mounted, setMounted] = useState(false);
  const defaultCenter = [10.8505, 78.6976];
  const defaultZoom = 7;

  useEffect(() => {
    // Fix default Leaflet icon paths in case standard markers are ever referenced
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
    setMounted(true);
  }, []);

  const defaultIcon = useMemo(() => createCustomIcon(false), []);
  const activeIcon = useMemo(() => createCustomIcon(true), []);

  const selectedSite = useMemo(() => {
    return sitesData.find((s) => s.id === activeSiteId || s.name === activeSiteId);
  }, [activeSiteId]);

  if (!mounted) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '520px',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px',
          color: '#e2e8f0',
          gap: '14px',
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            border: '3px solid rgba(245, 158, 11, 0.25)',
            borderTopColor: '#f59e0b',
            borderRadius: '50%',
            animation: 'spin 0.9s linear infinite',
          }}
        />
        <p style={{ margin: 0, fontWeight: 500, letterSpacing: '0.02em' }}>
          Loading Tamil Historical Map...
        </p>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '560px' }}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '560px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
          zIndex: 1,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        <MapController selectedSite={selectedSite} center={defaultCenter} zoom={defaultZoom} />

        {sitesData.map((site) => {
          const isActive = selectedSite && selectedSite.name === site.name;
          return (
            <Marker
              key={site.id || site.name}
              position={[site.lat, site.lng]}
              icon={isActive ? activeIcon : defaultIcon}
              eventHandlers={{
                click: () => {
                  if (onSelectSite) {
                    onSelectSite(site);
                  }
                },
              }}
            >
              <Popup className="heritage-popup">
                <div style={{ padding: '6px 2px', minWidth: '220px', maxWidth: '280px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      gap: '8px',
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#78350f',
                        fontFamily: 'inherit',
                      }}
                    >
                      {site.name}
                    </h3>
                    <span
                      style={{
                        background: '#fef3c7',
                        color: '#92400e',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        border: '1px solid #fde68a',
                      }}
                    >
                      {site.district}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: '0 0 10px 0',
                      fontSize: '0.85rem',
                      lineHeight: '1.45',
                      color: '#374151',
                    }}
                  >
                    {site.info}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      borderTop: '1px solid #f3f4f6',
                      paddingTop: '6px',
                    }}
                  >
                    <span>
                      📍 {site.lat.toFixed(4)}°N, {site.lng.toFixed(4)}°E
                    </span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#b45309',
                        textDecoration: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Directions &rarr;
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
