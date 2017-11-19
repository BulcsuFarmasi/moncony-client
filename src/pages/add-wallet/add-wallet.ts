import { Component, OnInit } from '@angular/core';

import { ViewController }  from 'ionic-angular';

import { CashFlow } from '../../models/cash-flow';
import { Wallet } from '../../models/wallet';

import { CashFlowService } from '../../services/cash-flow';
import { WalletService } from '../../services/wallet';

@Component({
    selector:'page-add-wallet',
    templateUrl:'./add-wallet.html'
})

export class AddWalletPage implements OnInit{

    public cashFlow:CashFlow;
    public wallet:Wallet;

    constructor (private cashFlowService:CashFlowService, private walletService:WalletService,
                 private viewController:ViewController) {}

    ngOnInit () {
        this.getWallet();
    }

    addWallet() {
        this.walletService.addWallet(this.wallet)
            .then((wallet:Wallet) => {
                let cashFlow: CashFlow = {
                    id: 0,
                    walletId: wallet.id,
                    amount: wallet.amount,
                    text: 'Kezdő összeg',
                    date: new Date()
                };
                this.cashFlowService.addCashFlow(cashFlow)
                    .then(() => {
                        this.viewController.dismiss();
                    });
            })
    }

    getWallet () {
        this.wallet = {
            id:0,
            amount:0,
            name: ''
        };
    }
}
