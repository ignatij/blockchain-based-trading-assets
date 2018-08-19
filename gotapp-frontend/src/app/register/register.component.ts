import { RedirectService } from '../services/redirect.service';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    file: File;

    constructor(private userService: UserService,
        private redirectService: RedirectService) { }

    ngOnInit() {
        this.form = new FormGroup({
            username: new FormControl(),
            password: new FormControl(),
            firstName: new FormControl(),
            secondName: new FormControl()
        });
    }

    onSubmit() {
        this.userService.createUser(this.form.value, this.file).subscribe(
            data => this.redirectService.goToLoginPage(),
            error => console.error(error)
        );
    }

    onChange(event) {
        this.file = event.srcElement.files[0];
    }
}
