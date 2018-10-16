import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ClientVipService {

  constructor(private http:Http, public toastr: ToastsManager) { }
    
   editSuccess() {
      this.toastr.success("Les modifications ont \u00e9t\u00e9 modifi\u00e9es avec succ\u00e9s.");
   }
    
  deleteSuccess() {
        this.toastr.success("Le client a \u00e9t\u00e9 supprim\u00e9.", null, {toastLife: 10000});
    }
    
  activateSuccess() {
        this.toastr.success("Le client a \u00e9t\u00e9 activ\u00e9 avec succ\u00e9s.", null, {toastLife: 10000});
    }
    
    deactivateSuccess() {
        this.toastr.success("Le client a \u00e9t\u00e9 d\u00e9sactiv\u00e9 avec succ\u00e9s.", null, {toastLife: 10000});
    }
    
  getActivatedClients() {
        
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ClientVIPController/getActivatedClients', {headers: headers})
            .map((data: Response) => data.json())
            .catch(this.handleError);
        
    }
    
    getDisactivatedClients() {
            
         const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ClientVIPController/getDisactivatedClients', {headers: headers})
            .map((data: Response) => data.json())
            .catch(this.handleError);
            
     }
    
    
    editClient(client) {
            
         const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ClientVIPController/editClient', client, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
            
    }
    
    activateClient( clientID) {
            
         const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ClientVIPController/activateClient',clientID, {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
            
    }
    
    disactivateClient( clientID) {
            
         const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ClientVIPController/disactivateClient',clientID,  {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
            
    }
    
    
   deleteClient( clientID) {
            
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ClientVIPController/deleteClient',clientID,  {headers: headers})
            .map((data: Response) => data.text())
            .catch(this.handleError);
            
    }

    
  private handleError (error: any) {return Observable.throw(error); }

}
