import { Injectable } from '@angular/core';


import { Observable } from 'rxjs/Rx';
import  'rxjs/Rx';


import { Wallet } from '../models/wallet';

import { HelperService } from "./helper";
import { StorageService } from './storage';

@Injectable()
export class WalletService{
    private storageKey:string = 'wallets';
    private wallets:Wallet[] = [];
    constructor(private storageService:StorageService,
                private helperService: HelperService){}

    addWallet (wallet:Wallet):Promise<Wallet> {
        const length = this.wallets.length;
        wallet.id = (length > 0) ? this.wallets[length - 1].id + 1 : 1;
        this.wallets.push(wallet);
        return this.storageService.set(this.storageKey, this.wallets).then(() => {
            return wallet;
        });
    }

    deleteWallet (id):Promise<any> {
        const index = this.getIndex(id);
        this.wallets.splice(index, 1);
        return this.storageService.set(this.storageKey, this.wallets);
    }

    getIndex (id:number) {
        return this.wallets.findIndex((wallet) => wallet.id === id)
    }

    getWallet (id:number):Wallet {
         return this.wallets.find(wallet => wallet.id == id);

;    }

    getWallets ():Wallet[] {
        return this.helperService.cloneArray(this.wallets);
    }

    getTotalAmount ():number {
        return this.wallets.reduce((totalAmount:number, wallet:Wallet) => {
            return totalAmount + wallet.amount;
        }, 0)
    }

    loadWallets ():Promise<Wallet[]> {
        return this.storageService.get(this.storageKey).then((wallets:Wallet[]) => {
            wallets = wallets || [];
            wallets = wallets.map((wallet:Wallet) => {
                wallet.amount *= 1;
                return wallet;
            });
            this.wallets = wallets;
            return this.helperService.cloneArray(wallets);
        })
    }

    modifyWallet (wallet:Wallet):Promise<Wallet> {
        let index = this.getIndex(wallet.id);
        wallet.amount = this.wallets[index].amount + wallet.amount;
        this.wallets[index] = wallet;
        return this.storageService.set(this.storageKey, this.wallets).then(() => wallet);
    }

}