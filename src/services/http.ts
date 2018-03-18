import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {
    private apiUrl:string = 'http://localhost/api/';

    constructor (private httpClient:HttpClient) {}

    get (url:string) {
       return this.httpClient.get(this.apiUrl + url).toPromise();
    }

    delete (url:string) {
        return this.httpClient.delete(this.apiUrl + url).toPromise();
    }

    post (url:string, body:any) {
        return this.httpClient.post(this.apiUrl + url, body).toPromise();
    }

    put (url:string, body:any) {
        return this.httpClient.put(this.apiUrl + url, body).toPromise();
    }
}