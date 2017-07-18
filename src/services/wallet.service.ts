import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Wallet } from '../models/wallet';

@Injectable()
export class WalletService{
    private apiUrl:string = 'http://localhost:8080/api/wallets';
    constructor(private http:Http){}

    addWallet (wallet:Wallet):Observable<Wallet> {
        return this.http.post(`${this.apiUrl}/`, wallet)
            .map((response:Response) => response.json());
    }

    getWallet (walletId:number):Observable<Wallet> {
        return this.http.get(`${this.apiUrl}/${walletId}`)
            .map((response:Response) => response.json())
;    }

    getWallets ():Observable<Wallet[]> {
        return this.http.get(`${this.apiUrl}/`)
            .map((response:Response) => response.json());
    }

    modifyWallet (wallet:Wallet):Observable<Wallet>{
        return this.http.put(`${this.apiUrl}/${wallet.id}`, wallet)
            .map((response:Response) => response.json());
    }

    deleteWallet (walletId):Observable<any> {
        return this.http.delete(`${this.apiUrl}/${walletId}`)
            .map((response:Response) => response.json())
    }


}