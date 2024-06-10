/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

export const ChangeView = (props) => {
  const map = useMap();
  map.flyTo(props.position, map.getZoom());
  return null;
};

const Map = (props) => {
  return (
      <MapContainer
        center={props.position}
        zoom={10}
        scrollWheelZoom={false}
        style={{ minHeight: "70vh", minWidth: "100vw" }}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={props.position}>
          <Popup className="font-bold text-purple-500">
            {props.details}
          </Popup>
        </Marker>
        <ChangeView position={props.coords}/>
      </MapContainer>
  );
}

export default Map