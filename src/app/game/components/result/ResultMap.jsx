"use client";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Circle,
  useMap
} from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

// Leaflet marker ikonlarını ayarla
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina.src ?? iconRetina,
  iconUrl: icon.src ?? icon,
  shadowUrl: shadow.src ?? shadow,
});

// Kırmızı marker ikonu (tahmin)
const guessIcon = L.icon({
  iconRetinaUrl: iconRetina.src ?? iconRetina,
  iconUrl: icon.src ?? icon,
  shadowUrl: shadow.src ?? shadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Yeşil marker ikonu (doğru konum)
const correctIcon = L.icon({
  iconRetinaUrl: iconRetina.src ?? iconRetina,
  iconUrl: icon.src ?? icon,
  shadowUrl: shadow.src ?? shadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'correct-marker'
});

// CSS stil eklemek için
const markerStyles = `
  .correct-marker {
    filter: hue-rotate(120deg) saturate(1.2);
  }
  
  .map-legend {
    z-index: 9999 !important;
    position: absolute !important;
    pointer-events: auto !important;
  }
  
  .map-distance-info {
    z-index: 9999 !important;
    position: absolute !important;
    pointer-events: auto !important;
  }
`;

// Haritayı uygun şekilde sığdıran komponent
const FitToMarkers = ({ guessCoords, correctCoords, distance }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (guessCoords && correctCoords && Array.isArray(guessCoords) && Array.isArray(correctCoords)) {
      // İki marker varsa ikisini de görünür yap
      try {
        const bounds = L.latLngBounds([guessCoords, correctCoords]);
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 18
        });
      } catch (error) {
        console.warn('FitToMarkers bounds error:', error);
      }
    } 
    
    else if (guessCoords && distance && Array.isArray(guessCoords)) {
      // Tahmin var ve mesafe bilgisi varsa, mesafe dairesini sığdır
      try {
        const distanceInMeters = distance * 1000;

        // Manuel olarak bounds hesapla
        const lat = guessCoords[0];
        const lng = guessCoords[1];

        // Yaklaşık olarak mesafe kadar genişletilmiş bounds
        const latOffset = distanceInMeters / 111320; // 1 derece ≈ 111.32 km
        const lngOffset = distanceInMeters / (111320 * Math.cos(lat * Math.PI / 180));

        const bounds = L.latLngBounds([
          [lat - latOffset, lng - lngOffset],
          [lat + latOffset, lng + lngOffset]
        ]);

        // Çok küçük mesafeler için minimum zoom
        const minZoom = distanceInMeters < 50 ? 17 : 14;
        const maxZoom = distanceInMeters < 50 ? 19 : 17;

        // Çemberi tam görmek için daha fazla padding
        map.fitBounds(bounds, {
          padding: [60, 60],
          minZoom: minZoom,
          maxZoom: maxZoom
        });
      } catch (error) {
        console.warn('FitToMarkers circle error:', error);
        // Fallback: basit setView kullan
        map.setView(guessCoords, 16);
      }
    } 
    else {
      // Varsayılan görünüm
      try {
        const defaultCenter = [41.026428, 28.889555];
        map.setView(defaultCenter, 16);
      } catch (error) {
        console.warn('FitToMarkers default view error:', error);
      }
    }
  }, [map, guessCoords, correctCoords, distance]);

  return null;
};

// Kesikli çizgi oluşturan komponent
const DashedLine = ({ positions }) => {
  return (
    <Polyline
      positions={positions}
      pathOptions={{
        color: '#fbbf24', // amber-400
        weight: 3,
        opacity: 0.8,
        dashArray: '10, 10', // kesikli çizgi
      }}
    />
  );
};

