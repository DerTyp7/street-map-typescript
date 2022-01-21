import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Nominatim } from '../interfaces/nominatim';
import { NominatimService } from '../nominatim.service';
import { Photon, PhotonFeatureCollection } from '../interfaces/photon';
import { PhotonService } from '../photon.service';
import { OsrmService } from '../osrm.service';
import { Osrm } from '../interfaces/osrm';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent{
  @ViewChild("inputautocompleteList") autocompleteList: ElementRef;

  nominatimItemsFrom: Nominatim[] = [];
  nominatimItemsTo: Nominatim[] = [];

  photonItemsFrom: Photon[] = [];
  photonItemsTo: Photon[] = [];

  inputFromValue: string;
  inputToValue: string;

  longFrom: number = 0;
  latFrom: number = 0;
  longTo: number = 0;
  latTo: number = 0;

  selectedPhotonFrom: Photon;
  selectedPhotonTo: Photon;

  constructor(
    private nominatimService: NominatimService,
    private photonService: PhotonService,
    private osrmService: OsrmService,
    private appComponent: AppComponent
    ) { }

  selectPhoton(isFrom: boolean, p: Photon): void{
    if(isFrom){
      this.selectedPhotonFrom = p;
      this.longFrom = <number> p.geometry?.coordinates[0];
      this.latFrom = <number> p.geometry?.coordinates[1];
      this.inputFromValue = <string> p.properties.name

      if(p.properties.housenumber){
        this.inputFromValue += " " + p.properties.housenumber;
      }

      if(p.properties.postcode){
        this.inputFromValue += " " + p.properties.postcode;
      }

      if(p.properties.city){
        this.inputFromValue += " " + p.properties.city;
      }

      if(p.properties.countrycode){
        this.inputFromValue += " " + p.properties.countrycode;
      }

    }else{
      this.selectedPhotonTo = p;
      this.longTo = <number>p.geometry?.coordinates[0];
      this.latTo = <number>p.geometry?.coordinates[1];
      this.inputToValue = <string> p.properties.name + " " + p.properties.countrycode;
    }
  }
  // Gets called in "app.component.html" when an input changes its value
  getValue(valueFrom:string, valueTo:string): void{
    console.log("From " + valueFrom + " to " + valueTo);

    //this.updateAutoCompleteList([{display_name: 'Hallo'}, {display_name: 'Test2'}], [{display_name: 'Halload'}, {display_name: 'Test4'}]);

    /*
    this.nominatimService.sendQueryRequest(valueFrom)
    .subscribe((response: Nominatim[]) => this.nominatimItemsFrom = response);

    this.nominatimService.sendQueryRequest(valueTo)
    .subscribe((response: Nominatim[]) => this.nominatimItemsTo = response);
    */
    this.photonItemsFrom = [];
    this.photonItemsTo = [];

    this.photonService.sendQueryRequest(valueFrom)
    .subscribe((response: PhotonFeatureCollection) => response.features?.forEach(feature => {
      this.photonItemsFrom.push(feature);
      this.longFrom = <number>this.photonItemsFrom[0].geometry?.coordinates![0];
      this.latFrom = <number>this.photonItemsFrom[0].geometry?.coordinates![1];
      console.log("longFrom: " + this.longFrom)
      console.log("latFrom: " + this.latFrom)
    }));

    this.photonService.sendQueryRequest(valueTo)
    .subscribe((response: PhotonFeatureCollection) => response.features?.forEach(feature => {
      this.photonItemsTo.push(feature);
      this.longTo = <number>this.photonItemsTo[0].geometry?.coordinates![0];
      this.latTo = <number>this.photonItemsTo[0].geometry?.coordinates![1]
      console.log("LongTo: " + this.longTo)
      console.log("LatTo: " + this.latTo)
    }));

  }

  getRoute(): void{
    console.log("getroute");
    this.osrmService.sendQueryRequest(this.longFrom, this.latFrom, this.longTo, this.latFrom)
    .subscribe((response: Osrm) => {
      console.log(response);
      this.appComponent.drawPath(response);
    }
    );
  }
}
