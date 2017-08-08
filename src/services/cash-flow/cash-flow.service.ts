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
            this.storage.get(this.storageKey).then((cashFlowsString:string) => {
                var id:number;
                var cashFlows:CashFlow[] = JSON.parse(cashFlowsString);;
                if (cashFlows && cashFlows.length > 0) {
                    id = cashFlows[cashFlows.length - 1].id + 1;
                } else {
                    if (!cashFlows) {
                        cashFlows = [];
                    }
                    id = 1;
                }
                cashFlow.id = id;
                cashFlows.push(cashFlow);
                this.storage.set(this.storageKey, JSON.stringify(cashFlows));
                return cashFlow;
            })
        )
    }

    getCashFlows(walletId:number): Observable<CashFlow[]>{
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((cashFlowString:string) => {
                let cashFlows:CashFlow[] = JSON.parse(cashFlowString);
                return cashFlows.filter((cashFlow) => {
                    return cashFlow.walletId == walletId;
                })
            })
        )
    }

    getIndex (cashFlows:CashFlow[], id:number) {
        return cashFlows.findIndex(cashFlow => cashFlow.id == id);
    }

    deleteCashFlow(cashFlowId:number){
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((cashFlowsString:string) => {
                console.log(cashFlowId);
                let cashFlows:CashFlow[] = JSON.parse(cashFlowsString);
                let index = this.getIndex(cashFlows, cashFlowId);
                cashFlows.splice(index, 1);
                this.storage.set(this.storageKey, JSON.stringify(cashFlows));
            })
        )
    }

    modifyCashFlow(cashFlow:CashFlow){
        return Observable.fromPromise(
            this.storage.get(this.storageKey).then((cashFlowsString:string) => {
                let cashFlows:CashFlow[] = JSON.parse(cashFlowsString);
                let index = this.getIndex(cashFlows, cashFlow.id);
                cashFlows[index] = cashFlow;
                this.storage.set(this.storageKey, JSON.stringify(cashFlows));
                return cashFlow;
            })
        )
    }
}
