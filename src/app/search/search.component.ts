import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Nominatim } from '../interfaces/nominatim';
import { NominatimService } from '../nominatim.service';
import { Photon, PhotonFeatureCollection } from '../interfaces/photon';
import { PhotonService } from '../photon.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  @ViewChild("inputautocompleteList") autocompleteList: ElementRef;

  nominatimItemsFrom: Nominatim[] = [];
  nominatimItemsTo: Nominatim[] = [];

  photonItemsFrom: Photon[] = [];
  photonItemsTo: Photon[] = [];

  longFrom: number = 0;
  latFrom: number = 0;
  longTo: number = 0;
  latTo: number = 0;

  constructor(private nominatimService: NominatimService, private photonService: PhotonService) { }

  changeInputs(isFrom: boolean, long: number, lat: number): void{
    if(isFrom){
      this.longFrom = long;
      this.latFrom = lat;
    }else{
      this.longTo = long;
      this.latTo = lat;
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
    }));

    this.photonService.sendQueryRequest(valueTo)
    .subscribe((response: PhotonFeatureCollection) => response.features?.forEach(feature => {
      this.photonItemsTo.push(feature);
      this.longTo = <number>this.photonItemsTo[0].geometry?.coordinates![0];
      this.latTo = <number>this.photonItemsTo[0].geometry?.coordinates![1];
    }));
  }
  ngOnInit(): void {
  }

}
