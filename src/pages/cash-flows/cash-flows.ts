import {Component, OnInit} from '@angular/core';

import {  Modal, ModalController, NavParams } from 'ionic-angular';

import { Wallet } from '../../models/wallet';
import { CashFlow } from '../../models/cash-flow';

import { AddCashFlowPage } from '../add-cash-flow/add-cash-flow'
import { ModifyCashFlowPage } from "../modify-cash-flow/modify-cash-flow";

import { AlertService } from '../../services/alert';
import { CashFlowService } from '../../services/cash-flow';
import { WalletService } from '../../services/wallet';

@Component({
    selector: 'page-cash-flows',
    templateUrl: 'cash-flows.html'
})

export class CashFlowsPage implements OnInit{
    public cashFlows:CashFlow[];
    public wallet:Wallet;



    constructor(private cashFlowService:CashFlowService, private walletService:WalletService,
                private navParams:NavParams, private alertService:AlertService,
                private modalController:ModalController){}

    ngOnInit () {
        this.getWallet();
        this.loadCashFlows();
    }
    ionViewWillEnter () {
        this.getCashFlows();
    }

    getCashFlows () {
        this.cashFlows = this.cashFlowService.getCashFlowsByWalletId(this.wallet.id);
    }

    getWallet () {
        this.wallet=this.navParams.get('wallet');
    }

    addCashFlow () {
        let modal:Modal = this.modalController.create(AddCashFlowPage, {wallet: this.wallet});
        modal.present();
        modal.onDidDismiss((data:{wallet:Wallet, cashFlow:CashFlow}) => {
            this.wallet = data.wallet;
            this.cashFlows.push(data.cashFlow);
        })
    }

    deleteCashFlow (index:number) {
        this.alertService.show({
            title: 'Bevétel/Kiadás Törlése',
            message: 'Biztos hogy törlöni akarod ezt a bevételt/kiadást?',
            buttons:[
                {
                    'text': 'Mégse',
                    'role': 'cancel'
                },
                {
                    'text': 'Törlés',
                    'handler': () => {
                        this.cashFlowService.deleteCashFlow(this.cashFlows[index].id)
                            .subscribe(() => {
                                let wallet = Object.assign({}, this.wallet);
                                wallet.amount = this.cashFlows[index].amount * -1;
                                this.walletService.modifyWallet(wallet)
                                    .then((wallet:Wallet) => this.wallet = wallet );
                                this.getCashFlows();
                        });
                    }
                }
            ]
        })
    }

    loadCashFlows () {
        this.cashFlowService.loadCashFlows().then(() => {
            this.getCashFlows();
        })
    }

    modifyCashFlow (index:number) {
        let modal:Modal = this.modalController.create(ModifyCashFlowPage,
            {wallet: this.wallet, cashFlow: this.cashFlows[index]});
        modal.present();
        modal.onDidDismiss((data:{wallet:Wallet, cashFlow:CashFlow}) => {
            this.wallet = data.wallet;
            this.cashFlows[index] = data.cashFlow;
        })
    }
}
