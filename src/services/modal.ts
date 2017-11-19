import { Injectable } from '@angular/core';

import { Modal, ModalController } from 'ionic-angular';

@Injectable()
export class ModalService {

    private modal:Modal;

    constructor (private  modalController:ModalController) {}

    onClose (callback) {
        this.modal.onDidDismiss(callback);
    }

    show (page:any, data?:any) {
        this.modal = this.modalController.create(page, data);
        this.modal.present();
    }

}