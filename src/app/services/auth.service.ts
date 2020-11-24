import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../domain/user/models/user';
import {environment} from '../../environments/environment';
import {LoginRequest} from '../domain/user/models/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  checkUsername(username: string): Observable<{ message: string }> {
    const url = environment.API_URL + '/sender/available';
    const data = {
      username
    };
    return this.http.post<any>(url, data);
  }

  registerUser(data: User): Observable<{ message: string }> {
    const url = environment.API_URL + '/sender/create';
    return this.http.post<any>(url, data, {withCredentials: true});
  }

  login(data: LoginRequest): Observable<{ message: string }> {
    const url = environment.API_URL + '/auth/login';
    return this.http.post<any>(url, data, {withCredentials: true});
  }

  logout(): Observable<{ message: string }> {
    const url = environment.API_URL + '/auth/logout';
    const data = {};
    return this.http.post<any>(url, data, {withCredentials: true});
  }

  loggedIn(): Observable<{ message: string }> {
    const url = environment.API_URL + '/auth/logged';
    return this.http.get<any>(url, {withCredentials: true});
  }
}
