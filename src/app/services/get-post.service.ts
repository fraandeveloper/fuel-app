import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPostService {

  constructor(private httpClient: HttpClient) {}

  public getFuelStation(data: any): Observable<any> {
    return this.httpClient.post('http://api.sefaz.al.gov.br/sfz_nfce_api/api/public/consultarPrecosCombustivel', data);
  }
}
