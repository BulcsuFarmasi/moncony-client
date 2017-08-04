import { Component, OnInit } from '@angular/core';

import { NavParams, ViewController }  from 'ionic-angular';

import { CashFlow } from '../../models/cash-flow/cash-flow';
import { Wallet } from '../../models/wallet/wallet';

import { CashFlowService } from '../../services/cash-flow/cash-flow.service';
import { WalletService } from '../../services/wallet/wallet.service';

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

    getWallet () {
        this.wallet = this.navParams.get('wallet');
    }
}