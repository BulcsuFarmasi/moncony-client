import {Component, OnInit} from '@angular/core';

import { AlertController, NavController, NavParams } from 'ionic-angular';

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
                private navController:NavController, private navParams:NavParams,
                private alertController:AlertController){}

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

    addCashFlow () {
        let prompt = this.alertController.create();
        prompt.setTitle('Új bevétel/kiadás');
        prompt.setMessage('Írd be az új bevétel/kiadás adatait');
        prompt.addInput({
            name: 'text',
            placeholder: 'Szöveg'
        });
        prompt.addInput({
            type: 'radio',
            name: 'income',
            label: 'Bevétel',
            value: '1'
        });
        prompt.addInput({
            type: 'radio',
            name: 'income',
            label: 'Kiadás',
            value: '-1'
        });
        prompt.addInput({
            type: 'number',
            name: 'amount',
            placeholder: 'Összeg'
        })
        prompt.addButton({
            role: 'cancel',
            text: 'Mégse'
        })
        prompt.addButton({
            text: 'Hozzáadás',
            handler: cashFlow => {
                cashFlow.amount *= parseInt(cashFlow.income);
                delete cashFlow.income;
                cashFlow.walletId = this.wallet.id
                cashFlow.date = new Date()
                this.cashFlowService.addCashFlow(cashFlow)
                    .subscribe((cashFlow:CashFlow) => {
                        this.cashFlows.push(cashFlow);
                        let wallet = Object.assign({}, this.wallet);
                        wallet.amount = cashFlow.amount;
                        this.walletService.modifyWallet(wallet)
                            .subscribe((wallet:Wallet) => this.wallet = wallet );
                    })
            }
        })

        prompt.present();
    }
}
