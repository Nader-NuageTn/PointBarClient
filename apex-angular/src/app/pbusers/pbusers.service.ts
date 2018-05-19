import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class PbusersService {

  constructor(private http:Http, public toastr: ToastsManager) { }
    
  // Success Type
    typeSuccess() {
        this.toastr.success("L'utilisateur est modifi\u00e9t avec succ\u00e9ts.");
    }
    
    deleteSuccess() {
        this.toastr.success("L'utilisateur est supprim\u00e9t avec succ\u00e9ts.");
    }
    
    activateSuccess() {
        this.toastr.success("L'utilisateur est activ\u00e9t avec succ\u00e9ts.");
    }
    
  editUser(user) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const body=JSON.stringify(user);
        return this.http.post('/usersController/editUser', body, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
  
  deleteUser(id) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/usersController/deleteUser/'+id, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
    
  activateUser(id) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/usersController/activateUser/'+id, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
  }
    
  getpbUsers() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
 var alertdata = [
  {
    id: 1,
    name: 'Leanne Graham',
    prenom: 'Bret',
    email: 'Sincere@april.biz',
    numeroTel: '22 223 333',
    notShownField: true,
  },
  {
    id: 2,
    name: 'Ervin Howell',
    prenom: 'Antonette',
    email: 'Shanna@melissa.tv',
    numeroTel: '22 223 333',
    notShownField: true,
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    prenom: 'Samantha',
    email: 'Nathan@yesenia.net',
    numeroTel: '22 223 333',
    notShownField: false,
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    prenom: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    numeroTel: '22 223 333',
    notShownField: false,
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    prenom: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    numeroTel: '22 223 333',
    notShownField: false,
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    prenom: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
    numeroTel: '22 223 333',
    notShownField: false,
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    prenom: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
    numeroTel: '22 333 567',
    notShownField: false,
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    prenom: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
    numeroTel: '22 566 778',
    notShownField: true,
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    prenom: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
    numeroTel: '22 345 333',
    notShownField: false,
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    prenom: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
    numeroTel: '22 665 333',
    notShownField: false,
  },
  {
    id: 11,
    name: 'Nicholas DuBuque',
    prenom: 'Nicholas.Stanton',
    email: 'Rey.Padberg@rosamond.biz',
    numeroTel: '22 223 333',
    notShownField: true,
  }
];  
      return alertdata;
//        return this.http.post('/usersController/getUsersList', {headers: headers})
//            .map((data: Response) => data.json())
//            .catch(this.handleError);
  }
  private handleError (error: any) {return Observable.throw(error); }

}
