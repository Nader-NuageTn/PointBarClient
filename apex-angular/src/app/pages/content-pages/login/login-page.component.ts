import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { LoginService } from "./login.service";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    @ViewChild('f') loginForm: NgForm;
    
    login:any = {};
    constructor(private router: Router,
        private route: ActivatedRoute, private loginService: LoginService) { }

    // On submit button click    
    onSubmit(login) {
        console.log(login);
        if (login != null && ((login.username == null && login.password == null) || (login.username == "" && login.password == ""))) {
            this.loginService.typeError();
        }else if(login.username == null || login.password == null || login.username == "" || login.password == "") {
        this.loginService.typeErrorSecond();
        }else {
            this.loginService.loginUser(login).subscribe(data => {
                if(data == "success") {
                    console.log("success");
                }else {
                    console.log("Fail");
                }
            });
            this.loginForm.reset();
        }
        
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}