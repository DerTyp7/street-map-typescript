import { Component, AfterViewInit} from '@angular/core';
import { defaults as defaultControls } from 'ol/control';
import { fromLonLat, transform } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import LineString from 'ol/geom/LineString';
import { Osrm } from './interfaces/osrm';
import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/ol/ol.css']
})

export class AppComponent implements AfterViewInit {
  title = "Street Map";
  map: Map;

  constructor() { }

  ngAfterViewInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat([8, 52]),
        zoom: 2
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [
            813079.7791264898, 5929220.284081122,
            848966.9639063801, 5936863.986909639
          ]
        })
      ])
    });
    setTimeout(() => this.map.updateSize(), 200);
  }

  drawPath(osrm: Osrm): void{
    console.log(osrm) //https://routing.openstreetmap.de/routed-bike/route/v1/driving/8.6042708,53.5151533;13.6887164,51.0491468?overview=false&alternatives=true&steps=true

    const coordinates = osrm.routes[0].geometry.coordinates || [];
    const f_coordinates: Array<Array<number>> = []
    coordinates.forEach(coordinate =>
      {
        f_coordinates.push(transform(coordinate, 'EPSG:4326', 'EPSG:3857'))
      }
    );

    const lineString: LineString = new LineString(f_coordinates);
    const feature: Feature<Geometry> = new Feature({ geometry: lineString });
    const vectorSource = new VectorSource({ features: [ feature ]});
    console.log(feature.getGeometry());
    const vectorLayer = new VectorLayer({ source: vectorSource });
    this.map.addLayer(vectorLayer);

   // this.features = new GeoJSON().readFeatures(new openLayersGeoJSON())

   /*
    this.vectorLayer = new VectorLayer({
      background: '#1a2b39',
      source: new VectorSource({
        url: 'http://router.project-osrm.org/route/v1/driving/-1.8744130630953275,52.45318441573963;-1.879401971863028,52.451059431849615;-1.8783612747652496,52.44962092302177;-1.882395317123648,52.44969938835112;-1.8824275036318268,52.452046744809195;-1.8794663448793851,52.45332825709778;-1.8898840446932288,52.454230523991356?overview=full&steps=true&geometries=geojson',
        format: new GeoJSON({dataProjection: 'EPSG:4326', featureProjection: "EPSG:3857" }),
      })
    });

    this.map.addLayer(this.vectorLayer);*/
  }
}

