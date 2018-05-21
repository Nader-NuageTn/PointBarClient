import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupServiceService } from './signup-service.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {
    @ViewChild('f') registerForm: NgForm;
    
    constructor(private router: Router, private route: ActivatedRoute, private signupService: SignupServiceService) {
        
    }
    
    newPBUser:any={};
    //  On submit click, reset field value
    onSubmit(newPBUser) {
        console.log("test signup");
        console.log(newPBUser);
        this.signupService.signupUser(newPBUser).subscribe(data => {
            console.log(data);
//            if(data == "success") {
//                console.log("success");
//                this.signupService.typeSuccess();
//                this.router.navigate(['login'], { relativeTo: this.route.parent });
//            }else {
//                console.log("Fail");
//            }
        });
        this.registerForm.reset();
        
    }
    
}