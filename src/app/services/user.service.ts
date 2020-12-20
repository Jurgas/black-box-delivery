import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }


  checkUsername(username: string): Observable<{ message: string }> {
    const url = environment.API_URL + '/user/available';
    const data = {
      username
    };
    return this.http.post<any>(url, data);
  }

  current(): Observable<{ message: string }> {
    const url = environment.API_URL + '/user/current';
    return this.http.get<any>(url);
  }
}
