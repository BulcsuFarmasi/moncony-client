import { Injectable } from '@angular/core'


import { Observable } from 'rxjs/Rx';

import { CashFlow } from '../models/cash-flow'

import { StorageService } from './storage'

@Injectable()

export class CashFlowService {
    private cashFlows = CashFlow[];
    private storageKey:string = 'cashFlows';
    constructor(private storageService:StorageService){}

    addCashFlow(cashFlow:CashFlow):Observable<CashFlow> {
        const length = this.cashFlows.length;
        cashFlow.id = (length > 0) ? this.cashFlows[length - 1].id + 1  : 1;
        this.wallets.push(wallet);
        return Observable.fromPromise(
            this.storageService.set(key, this.wallets).then(() => {
                return wallet;
            })
        );
    }

    getCashFlowsByWalletId(walletId:number): Observable<CashFlow[]>{
        return this.cashFlows.filter((cashFlow) => {
            return cashFlow.walletId == walletId;
        }
    }

    getIndex (id:number) {
        return this.cashFlows.findIndex(cashFlow => cashFlow.id == id);
    }

    deleteCashFlow(cashFlowId:number){
        const index = this.getIndex(id);
        this.cashFlows.splice(index, 1);
        return Observable.fromPromise(
            this.storage.set(this.storageKey, this.wallets);
            })
        )
    }



    loadCashFlows ():Obserable<Wallet[]> {
        this.storageService.get(key).then((cashFlows:CashFlows[]) => {
              this.cashFlows = cashFlows;
        })
    }

    modifyCashFlow(cashFlow:CashFlow){
        let index = this.getIndex(wallet.id);
        this.cashFlows[index] = cashFlow;
        return Obserable.fromPromise(
            this.storage.set(this.key, this.wallets);
        )
    }
}
