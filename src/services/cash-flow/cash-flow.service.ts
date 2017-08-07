import { Injectable } from '@angular/core'

import { Storage } from '@ionic/storage'

import { Observable } from 'rxjs/Rx';

import { CashFlow } from '../../models/cash-flow/cash-flow'

@Injectable()

export class CashFlowService {
    private storageKey:string = 'cashFlows';
    constructor(private storage:Storage){}

    addCashFlow(cashFlow:CashFlow):Observable<CashFlow> {
        return this.http.post(`${this.apiUrl}/${cashFlow.walletId}`, cashFlow)
            .map((response:Response) => response.json());
    }

    getCashFlows(walletId:number): Observable<CashFlow[]>{
        return this.http.get(`${this.apiUrl}/${walletId}`)
            .map((response:Response) => response.json());
    }

    modifyCashFlow(cashFlow:CashFlow){
        return this.http.put(`${this.apiUrl}/${cashFlow.id}`, cashFlow)
            .map((response:Response) => response.json());
    }

    deleteCashFlow(cashFlowId:number){
        return this.http.delete(`${this.apiUrl}/${cashFlowId}`)
    }
}
