import { Component, OnInit } from '@angular/core';
import { Osrm, OsrmStep } from '../interfaces/osrm';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {
  routeSteps: Array<OsrmStep> = []
  constructor() { }

  ngOnInit(): void {
  }

  updateSidebar(osrm: Osrm): void{
    console.log("updateSidebar")
    if(osrm.routes[0].legs[0].steps){
      this.routeSteps = osrm.routes[0].legs[0].steps;
    }
  }
}
