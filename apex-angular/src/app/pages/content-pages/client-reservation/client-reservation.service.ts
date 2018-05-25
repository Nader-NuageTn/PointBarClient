import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NewReservationModel } from './NewReservationModel.model';

@Injectable()
export class ClientReservationService {

  constructor(private http:Http, public toastr: ToastsManager) { }

    requiredFieldError() {
        this.toastr.error("Vous devez ajouter tous les champs requises");
    }
    
    requiredNumberOfPersonError() {
        this.toastr.error("Vous devez ajouter au moins une personne");
    }
    
    reservationFail() {
        this.toastr.error("Le serveur de destination ne r\u00e8tepond pas. Des probl\u00e9tsmes r\u00e8teseau temporaires peuvent être à l’origine de cette erreur.");
    }
    
    reservationSuccess() {
        this.toastr.success("Votre demande a \u00e8tt\u00e8t envoy\u00e8te avec succ\u00e9ts.");
    }
    
    cancelSuccess() {
        this.toastr.success("Votre r\u00e8tservation a \u00e8tt\u00e8t annul\u00e8te avec succ\u00e9ts");
    }
    
  sendReservationRequest(reservation:NewReservationModel) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/sendReservationRequest', reservation, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
  
  cancelReservation(id) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/usersController/deleteUser/'+id, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
 
    

  private handleError (error: any) {return Observable.throw(error); }

}
