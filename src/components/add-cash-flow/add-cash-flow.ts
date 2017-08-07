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
    public cashFlowType:number = 1;
    @Input() wallet:Wallet;
    @Output() walletmodified:EventEmitter<{wallet:Wallet, cashFlow:CashFlow}> = new EventEmitter();
    @Output() walletsmodified:EventEmitter<Wallet[]> = new EventEmitter();
    @Input() wallets:Wallet[];

    constructor(private cashFlowService:CashFlowService, private walletService:WalletService){}

    ngOnInit () {
        this.getCashFlow();
    }

    addCashFlow() {
        this.cashFlow.date = new Date();
        if (this.cashFlowType == -1) {
            this.cashFlow.amount *= this.cashFlowType;
        }
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
                            this.walletmodified.emit({wallet: this.wallet, cashFlow: this.cashFlow})
                        }
                    });
            })
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
}
