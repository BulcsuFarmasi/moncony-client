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
            message: 'Írd be az új pénztárca nevét',
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
                       this.walletService.addWallet(wallet);
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


}
