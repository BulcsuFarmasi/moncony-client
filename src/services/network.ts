import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NetworkService {
    private apiUrl:string = '';

    constructor (private httpClient:HttpClient) {}

    get (url:string) {
       return this.httpClient.get(url);
    }

    delete (url:string) {
        return this.httpClient.delete(url);
    }

    post (url:string, body:any) {
        return this.httpClient.post(url, body);
    }

    put (url:string, body:any) {
        return this.httpClient.put(url, body);
    }
}