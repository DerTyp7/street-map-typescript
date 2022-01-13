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


  constructor(private nominatimService: NominatimService) { }

  updateAutoCompleteList(): void{
    this.autocompleteList.nativeElement.innerHTML = "Fsd";
  }

  // Gets called in "app.component.html" when an input changes its value
  getValue(valueFrom:string, valueTo:string): void{
    console.log("From " + valueFrom + " to " + valueTo);

    this.nominatimService.sendQueryRequest(valueFrom)
    .subscribe((response: Nominatim[]) => console.log(response));
    
  }
  ngOnInit(): void {
  }

}
