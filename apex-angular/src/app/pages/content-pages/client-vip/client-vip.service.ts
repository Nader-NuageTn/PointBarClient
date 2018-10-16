import { Injectable } from '@angular/core';
import {Http, Response, Headers, ResponseContentType, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";



@Injectable()
export class ClientVipService {

    constructor(private http: Http) { }


    confirmClient(clientID) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ClientVIPController/confirmClient', clientID, { headers: headers })
            .map((data: Response) => data.text())
            .catch(this.handleError);
    }
    
    getClientInfo(ClientID) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ClientVIPController/getClient', ClientID, { headers: headers })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }
    
    addNewClient(client){
    
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ClientVIPController/addNewClient', client, { headers: headers })
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }
    
    confirmClientVIP(ClientID) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/ClientVIPController/confirmClientVIP', ClientID, { headers: headers })
            .map((data: Response) => data.text())
            .catch(this.handleError);
    }

    getProfilePicture(url: string) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
        return this.http.post('/ClientVIPController/getPicture', url, options)
            .map((res: Response) => res)
            .catch(this.handleError);
    } 
        //For Uploading Profile Picture
    postData(formData: FormData) {
        
        let options = new RequestOptions({ responseType: ResponseContentType.Blob });
        return this.http.post('/ClientVIPController/uploadProfilePicture', formData, options)
            .map((res: Response) => res)
            .catch(this.handleError);
    }
    private handleError(error: any) { return Observable.throw(error); }

}
