import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class SignupServiceService {

  constructor(private http:Http, public toastr: ToastsManager) { }
    
  // Success Type
    typeSuccess() {
        this.toastr.success("Votre compte a \u00e9t\u00e9 cr\u00e9\u00e9 avec succ\u00e8s. L'activation peut prendre quelques minutes.", null, {toastLife: 10000});
    }
    
    typeErrorThird() {
        this.toastr.error("Ce Compte existe deja!", null, {toastLife: 10000});
    }
    mailExistNotif() {
        this.toastr.error("Un compte avec l'email que vous avez entr\u00e9 existe deja!", null, {toastLife: 10000});
    }
    
 //Signup User   
  signupUser(newPBUser) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const body=JSON.stringify(newPBUser);
        return this.http.post('/signupController/signupUser', body, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
    
  private handleError (error: any) {return Observable.throw(error); }

}
