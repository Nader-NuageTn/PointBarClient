import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ReservationManagementService {

  constructor(private http:Http, public toastr: ToastsManager) { }
    
  deleteSuccess() {
        this.toastr.success("La reservation est supprim\u00e9t avec succ\u00e9ts.");
    }
    
  activateSuccess() {
        this.toastr.success("La reservation est confirm\u00e9te avec succ\u00e9ts.");
    }
    
  //Annuler Reservation
  annulerReservation(idRes) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/annulerReservation', idRes, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
    
    //Confirmer Reservation
   confirmerReservation(idRes) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/confirmerReservation', idRes, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
  //Get Reservation List
  getAllReservation() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/getReservationList', {headers: headers})
            .map((data: Response) => data.json())
            .catch(this.handleError);
  }
  editTrancheHoraire() {
        
  }
    
  private handleError (error: any) {return Observable.throw(error); }

}
