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

    constructor(private walletService:WalletService, private navController:NavController,
                private events:Events){}

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
        this.returnFromWallets();
    }

    loadWallets () {
        console.log(this.walletService.loadWallets());
        this.walletService.loadWallets().then(
            (wallets:Wallet[]) => {this.wallets = wallets}
        );
    }

    returnFromWallets () {
       this.events.subscribe('wallets:modified',(wallets:Wallet[]) => {
           this.wallets = wallets;
       })
    }

    setWallets (wallets:Wallet[]) {
        this.wallets = wallets;
    }
}
