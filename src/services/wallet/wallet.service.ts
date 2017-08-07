import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage'

import { Observable } from 'rxjs/Rx';

import { Wallet } from '../../models/wallet/wallet';

@Injectable()
export class WalletService{
    private storageKey:string = 'wallets';
    constructor(private storage:Storage){}

    addWallet (wallet:Wallet):Observable<Wallet> {
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((wallets:Wallet[]) => {
                var id
                if (wallets) {
                    id = wallets[wallets.length - 1].id + 1;
                } else{
                    id = 1;
                    wallets = [];
                }
                wallet.id = id;
                wallets.push(wallet);
                this.storage.set(this.storageKey, wallets);
                return wallet;
            })
        )
    }

    getIndex (wallets: Wallet[], id:number) {
        return wallets.findIndex((wallet) => wallet.id === id)
    }

    getWallet (walletId:number):Observable<Wallet> {
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((wallets:Wallet[]) => {
                return wallets.find(wallet => wallet.id == walletId)
            })
        )
;    }

    getWallets ():Observable<Wallet[]> {
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((wallets:Wallet[]) => {
                return wallets || [];
            })
        )
    }

    getTotalAmount (wallets:Wallet[]):number {
        return wallets.reduce((totalAmount:number, wallet:Wallet) => {
            return totalAmount + wallet.amount;
        }, 0)
    }

    modifyWallet (wallet:Wallet):Observable<Wallet>{
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((wallets:Wallet[]) => {
                let index = this.getIndex(wallets, wallet.id);
                wallets[index] = wallet;
                this.storage.set(this.storageKey, wallet);
                return wallet;
            })
        )
    }

    deleteWallet (walletId):Observable<any> {
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((wallets:Wallet[]) => {
                let index = this.getIndex(wallets, walletId);
                wallets.splice(index, 1);
                this.storage.set(this.storageKey, wallets);
            })
        )
    }


}