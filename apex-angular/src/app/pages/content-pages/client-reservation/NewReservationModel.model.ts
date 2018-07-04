import { ReservationDateModel } from './ReservationDateModel.model';

export class NewReservationModel{

    public  firstName:String;
    public  lastName:String;
    public email:String;;
    public phone:String;;
    public  facebook:String;
    public  date:ReservationDateModel;
    public  service:String;
    public  qtyMen:number;
    public  qtyWomen:number;
    public timeArrival:String;
    
    constructor(firstName:String, lastName:String, email:String, phone:String,facebook:String, date:ReservationDateModel, service:String, qtyMen:number, qtyWomen:number,timeArrival:String) {
   
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.facebook = facebook;
        this.date = date;
        this.service = service;
        this.qtyMen = qtyMen;
        this.qtyWomen = qtyWomen;
       this.timeArrival = timeArrival
    }
}