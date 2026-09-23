import Link from 'next/link';
import sitesData from '@/data/inscriptionSites.json';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, #1e293b 0%, #090d16 80%)',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Navigation Header */}
      <header
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '18px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>🏛️</span>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
            Tamil Epigraphy & Archaeology
          </span>
        </div>
        <Link
          href="/map"
          style={{
            background: 'linear-gradient(135deg, #d97706, #b45309)',
            color: '#ffffff',
            padding: '8px 18px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.88rem',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
          }}
        >
          Open Map Explorer &rarr;
        </Link>
      </header>

      {/* Hero Section */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', flex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              padding: '6px 16px',
              borderRadius: '999px',
              color: '#f59e0b',
              fontSize: '0.82rem',
              fontWeight: 600,
              marginBottom: '20px',
            }}
          >
            <span>📜</span> Tamil-Brahmi & Sangam Archaeological Sites
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              background: 'linear-gradient(180deg, #ffffff 30%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Interactive Tamil Historical & Inscription Map
          </h1>

          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: '#94a3b8',
              marginBottom: '36px',
            }}
          >
            Explore 10 foundational Tamil-Brahmi and Sangam-era archaeological sites across Tamil Nadu.
            Centered at <span style={{ color: '#38bdf8' }}>[10.8505, 78.6976]</span>, featuring OpenStreetMap Leaflet tiles, custom coordinate pins, and historical inscriptions.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/map"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#000000',
                padding: '14px 28px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.4)',
                transition: 'transform 0.15s ease',
              }}
            >
              🗺️ Launch Interactive Map
            </Link>

            <a
              href="#sites-preview"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                padding: '14px 24px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              Browse 10 Sites &darr;
            </a>
          </div>
        </div>

        {/* 10 Sites Grid Preview */}
        <section id="sites-preview">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '24px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#f8fafc' }}>
                Featured Archaeological Sites
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '4px' }}>
                Rock caverns, ancient monasteries, and urban settlements with Tamil-Brahmi records
              </p>
            </div>
            <Link
              href="/map"
              style={{
                color: '#f59e0b',
                fontSize: '0.88rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              View All On Map &rarr;
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '18px',
            }}
          >
            {sitesData.map((site) => (
              <Link
                key={site.id || site.name}
                href="/map"
                style={{
                  background: '#131b2e',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                    {site.name}
                  </h3>
                  <span
                    style={{
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: '#f59e0b',
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontWeight: 600,
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                    }}
                  >
                    {site.district}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    color: '#94a3b8',
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {site.info}
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.75rem',
                    color: '#64748b',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '10px',
                  }}
                >
                  <span>
                    📍 {site.lat.toFixed(4)}°N, {site.lng.toFixed(4)}°E
                  </span>
                  <span style={{ color: '#f59e0b', fontWeight: 600 }}>Locate &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '24px 32px',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '0.85rem',
        }}
      >
        Tamil Historical Map Module &bull; Built with Next.js, Leaflet, and OpenStreetMap
      </footer>
    </div>
  );
}
