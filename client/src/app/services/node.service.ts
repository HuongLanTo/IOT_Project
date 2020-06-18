import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
    providedIn: 'root'
})

export class NodeService extends BaseService {
    private API_URL = environment.apiUrl + 'node/'
    
    constructor(
        protected http: Http,
        public jwtHelperService: JwtHelperService,
        private router: Router
    ) {
        super(http);
    }

    getNodesList(filter: any, page: number, size: number): Promise<any> {
        let option = Object.assign({}, this.options);
        option.params = {
          'filter': JSON.stringify(filter)
        };    
    
        return new Promise((resolve, reject) => {
          this.http.get(`${this.API_URL}?page=${page}&size=${size}`, option)
          .toPromise()
          .then(res => {
            resolve(res.json())
          })
          .catch(err => console.log(err))
        })
    }

    createNode(user: any): Promise<boolean>{
        return new Promise((resolve, reject) => {
          this.http.post(this.API_URL + '/node', user)
          .subscribe(res => {
            resolve(true);
          }, err => reject(err))
        })
    }

    updateNodeInfo(id: string, nodeInfo){
        let option = Object.assign({}, this.options);
        return new Promise((resolve, reject) => {
          this.http.put(this.API_URL + id, nodeInfo, option)
          .toPromise()
          .then(res => {
            resolve(res.json())
          })
          .catch(err => reject(err))
        })
      }
}