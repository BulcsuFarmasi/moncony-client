import { Component, OnInit } from '@angular/core';

import { ViewController }  from 'ionic-angular';

import { CashFlow } from '../../models/cash-flow/cash-flow';
import { Wallet } from '../../models/wallet/wallet';

import { CashFlowService } from '../../services/cash-flow/cash-flow.service';
import { WalletService } from '../../services/wallet/wallet.service';

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
            .subscribe((wallet:Wallet) => {
                let cashFlow:CashFlow = new CashFlow();
                cashFlow.walletId = wallet.id;
                cashFlow.amount = wallet.amount;
                cashFlow.text = 'Kezdő összeg';
                cashFlow.date = new Date();
                this.cashFlowService.addCashFlow(cashFlow)
                    .subscribe(() => {
                        this.viewController.dismiss(this.wallet);
                    });
            });
    }

    getWallet () {
        this.wallet = new Wallet();
    }
}
