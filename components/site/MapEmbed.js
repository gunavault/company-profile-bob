import Icon from '@/components/Icon';
import { mapEmbed, mapLink } from '@/lib/utils';

export default function MapEmbed({ lat, lng, title = 'Lokasi', zoom = 15 }) {
  const src = mapEmbed(lat, lng, zoom);
  if (!src) return null;
  return (
    <div className="map-card">
      <iframe src={src} title={`Peta ${title}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      <a className="map-open" href={mapLink(lat, lng)} target="_blank" rel="noopener noreferrer">
        <Icon name="map" /> Buka di Google Maps
      </a>
    </div>
  );
}
