import { USER_URL } from './urls';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        return this.http.get(USER_URL);
    }

    findUserByUsername(username: string): Observable<any> {
        return this.http.get(`${USER_URL}?username=${username}`);
    }

    createUser(postData: any, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', file, file.name);
        for (const property in postData) {
            if (postData.hasOwnProperty(property)) {
                formData.append(property, postData[property]);
            }
        }
        return this.http.post(USER_URL, formData);
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${USER_URL}/login`, { username, password });
    }

}
