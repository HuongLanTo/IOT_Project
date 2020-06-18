import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
    providedIn: 'root'
})

export class AuthService extends BaseService {
    private API_URL = environment.apiUrl + 'account/'
    
    constructor(
        protected http: Http,
        public jwtHelperService: JwtHelperService,
        private router: Router
    ) {
        super(http);
    }

    login(user: { username, password }): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.post(this.API_URL, user)
                .subscribe(res => {
                    localStorage.setItem('auth-token', res.json().token);
                    this.router.navigate(['']);
                    resolve(true);
                }, err => reject(err))
        })
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('auth-token');
        console.log(token);
        
        if (token == null){
          return false;
        } else {
          return !this.jwtHelperService.isTokenExpired(token);
        }
    }

    isAuthorized(allowedRoles: string[]): boolean {
        // check if the list of allowed roles is empty, if empty, authorize the user to access the page
        if (allowedRoles == null || allowedRoles.length === 0) {
          return true;
        }
      
        // get token from local storage or state management
       const token = localStorage.getItem('auth-token');
      
        // decode token to read the payload details
        const decodedToken = this.jwtHelperService.decodeToken(token);
      
        // check if it was decoded successfully, if not the token is not valid, deny access
        if (!decodedToken) {
          console.log('Invalid token');
          return false;
        }
      
        // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
        return allowedRoles.includes(decodedToken['role']);
    }

    getCurrentUser(){
        const token = localStorage.getItem('auth-token');
        const decodedToken = this.jwtHelperService.decodeToken(token);
    
        return new Promise((resolve, reject) => {
          this.http.get(this.API_URL + decodedToken['_id'])
          .toPromise()
          .then(res => {
            resolve(res.json())
          })
          .catch(err => console.log(err))
        })
    }

    getUsersList(filter: any, page: number, size: number): Promise<any> {
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

    createUser(user: any): Promise<boolean>{
        return new Promise((resolve, reject) => {
          this.http.post(this.API_URL + '/register', user)
          .subscribe(res => {
            resolve(true);
          }, err => reject(err))
        })
    }

    updateUserInfo(id: string, userInfo){
        let option = Object.assign({}, this.options);
        return new Promise((resolve, reject) => {
          this.http.put(this.API_URL + id, userInfo, option)
          .toPromise()
          .then(res => {
            resolve(res.json())
          })
          .catch(err => reject(err))
        })
      }
}