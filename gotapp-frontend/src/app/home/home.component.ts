import { LoaderService } from './../services/loader.service';
import { RedirectService } from '../services/redirect.service';
import { User } from '../models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { IMAGES_URL } from '../services/urls';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { zip } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    items: Item[] = [];
    myItems: Item[] = [];
    form: FormGroup;
    file: File;
    image_url = IMAGES_URL;
    user: User;

    constructor(private itemService: ItemService,
        private redirectService: RedirectService,
        private loaderService: LoaderService,
        private userService: UserService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        const username = localStorage.getItem('username');
        this.route.data.subscribe((response: any) => {
            this.user = response.user.data;
            this.myItems = response.items.data.filter(item => item.owner && item.owner.username === username);
            this.items = response.items.data.filter(item => item.owner && item.owner.username !== username);
        });
        this.form = new FormGroup({
            name: new FormControl(),
            description: new FormControl(),
            price: new FormControl()
        });
    }

    onSubmit() {
        this.loaderService.show();
        this.itemService.createItem({ owner: localStorage.getItem('username'), ...this.form.value }, this.file)
            .subscribe(response => {
                this.myItems.push(response.data);
                this.loaderService.hide();
            });
    }

    onChange(event) {
        this.file = event.srcElement.files[0];
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.redirectService.goToLoginPage();
    }

    buyItem(item: Item) {
        window.scrollTo(0, 0);
        this.loaderService.show();
        this.itemService.buyItem(item, this.user._id).subscribe(response => {
            zip(this.itemService.getItems(),
                this.userService.findUserByUsername(this.user.username)).subscribe(result => {
                    this.loadItems(result[0].data);
                    this.user = result[1].data;
                    this.loaderService.hide();
                });
        });
    }

    loadItems(items) {
        const username = this.user.username;
        this.myItems = items.filter(item => item.owner && item.owner.username === username);
        this.items = items.filter(item => item.owner && item.owner.username !== username);
    }

    viewHistoryOfItem(item: Item) {
        this.redirectService.goToHistoryOfItem(item.id);
    }
}
