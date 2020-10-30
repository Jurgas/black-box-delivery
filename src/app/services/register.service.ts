import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
  }

  registerUser(data: FormData): Observable<any> {
    const url = 'https://infinite-hamlet-29399.herokuapp.com/sender/register';
    return this.http.post<any>(url, data);
  }

  checkUsername(login: string): Observable<any> {
    const url = 'https://infinite-hamlet-29399.herokuapp.com/check/' + login;
    return this.http.get<any>(url);
  }
}
