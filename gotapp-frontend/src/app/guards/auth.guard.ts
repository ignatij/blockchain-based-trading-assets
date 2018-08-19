import { RedirectService } from '../services/redirect.service';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private redirectService: RedirectService) { }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.redirectService.goToLoginPage();
            return false;
        }
        return true;
    }
}
