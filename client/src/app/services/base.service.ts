import { Injectable } from "@angular/core";
import { Http, RequestOptionsArgs, Headers } from '@angular/http';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    protected options: RequestOptionsArgs;
    constructor(
        protected http: Http
    ) {
        this.options = { headers: new Headers({Authorization: `Bearer ${localStorage.getItem('auth-token')}`})};
    }
}