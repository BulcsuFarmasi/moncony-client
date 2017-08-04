import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CashFlow } from '../../models/cash-flow/cash-flow';
import { Wallet } from '../../models/wallet/wallet';

import { CashFlowService } from "../../services/cash-flow/cash-flow.service";
import { WalletService } from "../../services/wallet/wallet.service";

@Component({
    selector:'add-cash-flow',
    templateUrl:'./add-cash-flow.html'
})

export class AddCashFlowComponent implements OnInit{
    
    public cashFlow:CashFlow;
    @Output cashflowmodified:EventEmitter<CashFlow>;
    @Input() wallet:Wallet;
    @Output walletmodified:EventEmitter<Wallet>;
    @Input() wallets:Wallet[];
    @Output walletsmodified:EventEmitter<Wallet[]>;
    private walletIndex:number

    constructor(private cashFlowService:CashFlowService, private walletService:WalletService){}

    ngOnInit () {
        this.getCashFlow();
        this.getCashFlowModified();
    }

    addCashFlow() {
        this.cashFlow.date = new Date()
        this.cashFlowService.addCashFlow(this.cashFlow)
            .subscribe((cashFlow:CashFlow) => {
                this.cashFlow = cashFlow;
                this.wallet.amount = this.cashFlow.amount;
                this.walletService.modifyWallet(this.wallet)
                    .subscribe((wallet:Wallet) => {
                        this.wallet = wallet;
                        if(this.wallets) {
                            let index = this.walletService.getIndex(this.wallets, this.wallet.id);
                            this.wallets[index] = this.wallet;
                            this.walletsmodified.emit(this.wallets);
                        } else {
                            this.cashflowmodified.emit(this.cashFlow);
                            this.walletmodified.emit(this.wallet);
                        }
                    });
            })
    }

    changeWallet (index:number) {
        this.walletIndex = index;
        this.changeWalletId();
    }

    changeWalletId () {
        this.cashFlow.walletId = this.wallet.id
    }
    
    getCashFlow (){
        this.cashFlow = new CashFlow();
        if (this.wallet) {
            this.cashFlow.walletId = this.wallet.id
        }
    }
    getCashFlowModified() {
        this.cashflowmodified = new EventEmitter();
    }
}
