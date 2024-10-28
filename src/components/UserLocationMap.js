import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css'


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const UserLocationMap = ({ location, error }) => {
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <MapContainer style={{ width: "100%", height: "20vh" }} center={location} zoom={1} className="h-60 w-full mt-2">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={location} icon={new L.Icon.Default()}>
        <Popup>
          You are here
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default UserLocationMap;
