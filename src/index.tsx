import * as React from "react";
import { render } from "react-dom";
import { Map, TileLayer } from "react-leaflet";
import VectorGrid from "./VectorGrid";

const data = [
  {
    geometry: {
      coordinates: [[-93.57440208199995, 41.57882218700007], [-95.58, 30.57]],
      type: "LineString"
    },
    type: "Feature",
    properties: {}
  }
];

const App = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      height: "100%",
      width: "100%"
    }}
  >
    <Map
      center={[39.5, -96]}
      zoom={5}
      maxZoom={18}
      zoomControl={false}
      style={{
        flex: "1 1 0"
      }}
    >
      <TileLayer
        attribution="Tiles &copy; 
          Esri &mdash; 
          Source: Esri, 
          i-cubed, 
          USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <TileLayer
        url="http://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" // tslint:disable-line:max-line-length
      />
      <VectorGrid data={data} />
    </Map>
  </div>
);

render(<App />, document.getElementById("root"));
