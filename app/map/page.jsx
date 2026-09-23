'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import sitesData from '@/data/inscriptionSites.json';

// Dynamically import TamilNaduMap with SSR disabled to prevent window/Leaflet errors
const TamilNaduMap = dynamic(() => import('@/components/TamilNaduMap'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '620px',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        color: '#94a3b8',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '4px solid rgba(245, 158, 11, 0.2)',
          borderTopColor: '#f59e0b',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <span style={{ fontSize: '1rem', fontWeight: 600, color: '#f59e0b' }}>
        Initializing Leaflet Historical Map...
      </span>
      <span style={{ fontSize: '0.85rem' }}>Loading Tamil-Brahmi archaeological sites</span>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  ),
});

export default function MapPage() {
  const [activeSite, setActiveSite] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  // Extract unique districts
  const districts = useMemo(() => {
    const list = Array.from(new Set(sitesData.map((s) => s.district))).sort();
    return ['All', ...list];
  }, []);

  // Filtered sites
  const filteredSites = useMemo(() => {
    return sitesData.filter((site) => {
      const matchesSearch =
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.info.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDistrict =
        selectedDistrict === 'All' || site.district === selectedDistrict;
      return matchesSearch && matchesDistrict;
    });
  }, [searchQuery, selectedDistrict]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#090d16',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Navigation Bar */}
      <header
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '14px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1600px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#94a3b8',
                fontSize: '0.88rem',
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                transition: 'all 0.2s ease',
              }}
            >
              &larr; Home
            </Link>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  Tamil Historical Map
                </h1>
                <span
                  style={{
                    background: 'linear-gradient(135deg, #d97706, #b45309)',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Sangam & Tamil-Brahmi
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
                தமிழ் பிராமி மற்றும் தொல்லியல் தளங்கள் &bull; 10 Key Archaeological Sites
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '6px 14px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>🏛️</span>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Sites</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f59e0b' }}>
                  10 Heritage
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '6px 14px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>🧭</span>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Center</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8' }}>
                  10.85°N, 78.70°E
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveSite(null)}
              style={{
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#f59e0b',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Reset View
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          maxWidth: '1600px',
          width: '100%',
          margin: '0 auto',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: '380px 1fr',
          gap: '20px',
        }}
      >
        {/* Left Side: Directory & Controls */}
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxHeight: 'calc(100vh - 120px)',
            overflow: 'hidden',
          }}
        >
          {/* Search and District Filter Card */}
          <div
            style={{
              background: '#131b2e',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#94a3b8',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Search Inscriptions & Sites
              </label>
              <input
                type="text"
                placeholder="Search site, king, cave, district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: '#090d16',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#94a3b8',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                District Filter
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                style={{
                  width: '100%',
                  background: '#090d16',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Districts' : `${d} District`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sites List */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              paddingRight: '4px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 4px',
              }}
            >
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                Showing {filteredSites.length} of {sitesData.length} sites
              </span>
              {activeSite && (
                <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>
                  Selected: {activeSite.name}
                </span>
              )}
            </div>

            {filteredSites.length === 0 ? (
              <div
                style={{
                  padding: '30px 20px',
                  textAlign: 'center',
                  background: '#131b2e',
                  borderRadius: '12px',
                  color: '#64748b',
                  fontSize: '0.9rem',
                }}
              >
                No historical sites found matching &ldquo;{searchQuery}&rdquo;.
              </div>
            ) : (
              filteredSites.map((site) => {
                const isSelected = activeSite && activeSite.name === site.name;
                return (
                  <div
                    key={site.id || site.name}
                    onClick={() => setActiveSite(site)}
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(180, 83, 9, 0.2) 100%)'
                        : '#131b2e',
                      border: isSelected
                        ? '1px solid #f59e0b'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: isSelected
                        ? '0 4px 12px rgba(245, 158, 11, 0.2)'
                        : 'none',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '8px',
                        marginBottom: '6px',
                      }}
                    >
                      <h2
                        style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: isSelected ? '#fef08a' : '#f8fafc',
                          margin: 0,
                        }}
                      >
                        {site.name}
                      </h2>
                      <span
                        style={{
                          background: isSelected
                            ? '#f59e0b'
                            : 'rgba(255, 255, 255, 0.08)',
                          color: isSelected ? '#000000' : '#cbd5e1',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                        }}
                      >
                        {site.district}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: '0.82rem',
                        lineHeight: '1.45',
                        color: isSelected ? '#e2e8f0' : '#94a3b8',
                        margin: '0 0 10px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: isSelected ? 4 : 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {site.info}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.72rem',
                        color: isSelected ? '#fde047' : '#64748b',
                      }}
                    >
                      <span>
                        📍 {site.lat.toFixed(4)}°N, {site.lng.toFixed(4)}°E
                      </span>
                      <span style={{ fontWeight: 600 }}>
                        {isSelected ? 'Viewing on map &rarr;' : 'Click to view'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Right Side: Map Container */}
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minHeight: '620px',
            height: 'calc(100vh - 120px)',
          }}
        >
          {/* Active Site Highlight Bar */}
          {activeSite && (
            <div
              style={{
                background: 'linear-gradient(90deg, #1e293b 0%, #0f172a 100%)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '12px',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#f59e0b', fontSize: '1.1rem' }}>🏛️</span>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
                    {activeSite.name}
                  </span>
                  <span
                    style={{
                      background: 'rgba(245, 158, 11, 0.2)',
                      color: '#f59e0b',
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontWeight: 600,
                    }}
                  >
                    {activeSite.district} District
                  </span>
                </div>
                <p
                  style={{
                    margin: '4px 0 0 0',
                    fontSize: '0.82rem',
                    color: '#cbd5e1',
                  }}
                >
                  {activeSite.info}
                </p>
              </div>

              <button
                onClick={() => setActiveSite(null)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#94a3b8',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Clear Selection
              </button>
            </div>
          )}

          {/* Leaflet Map Frame */}
          <div
            style={{
              flex: 1,
              width: '100%',
              minHeight: '520px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <TamilNaduMap
              activeSiteId={activeSite ? activeSite.name : null}
              onSelectSite={(site) => setActiveSite(site)}
            />
          </div>
        </section>
      </main>

      <style jsx global>{`
        @media (max-width: 960px) {
          main {
            grid-template-columns: 1fr !important;
          }
          section:first-child {
            max-height: 380px !important;
          }
          section:last-child {
            height: 520px !important;
          }
        }
      `}</style>
    </div>
  );
}
