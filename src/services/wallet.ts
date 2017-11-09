import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage'

import { Observable } from 'rxjs/Rx';

import { Wallet } from '../models/wallet';

@Injectable()
export class WalletService{
    private storageKey:string = 'wallets';
    constructor(private storage:Storage){}

    addWallet (wallet:Wallet):Observable<Wallet> {
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((walletsString:string) => {
                var id:number;
                var wallets:Wallet[] = JSON.parse(walletsString);;
                if (wallets && wallets.length > 0) {
                    id = wallets[wallets.length - 1].id + 1;
                } else {
                    if (!wallets) {
                        wallets = [];
                    }
                    id = 1;
                }
                wallet.id = id;
                wallets.push(wallet);
                this.storage.set(this.storageKey, JSON.stringify(wallets));
                return wallet;
            })
        )
    }

    getIndex (wallets: Wallet[], id:number) {
        return wallets.findIndex((wallet) => wallet.id === id)
    }

    getWallet (walletId:number):Observable<Wallet> {
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((walletsString:string) => {
                let wallets:Wallet[] = JSON.parse(walletsString);
                return wallets.find(wallet => wallet.id == walletId)
            })
        )
;    }

    getWallets ():Observable<Wallet[]> {
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((walletsString:string) => {
                let wallets:Wallet[] = JSON.parse(walletsString);
                return wallets || [];

            })
        )
    }

    getTotalAmount (wallets:Wallet[]):number {
        return wallets.reduce((totalAmount:number, wallet:Wallet) => {
            return totalAmount + wallet.amount;
        }, 0)
    }

    deleteWallet (walletId):Observable<any> {
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((walletsString:string) => {
                let wallets:Wallet[] = JSON.parse(walletsString);
                let index = this.getIndex(wallets, walletId);
                wallets.splice(index, 1);
                this.storage.set(this.storageKey, JSON.stringify(wallets));
            })
        )
    }

    modifyWallet (wallet:Wallet):Observable<Wallet>{
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((walletsString:string) => {
                let wallets:Wallet[] = JSON.parse(walletsString);
                let index = this.getIndex(wallets, wallet.id);
                wallet.amount = wallets[index].amount + wallet.amount;
                wallets[index] = wallet;
                this.storage.set(this.storageKey, JSON.stringify(wallets));
                console.log(wallet);
                return wallet;
            })
        )
    }

}