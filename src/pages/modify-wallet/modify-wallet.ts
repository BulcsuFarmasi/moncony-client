import { Component, OnInit } from '@angular/core';

import { NavParams, ViewController }  from 'ionic-angular';

import { Wallet } from '../../models/wallet/wallet';

import { WalletService } from '../../services/wallet';

@Component({
    selector:'page-modify-wallet',
    templateUrl:'./modify-wallet.html'
})

export class ModifyWalletPage implements OnInit{

    private wallet:Wallet;

    constructor (private navParams:NavParams, private walletService:WalletService,
                 private viewController:ViewController) {}

    ngOnInit () {
        this.getWallet();
    }


    getWallet () {
        this.wallet = this.navParams.get('wallet');
    }

    modifyWallet() {
        this.wallet.amount = 0;
        this.walletService.modifyWallet(this.wallet)
            .subscribe((wallet:Wallet) => {
            this.wallet = wallet;
            this.viewController.dismiss(this.wallet);
        });
    }
}