import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { HttpService } from './http';
import { StorageService } from './storage';
import { AuthResponse } from '../models/auth-response';

@Injectable()
export class UserService {
    private user:User
    
    constructor (private httpService:HttpService, private storageService:StorageService){}

    logIn (user:User):Promise<boolean> {
        return this.httpService.post('users/login', {email: user.email, password: user.password})
        .then((response:AuthResponse) => {
            if (response.authSuccess) {
                this.setToken(response.token);
                this.user = {
                    id: response.id,
                    email: user.email,
                    password: user.password
                }
            }
            return response.authSuccess; 
        })
    }

    setToken (token:string) {
        this.storageService.set('token', token);
    }
}