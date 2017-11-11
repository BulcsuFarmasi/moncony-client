import { Injectable } from '@angular/core';

import { StorageService } from './storage';

import { Observable } from 'rxjs/Rx';

import { Wallet } from '../models/wallet';

@Injectable()
export class WalletService{
    private key:string = 'wallets';
    private wallets:Wallet[] = [];
    constructor(private storageServcie:StorageService){}

    addWallet (wallet:Wallet):Observable<Wallet>
        const length = this.wallets.length
        wallet.id = (length > 0) ? this.wallets[length - 1].id : 1;
        this.wallets.push(wallet);
        return Observable.fromPromise(
            this.storageService.set(key, this.wallets).then(() => {
                return wallet;
            })
        );
    }

    getIndex (id:number) {
        return this.wallets.findIndex((wallet) => wallet.id === id)
    }

    getWallet (id:number):Wallet {
         return this.wallets.find(wallet => wallet.id == id)
        )
;    }

    getWallets ():Observable<Wallet[]> {
        return this.wallets.splice();
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
                this.storage.set(this.storageKey, this.wallets);
            })
        )
    }

    loadWallets ():Obserable<Wallet[]> {
         this.storageService.get(key).then((wallets:Wallet[]) => {
              this.wallets = wallets
         })
    }

    modifyWallet (wallet:Wallet):Observable<Wallet> {
        let index = this.getIndex(wallet.id);
        wallet.amount = this.wallets[index].amount + wallet.amount
        this.wallets[index] = wallet;
        return Obserable.fromPromise(
            this.storage.set(this.key, this.wallets).then(() => wallet);
        )
    }

}