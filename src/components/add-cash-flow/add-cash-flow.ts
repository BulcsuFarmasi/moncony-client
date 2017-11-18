import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';

import { NgForm } from '@angular/forms';

import { CashFlow } from '../../models/cash-flow';
import { Wallet } from '../../models/wallet';

import { CashFlowService } from "../../services/cash-flow";
import { WalletService } from "../../services/wallet";

@Component({
    selector:'add-cash-flow',
    templateUrl:'./add-cash-flow.html'
})

export class AddCashFlowComponent implements OnInit{

    @Input() wallets:Wallet[];
    @Output() formSubmit:EventEmitter<any> = new EventEmitter();
    public cashFlow:CashFlow;
    public cashFlowType:number = 1;
    private wallet:Wallet;

    constructor(private cashFlowService:CashFlowService, private walletService:WalletService){}

    ngOnInit () {
        this.getWallet();
        this.getCashFlow();
    }

    addCashFlow(form:NgForm) {
        this.cashFlow.date = new Date();
        if (this.cashFlowType == -1) {
            this.cashFlow.amount *= this.cashFlowType;
        }
        this.cashFlowService.addCashFlow(this.cashFlow)
            .then((cashFlow:CashFlow) => {
                this.cashFlow = cashFlow;
                this.wallet.amount = this.cashFlow.amount;
                this.walletService.modifyWallet(this.wallet)
                    .then((wallet:Wallet) => {
                        this.wallet = wallet;
                        let index = this.walletService.getIndex(this.wallet.id);
                        this.wallets[index] = this.wallet;
                        form.reset();
                    });
            })
    }

    changeWallet () {
        this.cashFlow.walletId = this.wallet.id
    }

    getCashFlow (){
        this.cashFlow = {
            id:0,
            walletId:0,
            amount:0,
            text:'',
            date: new Date()
        }
        if (this.wallet) {
            this.cashFlow.walletId = this.wallet.id
        }
    }

    getWallet () {
        if (this.wallets.length == 1) {
            this.wallet = this.wallets[0];
        }
    }


}
