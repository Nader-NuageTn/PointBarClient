import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login-securite',
  templateUrl: './login-securite.component.html',
  styleUrls: ['./login-securite.component.scss']
})
export class LoginSecuriteComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
    fullName: string;

  ngOnInit() {
      this.fullName = this.route.snapshot.paramMap.get('fullName');
  }

}
