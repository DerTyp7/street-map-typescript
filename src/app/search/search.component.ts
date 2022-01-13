import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Nominatim } from '../interfaces/nominatim';
import { NominatimService } from '../nominatim.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  @ViewChild("inputautocompleteList") autocompleteList: ElementRef;

  itemsFrom: Nominatim[] = [];
  itemsTo: Nominatim[] = [];

  constructor(private nominatimService: NominatimService) { }


  // Gets called in "app.component.html" when an input changes its value
  getValue(valueFrom:string, valueTo:string): void{
    console.log("From " + valueFrom + " to " + valueTo);
    
    //this.updateAutoCompleteList([{display_name: 'Hallo'}, {display_name: 'Test2'}], [{display_name: 'Halload'}, {display_name: 'Test4'}]);

    this.nominatimService.sendQueryRequest(valueFrom)
    .subscribe((response: Nominatim[]) => this.itemsFrom = response);

    this.nominatimService.sendQueryRequest(valueTo)
    .subscribe((response: Nominatim[]) => this.itemsTo = response);
    
  }
  ngOnInit(): void {
  }

}
