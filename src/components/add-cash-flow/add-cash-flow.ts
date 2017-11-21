import {Component, Input, EventEmitter, OnChanges, Output } from '@angular/core';

import { NgForm } from '@angular/forms';

import { CashFlow } from '../../models/cash-flow';
import { Wallet } from '../../models/wallet';

import { CashFlowService } from "../../services/cash-flow";
import { WalletService } from "../../services/wallet";

@Component({
    selector:'add-cash-flow',
    templateUrl:'./add-cash-flow.html'
})

export class AddCashFlowComponent implements OnChanges {

    @Input() wallets:Wallet[];
    @Input() isModal:boolean
    @Output() formSubmit:EventEmitter<any> = new EventEmitter();
    public cashFlow:CashFlow;
    public cashFlowType:number = -1;
    private wallet:Wallet;

    constructor(private cashFlowService:CashFlowService, private walletService:WalletService){}

    ngOnChanges () {
        this.getCashFlow();
        this.getWallet();
    }

    addCashFlow(form:NgForm) {
        this.cashFlow.date = new Date();
        this.cashFlow.amount *= this.cashFlowType;
        this.cashFlowService.addCashFlow(this.cashFlow)
            .then((cashFlow:CashFlow) => {
                this.cashFlow = cashFlow;
                this.wallet.amount = this.cashFlow.amount;
                this.walletService.modifyWallet(this.wallet)
                    .then(() => {
                        form.reset();
                        if(this.isModal){
                            this.formSubmit.emit();
                        }
                    });
            })
    }

    changeWallet (wallet:Wallet) {
        if(wallet){
            this.wallet = wallet;
            this.cashFlow.walletId = this.wallet.id
        }
    }

    getCashFlow (){
        this.cashFlow = {
            id:0,
            walletId:0,
            amount:0,
            text:'',
            date: new Date()
        };
    }

    getWallet () {
        console.log(this.wallets);
        if (this.wallets.length == 1) {
            this.wallet = this.wallets[0];
            this.cashFlow.walletId = this.wallet.id
        }
    }


}
