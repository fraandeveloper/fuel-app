import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetPostService {

  constructor(private httpClient: HttpClient) {}

  public getFuelStation(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://api.sefaz.al.gov.br/sfz_nfce_api/api/public/consultarPrecosCombustivel', data)
      .pipe(map((post: any) => {
        const county = post.filter((countys) => countys.nomMunicipio === 'MACEIO').slice(0, 20);
        return county;
      })).subscribe(datas => {
        resolve(datas);
      });
    });
  }
}
