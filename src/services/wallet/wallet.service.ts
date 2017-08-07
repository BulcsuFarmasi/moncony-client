import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Wallet } from '../../models/wallet/wallet';

@Injectable()
export class WalletService{
    private storageKey:string = 'wallets';
    constructor(private http:Http){}

    addWallet (wallet:Wallet):Observable<Wallet> {
        return this.http.post(`${this.apiUrl}/`, wallet)
            .map((response:Response) => response.json());
    }

    getIndex (wallets: Wallet[], id:number) {
        return wallets.findIndex((wallet) => {
            return wallet.id === id;
        })
    }

    getWallet (walletId:number):Observable<Wallet> {
        return this.http.get(`${this.apiUrl}/${walletId}`)
            .map((response:Response) => response.json())
;    }

    getWallets ():Observable<Wallet[]> {
        return this.http.get(`${this.apiUrl}/`)
            .map((response:Response) => response.json());
    }

    getTotalAmount (wallets:Wallet[]):number {
        return wallets.reduce((totalAmount:number, wallet:Wallet) => {
            return totalAmount + wallet.amount;
        }, 0)
    }

    modifyWallet (wallet:Wallet):Observable<Wallet>{
        return this.http.put(`${this.apiUrl}/${wallet.id}`, wallet)
            .map((response:Response) => response.json());
    }

    deleteWallet (walletId):Observable<any> {
        return this.http.delete(`${this.apiUrl}/${walletId}`);
    }


}