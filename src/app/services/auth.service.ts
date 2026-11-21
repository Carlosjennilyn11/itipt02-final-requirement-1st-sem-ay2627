
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // REGISTER ACCOUNT
  register(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      data
    );
  }

  // LOGIN ACCOUNT
  login(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );
  }

  // ADDITIONAL CJK SIGNUP
  authRegister(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/auth/register`,
      data
    );
  }

  // ADDITIONAL LOGIN FOR CJK DATABASE
  authLogin(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/auth/login`,
      data
    );
  }

  // ==========================================
  // ADMIN: GET ALL BOOKINGS
  // ==========================================
  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/admin/bookings`
    );
  }

  // ==========================================
  // ADMIN: UPDATE BOOKING STATUS
  // ==========================================
  updateBookingStatus(
    bookingId: string,
    status: 'Confirmed' | 'Cancelled'
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/api/admin/bookings/${bookingId}/status`,
      null,
      {
        params: { status }
      }
    );
  }

  // ==========================================
  // HOME DASHBOARD: GET DASHBOARD DATA
  // ==========================================
  getHomeDashboard(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/home/dashboard`
    );
  }

  // ==========================================
  // REVIEWS: GET AVERAGE RATING
  // ==========================================
  getAverageRating(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/reviews/average`
    );
  }

  // ==========================================
  // ROOMS: GET ALL ACTIVE ROOMS
  // ==========================================
  getRooms(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/rooms`
    );
  }

}
