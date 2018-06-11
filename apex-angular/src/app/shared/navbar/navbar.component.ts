import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';
import { NavbarService } from './navbar.component.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    currentLang = 'en';
    toggleClass = 'ft-maximize';

    AllNotification: boolean = false;
    UnreadNotification: boolean = true;
    listNotif = [];
    listNotifLength = -1;
    userAuthID: any;


    constructor(public translate: TranslateService, private auth: AuthService, private navbarService: NavbarService) {
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');

    }

    ngOnInit() {
        this.userAuthID = this.auth.getUserAuthID()
        console.log(this.userAuthID);
        this.GetUnreadNotification();

    }


    GetAllNotification() {
        this.navbarService.GetAllNotification(this.userAuthID).subscribe(data => {
            var options = {
                weekday: "long", year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            };
            data.forEach(it => {
                it.dateNotif = new Date(it.dateNotif).toLocaleTimeString("fr-tn", options)
            })
            console.log(data);

            this.listNotif = data
            this.listNotifLength = data.length;
            this.AllNotification = true;
            this.UnreadNotification = false;
        });
    }

    GetUnreadNotification() {
        this.navbarService.GetUnreadNotification(this.userAuthID).subscribe(data => {
            var options = {
                weekday: "long", year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            };
            data.forEach(it => {
                it.dateNotif = new Date(it.dateNotif).toLocaleTimeString("fr-tn", options)
            })
            console.log(data);
            this.listNotif = data
            this.listNotifLength = data.length;
            this.AllNotification = false;
            this.UnreadNotification = true;
        });
    }

    markAsRead(notif) {
        console.log(notif);
        
        notif.isShowen = true;
        this.navbarService.setNotificationRead(notif.id).subscribe(data => {
            if(this.UnreadNotification == true){
                this.listNotifLength = this.listNotifLength -1;
            }
        });
    }
    
    
    ToggleClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        }
        else
            this.toggleClass = 'ft-maximize'
    }
    
    
    logout() {
        this.auth.logout();
    }
}
