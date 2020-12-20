import {Label} from './label';

export interface GetLabelResponse {
  _embedded: {
    data: [Label];
  };
}
