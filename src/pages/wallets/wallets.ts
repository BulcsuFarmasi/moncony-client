import { Component, OnInit } from '@angular/core';

import {Alert, AlertController, Events, Modal, ModalController, NavController, NavParams} from 'ionic-angular';

import { CashFlowsPage } from '../cash-flows/cash-flows'

import { CashFlow } from '../../models/cash-flow/cash-flow';
import { Wallet } from '../../models/wallet/wallet';

import { CashFlowService } from '../../services/cash-flow/cash-flow.service';
import { WalletService } from '../../services/wallet/wallet.service'

import { AddWalletPage } from '../add-wallet/add-wallet';
import { ModifyWalletPage } from '../modify-wallet/modify-wallet';

@Component({
    selector: 'page-wallets',
    templateUrl: './wallets.html'
})

export class WalletsPage implements OnInit {

    public wallets:Wallet[];
    public totalAmount:number;

    constructor(private walletService:WalletService, private cashFlowService: CashFlowService,
                private alertController:AlertController, private navController:NavController, 
                private modalController:ModalController, private events:Events, 
                private navParams:NavParams){}

    ngOnInit (){
        this.getWallets();
    }

    ionViewWillLeave() {
        this.events.publish('wallets:modified', this.wallets);
    }

    addWallet() {
        let modal:Modal = this.modalController.create(AddWalletPage);
        modal.present();
        modal.onDidDismiss((wallet:Wallet) => {
            this.wallets.push(wallet);
            this.getTotalAmount();
        })
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
                            .subscribe(() => {
                                this.cashFlowService.getCashFlows(this.wallets[index].id)
                                    .subscribe((cashFlows:CashFlow[]) => {
                                        console.log(cashFlows);
                                        cashFlows.map(cashFlow => {this.cashFlowService.deleteCashFlow(cashFlow.id)});
                                    });
                                this.wallets.splice(index, 1);
                                this.getTotalAmount();
                            });
                    }
                }
            ]
        })
        confirm.present();
    }

    getWallets() {
        this.wallets = this.navParams.get('wallets');
    }

    getTotalAmount () {
        this.totalAmount = this.walletService.getTotalAmount(this.wallets);
    }

    goToCashFlows(index:number) {
        this.navController.push(CashFlowsPage, {wallet: this.wallets[index]});
        this.returnFromCashFlows(index);
    }

    modifyWallet(index:number) {
        let modal:Modal = this.modalController.create(ModifyWalletPage, {wallet: this.wallets[index]});
        modal.present();
        modal.onDidDismiss((wallet:Wallet) => {
            this.wallets[index] = wallet;
        })
    }

    returnFromCashFlows(index:number) {
        this.events.subscribe('wallet:modified',(wallet:Wallet) => {
            this.wallets[index] = wallet;
            this.getTotalAmount();
        })
    }
}
