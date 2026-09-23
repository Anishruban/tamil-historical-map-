import Link from 'next/link';
import sitesData from '@/data/inscriptionSites.json';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f5f7' }}>
      
      {/* Top Banner (Government Style) */}
      <div style={{ backgroundColor: '#ffffff', padding: '15px 20px', borderBottom: '3px solid #800000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Placeholder for State Emblem */}
          <div style={{ width: '50px', height: '60px', border: '1px dashed #cccccc', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#999999', fontSize: '10px', textAlign: 'center' }}>
            Govt<br/>Seal
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#003366', margin: 0 }}>தமிழ்நாடு அரசு</h1>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#003366', margin: 0, textTransform: 'uppercase' }}>Government of Tamil Nadu</h2>
            <p style={{ fontSize: '0.9rem', color: '#800000', fontWeight: '600', margin: '4px 0 0 0' }}>தொல்லியல் துறை | Department of Archaeology</p>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#333333' }}>
          <div style={{ marginBottom: '5px' }}>
            <span style={{ cursor: 'pointer', margin: '0 8px', color: '#003366', textDecoration: 'underline' }}>Skip to Main Content</span> | 
            <span style={{ cursor: 'pointer', margin: '0 8px', fontWeight: 'bold' }}>A-</span>
            <span style={{ cursor: 'pointer', margin: '0 8px', fontWeight: 'bold' }}>A</span>
            <span style={{ cursor: 'pointer', margin: '0 8px', fontWeight: 'bold' }}>A+</span> |
            <span style={{ cursor: 'pointer', margin: '0 8px', color: '#800000', fontWeight: 'bold' }}>தமிழ்</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav style={{ backgroundColor: '#003366', padding: '0 20px' }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '2px' }}>
          <li>
            <Link href="/" style={{ display: 'block', padding: '12px 20px', color: '#ffffff', textDecoration: 'none', fontWeight: '600', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>Home</Link>
          </li>
          <li>
            <Link href="#" style={{ display: 'block', padding: '12px 20px', color: '#ffffff', textDecoration: 'none', fontWeight: '600', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>About Us</Link>
          </li>
          <li>
            <Link href="/map" style={{ display: 'block', padding: '12px 20px', color: '#ffffff', backgroundColor: '#800000', textDecoration: 'none', fontWeight: '600', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>Archaeological Map</Link>
          </li>
          <li>
            <Link href="#" style={{ display: 'block', padding: '12px 20px', color: '#ffffff', textDecoration: 'none', fontWeight: '600', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>Publications</Link>
          </li>
          <li>
            <Link href="#" style={{ display: 'block', padding: '12px 20px', color: '#ffffff', textDecoration: 'none', fontWeight: '600', borderLeft: '1px solid rgba(255,255,255,0.2)', borderRight: '1px solid rgba(255,255,255,0.2)' }}>Contact Us</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px', minHeight: '60vh' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: '#666666', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #cccccc' }}>
          <Link href="/" style={{ color: '#003366', textDecoration: 'none' }}>Home</Link> &gt; <span>Archaeological Sites</span>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '30px', border: '1px solid #e5e7eb', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '1.6rem', color: '#800000', borderBottom: '2px solid #800000', paddingBottom: '10px', marginBottom: '20px' }}>
            Interactive Archaeological Map of Tamil Nadu
          </h3>
          
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333333', marginBottom: '20px' }}>
            Welcome to the official Geographical Information System (GIS) portal for Archaeological and Epigraphical sites in Tamil Nadu. The State Department of Archaeology conducts systematic excavations and epigraphical surveys to uncover the rich cultural heritage of the Tamil landscape. Explore {sitesData.length} officially documented sites including Sangam-era urban settlements, Tamil-Brahmi rock shelters, and ancient ports.
          </p>

          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <Link
              href="/map"
              style={{
                backgroundColor: '#003366',
                color: '#ffffff',
                padding: '12px 24px',
                fontSize: '1.1rem',
                fontWeight: '600',
                textDecoration: 'none',
                borderRadius: '4px',
                border: '2px solid #002244',
                display: 'inline-block'
              }}
            >
              Open Interactive GIS Map Gateway
            </Link>
          </div>

          <h4 style={{ fontSize: '1.3rem', color: '#003366', marginBottom: '15px', marginTop: '40px' }}>
            List of Prominent Heritage Sites
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {sitesData.map((site) => (
              <div key={site.id} style={{ border: '1px solid #d1d5db', padding: '15px', backgroundColor: '#f9fafb', borderLeft: '4px solid #800000' }}>
                <h5 style={{ fontSize: '1.1rem', color: '#003366', margin: '0 0 5px 0' }}>{site.name}</h5>
                <p style={{ fontSize: '0.85rem', color: '#800000', fontWeight: 'bold', margin: '0 0 10px 0' }}>District: {site.district}</p>
                <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.4', margin: 0 }}>
                  {site.info}
                </p>
                <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#666666' }}>
                  Coordinates: {site.lat.toFixed(4)}, {site.lng.toFixed(4)}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1f2937', color: '#d1d5db', padding: '30px 20px', borderTop: '4px solid #800000', fontSize: '0.9rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#ffffff' }}>Department of Archaeology</p>
            <p style={{ margin: '0 0 5px 0' }}>Government of Tamil Nadu</p>
            <p style={{ margin: '0 0 5px 0' }}>Tamil Valarchi Valagam, Halls Road,</p>
            <p style={{ margin: '0 0 5px 0' }}>Egmore, Chennai - 600 008.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 10px 0' }}><a href="#" style={{ color: '#93c5fd', textDecoration: 'none' }}>Disclaimer</a> | <a href="#" style={{ color: '#93c5fd', textDecoration: 'none' }}>Privacy Policy</a> | <a href="#" style={{ color: '#93c5fd', textDecoration: 'none' }}>Terms of Use</a></p>
            <p style={{ margin: '0 0 5px 0' }}>Contents owned and updated by Department of Archaeology</p>
            <p style={{ margin: '0 0 5px 0' }}>Designed & Developed in India.</p>
            <p style={{ margin: '0 0 5px 0' }}>&copy; {new Date().getFullYear()} Government of Tamil Nadu. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
