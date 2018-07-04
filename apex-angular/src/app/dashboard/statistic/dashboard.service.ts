import { Injectable } from '@angular/core';
import {Http, Response, Headers, ResponseContentType, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class DashboardService {

  constructor(private http: Http) { }
/**
     * START line Total Charts
     */
   getTotalChart() {
       return this.http.get('/DashboardController/getTotalChart')
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    /**
     * END line Total Charts
     */
    
    
    
    /**
     * START STATISTICS PAR STATUT
     */
    
    // ************** TODAY ******************//
   getTotalChartPerStatusToday() {
       return this.http.get('/DashboardController/getTotalChartPerStatusToday')
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    // ************** THIS WEEK ******************//

   getTotalChartPerStatusWeek() {
        
       return this.http.get('/DashboardController/getTotalChartPerStatusWeek')
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    // ************** THIS MONTH ******************//

   getTotalChartPerStatusMonth() {
        return this.http.get('/DashboardController/getTotalChartPerStatusMonth')
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    // ************** THIS YEAR ******************//
   
    getTotalChartPerStatusYear() {
        return this.http.get('/DashboardController/getTotalChartPerStatusYear')
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }


    /**
     * END STATISTICS PAR STATUT
     */

                
                
    /**
     * START STATISTICS PAR GENRE
     */

                    // ************** TODAY ******************//
   getTotalChartPerGenreToday() {
       return this.http.get('/DashboardController/getTotalChartPerGenreToday')
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    // ************** THIS WEEK ******************//

   getTotalChartPerGenreWeek() {
        
       return this.http.get('/DashboardController/getTotalChartPerGenreWeek')
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    // ************** THIS MONTH ******************//

   getTotalChartPerGenreMonth() {
        return this.http.get('/DashboardController/getTotalChartPerGenreMonth')
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }

    // ************** THIS YEAR ******************//
   
    getTotalChartPerGenreYear() {
        return this.http.get('/DashboardController/getTotalChartPerGenreYear')
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }
                
    /**
     * END STATISTICS PAR GENRE
     */

    /**
     * START CLIENT CART
     */
                
     getAllReservationByClient() {
        
       return this.http.get('/DashboardController/getAllReservationByClient')
            .map((data: Response) => data.json())
            .catch(this.handleError);
    }             

    /**
     * END CLIENT CART
     */
    
    ExporterClientCart() {
        
       return this.http.get('/DashboardController/ExporterClientCart')
            .map((data: Response) => data.text())
            .catch(this.handleError);
    }             
    downloadDraftFile(url:string){
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions( { headers: headers, responseType: ResponseContentType.Blob});
        return this.http.post('/DashboardController/downloadFile',url, options)
            .map((res) => {
                return new Blob([res.blob()], { type: 'application/octet-stream' });
            })
    }
    
 private handleError(error: any) { return Observable.throw(error); }
}
