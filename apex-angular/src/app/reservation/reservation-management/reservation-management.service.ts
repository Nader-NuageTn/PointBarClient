import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ReservationManagementService {

  constructor(private http:Http, public toastr: ToastsManager) { }
    
  typeSuccess() {
      this.toastr.success("La tranche Horaire est modifi\u00e9te avec succ\u00e9ts.");
   }
    
  deleteSuccess() {
        this.toastr.success("La reservation est supprim\u00e9te avec succ\u00e9ts.");
    }
    
  activateSuccess() {
        this.toastr.success("La reservation est confirm\u00e9te avec succ\u00e9ts.");
    }
    TrancheHorNotif() {
        this.toastr.warning('Remplir la tranche horaire est obligatoire!');
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
        return this.http.post('/ReservationManagementController/confirmReservation', "52", {headers: headers})
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
  editTrancheHoraire(id, trancheHoraire1, trancheHoraire2) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
       const body=JSON.stringify([trancheHoraire1,trancheHoraire2]);
        return this.http.post('/reservationController/editTrancheHoraire/'+id, body, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
      
  }
    
  private handleError (error: any) {return Observable.throw(error); }

}
