import { Injectable } from '@angular/core';
import {Http, Response, Headers, ResponseContentType, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";



@Injectable()
export class CancelReservationService {

    constructor(private http: Http) { }


    cancelReservation(reservationID) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/cancelReservation', "2018"+reservationID, { headers: headers })
            .map((data: Response) => data.text())
            .catch(this.handleError);
    }

    
    private handleError(error: any) { return Observable.throw(error); }

}
