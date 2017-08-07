import { Injectable } from '@angular/core'

import { Storage } from '@ionic/storage'

import { Observable } from 'rxjs/Rx';

import { CashFlow } from '../../models/cash-flow/cash-flow'

@Injectable()

export class CashFlowService {
    private storageKey:string = 'cashFlows';
    constructor(private storage:Storage){}

    addCashFlow(cashFlow:CashFlow):Observable<CashFlow> {
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((cashFlows:CashFlow[]) => {
                var id
                if (cashFlows) {
                    id = cashFlows[cashFlows.length - 1].id + 1;
                } else{
                    id = 1;
                    cashFlows = [];
                }
                cashFlow.id = id;
                cashFlows.push(cashFlow);
                this.storage.set(this.storageKey, cashFlows);
                return cashFlow;
            })
        )
    }

    getCashFlows(walletId:number): Observable<CashFlow[]>{
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((cashFlows:CashFlow[]) => {
                return cashFlows.filter((cashFlow) => {
                    return cashFlow.walletId == walletId;
                })
            })
        )
    }

    getIndex (cashFlows:CashFlow[], id:number) {
        return cashFlows.findIndex(cashFlow => cashFlow.id == id);
    }

    modifyCashFlow(cashFlow:CashFlow){
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((cashFlows:CashFlow[]) => {
                let index = this.getIndex(cashFlows, cashFlow.id);
                cashFlows[index] = cashFlow;
                this.storage.set(this.storageKey, cashFlows);
                return cashFlow;
            })
        )
    }

    deleteCashFlow(cashFlowId:number){
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((cashFlows:CashFlow[]) => {
                let index = this.getIndex(cashFlows, cashFlowId);
                cashFlows.splice(index, 1);
                this.storage.set(this.storageKey, cashFlows);
            })
        )
    }
}
