import { Component } from '@angular/core';

import { Events, NavController } from 'ionic-angular';

import { CashFlowsPage } from '../cash-flows/cash-flows'

import { Wallet } from '../../models/wallet';

import { AlertService } from '../../services/alert';
import { CashFlowService } from '../../services/cash-flow';
import { ModalService } from '../../services/modal';
import { WalletService } from '../../services/wallet';

import { AddWalletPage } from '../add-wallet/add-wallet';
import { ModifyWalletPage } from '../modify-wallet/modify-wallet';

@Component({
    selector: 'page-wallets',
    templateUrl: './wallets.html'
})

export class WalletsPage  {

    public wallets:Wallet[];
    public totalAmount:number;

    constructor(private walletService:WalletService, private cashFlowService: CashFlowService,
                private alertService:AlertService, private navController:NavController,
                private modalService:ModalService, private events:Events){}

    ionViewWillEnter () {
        this.getWallets();
        this.getTotalAmount();
    }

    addWallet() {
        this.modalService.show(AddWalletPage);
        console.log(this.modalService.show, this.modalService.onClose);
        this.modalService.onClose(() =>  {
            this.getWallets();
            this.getTotalAmount();
        })
    }

    deleteWallet(index:number) {
        this.alertService.show({
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
                            .then(() => {
                                let cashFlows = this.cashFlowService.getCashFlowsByWalletId(this.wallets[index].id)
                                for (let cashFlow of cashFlows) {
                                     this.cashFlowService.deleteCashFlow(cashFlow.id);
                                }
                                this.getWallets();
                                this.getTotalAmount();
                            });
                    }
                }
            ]
        });
    }

    getWallets() {
        this.wallets = this.walletService.getWallets();
    }

    getTotalAmount () {
        this.totalAmount = this.walletService.getTotalAmount();
    }

    goToCashFlows(index:number) {
        this.navController.push(CashFlowsPage, {wallet: this.wallets[index]});
        this.returnFromCashFlows(index);
    }

    modifyWallet(index:number) {
        this.modalService.show(ModifyWalletPage, {wallet: this.wallets[index]});
        this.modalService.onClose(() => {
            this.getWallets();
        })
    }

    returnFromCashFlows(index:number) {
        this.events.subscribe('wallet:modified',(wallet:Wallet) => {
            this.wallets[index] = wallet;
            this.getTotalAmount();
        })
    }
}
