import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class PbusersService {

  constructor(private http:Http, public toastr: ToastsManager) { }
    
  // Success Type
    typeSuccess() {
        this.toastr.success("L'utilisateur est modifi\u00e9t avec succ\u00e9ts.");
    }
    
    deleteSuccess() {
        this.toastr.success("L'utilisateur est supprim\u00e9t avec succ\u00e9ts.");
    }
    
    activateSuccess() {
        this.toastr.success("L'utilisateur est activ\u00e9t avec succ\u00e9ts.");
    }
    
  editUser(user) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const body=JSON.stringify(user);
        return this.http.post('/usersController/editUser', body, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
  
  deleteUser(id) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/usersController/deleteUser', id, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
    
  activateUser(id) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/usersController/activateUser', id, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
    
  getpbUsers() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/usersController/getUsersList', {headers: headers})
            .map((data: Response) => data.json())
            .catch(this.handleError);
  }
  private handleError (error: any) {return Observable.throw(error); }

}
