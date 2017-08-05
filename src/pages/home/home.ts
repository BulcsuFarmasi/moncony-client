import { Component, OnInit } from '@angular/core';

import { Events, NavController } from 'ionic-angular';

import { Wallet } from '../../models/wallet/wallet';

import { WalletService } from '../../services/wallet/wallet.service';

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
        this.getWallets();
    }

    getWallets () {
        this.walletService.getWallets()
            .subscribe((wallets:Wallet[]) =>{
                this.wallets = wallets;
            })
    }

    goToWallets () {
        this.navController.push(WalletsPage, {wallets: this.wallets});
        this.returnFromWallets();
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
