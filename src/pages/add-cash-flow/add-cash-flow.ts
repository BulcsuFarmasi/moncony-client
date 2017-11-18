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

    constructor (private navParams:NavParams, private viewController:ViewController) {}

    ngOnInit () {
        this.getWallet();
    }

    closeModal () {
        this.viewController.dismiss();
    }

    getWallet () {
        this.wallet = this.navParams.get('wallet');
    }
}