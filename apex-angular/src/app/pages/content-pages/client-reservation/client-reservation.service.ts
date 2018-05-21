import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ClientReservationService {

  constructor(private http:Http, public toastr: ToastsManager) { }
    
  // Success Type
    addSuccess() {
        this.toastr.success("Votre demande a \u00e8tt\u00e8t envoy\u00e8te avec succ\u00e9ts.");
    }
    
    deleteSuccess() {
        this.toastr.success("Votre r\u00e8tservation a \u00e8tt\u00e8t annul\u00e8te avec succ\u00e9ts");
    }
    
    activateSuccess(X) {
        this.toastr.error("que les nombres des places sont complets pendant tout la date "+X);
    }
    
  addReservation(user) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const body=JSON.stringify(user);
        return this.http.post('/usersController/editUser', body, {headers: headers})
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
