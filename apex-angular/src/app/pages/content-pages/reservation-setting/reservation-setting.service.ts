import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Injectable()
export class ReservationSettingService {

    constructor(private http: Http, public toastr: ToastsManager) { }

    requiredFieldError() {
        this.toastr.error("Vous devez ajouter tous les champs requises");
    }


    requiredDateError() {
        this.toastr.error("Vous devez ajouter la date");
    }

    reservationFail() {
        this.toastr.error("Le serveur de destination ne r\u00e9pond pas. Des probl\u00e9mes r\u00e9seau temporaires peuvent \u00eatre \u00e0 l'origine de cette erreur.");
    }

    closeDateSuccess() {
        this.toastr.success("La date a \u00e9t\u00e9 ferm\u00e9e avec succ\u00e9s.");
    }

    reservationSuccess() {
        this.toastr.success("Votre demande a \u00e9t\u00e9 envoy\u00e9e avec succ\u00e9s.");
    }

    dateClosed() {
        this.toastr.warning("Cette date est d\u00e9j\u00e0 ferm\u00e9e!");
    }

    dateActivated() {
        this.toastr.success("La date a \u00e9t\u00e9 activ\u00e9e avec succ\u00e9s.");
    }
    
    



    closeReservationDate(reservationDate) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/closeReservationDate', reservationDate, { headers: headers })
            .map((data: Response) => data.text())
            .catch(this.handleError);
    }
    activateReservationDate(dateID) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/activateReservationDate', dateID, { headers: headers })
            .map((data: Response) => data.text())
            .catch(this.handleError);
    }
    getAllCloseReservationDate(today) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/getAllCloseReservationDate', today, { headers: headers })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }
    getAllEvents(today) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('/SpecialEventController/getAllEvents', today, { headers: headers })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }
    createNewEvent(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('/SpecialEventController/createNewEvent', event, { headers: headers })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }
    editEvent(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/SpecialEventController/editEvent', event, { headers: headers })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }
    deleteEvent(eventID) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/SpecialEventController/deleteEvent', eventID+"", { headers: headers })
            .map((data: Response) => data.text())
            .catch(this.handleError);
    }
    
        //For Uploading Event Picture
    postData(formData: FormData) {
        return this.http.post('/SpecialEventController/uploadEventPicture', formData)
          .catch((e) => this.handleError(e))
          .map(response => response.json());
    }
    private handleError(error: any) { return Observable.throw(error); }

}
