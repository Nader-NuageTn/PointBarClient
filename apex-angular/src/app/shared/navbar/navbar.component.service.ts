import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class NavbarService {

    constructor(private http: Http, public toastr: ToastsManager) { }


    //Get All Notification 
    GetAllNotification(idUser) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/NotificationController/GetAllNotification', idUser, { headers: headers })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    //Get Unread Notification
    GetUnreadNotification(idUser) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/NotificationController/GetUnreadNotification', idUser, { headers: headers })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }
    //Set Notification Read
    setNotificationRead(IDNotif) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/NotificationController/setNotificationRead', IDNotif, { headers: headers })
            .map((data: Response) => data.text())
            .catch(this.handleError);
    }



    private handleError(error: any) { return Observable.throw(error); }

}
