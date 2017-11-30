import { Component, OnInit } from '@angular/core';

import { Events, NavController } from 'ionic-angular';

import { Wallet } from '../../models/wallet';

import { WalletService } from '../../services/wallet';

import { WalletsPage } from '../../pages/wallets/wallets';

@Component({
    selector: 'page-home',
    templateUrl: './home.html'
})

export class HomePage implements OnInit{

    public wallets:Wallet[];

    constructor(private walletService:WalletService, private navController:NavController){}

    ngOnInit(){
        this.loadWallets();
    }

    ionViewWillEnter () {
        this.getWallets();
    }

    getWallets () {
        this.wallets = this.walletService.getWallets();
    }

    goToWallets () {
        this.navController.push(WalletsPage);
    }

    loadWallets () {
        this.walletService.loadWallets().then(
            (wallets:Wallet[]) => {this.wallets = wallets}
        );
    }

}
