import { Component, OnInit } from '@angular/core';

import { Wallet } from "../../models/wallet";
import { WalletService } from "../../services/wallet.service"

@Component({
    selector: 'page-wallets',
    templateUrl: './wallets.html'
})

export class WalletsPage implements OnInit {

    public wallets:Wallet[];

    constructor(private walletService:WalletService){}

    ngOnInit (){
        this.getWallets();
    }

    getWallets() {
        this.walletService.getWallets()
            .subscribe((wallets:Wallet[]) => this.wallets = wallets);
    }


}
