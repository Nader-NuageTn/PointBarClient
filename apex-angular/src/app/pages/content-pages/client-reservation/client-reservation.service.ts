import { Injectable } from '@angular/core';
import {Http, Response, Headers, ResponseContentType, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NewReservationModel } from './NewReservationModel.model';

@Injectable()
export class ClientReservationService {

    constructor(private http: Http, public toastr: ToastsManager) { }

    requiredFieldError() {
        this.toastr.error("Vous devez ajouter tous les champs requises");
    }

    requiredNumberOfPersonError() {
        this.toastr.error("Vous devez ajouter au moins une personne");
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

    cancelSuccess() {
        this.toastr.success("Votre r\u00e9tservation a \u00e9t\u00e9 annul\u00e9e avec succ\u00e9s");
    }
    cancelFail() {
        this.toastr.error("ID Incorrecte");
    }
    dateClosed() {
        this.toastr.warning("Cette date est d\u00e9j\u00e0 ferm\u00e9e!");
    }

    dateActivated() {
        this.toastr.success("La date a \u00e9t\u00e9 activ\u00e9e avec succ\u00e9s.");
    }

    sendReservationRequest(reservation: NewReservationModel) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/sendReservationRequest', reservation, { headers: headers })
            .map((data: Response) => data.text())
            .catch(this.handleError);
    }

    cancelReservation(idReservation) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/cancelReservation', idReservation, { headers: headers })
            .map((data: Response) => data.text())
            .catch(this.handleError);
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

    getNextEvent(today) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/getNextEvent', today, { headers: headers })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    getEventPicture(url: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
        return this.http.post('/reservationController/getPicture', url, options)
            .map((res: Response) => res)
            .catch(this.handleError);
    }
     getReservationParams() {
        return this.http.get('/reservationController/getReservationParams')
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }
    
     trackReservation(idReservation) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/reservationController/trackReservation', idReservation, { headers: headers })
            .map((data: Response) => data.text())
            .catch(this.handleError);
    }
    
    //For Uploading Profile Picture
    postData(formData: FormData) {
        return this.http.post('/reservationController/uploadProfilePicture', formData)
            .catch((e) => this.handleError(e))
            .map(response => response.json());
    }

    private handleError(error: any) { return Observable.throw(error); }

}
