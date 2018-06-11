import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { SignupServiceService } from './signup-service.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {
    @ViewChild('vform') validationForm: FormGroup;
    regularForm: FormGroup;
    @ViewChild('f') registerForm: NgForm;
    
    ngOnInit() {
        this.regularForm = new FormGroup({
            'inputEmail': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
            'textArea': new FormControl(null, [Validators.required]),
            'radioOption': new FormControl('Option one is this'),
            'mobileNumber': new FormControl(null, [Validators.pattern("[0-9]{0-10}")])
        }, {updateOn: 'blur'});
    }
    
    onReactiveFormSubmit() {
        this.regularForm.reset();
    }
    onTemplateFormSubmit() {
        this.registerForm.reset();
    }
    onCustomFormSubmit() {
        this.validationForm.reset();
    }
    
    constructor(private router: Router, private route: ActivatedRoute, private signupService: SignupServiceService) {
        
    }
    
    newPBUser:any={};
    //  On submit click, reset field value
    onSubmit(newPBUser) {
        console.log("test signup");
        console.log(newPBUser);
        this.signupService.signupUser(newPBUser).subscribe(data => {
            console.log(data);
            if(data == "success") {
                console.log("success");
                this.signupService.typeSuccess();
                this.router.navigate(['login'], { relativeTo: this.route.parent });
            }else if(data == "exist") {
                this.signupService.mailExistNotif();
            }
            else{
                console.log("Fail");
                this.signupService.typeErrorThird();
            }
        });
        this.registerForm.reset();
        
    }
    
}