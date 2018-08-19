import { RedirectService } from '../services/redirect.service';
import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(private userService: UserService,
        private redirectService: RedirectService) { }

    ngOnInit() {
        this.form = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        });
    }

    onSubmit() {
        this.userService.login(this.form.controls.username.value, this.form.controls.password.value)
            .subscribe(
                webToken => {
                    localStorage.setItem('username', this.form.controls.username.value);
                    localStorage.setItem('token', webToken);
                    this.redirectService.goToHomePage();
                },
                error => console.error(error)
            );
    }
}
