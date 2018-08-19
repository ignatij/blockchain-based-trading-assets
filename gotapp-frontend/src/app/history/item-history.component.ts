import { LoaderService } from './../services/loader.service';
import { Item } from './../models/item';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';

@Component({
    selector: 'app-item-history',
    templateUrl: './item-history.component.html',
    styleUrls: ['./item-history.component.css']
})
export class ItemHistoryComponent implements OnInit {
    items: Item[];

    constructor(private route: ActivatedRoute,
        private itemService: ItemService,
        private loaderService: LoaderService) {
    }


    ngOnInit() {
        this.loaderService.show();
        this.route.params.subscribe(params => {
            const itemId = params['itemId'];
            this.itemService.getHistoryOfItem(itemId)
                .subscribe(response => {
                    this.loaderService.hide();
                    this.items = response.data;
                });
        });
    }
}
