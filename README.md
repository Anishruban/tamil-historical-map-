# 🏛️ Tamil Historical & Inscription Sites Map (தமிழ் பிராமி மற்றும் தொல்லியல் தளங்கள்)

An interactive, geographical exploration of 10 major **Tamil-Brahmi** and **Sangam-era** archaeological sites across Tamil Nadu, built using **Next.js (App Router)** and **Leaflet / React-Leaflet**.

---

## 🌟 Features

- **Leaflet Interactive Map**: Centered at `[10.8505, 78.6976]` with zoom 7, displaying OpenStreetMap tiles and custom SVG pins that resolve default Leaflet bundler image-loading bugs.
- **10 Major Archaeological Sites**:
  1. **Mangulam** (Madurai): Earliest dated Tamil-Brahmi inscriptions (~3rd–2nd c. BCE) mentioning Early Pandya ruler Nedunchezhiyan.
  2. **Thirupparankundram** (Madurai): Ancient cavern rock beds with donation records from Sri Lankan householders.
  3. **Samanarmalai** (Madurai): Extensive Jain hill complex with Tamil-Brahmi, Vatteluttu, and Tirthankara bas-relief sculptures.
  4. **Arittapatti** (Madurai): 2,200-year-old rock shelters and drip ledges on granitic hillocks.
  5. **Sittanavasal** (Pudukkottai): Arivar Koil cave and Ezhadippattam rock beds with 7th-century Jain murals.
  6. **Jambai** (Tiruvannamalai): Crucial 1st-century CE 'Satyaputo' Adiyaman Neduman Anji inscription.
  7. **Pugalur** (Karur): Pugalur Malai Chera Irumporai lineage inscriptions overlooking the Cauvery.
  8. **Keezhadi** (Sivagangai): Megalithic to urban Sangam settlement (~6th c. BCE) along the Vaigai basin.
  9. **Kodumanal** (Erode): Famous gem-bead manufacturing and industrial hub on the Noyyal river.
  10. **Porunthal** (Dindigul): Megalithic burial site with inscribed pots and paddy carbon-dated to ~490 BCE.
- **Client-Side Safe SSR Rendering**: Dynamic imports (`{ ssr: false }`) in `app/map/page.jsx` to prevent `window is not defined` errors.
- **Interactive Directory & Search**: Real-time keyword search, district filter, and animated camera fly-to transitions.
- **Popups with Directions**: Click markers to view detailed historical information, coordinates, and direct Google Maps navigation links.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) (v18 or higher) installed.

### 2. Install Dependencies
Clone this repository and install packages:
```bash
git clone https://github.com/Anishruban/tamil-historical-map-.git
cd tamil-historical-map-
npm install --legacy-peer-deps
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open in Browser
- **Map Module**: [http://localhost:3000/map](http://localhost:3000/map)
- **Home Overview**: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css              # Custom styling, fonts, and Leaflet popup themes
│   ├── layout.js                # Root application layout
│   ├── page.js                  # Hero landing page with site previews
│   └── map/
│       └── page.jsx             # Dynamic route page for the interactive map
├── components/
│   └── TamilNaduMap.jsx         # Client-side React-Leaflet component with custom markers
├── data/
│   └── inscriptionSites.json    # Archaeological site data (names, coordinates, info)
├── public/                      # Static assets
└── package.json
```

---

## 📜 License
MIT License. Created for Tamil epigraphy and heritage preservation.
