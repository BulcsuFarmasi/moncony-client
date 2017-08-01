import { Component, OnInit } from '@angular/core';

import { NavParams, ViewController }  from 'ionic-angular';

import { CashFlow } from '../../models/cash-flow/cash-flow';
import { Wallet } from '../../models/wallet/wallet';

import { CashFlowService } from '../../services/cash-flow/cash-flow.service';
import { WalletService } from '../../services/wallet/wallet.service';

@Component({
    selector:'page-modify-cash-flow',
    templateUrl:'./modify-cash-flow.html'
})

export class ModifyCashFlowPage implements OnInit{

    public cashFlow:CashFlow;
    private wallet:Wallet;
    private oldCashFlowAmount:number;

    constructor (private navParams:NavParams, private cashFlowService:CashFlowService,
                private walletService:WalletService, private viewController:ViewController) {}

    ngOnInit () {
        this.getWallet();
        this.getCashFlow();
    }

    getCashFlow() {
        this.cashFlow = this.navParams.get('cashFlow');
        this.oldCashFlowAmount = this.cashFlow.amount;
    }

    getWallet () {
        this.wallet = this.navParams.get('wallet');
    }

    modifyCashFlow() {
        this.cashFlowService.modifyCashFlow(this.cashFlow)
            .subscribe((cashFlow:CashFlow) => {
                this.cashFlow = cashFlow;
                this.wallet.amount = (this.oldCashFlowAmount - this.cashFlow.amount) * -1;
                this.walletService.modifyWallet(this.wallet)
                    .subscribe((wallet:Wallet) => {
                        this.wallet = wallet;
                        this.viewController.dismiss({wallet:this.wallet, cashFlow: this.cashFlow})
                    } );
            })
    }
}