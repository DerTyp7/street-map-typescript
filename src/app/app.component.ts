import { Component, AfterViewInit, ElementRef, ViewChild} from '@angular/core';


import { defaults as defaultControls } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import ZoomToExtent from 'ol/control/ZoomToExtent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/ol/ol.css']
})

export class AppComponent implements AfterViewInit {
  title = "Street Map";
  map: Map;

  @ViewChild("inputautocompleteList") autocompleteList: ElementRef;


  constructor() { }
  
  updateAutoCompleteList(): void{
    this.autocompleteList.nativeElement.innerHTML = "Fsd";
  }

  // Gets called in "app.component.html" when an input changes its value
  getValue(valueFrom:string, valueTo:string): void{
    console.log("From " + valueFrom + " to " + valueTo);

    /*
    this.nominatimService.sendQueryRequest(valueFrom)
    .subscribe((response: Nominatim[]) => console.log(response));*/

    

    
  }

  ngOnInit() {
    
  }

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
}

