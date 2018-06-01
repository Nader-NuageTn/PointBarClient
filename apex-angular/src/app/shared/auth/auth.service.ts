import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
  token: string;
    isAdmin: boolean =false;

  constructor(private router: Router, public toastr: ToastsManager, private http:Http) {}
    
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
        this.toastr.error("Votre Compte est deleted!");
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
  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }
  
    
  signinUser(login) {
    //your code for checking credentials and getting tokens for for signing in user
      console.log(login);
        if (login != null && ((login.username == null && login.password == null) || (login.username == "" && login.password == ""))) {
            this.typeError();
        }else if(login.username == null || login.password == null || login.username == "" || login.password == "") {
        this.typeErrorSecond();
        }else {
            this.loginUser(login).subscribe(data => {
                if(data == "Administrator" || data == "Gerant" || data == "Securite") {
                    console.log("success");
                    this.token = "true";
                    this.router.navigate(['reservations/ReservationManagement']); 
                    if(data == "Administrator") {
                        this.isAdmin=true;
                        }
                }else if(data == "wait") {
                    this.typeErrorNotActive();
                }
                else if(data == "deleted") {
                this.typeErrordeleted();
                }
                else {
                console.log("Fail");
                this.typeErrorThird();
                }
            });
            //this.loginForm.reset();
        }
  }

  logout() {   
    this.token = null;
  }

  getToken() {    
    return this.token;
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token 
      if(this.token == "true") {
          return true;
          }else {
          return false;
          }
    
  }
}
