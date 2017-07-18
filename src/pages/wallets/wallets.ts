import { Component, OnInit } from '@angular/core';

import { AlertController } from 'ionic-angular'

import { Wallet } from "../../models/wallet";
import { WalletService } from "../../services/wallet.service"

@Component({
    selector: 'page-wallets',
    templateUrl: './wallets.html'
})

export class WalletsPage implements OnInit {

    public wallets:Wallet[];

    constructor(private walletService:WalletService, public alertController:AlertController){}

    ngOnInit (){
        this.getWallets();
    }

    addWallet() {
        let prompt = this.alertController.create({
            title: 'Új pénztárca',
            message: 'Írd be az új pénztárca adatait',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Név'
                },
                {
                    name:'currentAmount',
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
                   handler:wallet => {
                       this.walletService.addWallet(wallet)
                           .subscribe(wallet => this.wallets.push(wallet));
                   }
                }
            ]
        });
        prompt.present();
    }

    getWallets() {
        this.walletService.getWallets()
            .subscribe((wallets:Wallet[]) => this.wallets = wallets);
    }

    modifyWallet(wallet:Wallet) {
        let prompt = this.alertController.create({
            title: `${wallet.name} szerkestése`,
            message: 'Írd be a pénztárca új nevét',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Név'
                }
            ],
            buttons:[
                {
                    text: 'Mégse',
                    role:'cancel'
                },
                {
                    text: 'Szerkesztés',
                    handler:promptWallet => {
                        let sendWallet = wallet;
                        sendWallet.name = promptWallet.name;
                        sendWallet.currentAmount = 0;
                        this.walletService.modifyWallet(sendWallet)
                            .subscribe(responseWallet => wallet = responseWallet);
                    }
                }
            ]
        });
        prompt.present();
    }


}