export default function ResultMap({
  guessCoords = null,      // [lat, lng] - kullanıcının tahmini
  correctCoords = null,    // [lat, lng] - doğru koordinatlar
  distance = null,         // km cinsinden mesafe
  className = "",
}) {

  // Varsayılan merkez koordinat
  const defaultCenter = [41.025823, 28.889584];

  // Koordinat doğrulama fonksiyonu
  const validateCoords = (coords) => {
    return coords && Array.isArray(coords) && coords.length === 2 &&
      typeof coords[0] === 'number' && typeof coords[1] === 'number' &&
      !isNaN(coords[0]) && !isNaN(coords[1]);
  };

  // Kullanılacak koordinatları belirle
  const validGuessCoords = validateCoords(guessCoords) ? guessCoords : null;
  const validCorrectCoords = validateCoords(correctCoords) ? correctCoords : null;
  const displayCoords = validGuessCoords || defaultCenter;

  // Eğer hiç veri yoksa hata mesajı göster
  if (!validGuessCoords && !distance) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Konum bilgisi bulunamadı</p>
      </div>
    );
  }

  // Mesafeyi km'den metre'ye çevir - güvenli dönüşüm
  const distanceInMeters = (typeof distance === 'number' && !isNaN(distance)) ? distance * 1000 : 0;

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {/* CSS stillerini head'e ekle */}
      <style jsx global>{markerStyles}</style>

      <MapContainer
        center={displayCoords}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        doubleClickZoom={false}
        dragging={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        className="w-full h-full"
        style={{ minHeight: '200px' }}
        attributionControl={false}
      >
        {/* Haritayı uygun şekilde sığdır */}
        <FitToMarkers
          guessCoords={validGuessCoords}
          correctCoords={validCorrectCoords}
          distance={distance}
        />

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Kullanıcının tahmin marker'ı - sadece validGuessCoords varsa göster */}
        {validGuessCoords && (
          <Marker
            position={validGuessCoords}
            icon={guessIcon}
          />
        )}

        {/* Doğru koordinatlar varsa */}
        {validCorrectCoords && validGuessCoords && (
          <>
            {/* Doğru konum marker'ı */}
            <Marker
              position={validCorrectCoords}
              icon={correctIcon}
            />

            {/* İki nokta arasında kesikli çizgi */}
            <DashedLine positions={[validGuessCoords, validCorrectCoords]} />
          </>
        )}

        {/* Sadece mesafe varsa merkez etrafında daire çiz */}
        {distance && !validCorrectCoords && distanceInMeters > 0 && (
          <Circle
            center={displayCoords}
            radius={distanceInMeters}
            pathOptions={{
              color: '#fbbf24', // amber-400
              weight: 2,
              opacity: 0.6,
              fillColor: '#fbbf24',
              fillOpacity: 0.1,
              dashArray: '5, 5', // kesikli kenar
            }}
          />
        )}



      </MapContainer>

      {/* Legend - Harita container'ının dışında 
      <div className="map-legend absolute bottom-2 left-2 bg-white rounded-lg p-2 text-xs shadow-lg border border-gray-200"
        style={{
          zIndex: 100,
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(4px)'
        }}>
        {validGuessCoords && (
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-blue-600 rounded-full border border-white"></div>
            <span className="text-black">Tahmininiz</span>
          </div>
        )}
        {validCorrectCoords && validGuessCoords && (
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-600 rounded-full border border-white"></div>
            <span>Doğru konum</span>
          </div>
        )}
        {distance && !validCorrectCoords && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-amber-400 rounded-full bg-amber-400/20"></div>
            <span className="text-black">Mesafe alanı</span>
          </div>
        )}
      </div>*/}

      {/* Mesafe bilgisi - Harita container'ının dışında
      {distance && (
        <div className="map-distance-info absolute top-2 right-2 bg-white rounded-lg px-3 py-1 text-sm font-medium shadow-lg border border-gray-200"
          style={{
            zIndex: 100,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)'
          }}>
          <span className="text-black"> Mesafe: { distanceInMeters < 10 ? `${distanceInMeters.toFixed(2)} m` : `${Math.round(distanceInMeters)} m`}</span>
        </div>
      )} */}
    </div>
  );
}
