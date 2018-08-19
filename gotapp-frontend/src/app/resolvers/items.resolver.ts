import { ItemService } from '../services/item.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemsResolver implements Resolve<any> {

    constructor(private itemService: ItemService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.itemService.getItems();
    }
}
