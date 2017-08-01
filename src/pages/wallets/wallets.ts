import { Component, OnInit } from '@angular/core';

import { Alert, AlertController, Modal, ModalController, NavController } from 'ionic-angular';

import { CashFlowsPage } from '../cash-flows/cash-flows'

import { Wallet } from '../../models/wallet/wallet';

import { WalletService } from '../../services/wallet/wallet.service'
import { CashFlowService } from "../../services/cash-flow/cash-flow.service";
import { CashFlow } from "../../models/cash-flow/cash-flow";
import {AddWalletPage} from "../add-wallet/add-wallet";

@Component({
    selector: 'page-wallets',
    templateUrl: './wallets.html'
})

export class WalletsPage implements OnInit {

    public wallets:Wallet[];

    constructor(private walletService:WalletService, private cashFlowService:CashFlowService,
                private alertController:AlertController, private navController:NavController,
                private modalController:ModalController){}

    ngOnInit (){
        this.getWallets();
    }

    addWallet() {
        let modal:Modal = this.modalController.create(AddWalletPage);
        modal.present();
        modal.onDidDismiss((wallet:Wallet) => {
            this.wallets.push(wallet);
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
