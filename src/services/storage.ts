import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Rx'

export class StorageService {

    constructor (private storage:StorageService) {}

    get (key:string):Promise<any> {
        return this.storage.get(key);
    }

    set (key:string, value:any):Promise {
        return this.storage.get(key)
    }

}