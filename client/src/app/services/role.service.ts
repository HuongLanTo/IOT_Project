import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {
  private API_URL = environment.apiUrl + 'role/';

  getRolesList(filter: any, page: number, size: number): Promise<any> {
    let options = Object.assign({}, this.options);
    options.params = {
      'filter': JSON.stringify(filter)
    };    

    return new Promise((resolve, reject) => {
      this.http.get(`${this.API_URL}?page=${page}&size=${size}`, options)
      .toPromise()
      .then(res => {
        resolve(res.json())
      })
      .catch(err => console.log(err))
    })
  }
}
