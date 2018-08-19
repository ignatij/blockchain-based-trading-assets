import { Item } from '../models/item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITEMS_URL, INVOKE_URL } from './urls';

@Injectable()
export class ItemService {

    constructor(private http: HttpClient) { }

    getItems(): Observable<any> {
        return this.http.get(`${ITEMS_URL}`);
    }


    createItem(postData: any, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', file, file.name);
        for (const property in postData) {
            if (postData.hasOwnProperty(property)) {
                formData.append(property, postData[property]);
            }
        }
        return this.http.post(ITEMS_URL, formData);
    }

    buyItem(item: Item, userId: number): Observable<any> {
        return this.http.post(INVOKE_URL, {item, userId});
    }

    getHistoryOfItem(itemId: number): Observable<any> {
        return this.http.get(`${ITEMS_URL}/history/${itemId}`);
    }
}
