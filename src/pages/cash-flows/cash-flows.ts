import {Component, OnInit} from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../models/wallet/wallet';
import { CashFlow } from '../../models/cash-flow/cash-flow';

import { CashFlowService } from '../../services/cash-flow/cash-flow.service';
import { WalletService } from '../../services/wallet/wallet.service';

@Component({
    selector: 'page-cash-flows',
    templateUrl: 'cash-flows.html'
})

export class CashFlowsPage implements OnInit {
    public cashFlows:CashFlow[];
    public wallet:Wallet;

    constructor(private cashFlowService:CashFlowService, private walletService:WalletService,
                private navController:NavController, private navParams:NavParams){}

    ngOnInit () {
        this.getWallet();
        this.getCashFlows();
    }

    getCashFlows () {
        this.cashFlowService.getCashFlows(this.wallet.id)
            .subscribe((cashFlows:CashFlow[]) => {this.cashFlows = cashFlows; console.log(this.cashFlows)});
    }

    getWallet () {
        this.wallet=this.navParams.get('wallet');
        console.log(this.wallet);
    }
}
