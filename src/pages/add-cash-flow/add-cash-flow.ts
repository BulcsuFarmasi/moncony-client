import { Component, OnInit } from '@angular/core';

import { NavParams, ViewController }  from 'ionic-angular';

import { CashFlow } from '../../models/cash-flow';
import { Wallet } from '../../models/wallet';

import { CashFlowService } from '../../services/cash-flow';
import { WalletService } from '../../services/wallet';

@Component({
    selector:'page-add-cash-flow',
    templateUrl:'./add-cash-flow.html'
})

export class AddCashFlowPage implements OnInit{

    public cashFlow:CashFlow;
    public wallet:Wallet;

    constructor (private navParams:NavParams, private cashFlowService:CashFlowService,
                private walletService:WalletService, private viewController:ViewController) {}

    ngOnInit () {
        this.getWallet();
    }

    setWallet (data:{wallet:Wallet, cashFlow:CashFlow}) {
        this.wallet = data.wallet;
        this.cashFlow = data.cashFlow;
        this.viewController.dismiss({wallet: this.wallet, cashFlow:this.cashFlow});
    }

    getWallet () {
        this.wallet = this.navParams.get('wallet');
    }
}