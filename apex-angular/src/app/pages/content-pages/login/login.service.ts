import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class LoginService {

  constructor(private http:Http, public toastr: ToastsManager) { }
    
  // Error Type
    typeError() {
        this.toastr.error("L'e-mail ou le num\u00e9ro de t\u00e9t\u00e9phone entr\u00e9 ne correspond \u00e0 aucun compte!");
    }
    typeErrorSecond() {
        this.toastr.error("Le mot de passe entr\u00e9 est incorrect!");
    }
    typeErrorThird() {
       this.toastr.error("Ce Compte n'existe pas!"); 
    }
    typeErrorNotActive() {
        this.toastr.error("Votre Compte n'est pas active!"); 
    }
    typeErrordeleted() {
        this.toastr.error("Votre Compte est supprim\u00e9!");
    }
  loginUser(login) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const body=JSON.stringify(login);
        return this.http.post('/loginController/loginUser', body, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
    
  private handleError (error: any) {return Observable.throw(error); }

}
