import {
  MapLayer,
  MapLayerProps,
  Pane,
  LayerContainer,
  withLeaflet
} from "react-leaflet";
import * as L from "leaflet";
import "leaflet.vectorgrid";

interface Props<T> extends MapLayerProps {
  // Array of GeoJSON features
  data: T[]; // tslint:disable-line:no-any
  getFeatureStyle?: (data: T, zoom: number) => L.PathOptions;
}

interface MapLayerContext {
  map: L.Map;
  pane: Pane;
  layerContainer: LayerContainer | L.Map;
}

class InternalVectorGrid<T> extends MapLayer<
  Props<T> & { leaflet: MapLayerContext }
> {
  context: MapLayerContext;
  leafletElement: any | null; // tslint:disable-line:no-any
  createLeafletElement(props: Props<T>) {
    // const { map, pane, layerContainer } = this.context;
    const { data } = props;
    if (data.length === 0) {
      return null;
    }

    const defaultStyle = {
      weight: 4,
      color: "#E69800",
      opacity: 1,
      fillColor: "#E69800",
      fillOpacity: 0.5,
      fill: true,
      stroke: true
    };
    const options = {
      style: defaultStyle,
      maxZoom: 18,
      // getFeatureId: (x: T) => {
      //   return x.id;
      // },
      vectorTileLayerStyles: {
        // tslint:disable-next-line:no-any
        sliced: () => defaultStyle
      },
      zIndex: 401
    };
    const geojson = {
      type: "FeatureCollection",
      features: data
    };
    console.log(geojson);
    const grid = L.vectorGrid.slicer(geojson, options);
    return grid;
  }

  componentDidMount() {
    console.log(this.props.leaflet);
    const { layerContainer } = this.props.leaflet;
    const { data } = this.props;

    // Zoom to the geojson?
    if (data.length > 0) {
      this.leafletElement.addTo(layerContainer);
    }
  }

  componentDidUpdate(prevProps: Props<T>) {
    const { layerContainer } = this.props.leaflet;
    const { data } = this.props;
    if (data.length > 0 && this.leafletElement === null) {
      this.leafletElement = this.createLeafletElement(this.props);
      this.leafletElement.addTo(layerContainer);
    }
  }

  render() {
    return null;
  }
}

export default withLeaflet(InternalVectorGrid);
