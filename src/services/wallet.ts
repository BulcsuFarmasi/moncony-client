import { Injectable } from '@angular/core';

import { StorageService } from './storage';

import { Observable } from 'rxjs/Rx';
import  'rxjs/Rx';

import { Wallet } from '../models/wallet';

@Injectable()
export class WalletService{
    private storageKey:string = 'wallets';
    private wallets:Wallet[] = [];
    constructor(private storageService:StorageService){}

    addWallet (wallet:Wallet):Observable<Wallet> {
        const length = this.wallets.length
        wallet.id = (length > 0) ? this.wallets[length - 1].id : 1;
        this.wallets.push(wallet);
        return Observable.fromPromise(
            this.storageService.set(this.storageKey, this.wallets).then(() => {
                return wallet;
            })
        );
    }

    getIndex (id:number) {
        return this.wallets.findIndex((wallet) => wallet.id === id)
    }

    getWallet (id:number):Wallet {
         return this.wallets.find(wallet => wallet.id == id);

;    }

    getWallets ():Wallet[] {
        console.log(this.wallets.slice());
        return this.wallets.slice();
    }

    getTotalAmount ():number {
        return this.wallets.reduce((totalAmount:number, wallet:Wallet) => {
            return totalAmount + wallet.amount;
        }, 0)
    }

    deleteWallet (id):Observable<any> {
        const index = this.getIndex(id);
        this.wallets.splice(index, 1);
        return Observable.fromPromise(
                this.storageService.set(this.storageKey, this.wallets)
            )
    }

    loadWallets ():Promise<Wallet[]> {
        return this.storageService.get(this.storageKey).then((wallets:Wallet[]) => {
            this.wallets = wallets;
            return wallets;
        })
    }

    modifyWallet (wallet:Wallet):Observable<Wallet> {
        let index = this.getIndex(wallet.id);
        wallet.amount = this.wallets[index].amount + wallet.amount
        this.wallets[index] = wallet;
        return Observable.fromPromise(
            this.storageService.set(this.storageKey, this.wallets).then(() => wallet)
        )
    }

}