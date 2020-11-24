import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {GetLabelResponse} from '../domain/label/models/get-label-response';
import {Label} from '../domain/label/models/label';
import {LabelData} from '../domain/label/models/label-data';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient) {
  }

  getLabels(): Observable<GetLabelResponse> {
    const link = environment.API_URL + '/sender/label';
    return this.http.get<any>(link, {withCredentials: true});
  }

  createLabel(labelData: LabelData): Observable<Label> {
    const link = environment.API_URL + '/sender/label';
    const data = {
      receiver: labelData.receiver,
      POBoxId: labelData.POBoxId,
      size: labelData.size
    };
    return this.http.post<any>(link, data, {withCredentials: true});
  }

  deleteLabel(id: string): Observable<Label> {
    const link = environment.API_URL + '/sender/label/' + id;
    return this.http.delete<any>(link, {withCredentials: true});
  }

}
