import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';



@Injectable()
export class UserResolver implements Resolve<any> {

    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot) {
        const username = localStorage.getItem('username');
        return this.userService.findUserByUsername(username);
    }

}
