import { Injectable } from '@angular/core';

import { Alert, AlertController } from 'ionic-angular';

@Injectable()
export class AlertService {
    constructor (private alertController:AlertController) {}

    show (options:any) {
        let alert:Alert = this.alertController.create(options);
        alert.present();
    }
}