import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ReservationManagementService {

  constructor(private http:Http, public toastr: ToastsManager) { }
    
  typeSuccess() {
      this.toastr.success("La tranche Horaire a \u00e9t\u00e9 modifi\u00e9e avec succ\u00e9s.");
   }
    
  deleteSuccess() {
        this.toastr.success("La r\u00e9servation a \u00e9t\u00e9 annul\u00e9e avec succ\u00e9s.");
    }
    
  activateSuccess() {
        this.toastr.success("La r\u00e9servation a \u00e9t\u00e9 confirm\u00e9e avec succ\u00e9s.");
    }
    TrancheHorNotif() {
        this.toastr.warning('Remplir la tranche horaire est obligatoire!');
    }
    problemEmail() {
      this.toastr.error("La r\u00e9servation a \u00e9t\u00e9 confirm\u00e9e avec succ\u00e9s. Il y avait un probl\u00e8me lors de l'envoi de l'e-mail et du message.");
   }
    problemSms() {
      this.toastr.error("La r\u00e9servation a \u00e9t\u00e9 confirm\u00e9e avec succ\u00e9s. Il y avait un probl\u00e8me lors de l'envoi du message.");
   }
   problemQRCode() {
      this.toastr.error("La r\u00e9servation a \u00e9t\u00e9 confirm\u00e9e avec succ\u00e9s. Il y avait un probl\u00e8me lors de la cr\u00e9ation du QR code");
   }
    activateFail() {
      this.toastr.error("Il y avait un probl\u00e8me lors de la confirmation de la r\u00e9servation.");
   }
   reservConfirmedStatus() {
       this.toastr.warning('Vous ne pouvez pas confirmer ou bien annuler une r\u00e9servation Arrived!');
   }
   reservAnnulerStatus() {
        this.toastr.warning('La r\u00e9servation est d\u00e9ja annul\u00e9e!');
   }
    reservreconfirm() {
        this.toastr.warning('La r\u00e9servation est d\u00e9ja confirm\u00e9e!');
    }
  //Annuler Reservation
  annulerReservation(idRes) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ReservationManagementController/cancelReservation', idRes, {headers: headers})

            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
    
    //Confirmer Reservation
   confirmerReservation(idRes) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ReservationManagementController/confirmReservation', idRes, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
  //Get Waiting Reservation List
  getAllWaitingReservation(today) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ReservationManagementController/getAllWaitingReservation', today, {headers: headers})
            .map((data: Response) => data.json())
            .catch(this.handleError);
  }
  //Get Reservation List
  getAllReservation(today) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ReservationManagementController/getAllReservation', today, {headers: headers})
            .map((data: Response) => data.json())
            .catch(this.handleError);
  }
  editTrancheHoraire(id, trancheHoraire) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ReservationManagementController/editReservationTime/'+id, trancheHoraire, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
      
  }
    
  private handleError (error: any) {return Observable.throw(error); }

}
