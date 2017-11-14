import { Injectable } from '@angular/core';

import { Modal, ModalController, ViewController } from 'ionic-angular';

@Injectable()
export class ModalService {

    constructor (private  modalController:ModalController,
                 private  viewController:ViewController) {}

    close () {
        this.viewController.dismiss();
    }

    show (page:any, data:any) {
        let modal:Modal = this.modalController.create(page, data);
        modal.present();
    }


}