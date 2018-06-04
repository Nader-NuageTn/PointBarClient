import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { ConfirmReservationService } from '../../pages/content-pages/confirm-reservation/confirm-reservation.service';

@Injectable()
export class AuthService {
  token: string;
    isAdmin: boolean =false;

  constructor(private router: Router, public toastr: ToastsManager, private http:Http, private cookieService: CookieService, private confirmReservationService: ConfirmReservationService) {}
    
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
    getFullName(login) {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const body=JSON.stringify(login);
            return this.http.post('/loginController/getFullName', body, {headers: headers})
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
                console.log(data);
                if(data == "Administrator" || data == "Gerant" || data == "Securite") {
                    console.log("success");
                    this.token = "true";
                    this.cookieService.set('isAuthentified', 'true');
                    if(data == "Administrator") {
                        this.cookieService.set('isAdmin', 'true');
                        this.cookieService.set('isSecurity', 'true');
                        this.router.navigate(['reservations/ReservationManagement']); 
                        }
                    else if(data == "Securite") {
                        this.cookieService.set('isSecurity', 'true');
                        console.log(this.confirmReservationService.getIsScan());
                            if(this.confirmReservationService.getIsScan()) {
                                this.router.navigate(['pages/confirmation']); 
                                
                            }else {
                                this.getFullName(login).subscribe(data => 
                                {
                                    console.log(data);
                                    this.router.navigate(['pages/loginSuccess', data]); 
                                });
                                
                            }
                        }
                    else if(data == "Gerant") {
                        this.router.navigate(['reservations/ReservationManagement']); 
                        }
                }else if(data == "wait") {
                    this.typeErrorNotActive();
                    this.cookieService.set('isAuthentified', 'false');
                }
                else if(data == "deleted") {
                this.typeErrordeleted();
                    this.cookieService.set('isAuthentified', 'false');
                }
                else {
                console.log("Fail");
                this.typeErrorThird();
                    this.cookieService.set('isAuthentified', 'false');
                }
            });
            //this.loginForm.reset();
        }
  }

  logout() {   
    this.cookieService.set('isAuthentified', 'false');
    this.cookieService.set('isAdmin', 'false');
      this.cookieService.set('isSecurity', 'false');
      this.router.navigate(['pages/login']);
      console.log('succcess');
  }

  getToken() {    
    return this.cookieService.get('isAuthentified');
  }
    
 getIsAdmin() {    
     if(this.cookieService.get('isAdmin') == 'true') {
          return true;
          }else {
          return false;
          }  
  }
    
 getIsSecurity() {  
 if(this.cookieService.get('isSecurity') == 'true') {
          return true;
          }else {
          return false;
          }  
  }


  isAuthenticated() {
    // here you can check if user is authenticated or not through his token 
      if(this.cookieService.get('isAuthentified') == 'true') {
          return true;
          }else {
          return false;
          }
    
  }
}
