import { Component, OnInit } from '@angular/core';

import { Alert, AlertController, NavController} from 'ionic-angular';

import { CashFlowsPage } from '../cash-flows/cash-flows'

import { Wallet } from '../../models/wallet/wallet';

import { WalletService } from '../../services/wallet/wallet.service'
import { CashFlowService } from "../../services/cash-flow/cash-flow.service";
import { CashFlow } from "../../models/cash-flow/cash-flow";

@Component({
    selector: 'page-wallets',
    templateUrl: './wallets.html'
})

export class WalletsPage implements OnInit {

    public wallets:Wallet[];

    constructor(private walletService:WalletService, private cashFlowService:CashFlowService,
                public alertController:AlertController, private navController:NavController){}

    ngOnInit (){
        this.getWallets();
    }

    addWallet() {
        let prompt:Alert = this.alertController.create({
            title: 'Új pénztárca',
            message: 'Írd be az új pénztárca adatait',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Név'
                },
                {
                    name:'amount',
                    placeholder: 'Kezdő összeg',
                    type: 'number'
                }
            ],
            buttons:[
                {
                    text: 'Mégse',
                    role:'cancel'
                },
                {
                   text: 'Hozzáadás',
                   handler:(wallet:Wallet) => {
                       this.walletService.addWallet(wallet)
                           .subscribe((wallet:Wallet) => {
                               this.wallets.push(wallet)
                               let cashFlow:CashFlow = new CashFlow();
                               cashFlow.walletId = wallet.id;
                               cashFlow.amount = wallet.amount;
                               cashFlow.text = 'Kezdő összeg';
                               cashFlow.date = new Date()
                               this.cashFlowService.addCashFlow(cashFlow)
                                   .subscribe();
                           });
                   }
                }
            ]
        });
        prompt.present();
    }

    deleteWallet(index:number) {
        let confirm:Alert = this.alertController.create({
            title: `${this.wallets[index].name} törlése`,
            message: 'Biztos hogy törlöni akarod ezt a pénztárcát?',
            buttons:[
                {
                    'text': 'Mégse',
                    'role': 'cancel'
                },
                {
                    'text': 'Törlés',
                    'handler': () => {
                        this.walletService.deleteWallet(this.wallets[index].id)
                            .subscribe(() => this.wallets.splice(index, 1));
                    }
                }
            ]
        })
        confirm.present();
    }

    getWallets() {
        this.walletService.getWallets()
            .subscribe((wallets:Wallet[]) => this.wallets = wallets);
    }

    goToCashFlows(index:number) {
        this.navController.push(CashFlowsPage, {wallet: this.wallets[index]});
    }

    modifyWallet(index:number) {
        let prompt:Alert = this.alertController.create({
            title: `${this.wallets[index].name} szerkestése`,
            message: 'Írd be a pénztárca új nevét',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Név',
                    value: this.wallets[index].name
                }
            ],
            buttons:[
                {
                    text: 'Mégse',
                    role: 'cancel'
                },
                {
                    text: 'Szerkesztés',
                    handler:promptWallet => {
                        let sendWallet = this.wallets[index];
                        sendWallet.name = promptWallet.name;
                        sendWallet.amount = 0;
                        this.walletService.modifyWallet(sendWallet)
                            .subscribe(responseWallet => this.wallets[index] = responseWallet);
                    }
                }
            ]
        });
        prompt.present();
    }
}
