import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";



@Injectable()
export class ConfirmReservationService {

    constructor(private http: Http) { }

   

    confirmReservation(reservationID) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/confirmReservation', reservationID, { headers: headers })
            .map((data: Response) => data.text())
            .catch(this.handleError);
    }
    getReservation(reservationID){
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/getReservation', reservationID, { headers: headers })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }
  
   

    private handleError(error: any) { return Observable.throw(error); }

}
