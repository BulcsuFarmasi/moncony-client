import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CashFlow } from '../../models/cash-flow/cash-flow'

@Injectable()

export class CashFlowService {
    private apiUrl:string = 'https://thawing-mesa-52636.herokuapp.com/api/cash-flows';
    constructor(private http:Http){}

    addCashFlow(cashFlow:CashFlow):Observable<CashFlow> {
        return this.http.post(`${this.apiUrl}/${cashFlow.walletId}`, cashFlow)
            .map((response:Response) => response.json());
    }

    getCashFlows(walletId:string): Observable<CashFlow[]>{
        return this.http.get(`${this.apiUrl}/${walletId}`)
            .map((response:Response) => response.json());
    }

    modifyCashFlow(cashFlow:CashFlow){
        return this.http.put(`${this.apiUrl}/${cashFlow.id}`, cashFlow)
            .map((response:Response) => response.json());
    }

    deleteCashFlow(cashFlowId:string){
        return this.http.delete(`${this.apiUrl}/${cashFlowId}`)
    }
}
