
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  // ADMIN: CREATE ADMIN TOKEN
  // ==========================================
  createAdminToken(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/auth/admin-token`,
      data
    );
  }

  // ==========================================
  // ADMIN: GET AUTHORIZATION HEADERS
  // ==========================================
  private getAdminHeaders(): HttpHeaders {
    const token = localStorage.getItem('adminToken');

    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });
  }

  // ==========================================
  // ADMIN: GET ALL RESERVATIONS
  // ==========================================
  getAdminReservations(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/admin/reservations`,
      {
        headers: this.getAdminHeaders()
      }
    );
  }

  // ==========================================
  // ADMIN: UPDATE RESERVATION STATUS
  // ==========================================
  updateAdminReservationStatus(
    bookingId: number,
    status: 'Confirmed' | 'Declined'
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/api/admin/reservations/${bookingId}/status`,
      { status: status },
      {
        headers: this.getAdminHeaders()
      }
    );
  }

  // ==========================================
  // ADMIN: GET ALL BOOKINGS (OLD METHOD)
  // ==========================================
  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/admin/bookings`
    );
  }

  // ==========================================
  // ADMIN: UPDATE BOOKING STATUS (OLD METHOD)
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
  // ADMIN ROOMS: GET ALL ROOMS
  // ==========================================
  getAdminRooms(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/admin/rooms`,
      {
        headers: this.getAdminHeaders()
      }
    );
  }

  // ==========================================
  // ADMIN ROOMS: ADD NEW ROOM
  // ==========================================
  addAdminRoom(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/admin/rooms`,
      data,
      {
        headers: this.getAdminHeaders()
      }
    );
  }

  // ==========================================
  // ADMIN ROOMS: EDIT ROOM
  // ==========================================
  updateAdminRoom(
    roomId: number,
    data: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/api/admin/rooms/${roomId}`,
      data,
      {
        headers: this.getAdminHeaders()
      }
    );
  }

  // ==========================================
  // ADMIN ROOMS: REMOVE ROOM
  // ==========================================
  removeAdminRoom(roomId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/api/admin/rooms/${roomId}`,
      {
        headers: this.getAdminHeaders()
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
  // ROOMS: GET ALL ACTIVE ROOMS (USER)
  // ==========================================
  getRooms(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/rooms`
    );
  }

  // ==========================================
  // CUSTOMER: CREATE BOOKING
  // ==========================================
  createBooking(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/bookings`,
      data
    );
  }

  // ==========================================
  // CUSTOMER: GET MY BOOKINGS
  // ==========================================
  getMyBookings(userId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/my-bookings/${userId}`
    );
  }

  // ==========================================
  // CUSTOMER: CANCEL BOOKING
  // ==========================================
  cancelBooking(
    bookingId: number,
    userId: number
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/api/bookings/${bookingId}/cancel`,
      {
        user_id: userId
      }
    );
  }

}
