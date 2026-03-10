import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, switchMap } from 'rxjs';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private apiURL = 'http://localhost:3000';
  
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // If already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    // checks if user already exists
    return this.http.get<User[]>(`${this.apiURL}/users?email=${credentials.email}`).pipe(
      map(users => {
        if (users.length > 0) {
          throw new Error('User already exists');
        }
        
        // Create new user
        return this.http.post<User>(`${this.apiURL}/users`, {
          email: credentials.email,
          password: credentials.password,
          id: Date.now() //ID generation
        }).pipe(
          map(user => {
            const authResponse: AuthResponse = {
              accessToken: btoa(user.email + ':' + Date.now()), // token
              user: { id: user.id, email: user.email }
            };
            this.handleAuthSuccess(authResponse);
            return authResponse;
          })
        );
      }),
      // Flatten the nested observable
      map(obs => obs),
      // Handle the inner observable
      switchMap(obs => obs)
    );
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.get<User[]>(`${this.apiURL}/users?email=${credentials.email}&password=${credentials.password}`).pipe(
      map(users => {
        if (users.length === 0) {
          throw new Error('Invalid email or password');
        }
        
        const user = users[0];
        const authResponse: AuthResponse = {
          accessToken: btoa(user.email + ':' + Date.now()),
          user: { id: user.id, email: user.email }
        };
        this.handleAuthSuccess(authResponse);
        return authResponse;
      })
    );
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem('currentUser', JSON.stringify(response));
    localStorage.setItem('token', response.accessToken);
    this.currentUserSubject.next(response);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}