import { User } from '../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { IMAGES_URL } from '../../services/urls';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @Input() user: User;
    image_url = IMAGES_URL;

    @Input() showAmount = true;

    ngOnInit() {
        console.log(this.user);
    }

}
