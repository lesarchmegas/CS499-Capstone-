import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trips';

@Injectable({
  providedIn: 'root',
})
export class TripData {

  private url = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.url}/${tripCode}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, trip);
  }

  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.url}/${trip.code}`, trip);
  }
}