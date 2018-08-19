import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RedirectService {
    constructor(private router: Router) { }

    goToHomePage() {
        this.router.navigate(['/home']);
    }

    goToLoginPage() {
        this.router.navigate(['/login']);
    }

    refreshHome() {
        this.router.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/home'])
        );
    }

    goToHistoryOfItem(itemId: number) {
        this.router.navigate(['/history', itemId]);
    }
}
