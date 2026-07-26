import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {}

  // checks if JWT exists in browser storage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('travlr_token');
  }

  // optional helper (used later for interceptor)
  getToken(): string | null {
    return localStorage.getItem('travlr_token');
  }

  // logout helper (good practice)
  logout(): void {
    localStorage.removeItem('travlr_token');
  }
}