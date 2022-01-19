import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotonFeatureCollection } from './interfaces/photon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// communicates with Photon (https://photon.komoot.io/)
export class PhotonService{
  constructor(private http: HttpClient) { }

  // sends a query request to Photon and gets response (https://photon.komoot.io/)
  sendQueryRequest(q: string): Observable<PhotonFeatureCollection> { 
    return this.http.get<PhotonFeatureCollection>("https://photon.komoot.io/api/?q=" + q + "&limit=10");
  }
}