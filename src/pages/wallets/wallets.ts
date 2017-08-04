import { Component, OnInit } from '@angular/core';

import {Alert, AlertController, Events, Modal, ModalController, NavController} from 'ionic-angular';

import { CashFlowsPage } from '../cash-flows/cash-flows'

import { Wallet } from '../../models/wallet/wallet';

import { WalletService } from '../../services/wallet/wallet.service'

import { AddWalletPage } from "../add-wallet/add-wallet";
import { ModifyWalletPage } from "../modify-wallet/modify-wallet";

@Component({
    selector: 'page-wallets',
    templateUrl: './wallets.html'
})

export class WalletsPage implements OnInit {

    public wallets:Wallet[];
    public totalAmount:number;

    constructor(private walletService:WalletService, private alertController:AlertController,
                private navController:NavController, private modalController:ModalController,
                private events:Events){}

    ngOnInit (){
        this.getWallets();
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
                                this.wallets.splice(index, 1)
                                this.getTotalAmount();
                            });
                    }
                }
            ]
        })
        confirm.present();
    }

    getWallets() {
        this.walletService.getWallets()
            .subscribe((wallets:Wallet[]) => {
                this.wallets = wallets;
                this.getTotalAmount();
        });
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
