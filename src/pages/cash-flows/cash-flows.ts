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

    deleteCashFlow (index) {
        let confirm = this.alertController.create({
            title: 'Bevétel/Kiadás Törlése',
            message: 'Biztos hogy törlöni akarod ezt a bevételt/kiadást?',
            buttons:[
                {
                    'text': 'Mégse',
                    'role': 'cancel'
                },
                {
                    'text': 'Törlés',
                    'handler': () => {
                        this.cashFlowService.deleteCashFlow(this.cashFlows[index].id)
                            .subscribe(() => {
                                let wallet = Object.assign({}, this.wallet);
                                wallet.amount = this.cashFlows[index].amount * -1;
                                this.walletService.modifyWallet(wallet)
                                    .subscribe((wallet:Wallet) => this.wallet = wallet );
                                this.cashFlows.splice(index, 1)
                        });
                    }
                }
            ]
        })
        confirm.present();
    }
    modifyCashFlow (index) {
        let prompt = this.alertController.create();
        prompt.setTitle('Bevétel/Kiadás módosítása');
        prompt.setMessage('Írd be abevétel/kiadás új adatait');
        prompt.addInput({
            name: 'text',
            placeholder: 'Szöveg'
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
            text: 'Módosítás',
            handler: cashFlow => {
                cashFlow.id = this.cashFlows[index].id;
                this.cashFlowService.modifyCashFlow(cashFlow)
                    .subscribe((cashFlow:CashFlow) => {
                        let wallet = Object.assign({}, this.wallet);
                        wallet.amount = (this.cashFlows[index].amount - cashFlow.amount) * -1;
                        this.cashFlows[index] = cashFlow;
                        this.walletService.modifyWallet(wallet)
                            .subscribe((wallet:Wallet) => this.wallet = wallet );
                    })
            }
        })

        prompt.present();
    }
}
