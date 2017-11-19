import { Injectable } from '@angular/core'


import { Observable } from 'rxjs/Rx';

import { CashFlow } from '../models/cash-flow'

import { StorageService } from './storage'

@Injectable()

export class CashFlowService {
    private cashFlows:CashFlow[] = [];
    private storageKey:string = 'cashFlows';
    constructor(private storageService:StorageService){}

    addCashFlow(cashFlow:CashFlow):Promise<CashFlow> {
        const length = this.cashFlows.length;
        cashFlow.id = (length > 0) ? this.cashFlows[length - 1].id + 1  : 1;
        this.cashFlows.push(cashFlow);
        return this.storageService.set(this.storageKey, this.cashFlows).then(() => {
                return cashFlow;
        })
    }

    getCashFlowsByWalletId(walletId:number): CashFlow[]{
        return this.cashFlows.filter((cashFlow) => {
            return cashFlow.walletId == walletId;
        })
    }

    getIndex (id:number) {
        return this.cashFlows.findIndex(cashFlow => cashFlow.id == id);
    }

    deleteCashFlow(id:number){
        const index = this.getIndex(id);
        this.cashFlows.splice(index, 1);
        return Observable.fromPromise(
            this.storageService.set(this.storageKey, this.cashFlows).then()
        );
    }



    loadCashFlows ():Promise<CashFlow[]> {
        return this.storageService.get(this.storageKey)
            .then((cashFlows:CashFlow[]) => {
                this.cashFlows = cashFlows;
                return cashFlows;
        });
    }

    modifyCashFlow (cashFlow) {
        let index = this.getIndex(cashFlow.id);
        this.cashFlows[index] = cashFlow;
        return this.storageService.set(this.storageKey, this.cashFlows).then(() => cashFlow);
    }
}
