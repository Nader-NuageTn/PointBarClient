import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-login-securite',
  templateUrl: './login-securite.component.html',
  styleUrls: ['./login-securite.component.scss']
})
export class LoginSecuriteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
    fullName: string;

  ngOnInit() {
      this.fullName = this.route.snapshot.paramMap.get('fullName');
  }
    
    logout() {
        localStorage.setItem('isSecurity', 'false');
        localStorage.setItem('loged', 'false');
        this.router.navigate(['pages/login']);
        }

}
