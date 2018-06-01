import { ReservationDateModel } from './ReservationDateModel.model';

export class NewReservationModel{

    public  firstName:String;
    public  lastName:String;
    public email:String;;
    public phone:String;;
    public  facebook:String;
    public  date:ReservationDateModel;
    public  timeFrom:String;
    public  timeTo:String;
    public  qtyMen:number;
    public  qtyWomen:number;
    
    constructor(firstName:String, lastName:String, email:String, phone:String,facebook:String, date:ReservationDateModel, timeFrom:String, timeTo:String, qtyMen:number, qtyWomen:number) {
   
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.facebook = facebook;
        this.date = date;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        this.qtyMen = qtyMen;
        this.qtyWomen = qtyWomen;
       
    }
}