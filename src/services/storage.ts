import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


@Injectable()
export class StorageService {

    constructor (private storage:Storage) {}

    get (key:string):Promise<any> {
        return this.storage.get(key)
               .then((value:any) => JSON.parse(value));
    }

    set (key:string, value:any):Promise<any> {
        value = JSON.stringify(value);
        return this.storage.set(key, value);
    }

}