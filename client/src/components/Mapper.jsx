/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Mapper = ({ setCoordinates, setAddress }) => {
  const mapElement = useRef();
  const mapInstance = useRef(null);
  const [address, setLocalAddress] = useState({ country: '', state: '', district: '' });

  useEffect(() => {
    if (mapInstance.current) {
      return;
    }
    const leafletMap = L.map(mapElement.current).setView([0, 0], 2);
    mapInstance.current = leafletMap;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(leafletMap);

    leafletMap.on('click', async function (event) {
      const { lat, lng } = event.latlng;
      setCoordinates([lng, lat]);

      const data = await reverseGeocode(lat, lng);
      const addressData = data.address || {};

      const state = addressData.state || addressData.province || '';
      const district = addressData.suburb || addressData.county || addressData.neighbourhood || addressData.town || addressData.city || state;

      const updatedAddress = {
        country: addressData.country || '',
        state: state,
        district: district
      };

      setLocalAddress(updatedAddress);
      setAddress(updatedAddress);

      leafletMap.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          leafletMap.removeLayer(layer);
        }
      });

      L.marker([lat, lng]).addTo(leafletMap);
    });

  }, [setCoordinates, setAddress]);

  return (
    <div>
      <div ref={mapElement} style={{ width: '100%', height: '400px' }}></div>
      <div>
        <p>Country: {address.country}</p>
        <p>State: {address.state}</p>
        <p>District: {address.district}</p>
      </div>
    </div>
  );
};

const reverseGeocode = async (lat, lng) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`);
  const data = await response.json();
  return data;
};

export default Mapper;
