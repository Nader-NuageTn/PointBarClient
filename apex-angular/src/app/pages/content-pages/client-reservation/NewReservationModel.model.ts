
export class NewReservationModel{

    public  firstName:String;
    public  lastName:String;
    public email:String;;
    public phone:String;;
    public  facebook:String;
    public  date:Date;
    public  timeFrom:String;
    public  timeTo:String;
    public  qtyMen:Number;
    public  qtyWomen:Number;
    
    constructor(firstName:String, lastName:String, email:String, phone:String,facebook:String, date:Date, timeFrom:String, timeTo:String, qtyMen:Number, qtyWomen:Number) {
   
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