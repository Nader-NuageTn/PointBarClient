import { Injectable } from '@angular/core';
import {Http, Response, Headers, ResponseContentType, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";



@Injectable()
export class ConfirmReservationService {
        isScan: boolean = false;

    constructor(private http: Http) { }

    getIsScan() {
        return this.isScan;
        }

    confirmReservation(reservationID, nbPersonne) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const body = JSON.stringify([reservationID, nbPersonne]);
        return this.http.post('/reservationController/confirmReservation', body, { headers: headers })
            .map((data: Response) => data.text())
            .catch(this.handleError);
    }
    getReservation(reservationID) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/getReservation', reservationID, { headers: headers })
            .map((data: Response) => {
                if(data != null) {
                    this.isScan = true;
                 }
                data.json();
            })
            .catch(this.handleError);
    }

    getProfilePicture(url: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
        return this.http.post('/reservationController/getPicture', url, options)
            .map((res: Response) => res)
            .catch(this.handleError);
    } 

    private handleError(error: any) { return Observable.throw(error); }

}
