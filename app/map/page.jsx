'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import sitesData from '@/data/inscriptionSites.json';

// Dynamically import TamilNaduMap with SSR disabled
const TamilNaduMap = dynamic(() => import('@/components/TamilNaduMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%', height: '100%', minHeight: '620px', backgroundColor: '#f4f5f7',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      border: '1px solid #d1d5db', color: '#333333'
    }}>
      <span style={{ fontSize: '1rem', fontWeight: 600, color: '#003366' }}>Loading GIS Map Data...</span>
    </div>
  ),
});

export default function MapPage() {
  const [activeSite, setActiveSite] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const countries = useMemo(() => {
    const list = Array.from(new Set(sitesData.map((s) => s.country || 'India'))).sort();
    return ['All', ...list];
  }, []);

  const filteredSites = useMemo(() => {
    return sitesData.filter((site) => {
      const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            site.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (site.country && site.country.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            site.info.toLowerCase().includes(searchQuery.toLowerCase());
      const siteCountry = site.country || 'India';
      const matchesCountry = selectedCountry === 'All' || siteCountry === selectedCountry;
      return matchesSearch && matchesCountry;
    });
  }, [searchQuery, selectedCountry]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f5f7' }}>
      
      {/* Top Banner (Government Style) */}
      <div style={{ backgroundColor: '#ffffff', padding: '10px 20px', borderBottom: '3px solid #800000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '40px', height: '48px', border: '1px dashed #cccccc', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#999999', fontSize: '9px', textAlign: 'center' }}>Govt<br/>Seal</div>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#003366', margin: 0 }}>தமிழ்நாடு அரசு | Government of Tamil Nadu</h1>
            <p style={{ fontSize: '0.85rem', color: '#800000', fontWeight: '600', margin: '2px 0 0 0' }}>தொல்லியல் துறை | Department of Archaeology</p>
          </div>
        </div>
        <div>
           <Link href="/" style={{ color: '#003366', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>&larr; Back to Home</Link>
        </div>
      </div>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1600px', margin: '20px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '400px 1fr', gap: '20px' }}>
        
        {/* Left Side: Directory & Controls */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: 'calc(100vh - 100px)', overflow: 'hidden' }}>
          
          {/* Search and Filter */}
          <div style={{ background: '#ffffff', border: '1px solid #d1d5db', borderTop: '4px solid #003366', padding: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.1rem', color: '#003366', margin: '0 0 15px 0', borderBottom: '1px solid #eeeeee', paddingBottom: '10px' }}>Archaeological Site Directory</h2>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#333333', marginBottom: '5px' }}>Search Query</label>
              <input type="text" placeholder="Enter keywords..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', border: '1px solid #cccccc', padding: '8px', fontSize: '0.9rem', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#333333', marginBottom: '5px' }}>Filter by Region/Country</label>
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}
                style={{ width: '100%', border: '1px solid #cccccc', padding: '8px', fontSize: '0.9rem', outline: 'none', backgroundColor: '#ffffff' }}>
                {countries.map((c) => <option key={c} value={c}>{c === 'All' ? 'Global View (All)' : c}</option>)}
              </select>
            </div>
            
            <div style={{ marginTop: '15px', fontSize: '0.85rem', color: '#666666' }}>
              Showing {filteredSites.length} of {sitesData.length} total records.
            </div>
          </div>

          {/* Sites List */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '5px' }}>
            {filteredSites.map((site) => {
              const isSelected = activeSite && activeSite.name === site.name;
              return (
                <div key={site.id} onClick={() => setActiveSite(site)}
                  style={{
                    background: isSelected ? '#f0f4f8' : '#ffffff',
                    border: isSelected ? '1px solid #003366' : '1px solid #e5e7eb',
                    borderLeft: isSelected ? '5px solid #003366' : '5px solid #800000',
                    padding: '12px', cursor: 'pointer', transition: 'all 0.1s ease',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#003366', margin: 0 }}>{site.name}</h3>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#800000', backgroundColor: '#fbeaea', padding: '2px 6px', border: '1px solid #f5c6c6' }}>
                      {site.district}, {site.country || 'India'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#4b5563', margin: '0 0 8px 0', display: '-webkit-box', WebkitLineClamp: isSelected ? 5 : 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {site.info}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: '#666666' }}>
                    Coordinates: {site.lat.toFixed(4)}, {site.lng.toFixed(4)}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Side: Map Container */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '15px', height: 'calc(100vh - 100px)' }}>
          
          {/* Active Site Highlight Bar */}
          {activeSite && (
            <div style={{ background: '#ffffff', border: '1px solid #003366', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '15px', flex: 1 }}>
                {activeSite.imageUrl && (
                  <img src={activeSite.imageUrl} alt={activeSite.name} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e5e7eb' }} />
                )}
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#003366', margin: '0 0 5px 0' }}>{activeSite.name} <span style={{ fontSize: '0.9rem', color: '#800000', fontWeight: 'normal' }}>({activeSite.district}, {activeSite.country || 'India'})</span></h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#333333' }}>{activeSite.info}</p>
                </div>
              </div>
              <button onClick={() => setActiveSite(null)}
                style={{ background: '#f8f9fa', border: '1px solid #cccccc', padding: '6px 12px', fontSize: '0.85rem', cursor: 'pointer', color: '#333333', whiteSpace: 'nowrap' }}>
                Clear
              </button>
            </div>
          )}

          {/* Map Frame */}
          <div style={{ flex: 1, border: '2px solid #003366', backgroundColor: '#ffffff', overflow: 'hidden', position: 'relative' }}>
            <TamilNaduMap activeSiteId={activeSite ? activeSite.name : null} onSelectSite={(site) => setActiveSite(site)} />
          </div>
        </section>
      </main>

      <style jsx global>{`
        @media (max-width: 960px) {
          main { grid-template-columns: 1fr !important; }
          section:first-child { max-height: 400px !important; }
          section:last-child { height: 500px !important; }
        }
      `}</style>
    </div>
  );
}
