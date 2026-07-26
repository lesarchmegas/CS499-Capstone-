import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trips';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {

  @Input() trip!: Trip;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  editTrip(trip: Trip): void {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}