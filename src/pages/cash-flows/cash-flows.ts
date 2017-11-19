import {Component, OnInit} from '@angular/core';

import {  NavParams } from 'ionic-angular';

import { Wallet } from '../../models/wallet';
import { CashFlow } from '../../models/cash-flow';

import { AddCashFlowPage } from '../add-cash-flow/add-cash-flow'
import { ModifyCashFlowPage } from "../modify-cash-flow/modify-cash-flow";

import { AlertService } from '../../services/alert';
import { CashFlowService } from '../../services/cash-flow';
import { ModalService } from '../../services/modal';
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
                private modalService:ModalService){}

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
        const walletId=this.navParams.get('walletId');
        this.wallet = this.walletService.getWallet(walletId);
    }

    addCashFlow () {
        this.modalService.show(AddCashFlowPage, {wallet: this.wallet});
        this.modalService.onClose(() => {
            this.getWallet();
            this.getCashFlows();
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
        this.modalService.show(ModifyCashFlowPage,
            {wallet: this.wallet, cashFlow: this.cashFlows[index]});
        this.modalService.onClose(() => {
           this.getWallet();
           this.getCashFlows();
        })
    }
}
