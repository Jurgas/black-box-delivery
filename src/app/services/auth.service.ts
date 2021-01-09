import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../domain/user/models/user';
import {environment} from '../../environments/environment';
import {LoginRequest} from '../domain/user/models/login-request';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Auth0Request} from '../domain/user/models/auth0-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly token = 'access_token';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  static getToken(): string | null {
    return localStorage.getItem(AuthService.token);
  }

  registerUser(data: User): Observable<{ message: string }> {
    const url = environment.API_URL + '/auth/register';
    return this.http.post<any>(url, data);
  }

  login(data: LoginRequest): Observable<void> {
    const url = environment.API_URL + '/auth/login';
    return this.http.post<any>(url, data, {observe: 'response'}).pipe(
      map(res => {
        localStorage.setItem(AuthService.token, res.headers.get('Authorization') as string);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(AuthService.token);
    this.router.navigate(['/sender/login']);
  }

  loginAuth0(data: Auth0Request): Observable<void> {
    const url = environment.API_URL + '/auth/auth0';
    return this.http.post<any>(url, data, {observe: 'response'}).pipe(
      map(res => {
        localStorage.setItem(AuthService.token, res.headers.get('Authorization') as string);
      })
    );
  }
}
