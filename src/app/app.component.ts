import { Component, ViewChild, } from '@angular/core';
import { Osrm } from './interfaces/osrm';
import { MapComponent } from './map/map.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/ol/ol.css']
})



export class AppComponent {
  title = "Street Map";
  @ViewChild('mapRef') mapCompopnent!: MapComponent;

  onSearchResponse($event: Osrm): void {
		this.mapCompopnent.drawPath($event);
    this.mapCompopnent.updateSidebar($event);
	}
}

