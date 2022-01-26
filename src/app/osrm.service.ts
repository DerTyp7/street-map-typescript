import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Osrm } from './interfaces/osrm';

@Injectable({
  providedIn: 'root'
})

// http://router.project-osrm.org/route/v1/driving/13.388860,52.517037;13.397634,52.529407;13.428555,52.523219?overview=false&steps=true&geometries=geojson
export class OsrmService{
  constructor(private http: HttpClient) { }

  // sends a query request to Osrm and gets response (http://project-osrm.org/docs/v5.24.0/api/?language=cURL#table-service)
  sendQueryRequest(longFrom: number, latFrom: number, longTo: number, latTo: number): Observable<Osrm> {
    console.log(latTo)
    console.log("https://routing.openstreetmap.de/routed-bike/route/v1/driving/" + longFrom + "," + latFrom + ";" + longTo + "," + latTo + "?overview=full&alternatives=false&steps=true&geometries=geojson")
    return this.http.get<Osrm>("https://routing.openstreetmap.de/routed-bike/route/v1/driving/" + longFrom + "," + latFrom + ";" + longTo + "," + latTo + "?overview=full&alternatives=false&steps=true&geometries=geojson");
  }
}
